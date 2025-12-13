import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import CartShoppingItem from "./cart-shopping-item"
import CartStatus from "./cart-status"
import { useCartStore } from "@/store/cart-store"
import Payment from "./payment"
import Success from "./success"
import { useState } from "react"


type CartDrawerProps = {
    children: React.ReactNode,

}
const CartDrawer = ({ children }: CartDrawerProps) => {
  const [open, setOpen] = useState(false)
const cartPosition = useCartStore((state) => state.cartPosition)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger>{children}</DrawerTrigger>
  <DrawerContent className="pb-10">
    <DrawerHeader>
          <DrawerTitle>Your cart</DrawerTitle>
          <CartStatus/>
      
        </DrawerHeader>
        {
          cartPosition === "Order" && <DrawerDescription> <CartShoppingItem /> </DrawerDescription>
        }
        {
          cartPosition === "Checkout" && <DrawerDescription><Payment onClose={() => setOpen(false)} /></DrawerDescription>
        }
        {
          cartPosition === "Success" && <DrawerDescription><Success/></DrawerDescription>
        }
    {/* <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter> */}
  </DrawerContent>
</Drawer>
  )
}

export default CartDrawer