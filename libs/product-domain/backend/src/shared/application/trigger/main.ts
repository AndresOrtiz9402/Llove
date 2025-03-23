// # Libs
import { match } from 'ts-pattern';

// # Modules
import { Trigger } from './interface';

// # Main
export const trigger: Trigger = async (triggerManager, input) => {
  return await triggerManager.triggers
    .find(({ pattern }) =>
      match(input)
        .with(pattern, () => true)
        .otherwise(() => false)
    )
    ?.action?.(input);
};
