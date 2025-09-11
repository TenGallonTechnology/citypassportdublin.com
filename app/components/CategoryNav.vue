<template>
  <UNavigationMenu
    :items="items"
    arrow
  />
</template>

<script setup lang="ts">
import businesses from '~/data/businesses.json'

const categories = Array.from(new Set((businesses as { category: string }[]).map(b => b.category)))

const items = categories.map(cat => ({
  label: cat.charAt(0).toUpperCase() + cat.slice(1),
  icon: useCategoryIcon(cat).value,
  to: `/category/${cat.toLowerCase()}`,
  children: (businesses as { slug: string, name: string, category: string }[])
    .filter(b => b.category === cat)
    .map(b => ({
      label: b.name,
      to: `/business/${b.slug}`
    }))
}))
</script>
