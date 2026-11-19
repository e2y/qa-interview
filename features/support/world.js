const {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setWorldConstructor,
  World,
} = require('@cucumber/cucumber')
const { chromium } = require('playwright')

let browser

class TodoWorld extends World {
  async openTodoApp() {
    this.context = await browser.newContext()
    this.page = await this.context.newPage()
    await this.page.goto(process.env.BASE_URL ?? 'http://127.0.0.1:4173/')
  }
}

setWorldConstructor(TodoWorld)

BeforeAll(async () => {
  browser = await chromium.launch({ headless: true })
})

Before(async function () {
  await this.openTodoApp()
})

After(async function () {
  await this.context?.close()
})

AfterAll(async () => {
  await browser?.close()
})
