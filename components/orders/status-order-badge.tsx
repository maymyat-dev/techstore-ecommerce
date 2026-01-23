import { CheckCircle2, Clock, XCircle, Truck } from "lucide-react";

type OrderStatus = "pending" | "completed" | "cancelled" | "shipped";

const statusBadgeClass: Record<OrderStatus, string> = {
  pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
  shipped: "bg-blue-50 text-blue-600 border-blue-200",
  completed: "bg-green-50 text-green-600 border-green-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium border inline-flex items-center gap-2 ${statusBadgeClass[status]}`}
    >
      {status === "pending" && <Clock className="h-4 w-4" />}
      {status === "shipped" && <Truck className="h-4 w-4" />}
      {status === "completed" && <CheckCircle2 className="h-4 w-4" />}
      {status === "cancelled" && <XCircle className="h-4 w-4" />}
      {status}
    </span>
  );
};

export default OrderStatusBadge;