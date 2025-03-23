import type { Pattern } from 'ts-pattern/dist/patterns';

export type StepID = string | number | symbol;

/**
 * The data being handle through the flow.
 */
export type FlowData<Record> = Partial<{
  [P in keyof Record]: Record[P];
}>;

export type StepPattern<InputType> = Pattern<InputType>;

export type StepOnValid<InputType, FlowDataType> = (
  value: InputType | null,

  flowData?: FlowData<FlowDataType>
) => unknown;

export type SkippingInputTransformation = boolean;

export type ApplyInputTransformation<InputType, FlowDataType> = (
  value?: InputType
) => FlowData<FlowDataType>;

export interface UpdateFlowDataOptions<InputType, FlowDataType> {
  /** Skips the input transformation and uses the value as-is. Typically used when no transformation is needed for the input value. */
  skippingInputTransformation?: SkippingInputTransformation;
  /** Applies a transformation to the input before using it in the flow. */
  applyInputTransformation?: ApplyInputTransformation<InputType, FlowDataType>;
}

export type StepFallBack<InputType> = (value?: InputType) => unknown;

export interface IsFinalOptions<InputType> {
  /**  A function to dynamically determine if this step is final */
  when?: (value: InputType) => boolean | Promise<boolean>;
  /** A fixed boolean to mark this step as final when reached. */
  whenGetsHere?: boolean;
}

export type StepDebug = boolean;

/**
 * Represents a flow step record with input and transformation logic.
 */
export interface Step<InputType, FlowDataType> {
  /**
   * The pattern to match the input against.
   */
  pattern: StepPattern<InputType>;

  /**
   * The function to call when the input matches the step's pattern.
   *
   * @param {InputType} input - The input value.
   * @param {FlowDataType} flowData - The current flow data.
   * @returns {Promise<void>}
   */
  onValid: StepOnValid<InputType, FlowDataType>;

  /**
   * If present, updates the flow value.
   *
   * @default {"skippingInputTransformation": false}
   */
  updateFlowData?: UpdateFlowDataOptions<InputType, FlowDataType>;

  /**
   * Function to call when the input does not match the pattern.
   *
   * @default undefined
   */
  fallback?: StepFallBack<InputType>;

  /**
   * If present, determines if this is the final step in the flow.
   *
   * - `when`: A function to dynamically determine if this step is final.
   * - `whenGetsHere`: A fixed boolean to mark this step as final when reached.
   *
   * @default {"whenGetsHere": false}
   */
  isFinal?: IsFinalOptions<InputType>;

  /**
   * If present, logs a full report of the flow behavior.
   */
  debug?: StepDebug;
}

export type StepsRecord<InputType, FlowDataType> = Record<StepID, Step<InputType, FlowDataType>>;

export interface FlowState<FlowDataType> {
  step: StepID;

  flowData?: FlowData<FlowDataType>;
}

export type FlowID = string | number;

export interface FlowRepository<FlowDataType> {
  getFlow(flowID: FlowID): Promise<FlowState<FlowDataType> | undefined>;

  setFlow(flowID: FlowID, state: FlowState<FlowDataType>): Promise<void>;

  deleteFlow(flowID: FlowID): Promise<void>;

  clear(): Promise<void>;
}

export type StepRecord<InputType, FlowDataType> = Record<StepID, Step<InputType, FlowDataType>>;

export type Steps = StepID[];

export type FlowManagerAdd = (flowID: FlowID) => Promise<boolean>;

export type FlowManagerFlow<InputType> = (flowID: FlowID, input: InputType) => Promise<boolean>;

export type DefaultFallBack<InputType> = (input?: InputType) => unknown;

export interface FlowManager<InputType, FlowDataType> {
  flowRepository: FlowRepository<FlowDataType>;

  stepRecord: StepRecord<InputType, FlowDataType>;

  steps: Steps;

  add: FlowManagerAdd;

  flow: FlowManagerFlow<InputType>;

  defaultFallback: DefaultFallBack<InputType>;
}

export type Flow = <InputType, FlowDataType>(
  flowManager: FlowManager<InputType, FlowDataType>,

  flowID: FlowID,

  flowStep: StepID,

  input: InputType
) => Promise<void>;

export interface FactoredFlowManager<InputType> {
  add(flowID: FlowID): Promise<boolean>;
  flow(flowID: FlowID, input: InputType): Promise<boolean>;
}

export interface FlowFactory<InputType, FlowDataType> {
  addStep(
    stepId: StepID,
    step: Step<InputType, FlowDataType>
  ): FlowFactory<InputType, FlowDataType>;

  setDefaultFallback(
    defaultFallback: DefaultFallBack<InputType>
  ): FlowFactoryWithoutFallback<InputType, FlowDataType>;

  getManager(): FactoredFlowManager<InputType>;
}

export interface FlowFactoryWithoutFallback<InputType, FlowDataType> {
  addStep(
    stepId: StepID,
    step: Step<InputType, FlowDataType>
  ): FlowFactoryWithoutFallback<InputType, FlowDataType>;

  getManager(): FactoredFlowManager<InputType>;
}

export type CreateFlowFactory = <InputType, FlowDataType>(
  flowRepository: FlowRepository<FlowDataType>
) => FlowFactory<InputType, FlowDataType>;
