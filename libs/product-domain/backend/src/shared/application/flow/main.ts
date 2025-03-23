// # libs
import { match } from 'ts-pattern';
import { z } from 'zod';

// # Modules
import type {
  CreateFlowFactory,
  DefaultFallBack,
  Flow,
  FlowData,
  FlowFactory as IFlowFactory,
  FactoredFlowManager as IFactoredFlowManager,
  FlowFactoryWithoutFallback as IFlowFactoryWithoutFallback,
  FlowID,
  FlowManager as IFlowManager,
  FlowRepository,
  IsFinalOptions,
  Step,
  StepID,
  StepPattern,
  StepRecord as IStepRecord,
  Steps,
} from './interface';

// # Functions
const generateFlowRecords = <InputType, FlowDataType>(
  value: InputType,
  isUpdated = false,
  transformInput?: (value: InputType) => FlowData<FlowDataType>
): FlowData<FlowDataType> => {
  if (!isUpdated) return {};
  return transformInput?.(value) ?? (value as FlowData<FlowDataType>);
};

const getNextStep = (steps: StepID[], currentStep: StepID) =>
  steps[steps.indexOf(currentStep) + 1] ?? null;

type IsFinalParams<InputType> = { nextStep?: StepID; isFinal?: IsFinalOptions<InputType> };

/**
 * Determines if the flow should end based on the next step and final step conditions.
 */
const isEnd = async <InputType>(
  { nextStep, isFinal }: IsFinalParams<InputType>,
  input?: InputType
) => {
  const { when = () => false, whenGetsHere = false } = isFinal || {};

  return !nextStep || (isFinal && (whenGetsHere || (await when(input))));
};

/**
 * The main flow function. Determines if the input is valid or not. On valid the input pass to the onValid function.
 * Otherwise, the fallback function is called.
 */
export const flow: Flow = async (flowManager, flowID, flowStep, input) => {
  const { stepRecord, steps, defaultFallback } = flowManager;

  const flowStepRecord = stepRecord[flowStep];

  const { pattern, fallback = defaultFallback } = flowStepRecord;

  await match(input)
    .with(pattern, async () => {
      const { updateFlowData, onValid, isFinal, debug } = flowStepRecord;

      // Safely destructure transformInput with defaults.
      const isUpdate = updateFlowData !== undefined;

      const { skippingInputTransformation = false, applyInputTransformation } =
        updateFlowData || {};

      const transformFn =
        !skippingInputTransformation && isUpdate ? applyInputTransformation : undefined;

      // Generate new records based on input and transformation logic.
      const newFlowData = generateFlowRecords(input, isUpdate, transformFn);

      const { flowRepository } = flowManager;

      //TODO: Validate if the repository call is needed.
      const currentFlowData = (await flowRepository.getFlow(flowID))?.flowData ?? {};

      // Combines current state with new records.
      const nextFlowData = { ...currentFlowData, ...newFlowData };

      const nextStep = getNextStep(steps, flowStep);

      if (nextStep) {
        // Updates the flow state to move to the next step.
        await flowRepository.setFlow(flowID, {
          step: nextStep,
          flowData: nextFlowData,
        });
      }

      const isEnded = await isEnd({ nextStep, isFinal }, input);

      if (isEnded) {
        await flowRepository.deleteFlow(flowID);
      }

      await onValid(input || null, nextFlowData);

      if (debug) {
        console.log('\nON VALID FLOW REPORT: ', {
          flowID,
          flowStep,
          isUpdate,
          skippingInputTransformation,
          applyInputTransformation,
          transformFn,
          input,
          current: currentFlowData,
          newRecords: newFlowData,
          nextCurrent: nextFlowData,
          nextStep,
          isEnded,
        });
      }
    })
    .otherwise(async () => {
      await fallback?.(input);
    });
};

// # Flow Factory # Constants

const ErrorMessages = {
  INVALID_FINAL_STEP: 'Invalid final step configuration.',
  INVALID_STEP: 'Invalid step configuration.',
  INVALID_STEP_ID_FORMAT:
    'The step id name must start with a letter, `_`, or `$`, and contain only letters, numbers, `_`, or `$`.',
  INVALID_UPDATE_FLOW_DATA: 'Invalid update flow data configuration.',
  STEP_REQUIRED: 'Step configuration is required.',
};

const updateFlowDataSchema = (invalid_type_error: string) =>
  z
    .object(
      {
        skippingInputTransformation: z.boolean().optional().nullable(),
        applyInputTransformation: z.function().optional().nullable(),
      },
      {
        invalid_type_error,
      }
    )
    .optional()
    .nullable();

const isFinalSchema = (invalid_type_error: string) =>
  z
    .object(
      {
        when: z.function().optional().nullable(),
        whenGetsHere: z.boolean().optional().nullable(),
      },
      {
        invalid_type_error,
      }
    )
    .optional()
    .nullable();

// # Flow Factory # Functions

const stringifyStepId = (stepId: StepID) => String(stepId);

