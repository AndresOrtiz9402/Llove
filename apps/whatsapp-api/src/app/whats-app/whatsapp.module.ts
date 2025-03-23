// # Libs
import { Module } from '@nestjs/common';

// # Modules
import { DataAccess } from '../../dependency-injection';
import { WhatsAppController } from './whatsapp.controller';
import {
  WhatsAppChatBotTriggersService,
  WhatsApp_LetterGenerationFlow_Service,
  WhatsAppMessageService,
  WhatsAppService,
} from './services';
import { WhatsAppChatBotService } from './whatsapp-chat-bot.service';

const { LetterGenerationFlowRepository } = DataAccess;

@Module({
  imports: [],
  controllers: [WhatsAppController],
  providers: [
    WhatsAppChatBotService,
    WhatsAppChatBotTriggersService,
    LetterGenerationFlowRepository,
    WhatsApp_LetterGenerationFlow_Service,
    WhatsAppMessageService,
    WhatsAppService,
  ],
})
export class WhatsAppModule {}
