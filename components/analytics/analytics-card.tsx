import { Card, CardHeader } from "../ui/card"

type AnalyticsCardProps = {
    count: number,
    title: string,
    icon: React.ReactNode
    color: string
}

const AnalyticsCard = ({ title, count, icon, color }: AnalyticsCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 border hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold mt-1">{count}</h2>
        </div>

        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};


export default AnalyticsCard