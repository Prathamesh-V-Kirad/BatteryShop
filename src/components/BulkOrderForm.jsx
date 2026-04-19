import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import CheckoutModal from "./CheckoutModal"
import { products } from "../data/products";

// 🔁 Mock API (replace with real API later)
const fetchProducts = async (query) => {
  const PRODUCTS = products


  return PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )
}

export default function BulkOrderForm() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const [selected, setSelected] = useState({})
  const [customItems, setCustomItems] = useState([])
  const [showCheckout, setShowCheckout] = useState(false)

  const [activeIndex, setActiveIndex] = useState(-1)

  const debounceRef = useRef(null)

  const formatPrice = (p) => `₹${(p || 0).toLocaleString("en-IN")}`

  // 🔥 Debounced Search
  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    setLoading(true)

    clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      const data = await fetchProducts(query)
      setResults(data)
      setLoading(false)
      setActiveIndex(-1)
    }, 150)
  }, [query])

  // ✅ Add Product
  const addProduct = (product) => {
    setSelected((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: prev[product.id]?.quantity || 1,
      },
    }))
    setQuery("")
    setResults([])
  }

  // ✅ Quantity update
  const updateQty = (id, qty) => {
    setSelected((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: Number(qty),
      },
    }))
  }

  // ✅ Custom items
  const addCustomItem = () => {
    setCustomItems([...customItems, { name: "", quantity: 1 }])
  }

  const updateCustomItem = (idx, field, value) => {
    const updated = [...customItems]
    updated[idx][field] = value
    setCustomItems(updated)
  }

  // ✅ Combine items
  const items = [
    ...Object.values(selected).filter((i) => i.quantity > 0),
    ...customItems.filter((i) => i.name),
  ]

  const hasCustomItems = items.some((i) => !i.price)

  const totalPrice = items.reduce(
    (sum, i) => sum + (i.price || 0) * i.quantity,
    0
  )

  // ⌨️ Keyboard Navigation
  const handleKeyDown = (e) => {
    if (!results.length) return

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      )
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      )
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      addProduct(results[activeIndex])
    }
  }

  return (
    <div className="space-y-8">

      {/* 🔍 Search */}
      <div className="relative">
        <h2 className="text-xl font-semibold mb-2">Search Products</h2>

        <input
          type="text"
          value={query}
          placeholder="Search batteries..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border p-3 rounded"
        />

        {/* Dropdown */}
        {query && (
          <div className="absolute w-full bg-white border rounded mt-1 max-h-48 overflow-auto z-10">

            {loading && (
              <p className="p-2 text-sm">Searching...</p>
            )}

            {!loading && results.length === 0 && (
              <p className="p-2 text-sm text-zinc-500">
                No results
              </p>
            )}

            {results.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => addProduct(p)}
                className={`p-2 cursor-pointer flex justify-between ${
                  idx === activeIndex
                    ? "bg-gray-300"
                    : ""
                }`}
              >
                <span>{p.name}</span>
                <span className="text-sm text-zinc-500">
                  {formatPrice(p.price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🛒 Selected */}
      <div className="space-y-3">
        {Object.values(selected).map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-zinc-500">
                {formatPrice(item.price)}
              </p>
            </div>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQty(item.id, e.target.value)
              }
              className="w-20 border p-2 rounded"
            />
          </div>
        ))}
      </div>

      {/* ➕ Custom Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Custom Products
        </h2>

        {customItems.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <input
              placeholder="Product name"
              className="flex-1 border p-2 rounded"
              onChange={(e) =>
                updateCustomItem(idx, "name", e.target.value)
              }
            />

            <input
              type="number"
              min="1"
              value={item.quantity}
              className="w-20 border p-2 rounded"
              onChange={(e) =>
                updateCustomItem(idx, "quantity", e.target.value)
              }
            />
          </div>
        ))}

        <button
          onClick={addCustomItem}
          className="text-blue-600 text-sm"
        >
          + Add Custom Item
        </button>
      </div>

      {/* 🧾 Summary */}
      <div className="border p-4 rounded bg-gray-50 space-y-2">
        <h3 className="font-semibold">Summary</h3>

        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No items selected
          </p>
        ) : (
          items.map((i, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{i.name} x{i.quantity}</span>
              <span>
                {i.price
                  ? formatPrice(i.price * i.quantity)
                  : "TBQ"}
              </span>
            </div>
          ))
        )}

        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>
            {hasCustomItems
              ? "TBQ"
              : formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      {/* 🚀 Checkout */}
      <button
        disabled={items.length === 0}
        onClick={() => setShowCheckout(true)}
        className="w-full bg-primary text-white py-3 rounded font-bold disabled:opacity-50"
      >
        Request Quote
      </button>

      {/* Modal */}
      {showCheckout &&
        createPortal(
          <CheckoutModal
            items={items}
            onClose={() => setShowCheckout(false)}
          />,
          document.body
        )}
    </div>
  )
}