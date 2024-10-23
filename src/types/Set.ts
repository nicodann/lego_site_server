export type Set = {
  number: number, 
  name:string, 
  url:string, 
  category: string,
  image_url: string,
  id: number
}

interface SetNoId extends Omit<Set, 'id'> {}

export type {SetNoId as SetNoIdType}