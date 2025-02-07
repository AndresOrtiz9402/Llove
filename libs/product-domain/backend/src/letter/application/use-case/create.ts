import { ILetter } from '@llove/models';

type Input = ILetter.Infrastructure.SaveLetterInput;

type Dependencies = {
  letterRepository: ILetter.LetterRepository;
  letterOptionsRepository: ILetter.LetterOptionsRepository;
};

export const makeSaveLetterUseCase = (dependencies: Dependencies) => async (input: Input) => {
  const { letter, options } = input;
  const { letterOptionsRepository, letterRepository } = dependencies;

  try {
    //TODO: Should be a transaction
    const letterOption = await letterOptionsRepository.create(options);

    const letterCreated = await letterRepository.create({
      ...(letter as ILetter.Letter),
      letterOptionId: (letterOption as any).id,
    });

    return {
      status: 'success',
      data: {
        letterId: (letterCreated as any).id,
      },
    };
  } catch (error) {
    return {
      status: 'error',
      errorMessage: (error as Error).message,
    };
  }
};
