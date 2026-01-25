import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2">
        <h2 className="text-2xl font-bold">Orders</h2>
        <Button
          variant="outline"
          size="sm"
          aria-label="Export"
          className="cursor-pointer"
        >
          Export
        </Button>
      </div>
      <div className="bg-accent/10 space-y-4 shadow-sm p-2 rounded-md">
        <form className="bg-input/40 w-fit flex items-center rounded-sm">
          <input
            type="text"
            placeholder="Search"
            className="w-40 text-sm outline-0 pl-1"
          />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Search"
            className="cursor-pointer"
          >
            <Search />
          </Button>
        </form>
        <table className="w-full">
          <thead>
            <tr className="text-left border border-b-2 border-border border-t-0 border-x-0">
              <th className="text-sm font-semibold pb-1">Name</th>
              <th className="text-sm font-semibold pb-1">Location</th>
              <th className="text-sm font-semibold pb-1">Orders</th>
              <th className="text-sm font-semibold pb-1">Spent</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-left border border-b-border border-t-0 border-x-0">
              <td className="text-sm py-1">Shakerullah</td>
              <td className="text-sm py-1">New York, USA</td>
              <td className="text-sm py-1">7</td>
              <td className="text-sm py-1">$34,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
