<template>
  <div
    v-if="business"
    :key="slug"
    class="max-w-7xl mx-auto"
  >
    <USeparator
      :icon="categoryIcon"
      :color="categoryColor"
      class="mt-3 mb-0"
    />

    <!-- Primary page heading (visually hidden for layout preservation, present for SEO & accessibility) -->
    <h1 class="sr-only">{{ business.name }}</h1>

    <!-- Hidden (screen-reader only) breadcrumb navigation for semantic context -->
    <nav
      aria-label="Breadcrumb"
      class="sr-only"
    >
      <ol>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li v-if="business?.category">
          <NuxtLink :to="`/category/${business.category}`">
            {{ business?.category ? business.category.charAt(0).toUpperCase() + business.category.slice(1) : '' }}
          </NuxtLink>
        </li>
        <li aria-current="page">{{ business?.name }}</li>
      </ol>
    </nav>

    <div
      v-if="business"
      class="p-2 rounded-lg"
    >
      <!-- Premium hero layout -->
      <template v-if="isPremium && business.bannerImage">
        <div
          class="relative mb-6 rounded-xl overflow-hidden aspect-[16/7] flex items-center justify-center"
        >
          <NuxtImg
            :src="business.bannerImage"
            class="absolute inset-0 w-full h-full object-cover"
            placeholder

            draggable="false"
          />
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background/95"
          />
          <div class="relative z-10 max-w-md w-full px-4">
            <UCard
              variant="soft"
              class="backdrop-blur-xl/50 bg-background/80"
            >
              <div class="flex flex-col items-center gap-3">
                <NuxtImg
                  :src="business.logo"
                  :alt="business.name"
                  class="h-36 sm:h-48 md:h-64 w-auto rounded-xl object-contain shadow"
                  draggable="false"
                  placeholder
                />
                <p
                  v-if="business.description"
                  class="text-center text-sm opacity-80"
                >
                  {{ business.description }}
                </p>
              </div>
            </UCard>
          </div>
        </div>

        <section
          v-if="business.paragraphs?.length"
          class="mb-4"
        >
          <p
            v-for="(para, idx) in (business as Business).paragraphs"
            :key="idx"
            class="mb-2 indent-4 text-justify"
          >
            {{ para }}
          </p>
        </section>
      </template>

      <!-- Non-premium compact layout -->
      <template v-else>
        <UCard
          variant="soft"
          class="mb-6"
        >
          <div class="flex flex-col md:flex-row gap-6 items-start">
            <div
              class="flex justify-center md:justify-start md:w-60 shrink-0 mx-auto md:mx-0"
            >
              <NuxtImg
                :src="business.logo"
                :alt="business.name"
                class="h-40 md:h-48 w-auto rounded-xl object-contain shadow"
                draggable="false"
                placeholder
              />
            </div>
            <div class="flex-1 w-full">
              <p
                v-if="business.description"
                class="mb-3 text-sm opacity-80"
              >
                {{ business.description }}
              </p>
              <div v-if="business.paragraphs?.length">
                <p
                  v-for="(para, idx) in (business as Business).paragraphs"
                  :key="idx"
                  class="mb-2 indent-4 text-justify"
                >
                  {{ para }}
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </template>

      <UCarousel
        v-if="business.photos.length"
        v-slot="{ item }"
        :items="business.photos"
        loop
        :autoplay="business.photos.length > 1 ? { delay: 2500 } : undefined"
        auto-height
        class="mb-8"
        :ui="{
          // only extend item; keep default container
          item: 'min-w-0 shrink-0 snap-start basis-[85%] sm:basis-1/2 md:basis-1/3 '
        }"
      >
        <div class="w-full">
          <NuxtImg
            :src="item"
            class="w-full h-64 object-cover rounded-lg shadow-sm"
            draggable="false"
            placeholder
          />
        </div>
      </UCarousel>
      <!-- Generic Call to Action section if applicable -->
      <template v-if="business.cta?.to && business.cta.title">
        <div class="my-8 flex justify-center">
          <UButton
            :href="business.cta.to.startsWith('http') ? business.cta.to : `https://${business.cta.to}`"
            target="_blank"
            size="lg"
            block
            :color="categoryColor"
            rel="noopener"
            :icon="business.cta.icon || 'i-mdi-exit-to-app'"
            variant="solid"
            class="w-1/2"
          >
            {{ business.cta.title }}
          </UButton>
        </div>
      </template>
      <USeparator class="mt-4">
        <UIcon name="i-mdi-link-variant" />
        <span
          class="ml-1 font-handwritten text-3xl leading-tight tracking-wide"
          :style="headingStyle"
        >Connect With Us</span>
      </USeparator>
       <div v-if="business.contacts">
          <div class="flex flex-wrap gap-3 mt-1 justify-around w-full">
            <UButton
              v-if="business.contacts.phone"
              variant="outline"
              icon="i-mdi-phone"
              size="sm"
              :color="categoryColor"
              :href="`tel:${business.contacts.phone}`"
            >
              Phone
            </UButton>
            <UButton
              v-if="business.contacts.email"
              variant="outline"
              icon="i-mdi-email"
              size="sm"
              :color="categoryColor"
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
              variant="outline"
              icon="i-mdi-web"
              size="sm"
              :color="categoryColor"
            >
              Website
            </UButton>
            <UButton
              v-if="business.contacts.social?.facebook"
              :href="
                business.contacts.social.facebook.startsWith('http')
                  ? business.contacts.social.facebook
                  : `https://${business.contacts.social.facebook}`
              "
              target="_blank"
              rel="noopener"
              variant="outline"
              size="sm"
              :color="categoryColor"
              icon="i-mdi-facebook"
            >
              Facebook
            </UButton>
            <UButton
              v-if="business.contacts.social?.instagram"
              :href="
                business.contacts.social.instagram.startsWith('http')
                  ? business.contacts.social.instagram
                  : business.contacts.social.instagram.startsWith('@')
                    ? `https://instagram.com/${business.contacts.social.instagram.substring(
                      1
                    )}`
                    : `https://instagram.com/${business.contacts.social.instagram}`
              "
              target="_blank"
              rel="noopener"
              variant="outline"
              size="sm"
              :color="categoryColor"
              icon="i-mdi-instagram"
            >
              Instagram
            </UButton>
          </div>
        </div>
        <div v-if="business.address" class="mt-4">
          <UIcon name="i-mdi-map-marker-star" />
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

       


      <div class="fixed bottom-4 left-0 right-0 pointer-events-none">
        <div class="container max-w-xl mx-auto px-4">
          <div
            class="bg-white/65 backdrop-blur-md rounded-full shadow-xl flex items-center p-2 pointer-events-auto"
          >
            <UButton
              :disabled="!prevSlug"
              class="group text-xs flex-1 min-w-0 max-w-[calc(50%-12px)]"
              variant="ghost"
              size="xs"
              @click="goTo(prevSlug ?? null)"
            >
              <div class="flex items-center gap-2 justify-start w-full min-w-0">
                <UIcon
                  name="i-mdi-chevron-left"
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
                  name="i-mdi-chevron-right"
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
import { useSeoMeta, useHead, useRequestURL } from '#imports'
import { useRoute, useRouter } from 'vue-router'
import businesses from '~/data/businesses.json'
import { ref, watch, computed } from 'vue'
import type { Business } from '~/app.vue'

