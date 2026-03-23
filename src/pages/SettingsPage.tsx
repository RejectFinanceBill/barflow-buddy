import { useState } from "react";
import { Settings, Store, CreditCard, Bell, Shield, Database, Printer, Moon, Sun, Save, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const tabs = [
  { id: "business", label: "Business", icon: Store },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "receipts", label: "Receipts", icon: Printer },
  { id: "system", label: "System", icon: Database },
] as const;

type Tab = (typeof tabs)[number]["id"];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("business");

  const [business, setBusiness] = useState({
    name: "BarKeep Lounge",
    phone: "+254 700 123456",
    email: "info@barkeep.co.ke",
    address: "Nairobi, Kenya",
    currency: "KSh",
    taxRate: "16",
  });

  const [payments, setPayments] = useState({
    cashEnabled: true,
    mpesaEnabled: true,
    cardEnabled: true,
    mpesaTill: "",
    mpesaPaybill: "",
  });

  const [notifications, setNotifications] = useState({
    lowStockAlerts: true,
    dailySummary: true,
    salesNotifications: false,
    lowStockThreshold: "10",
    soundEnabled: true,
  });

  const [receipts, setReceipts] = useState({
    autoPrint: false,
    showLogo: true,
    footerMessage: "Thank you for visiting BarKeep!",
    includeVAT: true,
  });

  const [system, setSystem] = useState({
    darkMode: true,
    language: "en",
    autoBackup: true,
    sessionTimeout: "30",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between opacity-0 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1 text-sm">Configure your POS system</p>
        </div>
        <Button onClick={handleSave} className="active:scale-[0.97] transition-all">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="flex gap-6 opacity-0 animate-fade-in" style={{ animationDelay: "80ms" }}>
        {/* Sidebar Tabs */}
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 glass-card rounded-xl p-6 space-y-6">
          {activeTab === "business" && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Business Information</h2>
                <p className="text-sm text-muted-foreground mt-1">Details shown on receipts and reports</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input value={business.name} onChange={e => setBusiness(b => ({ ...b, name: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value={business.phone} onChange={e => setBusiness(b => ({ ...b, phone: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={business.email} onChange={e => setBusiness(b => ({ ...b, email: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input value={business.address} onChange={e => setBusiness(b => ({ ...b, address: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Currency Symbol</Label>
                  <Input value={business.currency} onChange={e => setBusiness(b => ({ ...b, currency: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>VAT / Tax Rate (%)</Label>
                  <Input type="number" value={business.taxRate} onChange={e => setBusiness(b => ({ ...b, taxRate: e.target.value }))} />
                </div>
              </div>
            </>
          )}

          {activeTab === "payments" && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Payment Methods</h2>
                <p className="text-sm text-muted-foreground mt-1">Configure accepted payment options</p>
              </div>
              <Separator />
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Cash Payments</p>
                    <p className="text-xs text-muted-foreground">Accept cash at the counter</p>
                  </div>
                  <Switch checked={payments.cashEnabled} onCheckedChange={v => setPayments(p => ({ ...p, cashEnabled: v }))} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">M-Pesa</p>
                    <p className="text-xs text-muted-foreground">Mobile money payments</p>
                  </div>
                  <Switch checked={payments.mpesaEnabled} onCheckedChange={v => setPayments(p => ({ ...p, mpesaEnabled: v }))} />
                </div>
                {payments.mpesaEnabled && (
                  <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-primary/20">
                    <div className="space-y-2">
                      <Label>Till Number</Label>
                      <Input placeholder="e.g. 123456" value={payments.mpesaTill} onChange={e => setPayments(p => ({ ...p, mpesaTill: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Paybill Number</Label>
                      <Input placeholder="e.g. 654321" value={payments.mpesaPaybill} onChange={e => setPayments(p => ({ ...p, mpesaPaybill: e.target.value }))} />
                    </div>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Card Payments</p>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard via POS terminal</p>
                  </div>
                  <Switch checked={payments.cardEnabled} onCheckedChange={v => setPayments(p => ({ ...p, cardEnabled: v }))} />
                </div>
              </div>
            </>
          )}

          {activeTab === "notifications" && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Alerts & Notifications</h2>
                <p className="text-sm text-muted-foreground mt-1">Control when you get notified</p>
              </div>
              <Separator />
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Low Stock Alerts</p>
                    <p className="text-xs text-muted-foreground">Get notified when items run low</p>
                  </div>
                  <Switch checked={notifications.lowStockAlerts} onCheckedChange={v => setNotifications(n => ({ ...n, lowStockAlerts: v }))} />
                </div>
                {notifications.lowStockAlerts && (
                  <div className="pl-4 border-l-2 border-primary/20 space-y-2">
                    <Label>Default Low Stock Threshold</Label>
                    <Input type="number" className="w-32" value={notifications.lowStockThreshold} onChange={e => setNotifications(n => ({ ...n, lowStockThreshold: e.target.value }))} />
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Daily Sales Summary</p>
                    <p className="text-xs text-muted-foreground">Receive end-of-day summaries</p>
                  </div>
                  <Switch checked={notifications.dailySummary} onCheckedChange={v => setNotifications(n => ({ ...n, dailySummary: v }))} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Sale Notifications</p>
                    <p className="text-xs text-muted-foreground">Alert on every completed sale</p>
                  </div>
                  <Switch checked={notifications.salesNotifications} onCheckedChange={v => setNotifications(n => ({ ...n, salesNotifications: v }))} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Sound Effects</p>
                    <p className="text-xs text-muted-foreground">Play sounds for alerts</p>
                  </div>
                  <Switch checked={notifications.soundEnabled} onCheckedChange={v => setNotifications(n => ({ ...n, soundEnabled: v }))} />
                </div>
              </div>
            </>
          )}

          {activeTab === "receipts" && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Receipt Settings</h2>
                <p className="text-sm text-muted-foreground mt-1">Customize receipts for customers</p>
              </div>
              <Separator />
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-Print Receipts</p>
                    <p className="text-xs text-muted-foreground">Print receipt after every sale</p>
                  </div>
                  <Switch checked={receipts.autoPrint} onCheckedChange={v => setReceipts(r => ({ ...r, autoPrint: v }))} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Show Business Logo</p>
                    <p className="text-xs text-muted-foreground">Display logo on printed receipts</p>
                  </div>
                  <Switch checked={receipts.showLogo} onCheckedChange={v => setReceipts(r => ({ ...r, showLogo: v }))} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Include VAT Breakdown</p>
                    <p className="text-xs text-muted-foreground">Show tax details on receipt</p>
                  </div>
                  <Switch checked={receipts.includeVAT} onCheckedChange={v => setReceipts(r => ({ ...r, includeVAT: v }))} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Receipt Footer Message</Label>
                  <Input value={receipts.footerMessage} onChange={e => setReceipts(r => ({ ...r, footerMessage: e.target.value }))} />
                </div>
              </div>
            </>
          )}

          {activeTab === "system" && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-foreground">System Preferences</h2>
                <p className="text-sm text-muted-foreground mt-1">General system configuration</p>
              </div>
              <Separator />
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Use dark theme across the app</p>
                  </div>
                  <Switch checked={system.darkMode} onCheckedChange={v => setSystem(s => ({ ...s, darkMode: v }))} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={system.language} onValueChange={v => setSystem(s => ({ ...s, language: v }))}>
                    <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Swahili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto Backup</p>
                    <p className="text-xs text-muted-foreground">Automatically back up data daily</p>
                  </div>
                  <Switch checked={system.autoBackup} onCheckedChange={v => setSystem(s => ({ ...s, autoBackup: v }))} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" className="w-32" value={system.sessionTimeout} onChange={e => setSystem(s => ({ ...s, sessionTimeout: e.target.value }))} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
