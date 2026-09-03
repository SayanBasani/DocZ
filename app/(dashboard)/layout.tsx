import DashboardLayout from "@/componentS/layout/DashboardLayout";
import { requireUser } from "@/lib/auth/requireUser";
import { ENV } from "@/lib/config/env";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await requireUser();
    return (
      <div className="bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
        <DashboardLayout 
          user={user}  
          accessTokenLifetime={ENV.ACCESS_TOKEN_EXPIRES_IN}
        >
            {children}
        </DashboardLayout>
      </div>
    );
}