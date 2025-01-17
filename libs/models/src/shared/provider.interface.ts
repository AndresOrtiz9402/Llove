export interface AsyncProvider<ProviderInput, ProviderOutput> {
  execute(input: ProviderInput): Promise<ProviderOutput>;
}
