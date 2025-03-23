// # Libs
import { Injectable, Logger } from '@nestjs/common';

import { ILetter, IWhatsAppChatBot } from '@llove/models';
import { Shared, WhatsAppChatBot } from '@llove/product-domain/backend';

// # Modules
import { WHATSAPP_API_ENVS } from '../../../config/zod.env-config';
import { DataAccess } from '../../../dependency-injection';
import { WhatsAppMessageService } from './whatsapp-message.service';

// # Types
type LetterTone = ILetter.LetterTone;
type WhatsAppMessage = IWhatsAppChatBot.Services.WhatsApp.WhatsAppMessage<LetterTone>;
type FlowID = Shared.Application.Flow.Interface.FlowID;
type GenerateLetterFlowManager =
  Shared.Application.Flow.Interface.FactoredFlowManager<WhatsAppMessage>;

// # Constants
const { LETTER_API_URL } = WHATSAPP_API_ENVS;

const { generateLetterFlowManager } =
  WhatsAppChatBot.Application.ProcessIncomingMessageService.GenerateLetterFlowService;

// # Main

@Injectable()
export class WhatsApp_LetterGenerationFlow_Service implements GenerateLetterFlowManager {
  private readonly flowManager: GenerateLetterFlowManager;
  private readonly logger = new Logger(WhatsAppMessageService.name);

  constructor(
    messageService: WhatsAppMessageService,
    flowRepository: DataAccess.LetterGenerationFlowRepository
  ) {
    this.flowManager = generateLetterFlowManager(
      flowRepository,
      messageService,
      async createLetterOptionsDto => {
        return (
          await messageService.whatsAppService.httpService.axiosRef.post(
            `${LETTER_API_URL}/letter/generate`,
            createLetterOptionsDto
          )
        ).data;
      }
    );
  }

  async add(flowID: FlowID): Promise<boolean> {
    return await this.flowManager.add(flowID);
  }

  async flow(flowID: FlowID, input: WhatsAppMessage): Promise<boolean> {
    return await this.flowManager.flow(flowID, input);
  }
}
