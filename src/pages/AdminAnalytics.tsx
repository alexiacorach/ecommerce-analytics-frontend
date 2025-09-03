import { SalesChartAdmin } from "../components/SalesChartAdmin";
import { TopCustomersAdmin } from "../components/TopCustomersAdmin";
import { TopProductsAdmin } from "../components/TopProcuctsAdmin";

export default function AdminAnalytics() {
  return (
  <div className="d-flex flex-column gap-4">
      <h1 className="text-2xl font-bold mb-3">Analytics Panel</h1>

      {/* Cada tarjeta de gráfico */}
      <div className="bg-white shadow rounded-2xl p-4 flex-fill overflow-auto">
        <SalesChartAdmin />
      </div>

      <div className="bg-white shadow rounded-2xl p-4 flex-fill overflow-auto">
        <TopProductsAdmin />
      </div>

      <div className="bg-white shadow rounded-2xl p-4 flex-fill overflow-auto">
        <TopCustomersAdmin />
      </div>
    </div>
  );
}
