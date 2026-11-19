import assert from 'node:assert/strict'
import { Given, Then, When } from '@cucumber/cucumber'
import type { TodoWorld } from '../support/world'

Given('I open the Todo app', async function (this: TodoWorld) {
  await this.page.getByRole('heading', { name: 'Simple Todo' }).waitFor()
})

When('I add the task {string}', async function (this: TodoWorld, taskName: string) {
  await this.page.getByLabel('Task name').fill(taskName)
  await this.page.getByRole('button', { name: 'Add task' }).click()
})

Then('I should see the task {string}', async function (this: TodoWorld, taskName: string) {
  const task = this.page.getByText(taskName, { exact: true })
  await task.waitFor()
  assert.equal(await task.textContent(), taskName)
})

Then('the task {string} should not be complete', async function (this: TodoWorld, taskName: string) {
  const checkbox = this.page.getByRole('checkbox', { name: `Complete ${taskName}` })
  assert.equal(await checkbox.isChecked(), false)
})

When('I mark the task {string} complete', async function (this: TodoWorld, taskName: string) {
  await this.page.getByRole('checkbox', { name: `Complete ${taskName}` }).check()
})

Then('the task {string} should be complete', async function (this: TodoWorld, taskName: string) {
  const checkbox = this.page.getByRole('checkbox', { name: `Complete ${taskName}` })
  assert.equal(await checkbox.isChecked(), true)
})

When('I submit a blank task', async function (this: TodoWorld) {
  await this.page.getByLabel('Task name').fill('   ')
  await this.page.getByRole('button', { name: 'Add task' }).click()
})

Then('I should be told {string}', async function (this: TodoWorld, expectedMessage: string) {
  const status = this.page.getByRole('status')
  await status.waitFor()
  assert.equal(await status.textContent(), expectedMessage)
})

Then('the task list should be empty', async function (this: TodoWorld) {
  assert.equal(await this.page.getByRole('listitem').count(), 0)
})