const route = useRoute()
const router = useRouter()

const items = businesses as unknown as Business[]
const slug = ref(route.params.slug as string)
const index = ref(items.findIndex(b => b.slug === slug.value))
const business = ref<Business | null>(
  index.value !== -1 ? (items[index.value] as Business) : null
)
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
    : 'i-mdi-store'
)
const categoryColor = computed(() => {
  const colors: Record<string, 'wellness' | 'stay' | 'shop' | 'services' | 'experience' | 'eat'> = {
    wellness: 'wellness',
    stay: 'stay',
    shop: 'shop',
    services: 'services',
    experience: 'experience',
    eat: 'eat'
  }
  return colors[business.value?.category ?? ''] || 'neutral'
})

// Inline style for handwritten heading using existing CSS custom properties if available
const headingStyle = computed(() => {
  const c = categoryColor.value
  // Our theme variables use --color-<category>; fallback to currentColor
  return { color: `var(--color-${c}, currentColor)` }
})

// Determine if business is premium (hero eligible)
const isPremium = computed(() => !!business.value?.isPremium)

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
// Canonical + origin helpers
const requestURL = useRequestURL()
const origin = computed(() => requestURL.origin)
const canonicalUrl = computed(() =>
  business.value?.slug ? `${origin.value}/business/${business.value.slug}` : origin.value
)

// Main SEO meta (reactive via functions)
useSeoMeta({
  title: () =>
    business.value?.name
      ? `${business.value.name}`
      : 'Business',
  description: () =>
    business.value?.description || 'Discover local businesses in Dublin.',
  ogTitle: () =>
    business.value?.name
      ? `${business.value.name}`
      : 'Business',
  ogDescription: () =>
    business.value?.description || 'Discover local businesses in Dublin.',
  ogImage: () => business.value?.logo || '/favicon.ico',
  twitterImage: () => business.value?.logo || '/favicon.ico',
  twitterCard: 'summary_large_image',
  // Use a supported og:type; fallback to 'website' (specialized local business type not in provided union)
  ogType: 'website',
  ogUrl: () => canonicalUrl.value,
  robots: 'index, follow',
  ogLocale: 'en_US',
  twitterTitle: () =>
    business.value?.name
      ? `${business.value.name}`
      : 'Business',
  twitterDescription: () =>
    business.value?.description || 'Discover local businesses in Dublin.'
})

// Additional head: canonical link + multiple og:image (beyond first)
useHead(() => {
  const additionalImages = (business.value?.photos || []).slice(1, 5)
  return {
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl.value
      }
    ],
    meta: [
      // Additional og:image tags
      ...additionalImages.map(src => ({ property: 'og:image', content: src }))
    ]
  }
})
</script>
