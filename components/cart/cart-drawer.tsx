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

type CartDrawerProps = {
    children: React.ReactNode,

}
const CartDrawer = ({ children }: CartDrawerProps) => {

  return (
    <Drawer>
  <DrawerTrigger>{children}</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Your cart</DrawerTitle>
      <DrawerDescription> <CartShoppingItem/> </DrawerDescription>
    </DrawerHeader>
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