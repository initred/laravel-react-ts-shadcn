export interface Timestamps {
  created_at: string
  updated_at: string
}

export interface User extends Timestamps {
  id: number
  name: string
  nickname: string
  email: string
  email_verified_at: string
}

export interface Post extends Timestamps {
  id: number
  title: string
  body: string
}
