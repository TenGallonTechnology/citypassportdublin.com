<script setup lang="ts">
import { useHead, useRequestURL, useSeoMeta } from '#imports'

const requestURL = useRequestURL()
const canonicalUrl = `${requestURL.origin}/coloring-contest`

useSeoMeta({
  title: 'Coloring Contest',
  description: 'Coloring contest instructions and downloadable coloring sheet for City Passport Dublin.',
  ogTitle: 'Coloring Contest · City Passport Dublin',
  ogDescription: 'Get the coloring contest instructions and download the coloring sheet PDF.',
  ogImage: '/coloring-contest.png',
  twitterImage: '/coloring-contest.png'
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }]
})
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <header class="mb-8">
      <h1 class="text-3xl font-bold flex items-center gap-2">
        <UIcon
          name="i-mdi-clover"
          class="h-8 w-8 text-services"
        />
        <span>Coloring Contest</span>
      </h1>
      <p class="mt-3 text-sm text-muted-foreground">
        Use this page for the QR code landing link and coloring sheet download.
      </p>
    </header>

    <UCard variant="soft">
      <div class="flex flex-col gap-6">
        <img
          src="/coloring-contest.png"
          alt="Coloring contest shamrock"
          class="w-full max-w-md mx-auto rounded-lg"
        >

        <div class="space-y-4">
          <h2 class="text-xl font-semibold">
            Instructions
          </h2>
          <div class="space-y-4 text-sm">
            <div>
              <h3 class="font-semibold">
                Instructions for Submission
              </h3>
              <ol class="list-decimal pl-5 space-y-2 mt-2">
                <li>
                  Download and print your coloring sheet from CityPassportDublin.com or pick up a printed copy from the Laurens County Library (801 Bellevue Ave.) or the Visitor’s Center (102 Travel Center Blvd.).
                </li>
                <li>
                  Submit a photo of your completed coloring sheet in the “Comments” section of the City Passport Dublin Facebook post:

                  <UButton
                    to="https://www.facebook.com/share/p/1G5w4ZydUy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="services"
                    variant="soft"
                    size="sm"
                    icon="i-mdi-facebook"
                  >
                    Open Facebook Post
                  </UButton>
                </li>
                <li>
                  On March 27, 2026, THREE winners will be announced. Prizes include City Passport merch and goodies from local partners.
                </li>
              </ol>
            </div>
          </div>

          <div class="pt-2">
            <div class="flex flex-col gap-2">
              <UButton
                to="/coloring-sheet.pdf"
                download
                color="services"
                variant="solid"
                icon="i-mdi-download"
              >
                Download Coloring Sheet (PDF)
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
