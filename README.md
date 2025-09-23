# City Passport Dublin

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
