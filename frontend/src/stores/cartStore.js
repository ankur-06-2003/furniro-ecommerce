import { toast } from "sonner";
import { create } from "zustand";

const useCart = create((set, get) => ({
  cart: {},

  getCart: async () => {
    try {
      const guestID = typeof window !== "undefined" ? localStorage.getItem("guestID") : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/my-cart`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guestID }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      }

      set({ cart: data.cart });
    } catch (error) {
      toast.error("Failed to fetch cart");
    }
  },

  updateQty: async (productID, quantity) => {
    try {
      const guestID = typeof window !== "undefined" ? localStorage.getItem("guestID") : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/my-cart`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guestID, productID, quantity }),
        }
      );

      if (!res.ok) throw new Error("Failed to update Qty");

      get().getCart();

      if (quantity === +1) toast.success("Quantity increased");
      if (quantity === -1) toast.success("Quantity decreased");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  },

  removeItem: async (productID) => {
    try {
      const guestID = typeof window !== "undefined" ? localStorage.getItem("guestID") : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/my-cart/item`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guestID, productID }),
        }
      );

      if (!res.ok) throw new Error("Failed to remove item");

      get().getCart();

      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  },

  clearCart: async () => {
    try {
      const guestID = typeof window !== "undefined" ? localStorage.getItem("guestID") : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/my-cart`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guestID }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      }

      get().getCart();

      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  },
}));

export default useCart;
