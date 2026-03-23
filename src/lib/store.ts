import { useState, useCallback } from "react";
import { sampleProducts, sampleSales, type Product, type Sale, type CartItem } from "./data";

// Simple global state store for products and sales
let _products = [...sampleProducts];
let _sales = [...sampleSales];
let _listeners: Set<() => void> = new Set();

function notify() {
  _listeners.forEach((l) => l());
}

export function useStore() {
  const [, setTick] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => setTick((t) => t + 1);
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, []);

  // Subscribe on mount
  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  return {
    products: _products,
    sales: _sales,
    addSale: (sale: Sale, items: CartItem[]) => {
      _sales = [sale, ..._sales];
      // Deduct stock
      items.forEach((item) => {
        _products = _products.map((p) =>
          p.id === item.product.id
            ? { ...p, stockQuantity: Math.max(0, p.stockQuantity - item.quantity) }
            : p
        );
      });
      notify();
    },
    addProduct: (product: Product) => {
      _products = [product, ..._products];
      notify();
    },
    updateProduct: (id: string, updates: Partial<Product>) => {
      _products = _products.map((p) => (p.id === id ? { ...p, ...updates } : p));
      notify();
    },
    getLowStockProducts: () => _products.filter((p) => p.stockQuantity <= p.lowStockThreshold),
  };
}
