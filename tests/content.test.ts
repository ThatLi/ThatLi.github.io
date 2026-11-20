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
    if (project.showcase) {
      assert.equal(new URL(project.showcase.url).protocol, 'https:')
      assert.ok(project.showcase.title.trim() && project.showcase.summary.trim() && project.showcase.recognition.trim())
      if (project.showcase.credential) assert.equal(new URL(project.showcase.credential.url).protocol, 'https:')
    }
  }
  for (const group of portfolio.skills) assert.ok(group.items.length > 0)
  for (const item of [...portfolio.experience, ...portfolio.community]) {
    if (item.logo) {
      assert.ok(existsSync(new URL(`../public/${item.logo.file}`, import.meta.url)))
      assert.ok(item.logo.alt.trim() && item.logo.width > 0 && item.logo.height > 0)
    }
  }
  for (const award of portfolio.awards) {
    if (award.credential) {
      assert.ok(award.credential.label.trim())
      assert.equal(new URL(award.credential.url).protocol, 'https:')
    }
  }
})

test('portfolio images have local files, descriptive text, dimensions, and valid credits', () => {
  const images: PortfolioImage[] = [
    ...portfolio.projects.flatMap((project) => [...project.images ?? [], ...project.diagrams ?? []]),
    ...[...portfolio.experience, ...portfolio.community, ...portfolio.education, ...portfolio.awards].flatMap((item) => item.image ? [item.image] : []),
  ]
  assert.ok(images.length > 0)
  for (const image of images) {
    assert.ok(image.file.startsWith('images/') && !image.file.includes('..'))
    assert.ok(existsSync(new URL(`../public/${image.file}`, import.meta.url)), image.file)
    assert.ok(image.alt.trim() && image.caption.trim())
    assert.ok(image.width > 0 && image.height > 0)
    for (const reference of [image.credit, image.license]) {
      if (!reference) continue
      if (reference.url.startsWith('https:')) {
        assert.equal(new URL(reference.url).protocol, 'https:')
      } else {
        assert.ok(/^(images|diagrams)\//.test(reference.url) && !reference.url.includes('..'))
        assert.ok(existsSync(new URL(`../public/${reference.url}`, import.meta.url)))
      }
    }
  }
})
