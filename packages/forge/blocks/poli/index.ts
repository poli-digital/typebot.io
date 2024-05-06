import { createBlock } from '@typebot.io/forge'
import { PoliLogo } from './logo'
import { auth } from './auth'
import { sendMessage } from './actions/sendMessage'

export const poliBlock = createBlock({
  id: 'poli',
  name: 'Poli',
  tags: [],
  LightLogo: PoliLogo,
  DarkLogo: PoliLogo,
  auth,
  actions: [sendMessage],
})
