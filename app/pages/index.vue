<script setup lang="ts">
import businesses from '~/data/businesses.json'
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
  <div>
    <p class="sr-only">Explore categories of Dublin Georgia local businesses including wellness, places to stay, shopping, services, unique experiences, and dining to plan your visit.</p>
    <UPageHero
      reverse
      description="Discover Dublin's best places to eat, stay, shop, and experience. Your city passport starts here!"
      class="bg-linear-to-t from-neutral to-primary-50 items-center py-10 hero-bg"
    >
      <img
        src="/images/vertical_logo.png"
        alt="Dublin-Laurens County Chamber Community Foundation"
        class="h-36 md:h-48 w-auto mx-auto"
      >
    </UPageHero>

    <section class="max-w-4xl mx-auto text-center py-8">
      <h1 class="text-4xl font-bold mb-4">
        Welcome to Dublin
      </h1>
      <p class="text-lg text-muted-foreground mb-6">
        Explore local businesses, find your next favorite spot, and support our vibrant community.
      </p>
    </section>

    <section class="max-w-5xl mx-auto py-8">
      <h2 class="text-2xl font-semibold mb-6 text-center">
        Browse by Category
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mx-1">
        <UButton
          variant="ghost"
          v-for="cat in categories"
          :key="cat"
          :icon="useCategoryIcon(cat).value"
          class="p-6 text-nuetral rounded-lg shadow hover:shadow-lg flex flex-col items-center justify-center cursor-pointer"
          @click="goToCategory(cat)"
        >
          <span class="text-xl font-semibold capitalize mb-2">{{ cat }}</span>
          <span class="text-sm text-primary text-muted-foreground">{{ counts[cat] }} places</span>
        </UButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero-only background image with fade to transparent toward bottom */
.hero-bg {
  position: relative;
  overflow: hidden; /* make sure pseudo elements don't spill */
}
.hero-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/images/hero_background.png') center/cover no-repeat;
  z-index: 0;
  opacity: 0.8; /* base visibility of the image */
  pointer-events: none;
}
/* Gradient mask to fade image out toward the bottom so page background shows */
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  /* Fade image into site background color (#fdfcf9) */
  background: linear-gradient(
    to bottom,
    rgba(253,252,249,0) 55%,
    rgba(253,252,249,0.60) 78%,
    rgba(253,252,249,0.95) 92%,
    #fdfcf9 100%
  );
  z-index: 1;
  pointer-events: none;
}
/* Ensure slotted hero content stays above background + fade */
.hero-bg > * { position: relative; z-index: 2; }

@media (min-width: 768px) {
  .hero-bg::before { opacity: 0.75; }
  .hero-bg::after { 
    background: linear-gradient(
      to bottom,
      rgba(253,252,249,0) 60%,
      rgba(253,252,249,0.55) 80%,
      rgba(253,252,249,0.90) 93%,
      #fdfcf9 100%
    ); 
  }
}
</style>
