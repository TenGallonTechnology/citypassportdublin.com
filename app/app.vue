<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import businesses from '~/data/businesses.json'
import { useRoute } from 'vue-router'
import { useRequestURL } from '#imports'

const title = 'City Passport Dublin'
const description = 'Discover the best local businesses in Dublin, GA with City Passport Dublin. Explore top-rated restaurants, shops, services, and experiences to make the most of your visit or stay.'

// Derive origin (SSR safe). Will be empty client-side before hydration if not SSR.
const requestURL = useRequestURL()
const origin = requestURL.origin

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0f766e' },
    { name: 'author', content: 'City Passport Dublin' },
    { property: 'og:site_name', content: title },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ],
  htmlAttrs: { lang: 'en' },
  titleTemplate: (chunk?: string) => (chunk ? `${chunk} · City Passport Dublin` : title)
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/images/logo.png',
  twitterImage: '/images/logo.png'
})

const route = useRoute()

const categories = Array.from(
  new Set((businesses as Array<{ category: string }>).map(b => b.category))
)
const navItems = categories.map(cat => ({
  label: cat.charAt(0).toUpperCase() + cat.slice(1),
  icon: useCategoryIcon(cat).value,
  to: `/category/${cat.toLowerCase()}`,
  children: (
    businesses as Array<{ slug: string, name: string, category: string }>
  )
    .filter(b => b.category === cat)
    .map(b => ({
      label: b.name,
      to: `/business/${b.slug}`
    }))
}))

// Structured data: Organization, WebSite, Category ItemList
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${origin}/#org`,
  name: 'City Passport Dublin',
  url: origin,
  logo: `${origin}/images/logo.png`
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${origin}/#website`,
  url: origin,
  name: 'City Passport Dublin',
  publisher: { '@id': `${origin}/#org` }
}

const categoryListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Business Categories',
  itemListElement: categories.map((cat, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: cat,
    url: `${origin}/category/${cat}`
  }))
}

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(organizationSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(webSiteSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(categoryListSchema) }
  ]
})
</script>

<template>
  <Analytics />
  <UApp>
    <UHeader mode="drawer">
      <template #title>
        <img
          src="/images/logo.png"
          alt="City Passport Dublin logo"
          class="w-auto h-13 shrink-0"
        >
      </template>
      <UNavigationMenu :items="navItems" />
      <template #body>
        <UNavigationMenu
          :items="navItems"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <!-- Hidden intro paragraph for semantic context / keyword support -->
      <p class="sr-only">City Passport Dublin is your curated directory of local restaurants, lodging, wellness services, retail shops, professional services, and unique experiences in Dublin, Georgia.</p>
      <NuxtPage :key="route.fullPath" />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Copyright © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://tengallon.tech"
          target="_blank"
          :ui="{
            leadingAvatarSize: 'lg'
          }"
          :avatar="{
            src: 'https://raw.githubusercontent.com/TenGallonTechnology/images/refs/heads/main/tenGallonSolid.png'
          }"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>

<!-- Business type for use in pages and components -->
<script lang="ts">
export interface Business {
  name: string
  logo: string
  bannerImage?: string | null
  /** Premium businesses get hero banner layout */
  isPremium: boolean
  category: 'wellness' | 'stay' | 'shop' | 'services' | 'experience' | 'eat'
  description: string
  paragraphs: string[]
  contacts: {
    phone?: string
    website?: string
    email?: string
    social?: {
      facebook?: string | null
      instagram?: string | null
    }
  }
  /** Optional primary call-to-action displayed prominently on business page */
  cta?: {
    title: string
    to: string
    icon?: string | null
  } | null
  address: {
    street?: string
    city?: string
    state?: string
    zip?: string
    googleMapsUrl?: string
  }
  hours?: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  photos: string[]
  slug: string
}
</script>
