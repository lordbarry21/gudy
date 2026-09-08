import type { Topic } from '@/types'
import { matematikaOsnTopics } from './matematika-osn'
import { tkaMatematikaTopics } from './tka-matematika'
import { bahasaIndonesiaTopics } from './bahasa-indonesia'
import { bahasaInggrisTopics } from './bahasa-inggris'
import { serkomLaravelTopics } from './serkom-laravel'

export const CURRICULUM_VERSION = 'v2_target_100'

export function getAllInitialTopics(): Topic[] {
  return [
    ...matematikaOsnTopics,
    ...tkaMatematikaTopics,
    ...bahasaIndonesiaTopics,
    ...bahasaInggrisTopics,
    ...serkomLaravelTopics,
  ]
}

export {
  matematikaOsnTopics,
  tkaMatematikaTopics,
  bahasaIndonesiaTopics,
  bahasaInggrisTopics,
  serkomLaravelTopics,
}
