import { ChartAreaInteractive } from "@/components/AreaChart";
import DashboardMiniCard from "@/components/DashboardMiniCard";
import { Button } from "@/components/ui/button";

const kpis = [
  {
    label: "Total Revenue",
    value: 12000,
    change: 22,
    changeType: "Increase",
  },
  {
    label: "Total Orders",
    value: 100,
    change: 18,
    changeType: "Increase",
  },
  {
    label: "Customers",
    value: 120,
    change: 4.5,
    changeType: "Increase",
  },
  {
    label: "Conversion Rate",
    value: 89.7,
    change: 4.5,
    changeType: "Increase",
  },
];

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button
          variant="outline"
          size="sm"
          aria-label="Manage"
          className="cursor-pointer"
        >
          Manage
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {kpis.map((k, idx) => (
          <DashboardMiniCard key={idx} k={k} />
        ))}
      </div>

      <div>
        <ChartAreaInteractive />
      </div>
    </div>
  );
};

export default Page;
