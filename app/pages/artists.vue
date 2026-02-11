<script setup lang="ts">
import artists from '~/data/artists.json'
import { useHead, useRequestURL, useSeoMeta } from '#imports'

// Canonical + SEO
const requestURL = useRequestURL()
const title = 'Featured Artists - City Passport Dublin'
const description = 'Discover talented local artists in Dublin, Georgia. Meet the creative minds shaping our community through their art, stories, and passion.'

useHead({
  link: [
    { rel: 'canonical', href: requestURL.origin + '/artists' }
  ]
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/favicon.ico',
  twitterCard: 'summary'
})
</script>

<template>
  <div class="max-w-5xl mx-auto py-10 px-3">
    <header class="text-center mb-10">
      <h1 class="text-3xl font-bold mb-4 text-black">
        Featured Artists
      </h1>
      <p class="text-lg text-gray-700 max-w-3xl mx-auto">
        Meet the talented artists who bring creativity and inspiration to Dublin, Georgia. Each artist has a unique story and contributes to the vibrant cultural landscape of our community.
      </p>
    </header>

    <div class="flex flex-col gap-8">
      <UCard
        v-for="artist in (artists as { name: string; photo: string; bio: string; contacts?: { facebook?: string|null; instagram?: string|null; phone?: string|null; email?: string|null } }[])"
        :key="artist.name"
        class="overflow-hidden"
      >
        <div class="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-0 h-full">
          <div class="relative w-full h-80 sm:h-full sm:min-h-[220px]">
            <NuxtImg
              :src="artist.photo"
              :alt="artist.name"
              class="absolute inset-0 w-full h-full object-cover object-top"
              placeholder
              draggable="false"
            />
            <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent sm:hidden pointer-events-none" />
          </div>
          <div class="p-5 flex flex-col">
            <h2 class="text-2xl font-semibold mb-3">
              {{ artist.name }}
            </h2>
            <p class="text-sm leading-relaxed whitespace-pre-line">
              {{ artist.bio }}
            </p>
            <div
              v-if="artist.contacts && (artist.contacts.facebook || artist.contacts.instagram || artist.contacts.phone || artist.contacts.email)"
              class="mt-5"
            >
              <USeparator class="mb-4">
                <UIcon name="i-mdi-account-heart" />
                <span class="ml-1 font-handwritten text-2xl">Connect with {{ artist.name.split(' ')[0] }}</span>
              </USeparator>
              <div class="flex flex-wrap gap-3">
                <UButton
                  v-if="artist.contacts.facebook"
                  :href="artist.contacts.facebook.startsWith('http') ? artist.contacts.facebook : `https://${artist.contacts.facebook}`"
                  target="_blank"
                  rel="noopener"
                  icon="i-mdi-facebook"
                  size="xs"
                  variant="outline"
                  color="neutral"
                >
                  Facebook
                </UButton>
                <UButton
                  v-if="artist.contacts.instagram"
                  :href="artist.contacts.instagram.startsWith('http') ? artist.contacts.instagram : artist.contacts.instagram.startsWith('@') ? `https://instagram.com/${artist.contacts.instagram.substring(1)}` : `https://instagram.com/${artist.contacts.instagram}`"
                  target="_blank"
                  rel="noopener"
                  icon="i-mdi-instagram"
                  size="xs"
                  variant="outline"
                  color="neutral"
                >
                  Instagram
                </UButton>
                <UButton
                  v-if="artist.contacts.phone"
                  :href="`tel:${artist.contacts.phone}`"
                  icon="i-mdi-phone"
                  size="xs"
                  variant="outline"
                  color="neutral"
                >
                  Call
                </UButton>
                <UButton
                  v-if="artist.contacts.email"
                  :href="`mailto:${artist.contacts.email}`"
                  icon="i-mdi-email"
                  size="xs"
                  variant="outline"
                  color="neutral"
                >
                  Email
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
