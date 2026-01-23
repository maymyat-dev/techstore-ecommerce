"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { updateOrderStatus } from "@/server/actions/orders";
import { toast } from "sonner";
import { CheckCircle2, Clock, XCircle, Truck } from "lucide-react";
import { useState } from "react";

export type OrderStatus = "pending" | "completed" | "cancelled" | "shipped";

const statusClass: Record<OrderStatus, string> = {
  pending: "text-amber-600 bg-amber-50/50 border-transparent",
  completed: "text-emerald-600 bg-emerald-50/50 border-transparent",
  cancelled: "text-rose-600 bg-rose-50/50 border-transparent",
  shipped: "text-sky-600 bg-sky-50/50 border-transparent",
};

type OrderStatusProps = {
  orderId: number;
  currentStatus: OrderStatus;
};

const UpdateOrderStatus = ({ orderId, currentStatus }: OrderStatusProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const handleStatusChange = async (newStatus: OrderStatus) => {
    setIsLoading(true);

    const prevStatus = status;
    setStatus(newStatus);
    const result = await updateOrderStatus({
      id: orderId,
      status: newStatus,
    });

    if (result?.data?.success) {
      toast.success(result.data.success);
    } else {
      setStatus(prevStatus);
      toast.error(result?.data?.error ?? "Unexpected error");
    }
    setIsLoading(false);
  };

  const isCompleted = status === "completed";

  return (
    <Select
      value={status}
      onValueChange={(value) => handleStatusChange(value as OrderStatus)}
      disabled={isCompleted || isLoading}
    >
      <SelectTrigger
        className={cn(
          "h-9 w-[150px] justify-between rounded-full border px-3 text-sm",
          "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
          "data-[state=open]:ring-0 data-[state=open]:ring-offset-0",
          statusClass[status],
        )}
      >
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent className="min-w-[150px]">
        {isCompleted ? (
          <SelectItem value="completed" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Completed
          </SelectItem>
        ) : (
          <>
            <SelectItem value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              Pending
            </SelectItem>

            <SelectItem value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Completed
            </SelectItem>

            <SelectItem value="cancelled" className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              Cancelled
            </SelectItem>

            <SelectItem value="shipped" className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-sky-600" />
              Shipped
            </SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default UpdateOrderStatus;
