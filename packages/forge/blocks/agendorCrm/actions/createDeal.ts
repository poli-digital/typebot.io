import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import ky, { HTTPError } from 'ky'
import { baseUrl } from '../contants'
import {
  PaginationResponse,
  Deal,
  User,
  DealStage,
  Funnel,
  SimpleResponse,
} from '../type'

export const createDeal = createAction({
  name: 'Create deal',
  auth: auth,
  options: option.object({
    organizationId: option.string.layout({
      label: 'Organization ID',
      isRequired: false,
      helperText: 'The ID of the organization to which the deal belongs.',
    }),
    title: option.string.layout({
      label: 'Title',
      isRequired: true,
      helperText: 'The title of the deal.',
    }),
    description: option.string.layout({
      label: 'Description',
      isRequired: false,
      helperText: 'The description of the deal.',
    }),
    funnel: option.string.layout({
      label: 'Funnel',
      placeholder: 'Funnel name',
      fetcher: 'fetchFunnels',
    }),
    saveDealVariableId: option.string.layout({
      label: 'Save deal ID in variable',
      placeholder: 'Select a variable',
      inputType: 'variableDropdown',
    }),
  }),
  fetchers: [
    {
      id: 'fetchFunnels',
      fetch: async ({ credentials }) => {
        const response = await ky
          .get(baseUrl + '/v3/funnels', {
            headers: {
              Authorization: 'Token ' + credentials.apiKey,
            },
          })
          .json<PaginationResponse<Funnel>>()

        return response.data.map((deal) => ({
          value: `${deal.id}`, //string parsing
          label: deal.name,
        }))
      },
      dependencies: [],
    },
  ],
  run: {
    server: async ({ credentials, options, variables, logs }) => {
      if (!options.organizationId) logs.add('Organization ID is missing.')
      if (!options.title) logs.add('Name is missing.')

      logs.add(
        JSON.stringify({
          title: options.title,
          dealStatusText: 'ongoing',
          description: options.description,
          funnel: options.funnel,
        })
      )
      try {
        const response = await ky
          .post(`${baseUrl}/v3/organizations/${options.organizationId}/deals`, {
            headers: {
              Authorization: 'Token ' + credentials.apiKey,
            },
            json: {
              title: options.title,
              dealStatusText: 'ongoing',
              description: options.description,
              funnel: options.funnel,
            },
          })
          .json<SimpleResponse<Deal>>()

        if (!options.saveDealVariableId)
          return logs.add('OrganizationId variable is missing')

        variables.set(options.saveDealVariableId, response.data.id)
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
