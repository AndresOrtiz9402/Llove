// # Libs
import { P } from 'ts-pattern';

// # Modules
import { Application } from '../../../shared';
import { isGreeting } from './functions';
import type {
  GenerateLetterFlowService,
  WhatsAppChatBotTriggerInput,
  WhatsAppChatBotTriggers,
  WhatsAppChatBotTriggersService,
  WhatsAppMessageService,
  WhatsAppTextMessage,
} from './interface';

import { GenerateLetterFlow, Shared, WhatsApp } from './constants';

// # Constants

const { TEXT, INTERACTIVE } = WhatsApp.MessageTypes;

const { INTERACTED_BUTTON_RESPONSE } = GenerateLetterFlow.GenerateLetterFlowStepsMessages;

const { BAD_OPTION_RESPONSE } = Shared.CommonMessages;

const { ID } = Shared.GenerateLetterButton;

// # Functions
const { trigger } = Application.Trigger;

// # Main
export const getWhatsAppChatBotTriggers = (
  messageService: WhatsAppMessageService,
  letterGenerationFlowManager: GenerateLetterFlowService
) => {
  return {
    TRIGGERS: [
      {
        pattern: { message: { type: TEXT }, contact: P.any },
        action: async ({ message, contact }) => {
          if (isGreeting(message as WhatsAppTextMessage)) {
            await messageService.sendWelcomeMessage(message, contact);

            await messageService.sendWelcomeMenu(message);

            return true;
          }
          return false;
        },
      },
      {
        pattern: {
          message: {
            type: INTERACTIVE,
            interactive: { button_reply: { id: ID } },
          },
          contact: P.any,
        },
        action: async ({ message }) => {
          const flowId = message.from;

          // Adds a user to the letter generation flow.
          const isAdded = await letterGenerationFlowManager.add(flowId);

          console.log(isAdded);

          await messageService.sendTextMessage(message, INTERACTED_BUTTON_RESPONSE);

          // Moves to the first step of the letter generation flow.
          await letterGenerationFlowManager.flow(flowId, message);

          return true;
        },
      },
    ] as WhatsAppChatBotTriggers,
  };
};

export const WhatsAppChatBotTrigger =
  (
    triggerManager: WhatsAppChatBotTriggersService,
    messageService: WhatsAppMessageService,
    letterGenerationFlowManager: GenerateLetterFlowService
  ) =>
  async (input: WhatsAppChatBotTriggerInput): Promise<boolean> => {
    const message = input.message;

    const wasMarked = await messageService.markIncomingMessageAsRead(message);

    if (!wasMarked) {
      console.error('Failed to mark message as read');

      return false;
    }

    const isFlow = await letterGenerationFlowManager.flow(message.from, message);

    if (!isFlow) {
      const triggered = await trigger(triggerManager, input);

      if (!triggered) {
        console.warn(`Unhandled message:\n${message.type}\n${message.id}`);

        await messageService.sendTextMessage(message, BAD_OPTION_RESPONSE);
      }
    }

    return true;
  };
