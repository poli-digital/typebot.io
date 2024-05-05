import { createBlock } from '@typebot.io/forge'
import { AgendorCrmLogo } from './logo'
import { auth } from './auth'
import { createPerson } from './actions/createPerson'
import { createOrganization } from './actions/createOrganization'

export const agendorCrmBlock = createBlock({
  id: 'agendor-crm',
  name: 'Agendor CRM',
  tags: [],
  LightLogo: AgendorCrmLogo,
  auth,
  actions: [createOrganization, createPerson],
})
