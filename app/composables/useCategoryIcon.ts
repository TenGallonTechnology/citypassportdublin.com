import { computed } from 'vue'

export const useCategoryIcon = (category: string) => {
  return computed(() => {
    const icons: Record<string, string> = {
      wellness: 'i-mdi-image-filter-vintage',
      stay: 'i-mdi-home-circle',
      shop: 'i-mdi-shopping',
      services: 'i-mdi-hand-extended',
      experience: 'i-mdi-star',
      eat: 'i-mdi-silverware-fork-knife'
    }
    return icons[category.toLowerCase()] || 'i-mdi-store'
  })
}
