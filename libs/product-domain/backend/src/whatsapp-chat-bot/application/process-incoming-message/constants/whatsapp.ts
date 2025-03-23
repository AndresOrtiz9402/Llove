// # Libs
import { IWhatsAppChatBot } from '@llove/models';

// # Modules
import { createEnumRows } from '../functions';
import { GenerateLetterFlowStepsMessages } from './generate-letter-flow';
import type {
  GenerateLetterWhatsAppInteractiveButtonOptions,
  LetterToneWhatsAppInteractiveListOptions,
} from '../interface';
import { letterTone } from './letter';
import { GenerateLetterButton } from './shared';

// # Constants
const { INTERACTIVE_BUTTON_MESSAGE, STEP4_RELATIONSHIP_MESSAGE } = GenerateLetterFlowStepsMessages;

const { BUTTON_TITLE, ID } = GenerateLetterButton;

// # Main
export const { InteractionTypes } = IWhatsAppChatBot.Services.WhatsApp;

export const { MessageTypes } = IWhatsAppChatBot.Services.WhatsApp;

export const WHATSAPP_GENERATE_BUTTON: GenerateLetterWhatsAppInteractiveButtonOptions = {
  action: {
    buttons: [
      {
        type: 'reply',
        reply: {
          id: ID,
          title: BUTTON_TITLE,
        },
      },
    ],
  },
  body: {
    text: INTERACTIVE_BUTTON_MESSAGE,
  },
  type: InteractionTypes.BUTTON,
};

export const WHATSAPP_TONE_LIST: LetterToneWhatsAppInteractiveListOptions = {
  type: InteractionTypes.LIST,
  header: {
    type: 'text',
    text: 'TONO',
  },
  body: {
    text: STEP4_RELATIONSHIP_MESSAGE,
  },
  action: {
    button: 'Lista de Tonos.',
    sections: [
      {
        title: 'TONOS',
        rows: createEnumRows(letterTone),
      },
    ],
  },
};
