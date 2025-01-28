import { Shared } from '..';

export function runTest<InputType, OutputType>(
  lloveTest: Shared.Test<InputType, OutputType>
) {
  for (const testCase of lloveTest.testCases) {
    const { expected, input, title } = testCase;

    const fn = () => {
      const actual = lloveTest.fnToTest(input);

      expect(actual).toEqual(expected);
    };

    test(title, fn);
  }
}
