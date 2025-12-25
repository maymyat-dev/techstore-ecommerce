import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { orders } from "@/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import { getOrders } from "@/server/actions/get-orders";
import CommonPagination from "@/components/products/common-pagination";

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const session = await auth();
  if (!session) return redirect("/");

  const page = Number(searchParams.page) || 1;

  const res = await getOrders(page, 10);

  if ("error" in res) return <div>Error: {res.error}</div>;

  const { customerOrders, totalPages, currentPage } = res;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>View your all orders and status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Total</TableHead>

              <TableHead>Ordered On</TableHead>

              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerOrders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell>{order.created?.toString()}</TableCell>
                  <TableCell>
                    {order.status === "pending" && (
                      <span className="text-yellow-500 border border-yellow-500 bg-yellow-50 rounded-full px-4 py-1">
                        {order.status}
                      </span>
                    )}
                    {order.status === "completed" && (
                      <span className="text-green-500 border border-green-500 bg-green-50 rounded-full px-4 py-1">
                        {order.status}
                      </span>
                    )}
                    {order.status === "cancelled" && (
                      <span className="text-red-500 border border-red-500 bg-red-50 rounded-full px-4 py-1">
                        {order.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Detail</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 overflow-x-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Details of Order # {order.id}
                            </DialogTitle>
                            <DialogDescription>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-[100px]">
                                      Image
                                    </TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Price</TableHead>

                                    <TableHead className="text-right">
                                      Variant
                                    </TableHead>
                                    <TableHead className="text-right">
                                      Quantity
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order.orderProduct.map(
                                    ({
                                      product,
                                      productVariants,
                                      quantity,
                                    }) => (
                                      <TableRow key={product.id}>
                                        <TableCell>
                                          <Image
                                            src={
                                              productVariants.variantImages[0]
                                                ?.image_url
                                            }
                                            alt={product.title}
                                            width={50}
                                            height={50}
                                          />
                                        </TableCell>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>
                                          {formatCurrency(product.price)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                          <div
                                            className="w-4 h-4 rounded-full"
                                            style={{
                                              backgroundColor:
                                                productVariants.color,
                                            }}
                                          ></div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                          {quantity}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </form>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <CommonPagination currentPage={currentPage} totalPages={totalPages} />
      </CardContent>
    </Card>
  );
};

export default OrdersPage;
