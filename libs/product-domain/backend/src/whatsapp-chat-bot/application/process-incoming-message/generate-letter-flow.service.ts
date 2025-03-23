// # Libs
import { Application } from '../../../shared';

// # Modules
import { WhatsApp, GenerateLetterFlow, Shared } from './constants';
import type {
  GenerateLetterFlowRepository,
  GenerateLetterService,
  LetterOptions,
  Step5WhatsInteractiveMessage,
  WhatsAppMessage,
  WhatsAppMessageService,
  WhatsAppTextMessage,
} from './interface';

// # Types

// # Constants
const { WHATSAPP_GENERATE_BUTTON, WHATSAPP_TONE_LIST } = WhatsApp;

const {
  WHATSAPP_MESSAGE_PATTERN,
  WHATSAPP_TEXT_MESSAGE_PATTERN,
  WHATSAPP_INTERACTIVE_REPLY_PATTERN,
} = GenerateLetterFlow;

const {
  LetterGenerationFlowSteps: {
    STEP1_START,
    STEP2_IS_FOR,
    STEP3_OCCASION,
    STEP4_RELATIONSHIP,
    STEP5_TONE,
  },
  GenerateLetterFlowStepsMessages: {
    STEP1_START_MESSAGE,
    STEP2_IS_FOR_MESSAGE,
    STEP3_OCCASION_MESSAGE,
    STEP5_TONE_MESSAGE,
    LETTER_GENERATION_FAIL,
    LETTER_GENERATION_SUCCESS,
  },
} = GenerateLetterFlow;

const { BAD_OPTION_RESPONSE } = Shared.CommonMessages;

// # Functions
const getDefaultFallback =
  (messageService: WhatsAppMessageService) =>
  async (input: WhatsAppMessage): Promise<void> => {
    await messageService.sendRetryMessage(input);
  };

const getLetterGenerationSteps = (
  messageService: WhatsAppMessageService,
  generateLetterService: GenerateLetterService
) => {
  return {
    STEP1: {
      pattern: WHATSAPP_MESSAGE_PATTERN,
      onValid: async (message: WhatsAppMessage) =>
        await messageService.sendTextMessage(message, STEP1_START_MESSAGE),
    },
    STEP2: {
      pattern: WHATSAPP_TEXT_MESSAGE_PATTERN,
      updateFlowData: {
        applyInputTransformation: (message: WhatsAppTextMessage) => ({ isFor: message.text.body }),
      },
      onValid: async (message: WhatsAppMessage) =>
        await messageService.sendTextMessage(message, STEP2_IS_FOR_MESSAGE),
    },

    STEP3: {
      pattern: WHATSAPP_TEXT_MESSAGE_PATTERN,
      updateFlowData: {
        applyInputTransformation: (message: WhatsAppTextMessage) => ({
          occasion: message.text.body,
        }),
      },
      onValid: async (message: WhatsAppMessage) =>
        await messageService.sendTextMessage(message, STEP3_OCCASION_MESSAGE),
    },
    STEP4: {
      pattern: WHATSAPP_TEXT_MESSAGE_PATTERN,
      updateFlowData: {
        applyInputTransformation: (message: WhatsAppTextMessage) => ({
          relationship: message.text.body,
        }),
      },
      onValid: async (message: WhatsAppMessage) =>
        await messageService.sendInteractiveMessage(message, WHATSAPP_TONE_LIST),
    },
    STEP5: {
      pattern: WHATSAPP_INTERACTIVE_REPLY_PATTERN,
      isFinal: {
        whenGetsHere: true,
      },
      updateFlowData: {
        applyInputTransformation: (message: Step5WhatsInteractiveMessage) => ({
          tone: message.interactive.list_reply.id,
        }),
      },
      onValid: async (
        message: WhatsAppMessage,
        createLetterOptionsDto: LetterOptions
      ): Promise<boolean> => {
        await messageService.sendTextMessage(message, STEP5_TONE_MESSAGE);

        try {
          if (!createLetterOptionsDto) {
            await messageService.sendTextMessage(message, BAD_OPTION_RESPONSE);
            return false;
          }

          const res = await generateLetterService(createLetterOptionsDto);

          const { content, title } = res?.data?.letter ?? {};

          if (!content || !title) {
            throw new Error('Error during the letter generation');
          }

          await messageService.sendTextMessage(message, `${title}\n\n${content}`);
          await messageService.sendTextMessage(message, LETTER_GENERATION_SUCCESS);
          await messageService.sendInteractiveMessage(message, WHATSAPP_GENERATE_BUTTON);
        } catch (error) {
          console.error(`Failed to generate letter: ${error.message || error}`);
          await messageService.sendTextMessage(message, LETTER_GENERATION_FAIL);
        }
      },
    },
  };
};

export const generateLetterFlowManager = (
  flowRepository: GenerateLetterFlowRepository,
  messageService: WhatsAppMessageService,
  generateLetterService: GenerateLetterService
) => {
  const { STEP1, STEP2, STEP3, STEP4, STEP5 } = getLetterGenerationSteps(
    messageService,
    generateLetterService
  );

  return Application.Flow.createFlowFactory<WhatsAppMessage, LetterOptions>(flowRepository)
    .setDefaultFallback(getDefaultFallback(messageService))
    .addStep(STEP1_START, STEP1)
    .addStep(STEP2_IS_FOR, STEP2)
    .addStep(STEP3_OCCASION, STEP3)
    .addStep(STEP4_RELATIONSHIP, STEP4)
    .addStep(STEP5_TONE, { ...STEP5, debug: true })
    .getManager();
};
