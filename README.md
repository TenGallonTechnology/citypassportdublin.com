# Nuxt Starter Template

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com/pro)
[![Deploy to NuxtHub](https://img.shields.io/badge/Deploy%20to-NuxtHub-00DC82?logo=nuxt&labelColor=020420)](https://hub.nuxt.com/new?repo=nuxt-ui-pro/starter)

This Nuxt starter lets you get started with [Nuxt UI Pro](https://ui.nuxt.com/pro) quickly.

- [Live demo](https://ui-pro-starter.nuxt.dev/)
- [Documentation](https://ui.nuxt.com/getting-started/installation/pro/nuxt)

<a href="https://ui-pro-starter.nuxt.dev/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3VpLXByby1zdGFydGVyLm51eHQuZGV2IiwiaWF0IjoxNzM5NDYzMzk4fQ.XLzPkSW6nRbPW07QO1RkMwz_RAPA4KfeyrWrK3li9YI.jpg?theme=dark">
    <source media="(prefers-color-scheme: light)" srcset="https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3VpLXByby1zdGFydGVyLm51eHQuZGV2IiwiaWF0IjoxNzM5NDYzMzk4fQ.XLzPkSW6nRbPW07QO1RkMwz_RAPA4KfeyrWrK3li9YI.jpg?theme=light">
    <img alt="Nuxt Starter Template" src="https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3VpLXByby1zdGFydGVyLm51eHQuZGV2IiwiaWF0IjoxNzM5NDYzMzk4fQ.XLzPkSW6nRbPW07QO1RkMwz_RAPA4KfeyrWrK3li9YI.jpg">
  </picture>
</a>

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Business Data Model Extension

The `app/data/businesses.json` file defines all directory entries used at build time. A new optional top-level field `cta` has replaced the previous `contacts.orderUrl` property.

Example snippet:

```json
{
  "slug": "example-business",
  "name": "Example Business",
  "category": "eat",
  "isPremium": true,
  "logo": "/images/businesses/example/logo.png",
  "photos": [],
  "contacts": {
    "phone": "1234567890",
    "website": "example.com",
    "social": { "facebook": null, "instagram": null }
  },
  "cta": {
    "title": "View Menu",
    "to": "https://example.com/menu",
    "icon": "i-mdi-silverware-fork-knife"
  }
}
```

If `cta` is present it renders a highlighted call-to-action button on the business detail page. Omit or set `cta` to `null` if no primary action is needed. The `to` value can be provided with or without protocol (will default to `https://`).
