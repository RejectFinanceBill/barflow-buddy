export type Category = "Beer" | "Spirits" | "Wines" | "Soft Drinks" | "Food" | "Supplies";

export interface Product {
  id: string;
  name: string;
  category: Category;
  buyingPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  lowStockThreshold: number;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: "Cash" | "M-Pesa" | "Card";
  date: string;
  cashier: string;
}

export const categories: Category[] = ["Beer", "Spirits", "Wines", "Soft Drinks", "Food", "Supplies"];

export const sampleProducts: Product[] = [
  { id: "1", name: "Tusker Lager", category: "Beer", buyingPrice: 120, sellingPrice: 200, stockQuantity: 48, lowStockThreshold: 12, unit: "bottle" },
  { id: "2", name: "Heineken", category: "Beer", buyingPrice: 150, sellingPrice: 280, stockQuantity: 36, lowStockThreshold: 12, unit: "bottle" },
  { id: "3", name: "Guinness", category: "Beer", buyingPrice: 160, sellingPrice: 300, stockQuantity: 24, lowStockThreshold: 10, unit: "bottle" },
  { id: "4", name: "Jameson Whiskey", category: "Spirits", buyingPrice: 2800, sellingPrice: 350, stockQuantity: 8, lowStockThreshold: 3, unit: "shot" },
  { id: "5", name: "Johnnie Walker Black", category: "Spirits", buyingPrice: 3500, sellingPrice: 450, stockQuantity: 5, lowStockThreshold: 2, unit: "shot" },
  { id: "6", name: "Smirnoff Vodka", category: "Spirits", buyingPrice: 1200, sellingPrice: 250, stockQuantity: 10, lowStockThreshold: 3, unit: "shot" },
  { id: "7", name: "Four Cousins Sweet Red", category: "Wines", buyingPrice: 800, sellingPrice: 1200, stockQuantity: 15, lowStockThreshold: 5, unit: "bottle" },
  { id: "8", name: "Frontera Cabernet", category: "Wines", buyingPrice: 950, sellingPrice: 1400, stockQuantity: 8, lowStockThreshold: 4, unit: "bottle" },
  { id: "9", name: "Coca-Cola", category: "Soft Drinks", buyingPrice: 40, sellingPrice: 100, stockQuantity: 60, lowStockThreshold: 20, unit: "bottle" },
  { id: "10", name: "Red Bull", category: "Soft Drinks", buyingPrice: 150, sellingPrice: 300, stockQuantity: 30, lowStockThreshold: 10, unit: "can" },
  { id: "11", name: "Sprite", category: "Soft Drinks", buyingPrice: 40, sellingPrice: 100, stockQuantity: 45, lowStockThreshold: 15, unit: "bottle" },
  { id: "12", name: "Chips Masala", category: "Food", buyingPrice: 80, sellingPrice: 200, stockQuantity: 20, lowStockThreshold: 5, unit: "plate" },
  { id: "13", name: "Chicken Wings", category: "Food", buyingPrice: 150, sellingPrice: 350, stockQuantity: 15, lowStockThreshold: 5, unit: "plate" },
  { id: "14", name: "Nyama Choma (500g)", category: "Food", buyingPrice: 300, sellingPrice: 600, stockQuantity: 10, lowStockThreshold: 3, unit: "plate" },
];

export const sampleSales: Sale[] = [
  { id: "s1", items: [], totalAmount: 1400, paymentMethod: "M-Pesa", date: "2026-03-20T14:30:00", cashier: "Grace M." },
  { id: "s2", items: [], totalAmount: 850, paymentMethod: "Cash", date: "2026-03-20T15:10:00", cashier: "Brian K." },
  { id: "s3", items: [], totalAmount: 2200, paymentMethod: "Card", date: "2026-03-20T16:45:00", cashier: "Grace M." },
  { id: "s4", items: [], totalAmount: 600, paymentMethod: "Cash", date: "2026-03-20T17:20:00", cashier: "Brian K." },
  { id: "s5", items: [], totalAmount: 3100, paymentMethod: "M-Pesa", date: "2026-03-20T18:05:00", cashier: "Grace M." },
  { id: "s6", items: [], totalAmount: 1750, paymentMethod: "Cash", date: "2026-03-20T19:30:00", cashier: "Brian K." },
  { id: "s7", items: [], totalAmount: 4200, paymentMethod: "M-Pesa", date: "2026-03-20T20:15:00", cashier: "Grace M." },
  { id: "s8", items: [], totalAmount: 900, paymentMethod: "Card", date: "2026-03-20T21:00:00", cashier: "Brian K." },
];
