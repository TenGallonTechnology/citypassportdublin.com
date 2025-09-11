<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">
      Explore Dublin
    </h1>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <NuxtLink
        v-for="cat in categories"
        :key="cat"
        :to="`/category/${cat}`"
        class="bg-paper p-6 rounded-lg shadow hover:shadow-lg flex flex-col items-center justify-center"
      >
        <span class="text-xl font-semibold capitalize mb-2">{{ cat }}</span>
        <span class="text-sm text-muted-foreground">{{ counts[cat] }} places</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Business } from '~/app.vue'
import businesses from '~/data/businesses.json'

const categories = Array.from(new Set((businesses as Business[]).map(b => b.category)))
const counts = Object.fromEntries(categories.map(cat => [cat, (businesses as Business[]).filter(b => b.category === cat).length]))
</script>
