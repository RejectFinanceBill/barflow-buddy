import { Users } from "lucide-react";

const Staff = () => (
  <div className="space-y-6 opacity-0 animate-fade-in">
    <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
    <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <Users className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">Staff Management Coming Soon</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Role-based access, activity logs, and staff performance metrics will be managed here.
      </p>
    </div>
  </div>
);

export default Staff;
