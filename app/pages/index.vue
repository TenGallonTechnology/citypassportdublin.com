<script setup lang="ts">
import businesses from '~/data/businesses.json'
import artists from '~/data/artists.json'
import { useRouter } from 'vue-router'
import { useHead, useRequestURL } from '#imports'

const router = useRouter()
const categories = Array.from(new Set((businesses as { category: string }[]).map(b => b.category)))
const counts = Object.fromEntries(categories.map(cat => [cat, (businesses as { category: string }[]).filter(b => b.category === cat).length]))

function goToCategory(cat: string) {
  router.push(`/category/${cat}`)
}

// Canonical for root + hidden semantic paragraph
const requestURL = useRequestURL()
useHead({
  link: [
    { rel: 'canonical', href: requestURL.origin + '/' }
  ]
})

</script>

<template>
  <div class="page-bg">
    <p class="sr-only">Explore categories of Dublin Georgia local businesses including wellness, places to stay, shopping, services, unique experiences, and dining to plan your visit.</p>
    <UPageHero
      reverse
      class="items-center md:py-none"
    >
      <img
        src="/images/vertical_logo.png"
        alt="City Passport Dublin logo"
        class="h-36 md:h-72 w-auto mx-auto rounded-xl"
      >
      <section class="max-w-4xl mx-auto text-center px-3 py-8 rounded text-black backdrop-blur-xs bg-paper/55 shadow-lg">
      <p class="text-xl font-medium">
        City Passport Dublin welcomes you to
central Georgia's favorite hometown
with this curated business and
experience guide. Every featured
partner has a story - from generational
family establishments to fresh,
innovative ventures shaping the city's
future. We invite you to come, wander,
connect, and fall in love with the heart
of Dublin, one experience at a time.
      </p>
    </section>
    </UPageHero>

    

    <section class="max-w-5xl mx-auto py-8">
      <h2 class="text-2xl font-semibold mb-6 text-center text-black">
        Browse by Category
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mx-1">
        <UButton
          variant="solid"
          v-for="cat in categories"
          :key="cat"
          :color="cat as 'eat' | 'experience' | 'services' | 'stay' | 'wellness' | 'shop'"
          :icon="useCategoryIcon(cat).value"
          class="p-4 rounded-lg shadow-xl hover:shadow-2xl flex flex-col items-center justify-center bg-paper text-foreground hover:scale-105 transition-transform hover:text-white"
          :class="`text-${cat}`"
          @click="goToCategory(cat)"
        >
          <span class="text-xl font-semibold capitalize mb-2 ">{{ cat }}</span>
          <UBadge variant="subtle" :color="cat as 'eat' | 'experience' | 'services' | 'stay' | 'wellness' | 'shop'" class="text-inherit">{{ counts[cat] }} places</UBadge>
        </UButton>
      </div>
    </section>

     <section class="max-w-5xl mx-auto py-8 px-2">
      <h2 class="text-2xl font-semibold mb-6 text-center text-black">
        Featured Artists
      </h2>
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
              <h3 class="text-2xl font-semibold mb-3">{{ artist.name }}</h3>
              <p class="text-sm leading-relaxed  whitespace-pre-line">
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
                  >Facebook</UButton>
                  <UButton
                    v-if="artist.contacts.instagram"
                    :href="artist.contacts.instagram.startsWith('http') ? artist.contacts.instagram : artist.contacts.instagram.startsWith('@') ? `https://instagram.com/${artist.contacts.instagram.substring(1)}` : `https://instagram.com/${artist.contacts.instagram}`"
                    target="_blank"
                    rel="noopener"
                    icon="i-mdi-instagram"
                    size="xs"
                    variant="outline"
                    color="neutral"
                  >Instagram</UButton>
                  <UButton
                    v-if="artist.contacts.phone"
                    :href="`tel:${artist.contacts.phone}`"
                    icon="i-mdi-phone"
                    size="xs"
                    variant="outline"
                    color="neutral"
                  >Call</UButton>
                  <UButton
                    v-if="artist.contacts.email"
                    :href="`mailto:${artist.contacts.email}`"
                    icon="i-mdi-email"
                    size="xs"
                    variant="outline"
                    color="neutral"
                  >Email</UButton>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Index-only static background image with subtle overlay for readability */
.page-bg {
  position: relative;
  min-height: 100%;
}
.page-bg::before {
  content: '';
  position: fixed; /* keep background stationary */
  top: 0;
  left: 50%;
  width: 100vw; /* full viewport width regardless of container constraints */
  height: 100vh; /* cover viewport height */
  transform: translateX(-50%); /* center the 100vw block under any layout padding */
  background: url('/images/cover.png') center center / cover no-repeat;
  z-index: -2;
  pointer-events: none;
}
.page-bg::after {
  content: '';
  position: fixed;
  top: 0;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translateX(-50%);
  /* Gradient overlay: transparent -> opaque band -> transparent near bottom */
  background: linear-gradient(
    to bottom,
    rgba(253,252,249,.10) 0%,
    rgba(253,252,249,0.7) 50%,
    rgba(253,252,249,.10) 100%
  );
  z-index: -1;
  pointer-events: none;
}

</style>
