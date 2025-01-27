export interface AsyncDependency<Input, Output> {
  execute(input: Input): Promise<Output>;
}
