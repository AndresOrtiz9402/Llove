import { ILetter } from '@llove/models';

type Input = ILetter.Infrastructure.SaveLetterInput;

type Dependencies = {
  letterRepository: ILetter.LetterRepository;
  letterOptionsRepository: ILetter.LetterOptionsRepository;
};

class UnitOfWork<R> {
  constructor(private readonly work: () => R) {}
  execute = async () => {
    try {
      return { status: 'Transaction committed.', commit: await this.work() };
    } catch (error) {
      return {
        status: 'Transaction rolled back. ',
        errorMessage: (error as Error).message,
      };
    }
  };
}

export const makeSaveLetterUseCase = (dependencies: Dependencies) => async (input: Input) => {
  const { letter, options } = input;
  const { letterOptionsRepository, letterRepository } = dependencies;

  return new UnitOfWork(async () => {
    const letterOption = await letterOptionsRepository.create(options);

    if (letterOption.status === 'fail')
      throw Error('Error: Failed to create the letterOptions record.');

    const letterCreated = await letterRepository.create({
      ...letter,
      letterOptionId: letterOption.data.id,
    });

    if (letterCreated.status === 'fail') {
      await letterOptionsRepository.deletedById(letterOption.data.id);

      throw Error('Error: Failed to create the letter record.');
    }

    return letterCreated;
  }).execute();
};
