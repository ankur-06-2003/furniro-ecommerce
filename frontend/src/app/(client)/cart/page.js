"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCart from "@/stores/cartStore";
import useProducts from "@/stores/productStore";
import useAuth from "@/stores/userStore";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const Page = () => {
  const { user } = useAuth();
  const { cart, getCart, updateQty, removeItem, clearCart } = useCart();
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  const getStock = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product?.stock ?? 0;
  };

  if (!cart?.items?.length)
    return (
      <Empty className="h-[80vh] border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingCart />
          </EmptyMedia>
          <EmptyTitle>Cart is Empty</EmptyTitle>
          <Button variant="link" size="sm">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </EmptyHeader>
        <EmptyContent>
          <p className="text-base">
            <Link
              href="/login?redirect=cart"
              className="text-primary underline"
            >
              Login
            </Link>{" "}
            for faster checkout.
          </p>
        </EmptyContent>
      </Empty>
    );

  const total = Array.isArray(cart.items)
    ? cart.items.reduce(
        (sum, item) => sum + item.productID.price * item.quantity,
        0
      )
    : 0;

  const requestOTP = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/otp/request-otp`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      } else {
        router.push("/verify-otp?redirect=cart");

        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-2 p-2 md:p4 lg:p-8">
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="divide-x">
              <TableHead className="text-center">Product</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Subtotal</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(cart.items) &&
              cart.items.map((i) => {
                const stock = getStock(i.productID._id);

                return (
                  <TableRow key={i.productID._id} className="divide-x">
                    <TableCell className="max-w-40">
                      {i.productID?.title || "Deleted Product"}
                    </TableCell>
                    <TableCell className="text-right">
                      {i.productID?.price ?? 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {i.quantity ?? 0}
                    </TableCell>
                    <TableCell className="text-right">
                      {i.productID.price * i.quantity ?? 0}
                    </TableCell>
                    <TableCell className="space-x-1">
                      <Button
                        size="icon-sm"
                        aria-label="Decrease"
                        className="cursor-pointer"
                        disabled={i.quantity <= 1}
                        onClick={() =>
                          i.quantity > 1 && updateQty(i.productID._id, -1)
                        }
                      >
                        <Minus />
                      </Button>
                      <Button
                        size="icon-sm"
                        aria-label="Increase"
                        className="cursor-pointer"
                        disabled={i.quantity >= stock}
                        onClick={() => updateQty(i.productID._id, +1)}
                      >
                        <Plus />
                      </Button>
                      <Button
                        size="icon-sm"
                        aria-label="Increase"
                        className="cursor-pointer"
                        onClick={() => removeItem(i.productID._id)}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>

      <div className="w-100 md:min-w-60 bg-accent/40 flex flex-col items-center gap-4 p-2 md:p-4 rounded-md">
        <div className="min-w-[200px] space-y-4">
          <h3 className="text-xl text-center font-bold">Carts Total</h3>

          <div className="flex justify-between">
            <p className="font-semibold">Total</p>
            <p className="text-muted-foreground font-semibold">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>

        {user && !user.isVerified && (
          <p className="text-sm">
            Verify your email to place order{" "}
            <Button variant="link" size="sm" onClick={requestOTP}>
              Verify Email
            </Button>
          </p>
        )}

        <div className="space-x-2">
          <Button
            variant="outline"
            aria-label="Clear cart"
            onClick={clearCart}
            className="cursor-pointer"
          >
            Clear Cart
          </Button>

          <Button aria-label="Checkout">
            <Link href={user ? "/checkout" : "/login?redirect=checkout"}>
              Checkout
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
