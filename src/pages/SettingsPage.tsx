import { Settings } from "lucide-react";

const SettingsPage = () => (
  <div className="space-y-6 opacity-0 animate-fade-in">
    <h1 className="text-2xl font-bold text-foreground">Settings</h1>
    <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <Settings className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">Settings Coming Soon</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        System configuration, payment integrations, and backup settings will be available here.
      </p>
    </div>
  </div>
);

export default SettingsPage;
