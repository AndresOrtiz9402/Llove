import { Pattern } from 'ts-pattern/dist/patterns';

export interface TriggerRecord<InputType, OutputType> {
  pattern: Pattern<InputType>;
  action: (input: InputType) => OutputType | Promise<OutputType>;
}

export type Triggers<InputType, OutputType> = TriggerRecord<InputType, OutputType>[];

export interface TriggersManager<InputType, OutputType> {
  triggers: Triggers<InputType, OutputType>;
  trigger: (input: InputType) => Promise<OutputType>;
}

export type Trigger = <InputType, OutputType>(
  triggerManager: TriggersManager<InputType, OutputType>,
  input: InputType
) => undefined | Promise<OutputType>;
