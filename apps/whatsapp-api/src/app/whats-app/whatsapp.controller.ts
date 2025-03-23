import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

//modules
import { WHATSAPP_API_ENVS } from '../../config/zod.env-config';
import { WhatsAppChatBotService } from './whatsapp-chat-bot.service';

//Constants
const { WA_WEBHOOK_VERIFY_TOKEN } = WHATSAPP_API_ENVS;

// TODO: validate the body.
// TODO: remove the use of @Req() and @Res() decorators.
@Controller()
export class WhatsAppController {
  constructor(private readonly chatService: WhatsAppChatBotService) {}

  // Root endpoints

  @Get()
  getTest(@Res() res: Response) {
    res.status(200).send(`<pre>Nothing to see here.
    Checkout README.md to start.</pre>`);
  }
  //

  /**
   * accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
   * info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
   */
  @Get('/webhook')
  verifyWebhook(@Req() req: Request, @Res() res: Response) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // check the mode and token sent are correct
    if (mode === 'subscribe' && token === WA_WEBHOOK_VERIFY_TOKEN) {
      // respond with 200 OK and challenge token from the request
      res.status(200).send(challenge);

      console.log('Webhook verified successfully!');
    } else {
      // respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }

  /**
   * Handle the incoming messages from WhatsApp and respond accordingly.
   *
   * @see  details on WhatsApp text message payload https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
   */
  @Post('/webhook')
  async handleIncomingMessage(@Body() body: any, @Res() res: Response) {
    const { messages = [], contacts = [] } = body.entry?.[0]?.changes[0]?.value || {};

    await this.chatService.processIncomingMessage(messages[0], contacts[0]);

    res.sendStatus(200);
  }
}