const formatStepMessage = (stepId: StepID) => {
  return {
    message: (message: string) => `${message}\n${stringifyStepId(stepId)}`,
  };
};

const validateStep = <InputType, FlowDataType>(
  step: Step<InputType, FlowDataType>,
  stepId: StepID
) => {
  const { message } = formatStepMessage(stepId);

  const { INVALID_STEP, STEP_REQUIRED, INVALID_FINAL_STEP, INVALID_UPDATE_FLOW_DATA } =
    ErrorMessages;

  return z
    .object(
      {
        pattern: z.custom<StepPattern<InputType>>(),
        onValid: z.function(),
        updateFlowData: updateFlowDataSchema(message(INVALID_UPDATE_FLOW_DATA)),
        fallback: z.function().optional().nullable(),
        isFinal: isFinalSchema(message(INVALID_FINAL_STEP)),
        debug: z.boolean().optional().nullable(),
      },
      {
        invalid_type_error: message(INVALID_STEP),
        required_error: message(STEP_REQUIRED),
      }
    )
    .parse(step);
};

const validateStepIdFormat = (stepId: StepID) => {
  const { message } = formatStepMessage(stepId);

  const { INVALID_STEP_ID_FORMAT } = ErrorMessages;

  z.string()
    .regex(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/, message(INVALID_STEP_ID_FORMAT))
    .parse(stepId);

  return stringifyStepId(stepId);
};

// # Flow Factory # Class

class FlowManager<InputType, FlowDataType> implements IFlowManager<InputType, FlowDataType> {
  stepRecord: IStepRecord<InputType, FlowDataType>;

  steps: Steps;

  constructor(readonly flowRepository: FlowRepository<FlowDataType>) {
    if (!flowRepository) {
      throw new Error('FlowRepository must be provided.');
    }
    // Ensure an valid initial state
    this.steps = [];
    this.stepRecord = {};
  }

  async add(flowID: FlowID): Promise<boolean> {
    await this.flowRepository.setFlow(flowID, { step: this.steps[0] });
    return true;
  }

  async flow(flowID: FlowID, input: InputType): Promise<boolean> {
    const state = (await this.flowRepository.getFlow(flowID))?.step ?? null;

    if (!state) return false;

    await flow(this, flowID, state, input);

    return true;
  }

  defaultFallback = () => void {};
}

class FactoredFlowManage<InputType, FlowDataType> implements IFactoredFlowManager<InputType> {
  constructor(private readonly flowManager: FlowManager<InputType, FlowDataType>) {}

  async add(flowID: FlowID): Promise<boolean> {
    return await this.flowManager.add(flowID);
  }
  async flow(flowID: FlowID, input: InputType): Promise<boolean> {
    return await this.flowManager.flow(flowID, input);
  }
}

class FlowFactoryWithoutSetFallback<InputType, FlowDataType>
  implements IFlowFactoryWithoutFallback<InputType, FlowDataType>
{
  constructor(private readonly flowFactory: FlowFactory<InputType, FlowDataType>) {}

  addStep(
    stepId: StepID,
    step: Step<InputType, FlowDataType>
  ): IFlowFactoryWithoutFallback<InputType, FlowDataType> {
    this.flowFactory.addStep(stepId, step);
    return this;
  }

  getManager(): IFactoredFlowManager<InputType> {
    return this.flowFactory.getManager();
  }
}

/**
 * The Flow Factory.
 */
class FlowFactory<InputType, FlowDataType> implements IFlowFactory<InputType, FlowDataType> {
  private readonly flowManager: FlowManager<InputType, FlowDataType>;

  constructor(flowRepository: FlowRepository<FlowDataType>) {
    this.flowManager = new FlowManager<InputType, FlowDataType>(flowRepository);
  }

  /**
   * Adds a new step to the flow.
   *
   * @param stepId - The unique identifier for the step.
   * @param step - The step configuration.
   * @throws {Error} If the step ID already exists or if the step configuration is invalid.
   */
  addStep(stepId: StepID, step: Step<InputType, FlowDataType>) {
    const validatedStepId = validateStepIdFormat(stepId);

    if (this.flowManager.stepRecord[stepId]) {
      throw new Error(`Step ID "${validatedStepId}" already exists.`);
    }

    this.flowManager.stepRecord[stepId] = validateStep(step, validatedStepId) as Step<
      InputType,
      FlowDataType
    >;

    this.flowManager.steps.push(stepId);

    return this;
  }

  /**
   * Adds a default fallback and blocks this option.
   *
   * If is not provided do nothing.
   */
  setDefaultFallback(
    defaultFallback: DefaultFallBack<InputType>
  ): IFlowFactoryWithoutFallback<InputType, FlowDataType> {
    this.flowManager.defaultFallback = defaultFallback;

    return new FlowFactoryWithoutSetFallback(this);
  }

  /**
   * Returns the configured flow manager instance.
   */
  getManager(): IFactoredFlowManager<InputType> {
    return new FactoredFlowManage(this.flowManager);
  }
}

// # Main
export const createFlowFactory: CreateFlowFactory = flowRepository =>
  new FlowFactory(flowRepository);
