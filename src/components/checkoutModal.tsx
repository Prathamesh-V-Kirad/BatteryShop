import { useState, useMemo } from "react"
type CartItem = {
  id: string
  name: string
  quantity: number
  image: string
  voltage?: string
  capacity?: string
  price?: number
}

type Props = {
  items: CartItem[]
  onClose: () => void
}
export default function CheckoutModal({ items, onClose }: Props) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  // ✅ Generate Order ID
  const orderId = useMemo(() => {
    return "ORD-" + Date.now().toString().slice(-6)
  }, [])

  // ✅ Calculate Total
  const totalPrice = items.reduce(
    (sum, i) => sum + (i.price || 0) * i.quantity,
    0
  )

  // ✅ Format items
  const formatPrice = (p: number) => `₹${(p || 0).toLocaleString("en-IN")}`

  const formattedItems = items
    .map((i, idx) => {
        const price = i.price || 0
        const total = price * i.quantity

        return `${idx + 1}. ${i.name}
        Qty: ${i.quantity} × ${formatPrice(price)} = ${formatPrice(total)}`
        })
        .join("\n\n")

        const message = `*NEW ORDER REQUEST*

        Order ID: ${orderId}

        Name: ${name || "N/A"}
        Email: ${email || "N/A"}

        -------------------------
        ITEMS:
        -------------------------
        ${formattedItems}

        -------------------------
        TOTAL: ${formatPrice(totalPrice)}
        -------------------------

        Please confirm availability.`


  // ✅ WhatsApp
  const handleWhatsApp = () => {
    const phone = "919324620999"
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  // ✅ Mailto (formatted)
  const handleMail = () => {
    if (!email) return alert("Email required")

    const subject = `Order Request - ${orderId}`

    const mailto = `mailto:your@email.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`

    window.location.href = mailto
  }

  // ✅ Copy to clipboard
  const handleCopy = async () => {
    await navigator.clipboard.writeText(message)
    alert("Copied to clipboard!")
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[380px] space-y-4 shadow-xl">

        <h2 className="text-lg font-bold">Complete your order</h2>

        {/* Inputs */}
        <input
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Your Email *"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 🧾 Order Summary */}
        <div className="border rounded p-3 bg-gray-50 text-sm space-y-2">
          <p className="font-semibold">Order Summary</p>

          {items.map((i) => (
            <div key={i.id} className="flex justify-between">
              <span>{i.name} x{i.quantity}</span>
              <span>₹{(i.price || 0) * i.quantity}</span>
            </div>
          ))}

          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleMail}
            className="bg-blue-600 text-white py-2 rounded text-sm"
          >
            Email
          </button>

          <button
            onClick={handleWhatsApp}
            className="bg-green-500 text-white py-2 rounded text-sm"
          >
            WhatsApp
          </button>

          <button
            onClick={handleCopy}
            className="bg-gray-200 py-2 rounded text-sm"
          >
            Copy
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 block mx-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}