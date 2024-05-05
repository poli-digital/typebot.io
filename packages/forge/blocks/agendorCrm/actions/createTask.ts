import { createAction, option } from '@typebot.io/forge'
import { auth } from '../auth'
import ky, { HTTPError } from 'ky'
import { baseUrl } from '../contants'
import { PaginationResponse, Task, User } from '../type'

export const createTask = createAction({
  name: 'Create task',
  auth: auth,
  options: option.object({
    organizationId: option.string.layout({
      label: 'Organization ID',
      isRequired: false,
      helperText: 'The ID of the organization to which the task belongs.',
    }),
    dealId: option.string.layout({
      label: 'Deal ID',
      isRequired: false,
      helperText: 'The ID of the deal to which the task belongs.',
    }),
    title: option.string.layout({
      label: 'Title',
      isRequired: true,
      helperText: 'The title of the task.',
    }),
    assigned_users: option
      .array(
        option.string.layout({
          placeholder: 'Type a name...',
          fetcher: 'fetchUsers',
        })
      )
      .layout({
        label: 'Assigned Users',
        itemLabel: 'name',
      }),
    dueDate: option.string.layout({
      label: 'Due date',
      isRequired: true,
      helperText: 'The due date of the task.',
    }),
    type: option
      .enum(['VISITA', 'REUNIAO', 'LIGACAO', 'EMAIL', 'PROPOSTA'])
      .layout({
        label: 'Task type',
        defaultValue: 'REUNIAO',
      }),
  }),
  fetchers: [
    {
      id: 'fetchUsers',
      fetch: async ({ credentials }) => {
        const response = await ky
          .get(baseUrl + '/v3/users', {
            headers: {
              Authorization: 'Token ' + credentials.apiKey,
            },
          })
          .json<PaginationResponse<User>>()

        return response.data.map((user) => ({
          value: `${user.id}`, //string parsing
          label: user.name,
        }))
      },
      dependencies: [],
    },
  ],
  run: {
    server: async ({ credentials, options, logs }) => {
      if (!options.organizationId) logs.add('Organization ID is missing.')
      if (!options.title) logs.add('Name is missing.')

      logs.add(
        JSON.stringify({
          text: options.title,
          assigned_users: options.assigned_users,
          due_date: options.dueDate,
          type: options.type,
        })
      )
      try {
        await ky.post(`${baseUrl}/v3/deals/${options.dealId}/tasks`, {
          headers: {
            Authorization: 'Token ' + credentials.apiKey,
          },
          json: {
            text: options.title,
            assigned_users: options.assigned_users,
            due_date: options.dueDate,
            type: options.type,
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
