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
  <div class="page-bg">
    <p class="sr-only">
      Explore categories of Dublin Georgia local businesses including wellness, places to stay, shopping, services, unique experiences, and dining to plan your visit.
    </p>
    <UPageHero
      reverse
      class="items-center md:py-none"
    >
      <div class="flex flex-col items-center gap-4">
        <img
          src="/images/vertical_logo.png"
          alt="City Passport Dublin logo"
          class="h-36 md:h-72 w-auto mx-auto rounded-xl"
        >

        <ULink
          to="/coloring-contest"
          class="block w-full"
          aria-label="Open coloring contest instructions and download"
        >
          <div class="max-w-md mx-auto rounded text-black backdrop-blur-xs bg-paper/55 shadow-lg overflow-hidden p-2 transition duration-200 hover:shadow-xl hover:scale-[1.01]">
            <img
              src="/coloring-contest.png"
              alt="Coloring contest shamrock"
              class="w-full block"
            >
          </div>
        </ULink>
      </div>
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
          v-for="cat in categories"
          :key="cat"
          variant="solid"
          :color="cat as 'eat' | 'experience' | 'services' | 'stay' | 'wellness' | 'shop'"
          :icon="useCategoryIcon(cat).value"
          class="p-4 rounded-lg shadow-xl hover:shadow-2xl flex flex-col items-center justify-center bg-paper text-foreground hover:scale-105 transition-transform hover:text-white"
          :class="`text-${cat}`"
          @click="goToCategory(cat)"
        >
          <span class="text-xl font-semibold capitalize mb-2 ">{{ cat }}</span>
          <UBadge
            variant="subtle"
            :color="cat as 'eat' | 'experience' | 'services' | 'stay' | 'wellness' | 'shop'"
            class="text-inherit"
          >
            {{ counts[cat] }} places
          </UBadge>
        </UButton>
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
