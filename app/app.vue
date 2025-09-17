<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import businesses from '~/data/businesses.json'
import { useRoute } from 'vue-router'

const title = 'Dublin-Laurens County Chamber Community Foundation'
const description
  = 'Uniting community leaders to build a stronger future through childcare, education, and workforce solutions.'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/1.png',
  twitterImage: '/1.png',
  twitterCard: 'summary_large_image'
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
</script>

<template>
  <Analytics />
  <UApp>
    <UHeader mode="drawer">
      <template #title>
        <img
          src="/favicon.ico"
          class="w-auto h-15 shrink-0"
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
