import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import ky from 'ky'
import { baseUrl } from '../contants'
import { Organization, PaginationResponse } from '../type'

export const createPerson = createAction({
  name: 'Create person',
  auth: auth,
  options: option.object({
    organizationId: option.string.layout({
      label: 'Organization ID',
      isRequired: false,
      helperText: 'The ID of the organization to which the person belongs.',
      // fetcher: 'fetchOrganizations',
      inputType: 'variableDropdown',
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
  // fetchers: [
  //   {
  //     id: 'fetchOrganizations',
  //     fetch: async ({ credentials }) => {
  //       const response = await ky
  //         .get(baseUrl + '/v3/organizations', {
  //           headers: {
  //             Authorization: 'Token ' + credentials.apiKey,
  //           },
  //         })
  //         .json<PaginationResponse<Organization>>()

  //       return response.data.map((organization) => ({
  //         value: `${organization.id}`, //string parsing
  //         label: organization.name,
  //       }))
  //     },
  //     dependencies: [],
  //   },
  // ],
  run: {
    server: async ({ credentials, options, logs }) => {
      if (!options.organizationId) logs.add('Organization ID is missing.')
      if (!options.name) logs.add('Name is missing.')

      const response = await ky.post(baseUrl + '/v3/people', {
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
    },
  },
})
