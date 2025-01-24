export interface AsyncDependency<Input, Output> {
  execute(input: Input): Promise<Output>;
}

export interface AsyncDependencyII<Input, Output, DependencyType> {
  execute(input: Input, dependency: DependencyType): Promise<Output>;
}
