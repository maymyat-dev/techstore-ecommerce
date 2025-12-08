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


type CartDrawerProps = {
    children: React.ReactNode,

}
const CartDrawer = ({ children }: CartDrawerProps) => {
const cartPosition = useCartStore((state) => state.cartPosition)
  return (
    <Drawer>
  <DrawerTrigger>{children}</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
          <DrawerTitle>Your cart</DrawerTitle>
          <CartStatus/>
      
        </DrawerHeader>
        {
          cartPosition === "Order" && <DrawerDescription> <CartShoppingItem /> </DrawerDescription>
        }
        {
          cartPosition === "Checkout" && <p>Checkout</p>
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