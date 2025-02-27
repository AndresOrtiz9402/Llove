import { ILetter } from '@llove/models';

type SaveLetterInput = ILetter.Infrastructure.SaveLetterInput;

type SaveLetterOutPut = ILetter.Infrastructure.SaveLetterOutPut;

export const saveLetter = async (
  input: SaveLetterInput,
  repositories: {
    letterOptionsRepository: ILetter.LetterOptionsRepository;
    letterRepository: ILetter.LetterRepository;
  }
): Promise<SaveLetterOutPut | { error: string }> => {
  let letterOptionId: number;
  try {
    const { letter, options } = input;

    const { letterOptionsRepository, letterRepository } = repositories;

    const letterOptions = await letterOptionsRepository.create(options);

    letterOptionId = letterOptions.id;

    const createdLetter = await letterRepository.create({
      ...letter,
      letterOptionId,
    });

    return { letterOptions, createdLetter };
  } catch (error) {
    if (letterOptionId) {
      await repositories.letterOptionsRepository.deletedById(letterOptionId);
    }

    return error;
  }
};
