import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import ky, { HTTPError } from 'ky'
import { baseUrl } from '../contants'

export const createPerson = createAction({
  name: 'Create person',
  auth: auth,
  options: option.object({
    organizationId: option.string.layout({
      label: 'Organization ID',
      isRequired: false,
      helperText: 'The ID of the organization to which the person belongs.',
    }),
    name: option.string.layout({
      label: 'Name',
      isRequired: true,
      helperText: 'The name of the person.',
    }),
    cpf: option.string.layout({
      label: 'CPF',
      isRequired: false,
      helperText: 'The CPF of the person.',
    }),
    email: option.string.layout({
      label: 'Email',
      isRequired: false,
      helperText: 'The email of the person.',
    }),
    mobile: option.string.layout({
      label: 'Phone',
      isRequired: false,
      helperText: 'The phone of the person.',
    }),
  }),
  run: {
    server: async ({ credentials, options, logs }) => {
      if (!options.organizationId) logs.add('Organization ID is missing.')
      if (!options.name) logs.add('Name is missing.')

      try {
        await ky.post(baseUrl + '/v3/people', {
          headers: {
            Authorization: 'Token ' + credentials.apiKey,
          },
          json: {
            organization: options.organizationId,
            name: options.name,
            cpf: options.cpf,
            contact: {
              email: options.email,
              mobile: options.mobile,
            },
          },
        })
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
