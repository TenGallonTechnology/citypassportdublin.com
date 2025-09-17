<template>
  <div
    v-if="business"
    :key="slug"
    class="max-w-4xl mx-auto "
  >
    <USeparator
      :icon="categoryIcon"
      :color="categoryColor"
      class="mt-3 mb-0"
    />

    <div
      v-if="business"
      class="p-2 rounded-lg"
    >
      <UCard
        variant="soft"
        class="mb-2"
      >
        <div class="flex justify-center items-center">
          <UTooltip :text="business.name">
            <NuxtImg
              :src="business.logo"
              :alt="business.name"
              class="h-32 w-auto rounded-xl  border-1 object-contain"
              draggable="false"
            />
          </UTooltip>
        </div>
      </UCard>

      <div
        v-if="business.photos && business.photos.length"
        class="mb-2"
      >
        <img
          :src="business.photos[0]"
          class="w-full rounded-md object-cover h-64"
        >
        <div class=" flex gap-2">
          <img
            v-for="(p, i) in business.photos.slice(1)"
            :key="i"
            :src="p"
            class="h-16 w-24 object-cover rounded"
          >
        </div>
      </div>

      <section class="mb-4">
        <p
          v-for="(para, idx) in (business as Business).paragraphs"
          :key="idx"
          class="mb-2 indent-4 text-justify"
        >
          {{ para }}
        </p>
      </section>

      <footer class="mt-4 border-t pt-3 flex flex-col gap-2 text-sm">
        <div v-if="business.address">
          <strong>Address:</strong>
          <p>{{ business.address.street }}</p>
          <p>
            {{ business.address.city }}, {{ business.address.state }}
            {{ business.address.zip }}
          </p>
          <a
            v-if="business.address.googleMapsUrl"
            :href="business.address.googleMapsUrl"
            target="_blank"
            rel="noopener"
            class="link mt-1 inline-block"
          >View on Google Maps</a>
        </div>

        <div v-if="business.hours">
          <strong>Hours:</strong>
          <div class="grid grid-cols-2 gap-2 mt-1">
            <div v-if="business.hours.monday">
              <span class="font-medium">Monday:</span>
              {{ business.hours.monday }}
            </div>
            <div v-if="business.hours.tuesday">
              <span class="font-medium">Tuesday:</span>
              {{ business.hours.tuesday }}
            </div>
            <div v-if="business.hours.wednesday">
              <span class="font-medium">Wednesday:</span>
              {{ business.hours.wednesday }}
            </div>
            <div v-if="business.hours.thursday">
              <span class="font-medium">Thursday:</span>
              {{ business.hours.thursday }}
            </div>
            <div v-if="business.hours.friday">
              <span class="font-medium">Friday:</span>
              {{ business.hours.friday }}
            </div>
            <div v-if="business.hours.saturday">
              <span class="font-medium">Saturday:</span>
              {{ business.hours.saturday }}
            </div>
            <div v-if="business.hours.sunday">
              <span class="font-medium">Sunday:</span>
              {{ business.hours.sunday }}
            </div>
          </div>
        </div>

        <div v-if="business.contacts">
          <strong>Contact:</strong>
          <div class="flex flex-wrap gap-3 mt-1">
            <UButton
              v-if="business.contacts.phone"
              variant="ghost"
              icon="i-lucide-phone"
              size="sm"
              :href="`tel:${business.contacts.phone}`"
            >
              Phone
            </UButton>
            <UButton
              v-if="business.contacts.email"
              variant="ghost"
              icon="i-lucide-mail"
              size="sm"
              :href="`mailto:${business.contacts.email}`"
              class="link"
            >
              Email
            </UButton>
            <UButton
              v-if="business.contacts.website"
              :href="
                business.contacts.website.startsWith('http')
                  ? business.contacts.website
                  : `https://${business.contacts.website}`
              "
              target="_blank"
              rel="noopener"
              class="link"
              variant="ghost"
              icon="i-lucide-globe"
              size="sm"
            >
              Website
            </UButton>
            <a
              v-if="business.contacts.social?.facebook"
              :href="
                business.contacts.social?.facebook.startsWith('http')
                  ? business.contacts.social?.facebook
                  : `https://${business.contacts.social?.facebook}`
              "
              target="_blank"
              rel="noopener"
              class="link"
            >Facebook</a>
          </div>
        </div>
      </footer>

      <div class="fixed bottom-4 left-0 right-0 pointer-events-none">
        <div class="container max-w-xl mx-auto px-4">
          <div
            class="bg-background/90 backdrop-blur-sm rounded-full shadow-lg flex items-center p-2 pointer-events-auto"
          >
            <UButton
              v-if="prevBusiness"
              :disabled="!prevSlug"
              class="group text-xs flex-1 min-w-0 max-w-[calc(50%-12px)]"
              variant="ghost"
              size="xs"
              @click="goTo(prevSlug ?? null)"
            >
              <div class="flex items-center gap-2 justify-start w-full min-w-0">
                <UIcon
                  name="i-lucide-chevron-left"
                  class="h-4 w-4 shrink-0"
                />
                <span class="truncate text-left">{{ prevBusiness?.name }}</span>
              </div>
            </UButton>

            <USeparator
              orientation="vertical"
              class="h-6 mx-2 shrink-0"
            />

            <UButton
              v-if="nextBusiness"
              :disabled="!nextSlug"
              class="group text-xs flex-1 min-w-0 max-w-[calc(50%-12px)]"
              variant="ghost"
              size="xs"
              @click="goTo(nextSlug ?? null)"
            >
              <div class="flex items-center gap-2 justify-end w-full min-w-0">
                <span class="truncate text-right">{{
                  nextBusiness?.name
                }}</span>
                <UIcon
                  name="i-lucide-chevron-right"
                  class="h-4 w-4 shrink-0"
                />
              </div>
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { useRoute, useRouter } from 'vue-router'
import businesses from '~/data/businesses.json'
import { ref, watch, computed } from 'vue'
import type { Business } from '~/app.vue'

