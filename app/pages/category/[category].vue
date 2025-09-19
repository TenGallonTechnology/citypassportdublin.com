<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 capitalize flex items-center gap-2">
      <UIcon
        :name="categoryIcon"
        class="h-8 w-8"
      />
      <span v-if="category === 'wellness'">Local wellness</span>
      <span v-else-if="category === 'services'">Local Services</span>
      <span v-else>{{ category }} Local</span>
    </h1>
    <div class="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
      <UIcon
        name="i-mdi-check-decagram"
        class="text-yellow-500 dark:text-yellow-400 h-5 w-5"
      />
      <span> = Please ask us to stamp your passport</span>
    </div>

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
        class="p-4 rounded-lg shadow hover:shadow-lg"
      >
        <div class="flex items-center gap-3 mb-2">
          <UAvatar
            icon="i-mdi-image"
            size="3xl"
            :src="business.logo"
          />
          <div>
            <h2 class="text-lg font-semibold flex items-center gap-2">
              {{ business.name }}
              <UTooltip
              :delay-duration="200"
                v-if="business.stampAvailable"
                text="Please ask us to stamp your passport"
              >
                <UIcon
                  name="i-mdi-check-decagram"
                  class="text-yellow-500 dark:text-yellow-400 h-5 w-5"
                />
              </UTooltip>
            </h2>
          </div>
        </div>

        <UButton
          variant="ghost"
          :to="`/business/${business.slug}`"
          class="btn mt-2"
        >
          Visit Page →
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Business } from '~/app.vue'
import businesses from '~/data/businesses.json'
import { useHead, useRequestURL } from '#imports'

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
  (b) => b.category === category
)
const categoryIcon = useCategoryIcon(category)

// Canonical URL for category pages
const requestURL = useRequestURL()
useHead({
  link: [
    { rel: 'canonical', href: `${requestURL.origin}/category/${category}` }
  ]
})
</script>
