import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

// # Libs
import { IWhatsAppChatBot } from '@llove/models';

// # Modules
import { WHATSAPP_API_ENVS } from '../../../config/zod.env-config';

// # Types
type WhatsAppMessage<ReplyId> = IWhatsAppChatBot.Services.WhatsApp.WhatsAppMessage<ReplyId>;

// # Constants
const { WA_API_VERSION, WA_BUSINESS_PHONE, WA_API_TOKEN } = WHATSAPP_API_ENVS;

const BASE_URL = `https://graph.facebook.com/${WA_API_VERSION}/${WA_BUSINESS_PHONE}/messages`;

// # Main
@Injectable()
export class WhatsAppService implements IWhatsAppChatBot.Services.WhatsApp.WhatsAppService {
  constructor(readonly httpService: HttpService) {}

  /**
   * Sends a Whatsapp message.
   *
   * @See https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
   *
   * @returns Returns an Axios Response.
   */
  async sendWhatsAppMessage<ReplyId>(message: WhatsAppMessage<ReplyId>) {
    /* return await this.httpService.axiosRef.post(
      BASE_URL,
      {
        ...message,
        messaging_product: 'whatsapp',
      },
      {
        headers: {
          Authorization: `Bearer ${WA_API_TOKEN}`,
        },
      }
    ); */

    console.log('response message: ', message);

    return true;
  }
}
