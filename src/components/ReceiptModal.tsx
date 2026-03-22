import { X, Printer, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/data";

interface ReceiptModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  saleId: string;
  date: string;
  cashier: string;
}

const ReceiptModal = ({ open, onClose, items, total, paymentMethod, saleId, date, cashier }: ReceiptModalProps) => {
  if (!open) return null;

  const handlePrint = () => window.print();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ marginLeft: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="text-center p-6 pb-4">
          <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7 text-success" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Sale Complete!</h2>
          <p className="text-xs text-muted-foreground mt-1">Receipt #{saleId}</p>
        </div>

        {/* Receipt body */}
        <div className="mx-4 border border-dashed border-border rounded-lg p-4 bg-secondary/30">
          <div className="text-center mb-3 pb-3 border-b border-dashed border-border">
            <p className="text-sm font-bold text-foreground">BarKeep POS</p>
            <p className="text-xs text-muted-foreground">{new Date(date).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Cashier: {cashier}</p>
          </div>

          <div className="space-y-2 mb-3 pb-3 border-b border-dashed border-border">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-xs">
                <span className="text-foreground">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="text-foreground tabular-nums font-medium">
                  KSh {(item.product.sellingPrice * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-foreground">TOTAL</span>
            <span className="text-lg font-bold text-primary tabular-nums">KSh {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Payment</span>
            <span className="font-medium">{paymentMethod}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 flex gap-2">
          <Button onClick={handlePrint} variant="secondary" className="flex-1 gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button onClick={onClose} className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Share2 className="w-4 h-4" /> Done
          </Button>
        </div>

        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
