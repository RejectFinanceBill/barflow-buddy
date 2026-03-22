import { DollarSign, Package, TrendingUp, AlertTriangle, ShoppingCart } from "lucide-react";
import StatCard from "@/components/StatCard";
import { useStore } from "@/lib/store";

const Dashboard = () => {
  const { sales, products, getLowStockProducts } = useStore();
  const todaySales = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const lowStockItems = getLowStockProducts();
  const totalProducts = products.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground opacity-0 animate-fade-in">Dashboard</h1>
        <p className="text-muted-foreground mt-1 opacity-0 animate-fade-in" style={{ animationDelay: "60ms" }}>
          Today's overview — {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} title="Today's Sales" value={`KSh ${todaySales.toLocaleString()}`} change="+12.3% from yesterday" changeType="positive" delay={100} />
        <StatCard icon={ShoppingCart} title="Transactions" value={`${sales.length}`} change="+3 from yesterday" changeType="positive" delay={160} />
        <StatCard icon={Package} title="Total Products" value={`${totalProducts}`} change="2 added this week" changeType="neutral" delay={220} />
        <StatCard icon={AlertTriangle} title="Low Stock Alerts" value={`${lowStockItems.length}`} change="Needs attention" changeType="negative" delay={280} />
      </div>

      {/* Recent Sales */}
      <div className="glass-card rounded-xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "350ms" }}>
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Recent Sales</h2>
        </div>
        <div className="divide-y divide-border">
          {sales.slice(0, 6).map((sale) => (
            <div key={sale.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs font-semibold">{sale.cashier.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{sale.cashier}</p>
                  <p className="text-xs text-muted-foreground">{new Date(sale.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground tabular-nums">KSh {sale.totalAmount.toLocaleString()}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  sale.paymentMethod === "M-Pesa" ? "bg-success/15 text-success" :
                  sale.paymentMethod === "Card" ? "bg-info/15 text-info" :
                  "bg-primary/15 text-primary"
                }`}>
                  {sale.paymentMethod}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock */}
      {lowStockItems.length > 0 && (
        <div className="glass-card rounded-xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "420ms" }}>
          <div className="p-6 border-b border-border flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h2 className="text-lg font-semibold text-foreground">Low Stock Items</h2>
          </div>
          <div className="divide-y divide-border">
            {lowStockItems.map((product) => (
              <div key={product.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-warning tabular-nums">{product.stockQuantity} left</p>
                  <p className="text-xs text-muted-foreground">Min: {product.lowStockThreshold}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
