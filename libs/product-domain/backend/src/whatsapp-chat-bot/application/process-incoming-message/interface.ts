// # Libs
import { IWhatsAppChatBot, ILetter, IShared } from '@llove/models';

// # Modules
import { Application } from '../../../shared';

// # Types

// ## Letter

type LetterGenerationResponse = ILetter.Infrastructure.GenerateLetter.LetterGenerationResponse;

export type LetterGenerationResult =
  IShared.Services.ServiceHandle.Result<LetterGenerationResponse>;

export type LetterOptions = ILetter.Infrastructure.CreateLetterOptionsDto;

type LetterTone = ILetter.LetterTone;

// ## Generate Letter Flow

type GenerateLetterButtonId = IWhatsAppChatBot.Services.Shared.GenerateLetterButton.ID;

// ## WhatsApp Service

export type GenerateLetterWhatsAppInteractiveButtonOptions =
  IWhatsAppChatBot.Services.WhatsApp.InteractiveButtonOptions<GenerateLetterButtonId>;

export type LetterToneWhatsAppInteractiveListOptions =
  IWhatsAppChatBot.Services.WhatsApp.InteractiveListOptions<LetterTone>;

export type WhatsAppContact = IWhatsAppChatBot.Services.WhatsApp.Contact;

export type WhatsAppInteractiveMessage<ReplyId> =
  IWhatsAppChatBot.Services.WhatsApp.InteractiveMessage<ReplyId>;

export type WhatsAppInteractiveMessageOptions<ReplyId> =
  IWhatsAppChatBot.Services.WhatsApp.InteractiveOptions<ReplyId>;

export type WhatsAppMessage = IWhatsAppChatBot.Services.WhatsApp.WhatsAppMessage;

export type WhatsAppMessageService = IWhatsAppChatBot.Services.WhatsApp.WhatsAppMessageService;

export type WhatsAppService = IWhatsAppChatBot.Services.WhatsApp.WhatsAppService;

export type WhatsAppStatusMessage = IWhatsAppChatBot.Services.WhatsApp.StatusMessage;

export type WhatsAppTextMessage = IWhatsAppChatBot.Services.WhatsApp.TextMessage;

// ## Generate Letter Flow Service

export type FlowID = Application.Flow.Interface.FlowID;

export type GenerateLetterFlowService =
  Application.Flow.Interface.FactoredFlowManager<WhatsAppMessage>;

export type GenerateLetterService = (
  createLetterOptionsDto: LetterOptions
) => Promise<LetterGenerationResult>;

export type Step5WhatsInteractiveMessage =
  IWhatsAppChatBot.Services.WhatsApp.InteractiveListMessage<LetterTone>;

export type GenerateLetterFlowRepository = Application.Flow.Interface.FlowRepository<LetterOptions>;

// ## Triggers Service

export type WhatsAppChatBotTriggerInput = { message: WhatsAppMessage; contact: WhatsAppContact };

export type WhatsAppChatBotTriggers = Application.Trigger.Interface.TriggerRecord<
  WhatsAppChatBotTriggerInput,
  boolean
>[];

export type WhatsAppChatBotTriggersService = Application.Trigger.Interface.TriggersManager<
  WhatsAppChatBotTriggerInput,
  boolean
>;
