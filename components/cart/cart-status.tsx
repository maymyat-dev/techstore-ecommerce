import { ShoppingCart, CreditCard, CheckCircle, PartyPopper } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

const CartStatus = () => {
  const cartPosition = useCartStore((state) => state.cartPosition);

  const steps = [
    { id: "Order", icon: ShoppingCart },
    { id: "Checkout", icon: CreditCard },
    { id: "Success", icon: PartyPopper },
  ];

  const currentIndex = steps.findIndex((s) => s.id === cartPosition);

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const status = {
            active: index === currentIndex,
            completed: index < currentIndex,
            upcoming: index > currentIndex,
          };

  
          const wrapperClass =
            index < steps.length - 1
              ? "flex-1 flex items-center relative"
              : "flex items-center relative";

          return (
            <div key={step.id} className={wrapperClass}>

              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border transition-all z-10",
                  status.active && "border-primary bg-primary/10 text-primary",
                  status.completed && "border-primary bg-primary text-white",
                  status.upcoming &&
                    "border-muted-foreground/20 text-muted-foreground"
                )}
              >
                <Icon size={18} />
              </div>


              {index < steps.length - 1 && (
                <div className="flex-1 ml-4">
                  <div
                    className={cn(
                      "h-[1px] w-full rounded-full transition-all",
                      status.completed ? "bg-primary" : "bg-muted-foreground/20"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartStatus;
