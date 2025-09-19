<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md mx-auto text-center p-8">
      <div class="mb-8">
        <UIcon
          name="i-mdi-alert-circle-outline"
          class="h-24 w-24 mx-auto text-muted-foreground mb-4"
        />
        <h1 class="text-4xl font-bold text-foreground mb-2">
          {{ error.statusCode }}
        </h1>
        <h2 class="text-xl font-semibold text-muted-foreground mb-4">
          {{ error.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
        </h2>
        <p class="text-muted-foreground mb-6">
          {{
            error.statusCode === 404
              ? "Sorry, we couldn't find the page you're looking for."
              : 'An unexpected error occurred. Please try again later.'
          }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          to="/"
          variant="soft"
          class="inline-flex items-center gap-2"
        >
          <UIcon name="i-mdi-home" class="h-4 w-4" />
          Go Home
        </UButton>

     
      </div>

      <div v-if="error.statusCode === 404" class="mt-8">
        <p class="text-sm text-muted-foreground mb-4">
          Looking for a specific business? Try browsing by category:
        </p>
        <div class="flex flex-wrap gap-2 justify-center">
          <UButton
            v-for="category in categories"
            :key="category"
            variant="outline"
            color="neutral"
            :to="`/category/${category}`"
            :icon="useCategoryIcon(category).value"
          >
            {{ category }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import businesses from '~/data/businesses.json'

interface NuxtError {
  statusCode: number
  statusMessage?: string
}

const props = defineProps<{
  error: NuxtError
}>()

// Get available categories for helpful links
const categories = Array.from(
  new Set((businesses as Array<{ category: string }>).map(b => b.category))
)

// Set page title based on error
useHead({
  title: props.error.statusCode === 404 ? 'Page Not Found' : 'Error'
})
</script>
