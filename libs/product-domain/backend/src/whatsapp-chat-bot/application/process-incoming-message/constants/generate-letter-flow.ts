// # Libs
import { P } from 'ts-pattern';

import { IWhatsAppChatBot } from '@llove/models';

// # Constants
export const { GenerateLetterFlowStepsMessages, LetterGenerationFlowSteps } =
  IWhatsAppChatBot.Services.GenerateLetterFlow;

export const WHATSAPP_INTERACTIVE_REPLY_PATTERN = {
  from: P.string,
  interactive: { list_reply: { id: P.string } },
};

export const WHATSAPP_MESSAGE_PATTERN = { from: P.string };

export const WHATSAPP_TEXT_MESSAGE_PATTERN = { from: P.string, text: { body: P.string } };
