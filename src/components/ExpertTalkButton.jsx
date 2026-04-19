import { useState, useMemo } from "react"
import { createPortal } from "react-dom"
import { useStore } from "@nanostores/react"
import { cart } from "../stores/cart"
import CheckoutModal from "./CheckoutModal"

export default function ExpertTalkButton({
  label = "Talk to an Expert",
}) {
  const [open, setOpen] = useState(false)

  // ✅ Get cart items (same as NavbarCartDrawer)
  const $cart = useStore(cart)
  const items = Object.values($cart)

  // ✅ Custom message
  const baseMessage = useMemo(() => {
    return `*TECHNICAL CONSULTATION REQUEST*

Name: 
Email: 

-------------------------
REQUIREMENT:
-------------------------
I would like expert guidance regarding battery selection.

Use Case:
- Vehicle / Application:
- Required Capacity:
- Budget Range:

(If cart items are selected, please consider them as reference.)

Please contact me.`
  }, [])

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="h-12 sm:h-14 px-6 sm:px-8 font-bold w-full sm:w-auto bg-primary text-white rounded-md hover:opacity-90 transition"
      >
        {label}
      </button>

      {/* Modal */}
      {open &&
        createPortal(
          <CheckoutModal
            items={items} // ✅ NOW passing cart items
            onClose={() => setOpen(false)}
            useFormattedItems={false} // ✅ custom message mode
            customMessage={baseMessage}
          />,
          document.body
        )}
    </>
  )
}