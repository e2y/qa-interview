const assert = require('node:assert/strict')
const { Given, When, Then } = require('@cucumber/cucumber')

Given('I open the Todo app', async function () {
  await this.page.getByRole('heading', { name: 'Simple Todo' }).waitFor()
})

When('I add the task {string}', async function (taskName) {
  await this.page.getByLabel('Task name').fill(taskName)
  await this.page.getByRole('button', { name: 'Add task' }).click()
})

Then('I should see the task {string}', async function (taskName) {
  const task = this.page.getByText(taskName, { exact: true })
  await task.waitFor()
  assert.equal(await task.textContent(), taskName)
})

Then('the task {string} should not be complete', async function (taskName) {
  assert.equal(
    await this.page.getByRole('checkbox', { name: `Complete ${taskName}` }).isChecked(),
    false,
  )
})

When('I mark the task {string} complete', async function (taskName) {
  await this.page.getByRole('checkbox', { name: `Complete ${taskName}` }).check()
})

Then('the task {string} should be complete', async function (taskName) {
  assert.equal(
    await this.page.getByRole('checkbox', { name: `Complete ${taskName}` }).isChecked(),
    true,
  )
})

When('I submit a blank task', async function () {
  await this.page.getByLabel('Task name').fill('   ')
  await this.page.getByRole('button', { name: 'Add task' }).click()
})

Then('I should be told {string}', async function (message) {
  const status = this.page.getByRole('status')
  await status.waitFor()
  assert.equal(await status.textContent(), message)
})

Then('the task list should be empty', async function () {
  assert.equal(await this.page.getByRole('listitem').count(), 0)
})
