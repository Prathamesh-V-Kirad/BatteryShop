import { useStore } from "@nanostores/react"
import { cart, addItem, updateQuantity } from "../stores/cart"
import { ShoppingCart, Plus, Minus, Check } from "lucide-react"

export function ProductCard({ product }: { product: any }) {
  const $cart = useStore(cart)
  const quantity = $cart[product.id]?.quantity ?? 0
  const isInCart = quantity > 0

  return (
    <div className="group border rounded flex flex-col overflow-hidden">
      <div className="relative aspect-square bg-zinc-50">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain p-6 w-full h-full"
        />

        <div className="absolute top-3 left-3 bg-white px-2 py-1 text-xs font-bold">
          {product.category}
        </div>

        {isInCart && (
          <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 text-xs flex items-center gap-1">
            <Check className="h-3 w-3" />
            In Cart
          </div>
        )}
      </div>

      <div className="p-4 flex-1 space-y-3">
        <h3 className="font-bold">{product.name}</h3>
        <div className="text-xs text-zinc-500 uppercase">
          {product.voltage} • {product.capacity}
        </div>

        <ul className="space-y-1">
          {product.specs.map((s: string) => (
            <li key={s} className="text-xs flex gap-2">
              <span className="h-1 w-1 bg-primary rounded-full mt-2" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 space-y-2">
        <a
          href={`/products/${product.id}`}
          className="block text-center border py-2 text-xs font-bold"
        >
          View Details
        </a>

        {product.category === "Industrial" ? (
          <button className="w-full py-2 text-xs font-bold bg-primary text-white">
            Get Quote
          </button>
        ) : isInCart ? (
          <div className="flex items-center justify-between border rounded h-10">
            <button onClick={() => updateQuantity(product.id, -1)}>
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-bold">{quantity}</span>
            <button onClick={() => updateQuantity(product.id, 1)}>
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                category: product.category,
                type: product.type,
                voltage: product.voltage,
                capacity: product.capacity,
                image: product.image,
              })
            }
            className="w-full py-2 text-xs font-bold bg-primary text-white flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}
