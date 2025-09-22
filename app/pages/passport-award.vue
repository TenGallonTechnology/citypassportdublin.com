<template>
  <div class="p-6 max-w-5xl mx-auto">
    <header class="mb-8">
      <h1 class="text-3xl font-bold flex items-center gap-2">
        <UIcon name="i-mdi-seal-variant" class="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
        <span>Passport Award Locations</span>
      </h1>
      <p class="text-sm opacity-80 mt-2 max-w-3xl">
        Visit participating locations below and kindly ask for your passport to be stamped. Collect them all to earn the Passport Award! Businesses are grouped by category for easy exploring.
      </p>
      <div class="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
        <UIcon name="i-mdi-check-decagram" class="text-yellow-500 dark:text-yellow-400 h-5 w-5" />
        <span>Indicates passport stamp available</span>
      </div>
    </header>

    <div v-if="stampGroups.length === 0" class="py-10 text-center">
      No passport locations available yet.
    </div>

    <div v-else class="space-y-10">
      <section
        v-for="group in stampGroups"
        :key="group.category"
      >
        <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2 capitalize">
          <UIcon :name="useCategoryIcon(group.category).value" class="h-6 w-6" />
          <span>{{ useCategoryLabel(group.category).value }}</span>
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard
            v-for="biz in group.items"
            :key="biz.slug"
            variant="soft"
            class="relative"
          >
            <div class="flex items-start gap-3">
              <div class="w-16 h-16 rounded-md overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-background">
                <NuxtImg
                  v-if="biz.logo"
                  :src="biz.logo"
                  :alt="`${biz.name} logo`"
                  class="w-full h-full object-contain"
                  placeholder
                  draggable="false"
                />
                <UIcon v-else name="i-mdi-store" class="h-8 w-8 text-gray-400" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-medium flex items-center gap-1 text-base">
                  <NuxtLink :to="`/business/${biz.slug}`" class="hover:underline">
                    {{ biz.name }}
                  </NuxtLink>
                  <UTooltip text="Passport stamp available" :delay-duration="200">
                    <UIcon name="i-mdi-check-decagram" class="text-yellow-500 dark:text-yellow-400 h-4 w-4" />
                  </UTooltip>
                </h3>
                <p v-if="biz.address?.street" class="text-xs opacity-70 truncate">{{ formatAddress(biz) }}</p>
                <div class="mt-2 flex flex-wrap gap-1">
                  <UButton
                    size="xs"
                    variant="ghost"
                    icon="i-mdi-information-outline"
                    :color="useCategoryColor(group.category).value"
                    :to="`/business/${biz.slug}`"
                    class="text-xs"
                  >Details</UButton>
                  
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import businesses from '~/data/businesses.json'
import type { Business } from '~/app.vue'
import { useSeoMeta, useHead, useRequestURL } from '#imports'
import { useCategoryLabel } from '~/composables/useCategoryLabel'

const stampBusinesses = (businesses as unknown as Business[]).filter(b => b.stampAvailable)

// Group by category maintaining original order of categories as they appear in data
const categoryOrder: string[] = []
stampBusinesses.forEach(b => {
  if (!categoryOrder.includes(b.category)) categoryOrder.push(b.category)
})

const stampGroups = categoryOrder.map(cat => ({
  category: cat as Business['category'],
  items: stampBusinesses.filter(b => b.category === cat)
}))

function formatAddress(b: Business) {
  if (!b.address) return ''
  const { street, city, state } = b.address
  return [street, city && state ? `${city}, ${state}` : city].filter(Boolean).join(' · ')
}

// SEO Meta
const title = 'Passport Award Locations'
const description = 'Directory of all Dublin, GA businesses offering a City Passport stamp. Collect stamps to earn the Passport Award.'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/images/logo.png',
  twitterImage: '/images/logo.png'
})

// Canonical
const requestURL = useRequestURL()
useHead({
  link: [
    { rel: 'canonical', href: `${requestURL.origin}/passport-award` }
  ]
})
</script>
