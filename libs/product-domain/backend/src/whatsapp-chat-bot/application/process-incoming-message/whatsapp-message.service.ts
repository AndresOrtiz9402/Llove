import {
  WhatsAppContact,
  WhatsAppInteractiveMessage,
  WhatsAppInteractiveMessageOptions,
  WhatsAppMessage,
  WhatsAppService,
  WhatsAppStatusMessage,
  WhatsAppTextMessage,
} from './interface';
import { Shared, WhatsApp } from './constants';
import { getContactName, getFirstName } from './functions';

// # Constants

const { WELCOME_MESSAGE } = Shared.CommonMessages;
const {
  MessageTypes: { INTERACTIVE, TEXT },
  WHATSAPP_GENERATE_BUTTON,
} = WhatsApp;

// # Main
export const markIncomingMessageAsRead = async (
  whatsAppService: WhatsAppService,
  message: WhatsAppMessage
) => {
  const reply: WhatsAppStatusMessage = {
    status: 'read',
    message_id: message.id,
  };

  return await whatsAppService.sendWhatsAppMessage(reply);
};

export const sendInteractiveMessage = async <ReplyId>(
  whatsAppService: WhatsAppService,
  message: WhatsAppMessage,
  interactive: WhatsAppInteractiveMessageOptions<ReplyId>
) => {
  const reply: WhatsAppInteractiveMessage<ReplyId> = {
    to: message.from,
    type: INTERACTIVE,
    recipient_type: 'individual',
    interactive,
  };

  return await whatsAppService.sendWhatsAppMessage(reply);
};

/**
 * Sends a text message via WhatsApp.
 *
 * @see  details on WhatsApp text message payload https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
 */
export const sendTextMessage = async (
  whatsAppService: WhatsAppService,
  message: WhatsAppMessage,
  body: string
) => {
  const reply: WhatsAppTextMessage = {
    to: message.from,
    type: TEXT,
    text: { body },
  };

  return await whatsAppService.sendWhatsAppMessage(reply);
};

export const sendRetryMessage = async (
  whatsAppService: WhatsAppService,
  message: WhatsAppMessage
) => {
  return await sendTextMessage(
    whatsAppService,
    message,
    'Acción inválida. Por favor intenta de nuevo.'
  );
};

export const sendWelcomeMessage = async (
  whatsAppService: WhatsAppService,
  message: WhatsAppMessage,
  contact: WhatsAppContact
) => {
  const contactName = getFirstName(getContactName(contact));

  const welcomeMessage = WELCOME_MESSAGE;

  const body = contactName ? `Hola ${contactName}! ${welcomeMessage}` : `Hola! ${welcomeMessage}`;

  return await sendTextMessage(whatsAppService, message, body);
};

export const sendWelcomeMenu = async (
  whatsAppService: WhatsAppService,
  message: WhatsAppMessage
) => {
  return await sendInteractiveMessage(whatsAppService, message, WHATSAPP_GENERATE_BUTTON);
};
