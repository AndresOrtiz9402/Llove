import { Injectable } from '@nestjs/common';

// # Libs
import { Shared } from '@llove/backend';
import type { IWhatsAppChatBot } from '@llove/models';

// # Modules
import { WhatsAppChatBotTriggersService } from './services/whatsapp-chat-bot-triggers.service';

// # Types
type WhatsAppContact = IWhatsAppChatBot.Services.WhatsApp.Contact;
type WhatsAppMessage = IWhatsAppChatBot.Services.WhatsApp.WhatsAppMessage;

// # Functions
const { HandleService } = Shared.Decorators.ServiceHandle;

@Injectable()
export class WhatsAppChatBotService
  implements IWhatsAppChatBot.Services.WhatsApp.WhatsAppChatBotService
{
  constructor(private readonly chatBotTriggersManager: WhatsAppChatBotTriggersService) {}

  // ## Main Properties
  /**
   * Process the incoming message.
   */
  @HandleService()
  async processIncomingMessage(message: WhatsAppMessage, contact: WhatsAppContact) {
    const type = message?.type;

    if (!type) return;

    return await this.chatBotTriggersManager.trigger({ message, contact });
  }
}
