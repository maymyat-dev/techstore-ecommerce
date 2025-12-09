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
          cartPosition === "Checkout" && <DrawerDescription><Payment/></DrawerDescription>
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