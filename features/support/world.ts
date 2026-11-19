import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setWorldConstructor,
  World,
} from '@cucumber/cucumber'
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright'

let browser: Browser | undefined

export class TodoWorld extends World {
  context?: BrowserContext
  page!: Page

  async openTodoApp(): Promise<void> {
    if (!browser) {
      throw new Error('Playwright browser has not been started.')
    }

    this.context = await browser.newContext()
    this.page = await this.context.newPage()
    await this.page.goto(process.env.BASE_URL ?? 'http://127.0.0.1:4173/')
  }
}

setWorldConstructor(TodoWorld)

BeforeAll(async () => {
  browser = await chromium.launch({ headless: true })
})

Before(async function (this: TodoWorld) {
  await this.openTodoApp()
})

After(async function (this: TodoWorld) {
  await this.context?.close()
})

AfterAll(async () => {
  await browser?.close()
})
