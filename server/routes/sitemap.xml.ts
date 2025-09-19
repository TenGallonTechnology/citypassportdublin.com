import businesses from '~/data/businesses.json'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const origin = `${url.protocol}//${url.host}`
  const items = businesses as Array<{ slug: string, category: string }>
  const categorySet = [...new Set(items.map(b => b.category))]

  const urls = [
    `${origin}/`,
    ...categorySet.map(c => `${origin}/category/${c}`),
    ...items.map(b => `${origin}/business/${b.slug}`)
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n') +
    '\n</urlset>'

  setHeader(event, 'content-type', 'application/xml')
  return xml
})