const route = useRoute()
const router = useRouter()

const items = businesses as unknown as Business[]
const slug = ref(route.params.slug as string)
const index = ref(items.findIndex(b => b.slug === slug.value))
const business = ref<Business | null>(index.value !== -1 ? items[index.value] : null)
const prevSlug = computed(() =>
  index.value > 0 ? items[index.value - 1]?.slug : null
)
const nextSlug = computed(() =>
  index.value < items.length - 1 ? items[index.value + 1]?.slug : null
)
const prevBusiness = computed(() =>
  index.value > 0 ? items[index.value - 1] : null
)
const nextBusiness = computed(() =>
  index.value < items.length - 1 ? items[index.value + 1] : null
)
const categoryIcon = computed(() =>
  business.value?.category
    ? useCategoryIcon(business.value.category).value
    : 'i-lucide-store'
)
const categoryColor = computed(() => {
  const colors: Record<
    string,
    'primary' | 'secondary' | 'success' | 'info' | 'warning'
  > = {
    wellness: 'primary',
    stay: 'secondary',
    shop: 'info',
    services: 'warning',
    experience: 'success',
    eat: 'primary'
  }
  return colors[business.value?.category ?? ''] || 'neutral'
})

watch(
  () => route.params.slug,
  async (newSlug) => {
    if (!newSlug) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Business not found'
      })
    }

    const newIndex = items.findIndex(b => b.slug === newSlug)

    if (newIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Business not found'
      })
    }

    slug.value = typeof newSlug === 'string' ? newSlug : ''
    index.value = newIndex

    business.value = items[newIndex] ?? null
  },
  { immediate: true }
)

function goTo(targetSlug: string | null | undefined) {
  if (!targetSlug) return
  router.push({ name: 'business-slug', params: { slug: targetSlug } })
}

useSeoMeta({
  title: business.value?.name
    ? `${business.value.name} | Dublin Passport`
    : 'Business | Dublin Passport',
  description:
    business.value?.description || 'Discover local businesses in Dublin.',
  ogTitle: business.value?.name
    ? `${business.value.name} | Dublin Passport`
    : 'Business | Dublin Passport',
  ogDescription:
    business.value?.description || 'Discover local businesses in Dublin.',
  ogImage: business.value?.photos?.[0] || '/favicon.ico',
  twitterImage: business.value?.photos?.[0] || '/favicon.ico',
  twitterCard: 'summary_large_image'
})
</script>
