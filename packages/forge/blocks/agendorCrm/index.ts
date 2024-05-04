import { createBlock } from '@typebot.io/forge'
import { AgendorCrmLogo } from './logo'
import { auth } from './auth'
import { createPeson } from './actions/createPerson'

export const agendorCrmBlock = createBlock({
  id: 'agendor-crm',
  name: 'Agendor CRM',
  tags: [],
  LightLogo: AgendorCrmLogo,
  auth,
  actions: [createPeson],
})
