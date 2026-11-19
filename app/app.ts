const form = document.querySelector<HTMLFormElement>('#task-form')
const input = document.querySelector<HTMLInputElement>('#task-input')
const list = document.querySelector<HTMLUListElement>('#task-list')
const message = document.querySelector<HTMLParagraphElement>('#form-message')

if (!form || !input || !list || !message) {
  throw new Error('Todo app form elements are missing.')
}

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()

  const taskName = input.value.trim()
  if (!taskName) {
    message.textContent = 'Enter a task name.'
    input.focus()
    return
  }

  const item = document.createElement('li')
  const checkbox = document.createElement('input')
  const taskText = document.createElement('span')

  checkbox.type = 'checkbox'
  checkbox.setAttribute('aria-label', `Complete ${taskName}`)
  checkbox.addEventListener('change', () => {
    taskText.classList.toggle('completed', checkbox.checked)
  })

  taskText.textContent = taskName
  item.append(checkbox, taskText)
  list.append(item)

  input.value = ''
  message.textContent = ''
  input.focus()
})
