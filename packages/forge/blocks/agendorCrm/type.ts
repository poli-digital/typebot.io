export type SimpleResponse<T> = {
  data: T
  meta: {
    totalCount?: number
  }
  links: {
    self?: string
  }
}

export type PaginationResponse<T> = {
  data: T[]
  meta: {
    totalCount?: number
  }
  links: {
    self?: string
  }
}

export type Organization = {
  id: string
  accountId: string
  name: string
  legalName: string
  email: string
  cnpj: string
}

export type Category = {
  id: number
  name: string
}

export type User = {
  id: string
  name: string
  contact: {
    email: string
  }
}

export type Funnel = {
  id: string
  name: string
  dealStages?: DealStage[]
}

export type DealStage = {
  id: number
  name: string
  sequence: number
  funnel?: Funnel
}

export type Deal = {
  id: number
  title: string
  description: string
  dealStatusText?: string
  dealStatus?: {
    id: number
    name: string
  }
  dealStage: DealStage
}

export type Task = {
  id: number
  text: string
  dueDate: string
  assignedUsers: User[]
  deal?: {
    id: number
    title: string
  }
}
