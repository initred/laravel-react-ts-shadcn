import { Config } from 'ziggy-js'
import { User } from '@/types/model'

export type Lang = Record<string, string>

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User
  }
  ziggy: Config & { location: string }
  common_lang: Lang
}
