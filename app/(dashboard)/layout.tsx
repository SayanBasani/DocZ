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
      <div className="bg-slate-100 transition-colors duration-300 dark:bg-[#07111F]">
        <DashboardLayout 
          user={user}  
          accessTokenLifetime={ENV.ACCESS_TOKEN_EXPIRES_IN}
        >
            {children}
        </DashboardLayout>
      </div>
    );
}
