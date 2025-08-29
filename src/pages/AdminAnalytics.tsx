import { SalesChartAdmin } from "../components/SalesChartAdmin";
import { TopCustomersAdmin } from "../components/TopCustomersAdmin";
import { TopProductsAdmin } from "../components/TopProcuctsAdmin";


export default function AdminAnalytics() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Panel</h1>
      <SalesChartAdmin />
      <TopProductsAdmin/>
      <TopCustomersAdmin/>
    </div>
  );
}
