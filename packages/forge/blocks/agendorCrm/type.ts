export type Organization = {
  id: string
  accountId: string
  name: string
  legalName: string
  email: string
  cnpj: string
}

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
