import AnalyticsCard from "@/components/analytics/analytics-card";
import AnalyticsChart from "@/components/analytics/analytics-chart";
import { analytics, weeklyAnalytics } from "@/server/actions/analytics";

import {
  Clock,
  CheckCircle2,
  Users,
  Package,
} from "lucide-react";

const AnalyticsPage = async () => {
  const data = await analytics();
  const weeklyAnalyticsData = await weeklyAnalytics();
  console.log("weeklyAnalyticsData", weeklyAnalyticsData);

  if (!data) {
    return <main className="p-6"><p>No data available</p></main>;
  }

  const stats = [
    {
      title: "Pending Orders",
      count: data.pendingOrders,
      icon: <Clock size={20} />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Completed Orders",
      count: data.completedOrders,
      icon: <CheckCircle2 size={20} />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Total Users",
      count: data.totalUsers,
      icon: <Users size={20} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Products",
      count: data.productCount,
      icon: <Package size={20} />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <main>
      <h1 className="text-xl font-semibold mb-5">Dashboard Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        {stats.map((item, i) => (
          <AnalyticsCard
            key={i}
            title={item.title}
            count={item.count}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
      <AnalyticsChart chartData={weeklyAnalyticsData!} />
    </main>
  );
};

export default AnalyticsPage;
