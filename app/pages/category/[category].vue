<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <!-- Hero Card -->
    <div class="relative rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 bg-gray-950/60">
      <div
        class="h-40 sm:h-52 w-full bg-center bg-cover"
        :style="{ backgroundImage: `url(${heroImage})` }"
      />
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-3 text-white"
          :class="`bg-${category}/60`"
        >
          <UIcon
            :name="categoryIcon"
            class="h-9 w-9"
          />
          <h1 class="text-3xl font-bold capitalize tracking-wide">
            {{ categoryLabel }}
          </h1>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <UIcon
        name="i-mdi-decagram"
        class="text-yellow-500 dark:text-yellow-400 h-5 w-5"
      />
      <span> = Please ask us to stamp your passport</span>
    </div>

    <p
      v-if="categoryDescription"
      class="text-sm text-muted-foreground/90 leading-relaxed"
    >
      {{ categoryDescription }}
    </p>

    <div
      v-if="filtered.length === 0"
      class="text-center py-10"
    >
      No businesses found in this category.
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="business in filtered"
        :key="business.slug"
        class="p-4 rounded-lg shadow hover:shadow-lg bg-paper"
      >
        <div class="flex items-center gap-3 mb-2 ">
          <div
            class="w-18 h-18 rounded-lg overflow-hidden   flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-xs"
          >
            <NuxtImg
              v-if="business.logo"
              :src="business.logo"
              :alt="`${business.name} logo`"
              class="w-full h-full object-contain "
              placeholder
              draggable="false"
            />
            <UIcon
              v-else
              name="i-mdi-image-off"
              class="h-10 w-10 text-gray-400"
            />
          </div>
          <div>
            <h2 class="text-lg font-semibold flex items-center gap-2">
              {{ business.name }}
              <UTooltip
                v-if="business.stampAvailable"
                :delay-duration="200"
                text="Please ask us to stamp your passport"
              >
                <UIcon
                  name="i-mdi-decagram"
                  class="text-yellow-500 dark:text-yellow-400 h-5 w-5"
                />
              </UTooltip>
            </h2>
          </div>
        </div>

        <UButton
          variant="ghost"
          :to="`/business/${business.slug}`"
          :color="categoryColor"
          class="font-handwritten text-2xl p-1 "
        >
          Connect With Us
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Business } from '~/app.vue'
import businesses from '~/data/businesses.json'
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import { useCategoryColor } from '~/composables/useCategoryColor'

const route = useRoute()
let category = route.params.category as string

// Get valid categories from the data
const validCategories = Array.from(
  new Set((businesses as unknown as Array<Business>).map(b => b.category))
)

// Check if the category is valid
if (!validCategories.includes(category as Business['category'])) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category not found'
  })
}

// Now safely narrow the type
category = category as Business['category']

const filtered = (businesses as unknown as Array<Business>).filter(
  b => b.category === category
)
const categoryIcon = useCategoryIcon(category)
const categoryColor = useCategoryColor(category as Business['category'])
const categoryLabel = useCategoryLabel(category)

// Lightweight description copy (can be expanded later or moved to data file if needed)
const categoryDescriptions: Record<string, string> = {
  eat: 'Local eats, sips, and sweet spots to taste your way through Dublin.',
  shop: 'Browse boutiques, gifts, and local staples—supporting hometown merchants.',
  stay: 'Rest easy with trusted stays—hotels, inns, and local hospitality.',
  experience: 'Explore venues, culture, events, and places that make Dublin memorable.',
  services: 'Professional and everyday services powered by local expertise.',
  wellness: 'Health, fitness, and wellness partners to help you feel your best.'
}
const categoryDescription = computed(() => categoryDescriptions[category] || '')

// Derive background image path: expecting /public/images/<category>.png (already served as /images/<category>.png)
// Fallback to stamps texture if not present. Since we cannot statically check existence at runtime in static site,
// we still output style; missing file will 404 in network. Optionally allow mapping override if extension differs.
// Hero image path
const heroImage = computed(() => `/images/${category}.png`)

// Canonical URL + SEO for category pages
const requestURL = useRequestURL()
const origin = computed(() => requestURL.origin)
const canonicalUrl = computed(() => `${origin.value}/category/${category}`)

useSeoMeta({
  title: () => `${categoryLabel} Businesses`,
  description: () => `Discover ${categoryLabel} businesses in Dublin, GA and get your passport stamped.`,
  ogTitle: () => `${categoryLabel} Businesses`,
  ogDescription: () => `Discover ${categoryLabel} businesses in Dublin, GA and get your passport stamped.`,
  ogImage: () => heroImage.value || '/favicon.ico',
  twitterImage: () => heroImage.value || '/favicon.ico',
  twitterCard: 'summary_large_image',
  ogType: 'website',
  ogUrl: () => canonicalUrl.value,
  robots: 'index, follow',
  ogLocale: 'en_US',
  twitterTitle: () => `${categoryLabel} Businesses`,
  twitterDescription: () => `Discover ${categoryLabel} businesses in Dublin, GA and get your passport stamped.`
})

useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl.value }
  ]
})
</script>

<style scoped>
/* No additional styles currently needed; relying on utility classes */
</style>
