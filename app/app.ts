interface CartEntry {
  size: string
  quantity: number
}

const priceInCents = 2_000
const cart: CartEntry[] = []
const form = document.querySelector<HTMLFormElement>('#product-form')
const sizeSelect = document.querySelector<HTMLSelectElement>('#size-select')
const cartList = document.querySelector<HTMLUListElement>('#cart-items')
const cartTotal = document.querySelector<HTMLOutputElement>('#cart-total')
const message = document.querySelector<HTMLParagraphElement>('#shop-message')
const checkoutButton = document.querySelector<HTMLButtonElement>('#checkout-button')

if (!form || !sizeSelect || !cartList || !cartTotal || !message || !checkoutButton) {
  throw new Error('Shop page elements are missing.')
}

const cartElements = { cartList, cartTotal, message }

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()

  const size = sizeSelect.value
  if (!size) {
    message.textContent = 'Choose a size before adding the shirt.'
    sizeSelect.focus()
    return
  }

  const existingItem = cart.find((item) => item.size === size)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ size, quantity: 1 })
  }

  renderCart()
  message.textContent = `Added Classic Tee in size ${size}.`
  sizeSelect.value = ''
})

checkoutButton.addEventListener('click', () => {
  if (cart.length === 0) {
    message.textContent = 'Your cart is empty.'
    return
  }

  cart.length = 0
  renderCart()
  message.textContent = 'Order placed successfully.'
})

function renderCart(): void {
  cartElements.cartList.replaceChildren()

  let totalInCents = 0
  for (const item of cart) {
    totalInCents += priceInCents * item.quantity

    const row = document.createElement('li')
    row.textContent = `Classic Tee — Size ${item.size} — Qty ${item.quantity} — ${formatPrice(priceInCents * item.quantity)}`
    cartElements.cartList.append(row)
  }

  cartElements.cartTotal.textContent = formatPrice(totalInCents)
  cartElements.message.textContent = ''
}

function formatPrice(amountInCents: number): string {
  return `$${(amountInCents / 100).toFixed(2)}`
}
