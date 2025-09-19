import businesses from "./app/data/businesses.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui-pro", "@nuxt/image", "@nuxt/scripts"],

  ui: {
    colorMode: false,
    theme: {
      colors: [
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
        'eat',
        'experience',
        'shop',
        'stay',
        'services',
        'wellness',
        'paper'
      ]
    }
  },

  // Enable static site generation
  ssr: true,

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
    "/business/**": { prerender: true },
    "/category/**": { prerender: true },
  },

  compatibilityDate: "2025-01-15",
  nitro: {
    prerender: {
      routes: [
        "/",
        // Generate all business detail pages
        ...businesses.map((business: any) => `/business/${business.slug}`),
        // Generate all category pages
        ...Array.from(
          new Set(businesses.map((business: any) => business.category)),
        ).map((category) => `/category/${category}`),
      ],
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
