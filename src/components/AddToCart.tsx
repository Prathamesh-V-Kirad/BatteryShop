import { useStore } from "@nanostores/react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { cart, addItem, updateQuantity } from "../stores/cart";

interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  voltage: string;
  capacity: string;
  image: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const $cart = useStore(cart);
  const quantity = $cart[product.id]?.quantity ?? 0;
  const isInCart = quantity > 0;


  const baseClasses = "h-14 w-full flex items-center justify-center font-bold text-xs lg:text-sm uppercase tracking-[0.15em] border border-gray-500 transition-colors";

  if (product.category === "Industrial") {
    return (
      <button className={`${baseClasses} bg-primary text-white hover:bg-primary/90`}>
        Get Quote
      </button>
    );
  }

  if (isInCart) {
    return (
      <div className={`${baseClasses} gap-6 px-6`}>
        <button 
          onClick={() => updateQuantity(product.id, -1)}
          className="hover:text-primary transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="font-bold text-base">{quantity}</span>
        <button 
          onClick={() => updateQuantity(product.id, 1)}
          className="hover:text-primary transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
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
      className={`${baseClasses} bg-primary text-white hover:bg-primary/90 gap-2`}
    >
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </button>
  );
}