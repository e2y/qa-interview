import assert from 'node:assert/strict'
import { Given, Then, When } from '@cucumber/cucumber'
import type { ShopWorld } from '../support/world'

Given('I open the T-shirt shop', async function (this: ShopWorld) {
  await this.page.getByRole('heading', { name: 'Classic Tee Shop' }).waitFor()
})

Then('the shop title should be {string}', async function (this: ShopWorld, title: string) {
  assert.equal(await this.page.getByRole('heading', { level: 1 }).textContent(), title)
})

Then('the product name should be {string}', async function (this: ShopWorld, name: string) {
  assert.equal(await this.page.getByRole('heading', { level: 2 }).textContent(), name)
})

Then('the product description should be {string}', async function (this: ShopWorld, description: string) {
  assert.equal(await this.page.getByText(description, { exact: true }).count(), 1)
})

Then('the product price should be {string}', async function (this: ShopWorld, price: string) {
  assert.equal(await this.page.locator('section strong').textContent(), price)
})

Then('size {string} should be available', async function (this: ShopWorld, size: string) {
  const sizeOptions = await this.page.getByLabel('Size').locator('option').allTextContents()
  assert.ok(sizeOptions.includes(size))
})

When('I add a Classic Tee in size {string} to the cart', async function (this: ShopWorld, size: string) {
  await this.page.getByLabel('Size').selectOption(size)
  await this.page.getByRole('button', { name: 'Add to cart' }).click()
})

Then('the cart should contain a tee in size {string}', async function (this: ShopWorld, size: string) {
  const item = this.page.getByRole('listitem').filter({ hasText: `Classic Tee — Size ${size}` })
  assert.equal(await item.count(), 1)
})

When('I add {int} tees in size {string}', async function (this: ShopWorld, quantity: number, size: string) {
  for (let index = 0; index < quantity; index += 1) {
    await this.page.getByLabel('Size').selectOption(size)
    await this.page.getByRole('button', { name: 'Add to cart' }).click()
  }
})

Then('the cart should show quantity {int} for size {string}', async function (
  this: ShopWorld,
  quantity: number,
  size: string,
) {
  const item = this.page.getByRole('listitem').filter({ hasText: `Classic Tee — Size ${size}` })
  assert.ok((await item.textContent())?.includes(`Qty ${quantity} —`))
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

Then('the cart should contain {int} different size line(s)', async function (this: ShopWorld, count: number) {
  assert.equal(await this.page.getByRole('listitem').count(), count)
})

When('I add one tee in each size', async function (this: ShopWorld) {
  for (const size of ['S', 'M', 'L', 'XL']) {
    await this.page.getByLabel('Size').selectOption(size)
    await this.page.getByRole('button', { name: 'Add to cart' }).click()
  }
})

When('I add 2 tees in size {string} and 1 tee in size {string}', async function (
  this: ShopWorld,
  repeatedSize: string,
  otherSize: string,
) {
  for (const size of [repeatedSize, repeatedSize, otherSize]) {
    await this.page.getByLabel('Size').selectOption(size)
    await this.page.getByRole('button', { name: 'Add to cart' }).click()
  }
})

When('I check out', async function (this: ShopWorld) {
  await this.page.getByRole('button', { name: 'Checkout' }).click()
})

Then('the cart should be empty', async function (this: ShopWorld) {
  assert.equal(await this.page.getByRole('listitem').count(), 0)
})
