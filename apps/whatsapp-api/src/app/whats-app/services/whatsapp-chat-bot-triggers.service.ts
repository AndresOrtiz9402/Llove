// # Libs
import { Injectable } from '@nestjs/common';

import { WhatsAppChatBot } from '@llove/product-domain/backend';

// # Modules
import { WhatsApp_LetterGenerationFlow_Service } from './whatsapp-letter-generation-flow-manager.service';
import { WhatsAppMessageService } from './whatsapp-message.service';

// # Types
type WhatsAppChatBotTriggerInput =
  WhatsAppChatBot.Application.ProcessIncomingMessageService.Interfaces.WhatsAppChatBotTriggerInput;

// # Functions
const { getWhatsAppChatBotTriggers, WhatsAppChatBotTrigger } =
  WhatsAppChatBot.Application.ProcessIncomingMessageService.ChatBotTriggersService;

@Injectable()
export class WhatsAppChatBotTriggersService
  implements
    WhatsAppChatBot.Application.ProcessIncomingMessageService.Interfaces
      .WhatsAppChatBotTriggersService
{
  constructor(
    private readonly messageService: WhatsAppMessageService,
    private readonly letterGenerationFlowManager: WhatsApp_LetterGenerationFlow_Service
  ) {}

  readonly triggers = getWhatsAppChatBotTriggers(
    this.messageService,
    this.letterGenerationFlowManager
  ).TRIGGERS;

  async trigger(input: WhatsAppChatBotTriggerInput): Promise<boolean> {
    return await WhatsAppChatBotTrigger(
      this,
      this.messageService,
      this.letterGenerationFlowManager
    )(input);
  }
}
