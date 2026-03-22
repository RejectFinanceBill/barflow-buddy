import { useMemo, useState } from "react";
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(40,96%,54%)", "hsl(142,71%,45%)", "hsl(199,89%,48%)", "hsl(0,72%,51%)", "hsl(280,65%,60%)"];

const Reports = () => {
  const { sales, products } = useStore();
  const [period, setPeriod] = useState<"today" | "week" | "month">("today");

  const stats = useMemo(() => {
    const totalRevenue = sales.reduce((s, sale) => s + sale.totalAmount, 0);
    const totalTransactions = sales.length;
    const avgTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    // Payment method breakdown
    const paymentBreakdown = sales.reduce((acc, sale) => {
      acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + sale.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    const paymentData = Object.entries(paymentBreakdown).map(([name, value]) => ({ name, value }));

    // Hourly sales (simulated from sample data)
    const hourlySales = sales.reduce((acc, sale) => {
      const hour = new Date(sale.date).getHours();
      const label = `${hour}:00`;
      const existing = acc.find((a) => a.hour === label);
      if (existing) {
        existing.amount += sale.totalAmount;
        existing.count += 1;
      } else {
        acc.push({ hour: label, amount: sale.totalAmount, count: 1 });
      }
      return acc;
    }, [] as { hour: string; amount: number; count: number }[]);

    // Top selling - derive from sale amounts per cashier for demo
    const topProducts = products
      .map((p) => ({
        name: p.name,
        sold: Math.max(0, 50 - p.stockQuantity), // estimate from stock depletion
        revenue: Math.max(0, 50 - p.stockQuantity) * p.sellingPrice,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return { totalRevenue, totalTransactions, avgTransaction, paymentData, hourlySales, topProducts };
  }, [sales, products]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1 text-sm">Sales analytics and performance tracking</p>
        </div>
        <div className="flex gap-1 bg-secondary rounded-lg p-1">
          {(["today", "week", "month"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
                period === p ? "bg-primary text-primary-foreground" : "text-secondary-foreground hover:text-foreground"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Revenue</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">KSh {stats.totalRevenue.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-success">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12.3% from yesterday</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Transactions</span>
            <div className="w-9 h-9 rounded-lg bg-info/10 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-info" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{stats.totalTransactions}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-success">
            <ArrowUpRight className="w-3 h-3" />
            <span>+3 from yesterday</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Avg. Transaction</span>
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">KSh {Math.round(stats.avgTransaction).toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
            <ArrowDownRight className="w-3 h-3" />
            <span>-2.1% from yesterday</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Hourly Sales Chart */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Sales by Hour
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.hourlySales}>
                <XAxis dataKey="hour" stroke="hsl(220,10%,55%)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(220,10%,55%)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "hsl(220,18%,13%)", border: "1px solid hsl(220,14%,20%)", borderRadius: "8px", fontSize: "12px" }}
                  labelStyle={{ color: "hsl(40,10%,90%)" }}
                  formatter={(value: number) => [`KSh ${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="amount" fill="hsl(40,96%,54%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Pie */}
        <div className="glass-card rounded-xl p-5 opacity-0 animate-fade-in" style={{ animationDelay: "280ms" }}>
          <h3 className="text-sm font-semibold text-foreground mb-4">Payment Methods</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.paymentData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={4}>
                  {stats.paymentData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(220,18%,13%)", border: "1px solid hsl(220,14%,20%)", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value: number) => [`KSh ${value.toLocaleString()}`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {stats.paymentData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-foreground font-medium tabular-nums">KSh {item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="glass-card rounded-xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "350ms" }}>
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Top Selling Products
          </h3>
        </div>
        <div className="divide-y divide-border">
          {stats.topProducts.map((product, i) => (
            <div key={product.name} className="px-5 py-3.5 flex items-center justify-between hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</span>
                <span className="text-sm font-medium text-foreground">{product.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground tabular-nums">KSh {product.revenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{product.sold} units sold</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
