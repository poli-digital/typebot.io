export type Organization = {
  id: string
  accountId: string
  name: string
  legalName: string
  email: string
  cnpj: string
}

export type PageResponse<T> = {
  data: T[]
  meta: {
    totalCount?: number
  }
  links: {
    self?: string
  }
}
