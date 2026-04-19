import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/auth" replace />;

  return <>{children}</>;
};
