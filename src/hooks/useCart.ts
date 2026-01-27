import { useEffect, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const save = (items: any[]) => {
    setCart(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = (product: any) => {
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) save([...cart, product]);
  };

  const removeFromCart = (id: string) => {
    save(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => save([]);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
