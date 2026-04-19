import { useState, useMemo } from "react"
import { Mail, MessageCircle, Copy, X, CheckCircle2 } from "lucide-react"

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
  customMessage?: string       
  useFormattedItems?: boolean  

}

export default function CheckoutModal({ items, onClose , customMessage, useFormattedItems = true }: Props) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [copied, setCopied] = useState(false)

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

          const baseMessage =  `
            ${customMessage}
            
            *NEW ORDER REQUEST*

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
            

        const message = baseMessage
        // const message = `*NEW ORDER REQUEST*

        // Order ID: ${orderId}

        // Name: ${name || "N/A"}
        // Email: ${email || "N/A"}

        // -------------------------
        // ITEMS:
        // -------------------------
        // ${formattedItems}

        // -------------------------
        // TOTAL: ${formatPrice(totalPrice)}
        // -------------------------

        // Please confirm availability.`


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
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }



  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-[420px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 px-6 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">Complete Order</h2>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">Order ID: {orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Contact Inputs */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-700 block mb-2">Name</label>
              <input
                placeholder="Your full name"
                className="w-full border border-zinc-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-200 transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-700 block mb-2">Email <span className="text-red-500">*</span></label>
              <input
                placeholder="your.email@example.com"
                type="email"
                className="w-full border border-zinc-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-200 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-zinc-200 rounded-lg p-4 bg-gradient-to-br from-zinc-50 to-white space-y-3">
            <p className="font-bold text-sm uppercase tracking-wider text-zinc-900">Order Summary</p>

            <div className="space-y-2.5 max-h-[200px] overflow-y-auto">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between items-center text-xs">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-900 truncate">{i.name}</p>
                    <p className="text-zinc-500 text-[11px]">Qty: {i.quantity}</p>
                  </div>
                  <p className="font-semibold text-zinc-900 ml-2">₹{((i.price || 0) * i.quantity).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 pt-3 flex justify-between items-center">
              <span className="font-bold text-sm uppercase tracking-wider text-zinc-900">Total Amount</span>
              <span className="text-lg font-bold text-zinc-900">₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 px-1">Send Order Via:</p>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleMail}
                disabled={!email}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-semibold text-sm uppercase tracking-wider rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                Email
              </button>

              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm uppercase tracking-wider rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>

            <button
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-sm uppercase tracking-wider rounded-lg transition-all duration-200 ${
                copied
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 hover:shadow-md"
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>

          {/* Info Text */}
          <p className="text-xs text-zinc-500 text-center leading-relaxed">
            Our team will confirm availability and send shipping details within 24 hours
          </p>
        </div>
      </div>
    </div>
  )
}