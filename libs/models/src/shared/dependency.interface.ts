export interface AsyncDependency<DependencyInput, DependencyOutput> {
  execute(input: DependencyInput): Promise<DependencyOutput>;
}
