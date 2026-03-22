import { useState, useMemo } from "react";
import { Search, Plus, Package, ArrowUpDown } from "lucide-react";
import { categories, type Category } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Inventory = () => {
  const { products } = useStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [sortBy, setSortBy] = useState<"name" | "stock" | "price">("name");

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "stock") return a.stockQuantity - b.stockQuantity;
        return b.sellingPrice - a.sellingPrice;
      });
  }, [search, activeCategory, sortBy, products]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground mt-1 text-sm">{products.length} products tracked</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.97] transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "80ms" }}>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
        </div>
        <div className="flex gap-2">
          {(["name", "stock", "price"] as const).map(s => (
            <button key={s} onClick={() => setSortBy(s)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all active:scale-[0.97] flex items-center gap-1 ${
              sortBy === s ? "bg-primary/15 text-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}>
              <ArrowUpDown className="w-3 h-3" />
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap opacity-0 animate-fade-in" style={{ animationDelay: "140ms" }}>
        {["All", ...categories].map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat as Category | "All")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
            activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Product</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Category</th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Buy Price</th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Sell Price</th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Stock</th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProducts.map((product) => {
              const isLow = product.stockQuantity <= product.lowStockThreshold;
              return (
                <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">per {product.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground text-right tabular-nums">KSh {product.buyingPrice.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground text-right tabular-nums">KSh {product.sellingPrice.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-right tabular-nums">{product.stockQuantity}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      isLow ? "bg-warning/15 text-warning" : "bg-success/15 text-success"
                    }`}>
                      {isLow ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
