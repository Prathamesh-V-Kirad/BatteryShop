import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useStore } from "@nanostores/react"
import { cart, updateQuantity } from "../stores/cart"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import CheckoutModal from "./checkoutModal"

export default function NavbarCartDrawer() {
  const $cart = useStore(cart)
  const items = Object.values($cart)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  // ✅ Ensure portal runs only on client
  useEffect(() => {
    setMounted(true)
  }, [])

  const formatPrice = (p: number) => `₹${(p || 0).toLocaleString("en-IN")}`

  const totalPrice = items.reduce(
    (sum, i) => sum + (i.price || 0) * i.quantity,
    0
  )
  return (
    <>
      {/* Cart Button inside Navbar */}
      <button
        onClick={() => setOpen(true)}
        className="relative h-10 w-10 flex items-center justify-center hover:bg-accent rounded-md"
      >
        <ShoppingCart className="h-5 w-5" />

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-2 rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* Drawer rendered at BODY level */}
      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 bg-black/40 z-[9999]">
            {/* Drawer Panel */}
            <div className="absolute right-0 top-0 h-full w-[360px] bg-white shadow-xl flex flex-col">

              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg">Your Cart</h2>
                <button onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <p className="text-sm text-zinc-500">
                    Cart is empty.
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border rounded p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 object-contain"
                      />

                      <div className="flex-1">
                        <p className="font-bold text-lg">{item.name}</p>

                        <p className="text-xs text-zinc-500">
                          {item.voltage} • {item.capacity}
                        </p>

                        <p className="text-lg font-bold text-zinc-800">
                          {formatPrice(item.price)}
                        </p>
                        {/* Quantity */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, -1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              
              {/* Footer */}
             {items.length > 0 && (
              <div className="border-t">

                {/* 🧾 Summary */}
                <div className="p-4 space-y-2 bg-gray-50">
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="p-4">
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-primary text-white py-2 rounded font-bold"
                  >
                    Checkout
                  </button>
                </div>

              </div>
            )}
            </div>
          </div>,
          document.body
        )}
        {mounted && showCheckout &&
          createPortal(
            <CheckoutModal
              items={items}
              onClose={() => setShowCheckout(false)}
            />,
            document.body
          )
        }
    </>
  )
}
