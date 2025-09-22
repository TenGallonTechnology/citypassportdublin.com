import { computed } from 'vue'
import type { Business } from '~/app.vue'

/**
 * Returns a user-facing label for a category following existing UI logic.
 * wellness -> Local Wellness
 * services -> Local Services
 * other    -> <category> Local (capitalized)
 */
export function useCategoryLabel(category: string | Business['category']) {
  return computed(() => {
    if (!category) return ''
    if (category === 'wellness') return 'Local Wellness'
    if (category === 'services') return 'Local Services'
    // Capitalize first letter for the generic case
    return `${category.charAt(0).toUpperCase() + category.slice(1)} Local`
  })
}
