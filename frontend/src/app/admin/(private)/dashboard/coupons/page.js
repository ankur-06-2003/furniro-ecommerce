import CouponForm from "@/components/CouponForm";
import { Search } from "lucide-react";

const Page = () => {
  return (
    <div className="h-full flex justify-between gap-4">
      <div className="w-full space-y-4">
        <h2 className="text-2xl font-bold">Coupons</h2>

        <div className="bg-accent/10 space-y-4 shadow-sm p-2 rounded-md">
          <form className="bg-input/40 w-fit flex items-center rounded-sm">
            <input
              type="text"
              placeholder="Search"
              className="w-40 text-sm outline-0 pl-1"
            />
            <button
              aria-label="Search"
              className="p-1 rounded-full hover:bg-accent/40 hover:text-accent-foreground/80 transition-colors duration-300 cursor-pointer"
            >
              <Search />
            </button>
          </form>
          <table className="w-full">
            <thead>
              <tr className="text-left border border-b-2 border-border border-t-0 border-x-0">
                <th className="text-sm font-semibold pb-1">Coupon Name</th>
                <th className="text-sm font-semibold pb-1">Usage</th>
                <th className="text-sm font-semibold pb-1">Status</th>
                <th className="text-sm font-semibold pb-1">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-left border border-b-border border-t-0 border-x-0">
                <td className="text-sm py-1">Summer discount 10% OFF</td>
                <td className="text-sm py-1">10</td>
                <td className="text-sm py-1">active</td>
                <td className="text-sm py-1">10 Jan, 2025 - 10 Feb, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-4 py-2 border-l border-border">
        <CouponForm />
      </div>
    </div>
  );
};

export default Page;
