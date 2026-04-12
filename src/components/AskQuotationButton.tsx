import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import CheckoutModal from "./checkoutModal";

export default function AskQuotationButton({ product }: { product: any }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setShowCheckout(true)}
        className="h-14 px-6 lg:px-8 font-bold text-xs lg:text-sm uppercase tracking-[0.15em] flex-1 border border-gray-500 bg-primary text-white hover:bg-primary/70 transition-colors"
      >
        Ask For Quotation
      </button>

      {/* Modal (Portal) */}
      {mounted && showCheckout &&
        createPortal(
          <CheckoutModal
            items={[
              {
                id: product.id,
                name: product.name,
                voltage: product.specs.voltage,
                capacity: product.specs.capacity,
                image: product.image,
                price: product.price,
                quantity: 1,
              },
            ]}
            onClose={() => setShowCheckout(false)}
          />,
          document.body
        )}
    </>
  );
}