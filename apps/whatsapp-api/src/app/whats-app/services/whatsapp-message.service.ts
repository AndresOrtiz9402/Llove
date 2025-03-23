// # Libs
import { Injectable, Logger } from '@nestjs/common';

import { IWhatsAppChatBot } from '@llove/models';
import { WhatsAppChatBot } from '@llove/product-domain/backend';

// # Modules
import { WhatsAppService } from './whatsapp.service';

// # Types
type WhatsApp_Contact = IWhatsAppChatBot.Services.WhatsApp.Contact;

type InteractiveOptions<ReplyId> = IWhatsAppChatBot.Services.WhatsApp.InteractiveOptions<ReplyId>;

type WhatsAppMessage = IWhatsAppChatBot.Services.WhatsApp.WhatsAppMessage;

// # Functions

const {
  markIncomingMessageAsRead,
  sendInteractiveMessage,
  sendRetryMessage,
  sendTextMessage,
  sendWelcomeMenu,
  sendWelcomeMessage,
} = WhatsAppChatBot.Application.ProcessIncomingMessageService.WhatsAppMessagesService;

@Injectable()
export class WhatsAppMessageService
  implements
    WhatsAppChatBot.Application.ProcessIncomingMessageService.Interfaces.WhatsAppMessageService
{
  private readonly logger = new Logger(WhatsAppMessageService.name);

  constructor(readonly whatsAppService: WhatsAppService) {}

  async markIncomingMessageAsRead(message: WhatsAppMessage) {
    return await markIncomingMessageAsRead(this.whatsAppService, message);
  }

  async sendInteractiveMessage<ReplyId>(
    message: WhatsAppMessage,
    interactive: InteractiveOptions<ReplyId>
  ) {
    return await sendInteractiveMessage(this.whatsAppService, message, interactive);
  }

  /**
   * Sends a text message via WhatsApp.
   *
   * @see  details on WhatsApp text message payload https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
   */
  async sendTextMessage(message: WhatsAppMessage, body: string) {
    return await sendTextMessage(this.whatsAppService, message, body);
  }

  async sendRetryMessage(message: WhatsAppMessage) {
    this.logger.warn(`Retry triggered for invalid message from user ${message.from}.
      Message id: ${message.id}`);

    return await sendRetryMessage(this.whatsAppService, message);
  }

  async sendWelcomeMessage(message: WhatsAppMessage, contact: WhatsApp_Contact) {
    return await sendWelcomeMessage(this.whatsAppService, message, contact);
  }

  async sendWelcomeMenu(message: WhatsAppMessage) {
    return await sendWelcomeMenu(this.whatsAppService, message);
  }
}
