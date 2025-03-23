// # Enums
export enum MessageTypes {
  TEXT = 'text',
  IMAGE = 'image',
  DOCUMENT = 'document',
  AUDIO = 'audio',
  VIDEO = 'video',
  STICKER = 'sticker',
  LOCATION = 'location',
  CONTACTS = 'contacts',
  INTERACTIVE = 'interactive',
  TEMPLATE = 'template',
  REACTION = 'reaction',
  BUTTON = 'button',
  UNKNOWN = 'unknown',
}

export enum InteractionTypes {
  BUTTON = 'button',
  LIST = 'list',
  LIST_REPLY = 'list_reply',
  BUTTON_REPLY = 'button_reply',
}

// # Types
export type To = string;

export interface Contact {
  /** ID of the contact */
  profile: { name: string };
  /** Contact number */
  wa_id: number;
}

// ## WhatsApp Messages Types
export type MessageType = (typeof MessageTypes)[keyof typeof MessageTypes];

export interface BaseMessage {
  /** Context of message, useful to answer the actual message. */
  context?: {
    /** ID of the message */
    message_id: string;
  };
  /** Sender's number. */
  from?: To;
  /** message id */
  id?: string;
  /** Recipient's number */
  to?: To;
  /** message type */
  type?: MessageType;
}

// ## WhatsApp Interactive Types

export type InteractionType = (typeof InteractionTypes)[keyof typeof InteractionTypes];

export interface InteractiveBaseOptions {
  type: InteractionType;
  body: {
    text: string;
  };
}

export interface InteractiveReply<ReplyId> {
  id: ReplyId;
  title: string;
}

export interface InteractiveButtonReply<ReplyId> {
  type: 'reply';
  reply: InteractiveReply<ReplyId>;
}

interface ButtonAction<ReplyId = unknown> {
  buttons: InteractiveButtonReply<ReplyId>[];
}

interface ListAction {
  button: string;
  sections: {
    title: string;
    rows: {
      id: string;
      title: string;
      description?: string;
    }[];
  }[];
}

export interface InteractiveListOptions<ReplyId> extends InteractiveBaseOptions {
  action: ListAction;
  footer?: {
    text: string;
  };
  header?: {
    type: 'text';
    text: string;
  };
  list_reply?: InteractiveReply<ReplyId>;
}

export interface InteractiveButtonOptions<ReplyId> extends InteractiveBaseOptions {
  action: ButtonAction;
  button_reply?: InteractiveReply<ReplyId>;
}

export type InteractiveOptions<ReplyId> =
  | InteractiveListOptions<ReplyId>
  | InteractiveButtonOptions<ReplyId>;

export interface InteractiveMessage<ReplyId> extends BaseMessage {
  recipient_type: 'individual';
  type: MessageTypes.INTERACTIVE;
  interactive: InteractiveOptions<ReplyId>;
}

export interface InteractiveListMessage<ReplyId> extends InteractiveMessage<ReplyId> {
  interactive: InteractiveListOptions<ReplyId>;
}

export interface InteractiveButtonMessage<ReplyId> extends InteractiveMessage<ReplyId> {
  interactive: InteractiveButtonOptions<ReplyId>;
}

export interface StatusMessage extends BaseMessage {
  /** message status, in this case, 'read' */
  status: 'read';
  /** ID of the massage marked as readd */
  message_id: string;
}

export interface TextMessage extends BaseMessage {
  /** content of the message */
  text: { body: string };
  type?: MessageTypes.TEXT;
}

export type WhatsAppMessage<ReplyId = unknown> =
  | TextMessage
  | StatusMessage
  | InteractiveMessage<ReplyId>;

export interface WhatsAppService {
  sendWhatsAppMessage(message: WhatsAppMessage): Promise<boolean>;
}

export interface WhatsAppMessageService {
  markIncomingMessageAsRead(message: WhatsAppMessage): Promise<boolean>;
  sendInteractiveMessage<ReplyId>(
    message: WhatsAppMessage,
    interactive: InteractiveOptions<ReplyId>
  ): Promise<boolean>;
  sendTextMessage(message: WhatsAppMessage, body: string): Promise<boolean>;
  sendRetryMessage(message: WhatsAppMessage): Promise<boolean>;
  sendWelcomeMessage(message: WhatsAppMessage, contact: Contact): Promise<boolean>;
  sendWelcomeMenu(message: WhatsAppMessage): Promise<boolean>;
}

export interface WhatsAppChatBotService {
  processIncomingMessage(message: WhatsAppMessage, contact: Contact): Promise<boolean>;
}
