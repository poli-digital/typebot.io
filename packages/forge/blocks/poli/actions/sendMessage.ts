import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import ky, { HTTPError } from 'ky'
import { baseUrl } from '../contants'
import { Page } from '../types/api-request'
import { AccountChannelDTO } from '../types/account-channel-dto'
import { MessageDTO } from '../types/message-dto'

export const sendMessage = createAction({
  name: 'Send Message',
  auth: auth,
  options: option.object({
    account: option.string.layout({
      label: 'Account UUID',
      isRequired: true,
      helperText: 'The account owner',
    }),
    contact: option.string.layout({
      label: 'Contact UUID',
      isRequired: true,
      helperText: 'The contact that will receive the message',
    }),
    provider: option
      .enum([
        'WHATSAPP',
        'FACEBOOK',
        'EMAIL',
        'WEBCHAT',
        'INSTAGRAM',
        'INTERNAL',
        'ANNOTATION',
      ])
      .layout({
        label: 'Account Channel provider',
        defaultValue: 'WHATSAPP',
      }),
    accountChannel: option.string.layout({
      label: 'Account Channel',
      isRequired: false,
      helperText: 'The Account Channel of the organization.',
    }),
    type: option
      .enum([
        'TEMPLATE',
        'TEXT',
        // 'MEDIA'
      ])
      .layout({
        label: 'Account Channel provider',
        defaultValue: 'TEXT',
      }),
    message: option.string.layout({
      label: 'Message',
      isRequired: true,
      helperText: 'The message that will be sent to the contact',
    }),
  }),
  run: {
    server: async ({ credentials, options, variables, logs }) => {
      if (!options.message) logs.add('Message is missing.')

      try {
        const response = await ky
          .post(`${baseUrl}/v3/contacts/${options.contact}/messages`, {
            headers: {
              Authorization: 'Token ' + credentials.apiKey,
            },
            json: {
              provider: options.provider,
              account_channel_uuid: options.accountChannel,
              type: options.type,
              version: 'v3',
              direction: 'OUT',
              components: {
                body: {
                  text: options.message,
                },
              },
            },
          })
          .json<MessageDTO>()

        if (!response) return logs.add('Request failed')
      } catch (err) {
        if (err instanceof HTTPError) {
          return logs.add({
            status: 'error',
            description: err.message,
            details: await err.response.text(),
          })
        }
      }
    },
  },
})
