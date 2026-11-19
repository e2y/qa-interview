const form = document.querySelector('#task-form')
const input = document.querySelector('#task-input')
const list = document.querySelector('#task-list')
const message = document.querySelector('#form-message')

form.addEventListener('submit', (event) => {
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
