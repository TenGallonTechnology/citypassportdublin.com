import { computed } from 'vue'

export const useCategoryIcon = (category: string) => {
  return computed(() => {
    const icons: Record<string, string> = {
      wellness: 'i-lucide-heart-pulse',
      stay: 'i-lucide-hotel',
      shop: 'i-lucide-shopping-bag',
      services: 'i-lucide-wrench',
      experience: 'i-lucide-compass',
      eat: 'i-lucide-utensils'
    }
    return icons[category.toLowerCase()] || 'i-lucide-store'
  })
}
