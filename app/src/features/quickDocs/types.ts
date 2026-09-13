export interface Doc {
  id: number
  title: string
  url: string
  updatedAt: string
  type: string
}

export interface DocStore {
  docs: Doc[],
  addDoc: (title: string, url: string, type: string) => boolean
}
