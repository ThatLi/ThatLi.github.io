import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { test } from 'node:test'
import { portfolio } from '../src/data/portfolio.ts'
import type { PortfolioImage } from '../src/data/portfolio.ts'

test('published content has a CV, usable contacts, and complete entries', () => {
  assert.ok(portfolio.name.trim())
  assert.ok(existsSync(new URL(`../public/${portfolio.cv.file}`, import.meta.url)))
  assert.equal(new Set(portfolio.contacts.map((item) => item.label)).size, portfolio.contacts.length)
  for (const contact of portfolio.contacts) {
    assert.ok(contact.value.trim())
    assert.ok(['https:', 'mailto:', 'tel:'].includes(new URL(contact.href).protocol))
  }
  for (const project of portfolio.projects) {
    assert.ok(project.name.trim())
    assert.ok(project.details.length > 0)
    if (project.url) assert.equal(new URL(project.url).protocol, 'https:')
  }
  for (const group of portfolio.skills) assert.ok(group.items.length > 0)
})

test('portfolio images have local files, descriptive text, dimensions, and valid credits', () => {
  const images: PortfolioImage[] = [
    ...portfolio.projects.flatMap((project) => project.images ?? []),
    ...[...portfolio.experience, ...portfolio.community, ...portfolio.education].flatMap((item) => item.image ? [item.image] : []),
  ]
  assert.ok(images.length > 0)
  for (const image of images) {
    assert.ok(image.file.startsWith('images/') && !image.file.includes('..'))
    assert.ok(existsSync(new URL(`../public/${image.file}`, import.meta.url)), image.file)
    assert.ok(image.alt.trim() && image.caption.trim())
    assert.ok(image.width > 0 && image.height > 0)
    if (image.credit) assert.equal(new URL(image.credit.url).protocol, 'https:')
    if (image.license && !image.license.url.startsWith('https:')) {
      assert.ok(existsSync(new URL(`../public/${image.license.url}`, import.meta.url)))
    }
  }
})
