import { ChartBarDecreasing, ChartColumnIncreasing } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const DashboardMiniCard = ({ k }) => {
  return (
    <Card className="flex-row items-center justify-between p-2">
      <CardHeader className="w-full gap-0 px-2">
        <CardTitle className="text-xl font-bold">{`${
          k.label === "Total Revenue" ? "$" : ""
        }${k.value}${k.label === "Conversion Rate" ? "%" : ""}`}</CardTitle>

        <CardDescription className="text-xs text-muted-foreground">
          {k.label}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2">
        {k.changeType === "Increase" ? (
          <ChartColumnIncreasing className="text-green-500" size={20} />
        ) : (
          <ChartBarDecreasing className="text-red-500" size={20} />
        )}
        <p
          className={`text-xs ${
            k.changeType === "Increase" ? "text-green-500" : "text-red-500"
          }`}
        >
          {k.change}%
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardMiniCard;
