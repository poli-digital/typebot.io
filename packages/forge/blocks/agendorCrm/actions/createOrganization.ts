import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import ky, { HTTPError } from 'ky'
import { baseUrl } from '../contants'
import { Organization, SimpleResponse } from '../type'

export const createOrganization = createAction({
  name: 'Create organization',
  auth: auth,
  options: option.object({
    name: option.string.layout({
      label: 'Name',
      isRequired: true,
      helperText: 'The name of the organization.',
    }),
    cnpj: option.string.layout({
      label: 'CNPJ',
      isRequired: false,
      helperText: 'The CNPJ of the organization.',
    }),
    saveOrganizationVariableId: option.string.layout({
      label: 'Save organization ID in variable',
      placeholder: 'Select a variable',
      inputType: 'variableDropdown',
    }),
  }),
  run: {
    server: async ({ credentials, options, variables, logs }) => {
      if (!options.name) logs.add('Name is missing.')

      try {
        const response = await ky
          .post(baseUrl + '/v3/organizations', {
            headers: {
              Authorization: 'Token ' + credentials.apiKey,
            },
            json: {
              name: options.name,
              cnpj: options.cnpj,
            },
          })
          .json<SimpleResponse<Organization>>()

        if (!response) return logs.add('Request failed')

        if (!options.saveOrganizationVariableId)
          return logs.add('OrganizationId variable is missing')

        variables.set(options.saveOrganizationVariableId, response.data.id)
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
