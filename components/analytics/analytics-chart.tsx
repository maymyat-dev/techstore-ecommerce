"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  order: {
    label: "Order",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type Data = {
  day: string;
  count: number;
};
type AnalyticsChartProps = {
  chartData: Data[];
};
const AnalyticsChart = ({ chartData }: AnalyticsChartProps) => {
  return (
    <Card className="w-full shadow-[0_0_15px_rgba(255,255,255,0.05)]">
      <CardHeader>
        <CardTitle>Sale Chart</CardTitle>
        <CardDescription>
          Show the number of orders a week
          <span className="ml-2">
            {" "}
            {chartData[0].day} {chartData[chartData.length - 1].day}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-90">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="day"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="count"
              type="natural"
              fill="var(--color-primary)"
              fillOpacity={0.4}
              stroke="var(--color-primary)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        {/* <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div> */}
      </CardFooter>
    </Card>
  );
};

export default AnalyticsChart;
