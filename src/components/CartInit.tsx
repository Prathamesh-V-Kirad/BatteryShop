import { useEffect } from "react"
import { initCart } from "../stores/cart"

export default function CartInit() {
  useEffect(() => {
    initCart()
  }, [])

  return null
}
