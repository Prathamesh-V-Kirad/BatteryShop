import { atom } from "nanostores"

export type CartItem = {
  id: number
  name: string
  category: string
  type: string
  voltage: string
  capacity: string
  image: string
  quantity: number
}

const STORAGE_KEY = "voltcore-cart"

function loadCart(): Record<number, CartItem> {
  if (typeof window === "undefined") return {}

  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : {}
}

function saveCart(items: Record<number, CartItem>) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const cart = atom<Record<number, CartItem>>({})

let initialized = false
export function initCart() {
  if (initialized) return
  initialized = true

  const saved = loadCart()
  cart.set(saved)
}

cart.subscribe((value) => {
  if (!initialized) return
  saveCart(value)
})


export function addItem(item: Omit<CartItem, "quantity">) {
  const items = { ...cart.get() }

  if (items[item.id]) {
    items[item.id].quantity += 1
  } else {
    items[item.id] = { ...item, quantity: 1 }
  }

  cart.set(items)
}

export function updateQuantity(id: number, delta: number) {
  const items = { ...cart.get() }
  if (!items[id]) return

  items[id].quantity += delta

  if (items[id].quantity <= 0) {
    delete items[id]
  }

  cart.set(items)
}

export function clearCart() {
  cart.set({})
}
