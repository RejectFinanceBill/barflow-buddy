import { useState, useMemo } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, Smartphone, Receipt, ShoppingCart, X } from "lucide-react";
import { sampleProducts, categories, type CartItem, type Category } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const POS = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const addToCart = (product: typeof sampleProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.product.id === productId) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : i;
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const total = cart.reduce((sum, i) => sum + i.product.sellingPrice * i.quantity, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = (method: string) => {
    if (cart.length === 0) return;
    toast.success(`Sale of KSh ${total.toLocaleString()} completed via ${method}`);
    setCart([]);
    setCartOpen(false);
  };

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col relative">
      {/* Header */}
      <div className="opacity-0 animate-fade-in">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Point of Sale</h1>
            <p className="text-muted-foreground mt-1 text-sm">Select items to add to cart</p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 active:scale-[0.97] transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3 mt-6 opacity-0 animate-fade-in" style={{ animationDelay: "80ms" }}>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4 flex-wrap opacity-0 animate-fade-in" style={{ animationDelay: "140ms" }}>
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as Category | "All")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid - full width */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-6 overflow-y-auto flex-1 pb-4 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
        {filteredProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => addToCart(product)}
            className="glass-card rounded-xl p-4 text-left hover:border-primary/40 transition-all duration-200 active:scale-[0.97] group"
          >
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
            <div className="flex items-end justify-between mt-3">
              <p className="text-lg font-bold text-primary tabular-nums">KSh {product.sellingPrice}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                product.stockQuantity <= product.lowStockThreshold
                  ? "bg-warning/15 text-warning"
                  : "bg-success/15 text-success"
              }`}>
                {product.stockQuantity} left
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Cart Drawer Overlay */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ marginLeft: 0 }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-card border-l border-border flex flex-col animate-slide-in-right">
            {/* Cart Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  Current Order
                </h2>
                <p className="text-xs text-muted-foreground mt-1">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 active:scale-95 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingCartEmpty />
                  <p className="text-sm mt-3">No items in cart</p>
                  <p className="text-xs mt-1">Tap a product to add it</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="bg-secondary/50 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">KSh {item.product.sellingPrice} / {item.product.unit}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80 active:scale-95 transition-all">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold tabular-nums w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80 active:scale-95 transition-all">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-foreground tabular-nums">KSh {(item.product.sellingPrice * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout */}
            <div className="p-5 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium">Total</span>
                <span className="text-2xl font-bold text-foreground tabular-nums">KSh {total.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button onClick={() => handleCheckout("Cash")} disabled={cart.length === 0} className="flex-col h-auto py-3 bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] transition-all">
                  <Banknote className="w-5 h-5 mb-1" />
                  <span className="text-xs">Cash</span>
                </Button>
                <Button onClick={() => handleCheckout("M-Pesa")} disabled={cart.length === 0} className="flex-col h-auto py-3 bg-success hover:bg-success/90 text-primary-foreground active:scale-[0.97] transition-all">
                  <Smartphone className="w-5 h-5 mb-1" />
                  <span className="text-xs">M-Pesa</span>
                </Button>
                <Button onClick={() => handleCheckout("Card")} disabled={cart.length === 0} className="flex-col h-auto py-3 bg-info hover:bg-info/90 text-primary-foreground active:scale-[0.97] transition-all">
                  <CreditCard className="w-5 h-5 mb-1" />
                  <span className="text-xs">Card</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ShoppingCartEmpty = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
    <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

export default POS;
