import assert from 'node:assert/strict'
import { Given, Then, When } from '@cucumber/cucumber'
import type { ShopWorld } from '../support/world'

Given('I open the T-shirt shop', async function (this: ShopWorld) {
  await this.page.getByRole('heading', { name: 'Classic Tee Shop' }).waitFor()
})

When('I add a Classic Tee in size {string} to the cart', async function (this: ShopWorld, size: string) {
  await this.page.getByLabel('Size').selectOption(size)
  await this.page.getByRole('button', { name: 'Add to cart' }).click()
})

When('I try to add a tee without selecting a size', async function (this: ShopWorld) {
  await this.page.getByRole('button', { name: 'Add to cart' }).click()
})

Then('the cart should contain a tee in size {string}', async function (this: ShopWorld, size: string) {
  const item = this.page.getByRole('listitem').filter({ hasText: `Classic Tee — Size ${size}` })
  assert.equal(await item.count(), 1)
})

Then('the cart total should be {string}', async function (this: ShopWorld, expectedTotal: string) {
  assert.equal(await this.page.getByLabel('Cart total').textContent(), expectedTotal)
})

Then('I should be told {string}', async function (this: ShopWorld, expectedMessage: string) {
  assert.equal(await this.page.getByRole('status').textContent(), expectedMessage)
})

When(
  'I add a size {string} tee and then a size {string} tee',
  async function (this: ShopWorld, firstSize: string, secondSize: string) {
    await this.page.getByLabel('Size').selectOption(firstSize)
    await this.page.getByRole('button', { name: 'Add to cart' }).click()
    await this.page.getByLabel('Size').selectOption(secondSize)
    await this.page.getByRole('button', { name: 'Add to cart' }).click()
  },
)

Then('the cart should contain {int} different sizes', async function (this: ShopWorld, count: number) {
  assert.equal(await this.page.getByRole('listitem').count(), count)
})

When(
  'I add a size {string} tee and check out',
  async function (this: ShopWorld, size: string) {
    await this.page.getByLabel('Size').selectOption(size)
    await this.page.getByRole('button', { name: 'Add to cart' }).click()
    await this.page.getByRole('button', { name: 'Checkout' }).click()
  },
)

Then('the cart should be empty', async function (this: ShopWorld) {
  assert.equal(await this.page.getByRole('listitem').count(), 0)
})
