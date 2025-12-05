"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

type AddToCartProps = {
  maxQuantity: number;
};

const AddToCart = ({ maxQuantity }: AddToCartProps) => {
  const [quantity, setQuantity] = useState(1);

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function increaseQuantity() {
    if (maxQuantity === undefined || quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  }
  return (
    <>
      <div className="flex items-center gap-3 my-4">
        <Button
          size="icon"
          onClick={decreaseQuantity}
          disabled={quantity === 1}
          className="bg-primary disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <div className="flex-1 h-10 flex items-center justify-center bg-gray-100 dark:text-black rounded-md text-lg font-medium">
          {quantity}
        </div>

        <Button
          size="icon"
          onClick={increaseQuantity}
          disabled={quantity >= maxQuantity}
          className="bg-primary"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <Button className="w-full bg-primary h-12 text-base font-semibold">
        Add to Cart
      </Button>
    </>
  );
};

export default AddToCart;
