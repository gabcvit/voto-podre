import { watchEffect, toValue, type MaybeRefOrGetter } from 'vue'

export const SITE_URL = 'https://voto-podre.com.br'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

interface MetaOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  canonicalPath?: MaybeRefOrGetter<string>
  ogImage?: string
}

function setMeta(property: string, attr: 'name' | 'property', content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Reactively updates <head> meta, OG, and Twitter/X tags for the current route.
 * Works for Google, Twitter/X card previews, Facebook, and Bluesky (all execute JS).
 * The base static tags in index.html serve as fallback for bots that don't execute JS (e.g. WhatsApp).
 */
export function useMeta(opts: MetaOptions) {
  watchEffect(() => {
    const rawTitle = toValue(opts.title)
    const description = toValue(opts.description)
    const path = toValue(opts.canonicalPath ?? '/')
    const image = opts.ogImage ?? DEFAULT_OG_IMAGE

    const fullTitle = rawTitle === 'Voto Podre' ? rawTitle : `${rawTitle} — Voto Podre`
    const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

    // Page title
    document.title = fullTitle

    // Standard SEO
    setMeta('description', 'name', description)

    // Open Graph (Facebook, WhatsApp, Bluesky, LinkedIn, iMessage)
    setMeta('og:title', 'property', fullTitle)
    setMeta('og:description', 'property', description)
    setMeta('og:image', 'property', image)
    setMeta('og:url', 'property', url)

    // Twitter / X card
    setMeta('twitter:title', 'name', fullTitle)
    setMeta('twitter:description', 'name', description)
    setMeta('twitter:image', 'name', image)

    // Canonical URL
    setLink('canonical', url)
  })
}
