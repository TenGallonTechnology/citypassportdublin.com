import { computed } from 'vue'
import type { Business } from '~/app.vue'

export type CategoryColor = Business['category'] | 'neutral'

// Central mapping for category -> color token (Nuxt UI color name)
const colorMap: Record<Business['category'], CategoryColor> = {
  wellness: 'wellness',
  stay: 'stay',
  shop: 'shop',
  services: 'services',
  experience: 'experience',
  eat: 'eat'
}

/**
 * Return a computed color name for the given category. Falls back to 'neutral'.
 */
export function useCategoryColor(category: Business['category'] | undefined | null) {
  return computed<CategoryColor>(() => (category ? colorMap[category] : 'neutral'))
}
