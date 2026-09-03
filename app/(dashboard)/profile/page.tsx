import ProfileHeader from "@/componentS/profile/ProfileHeader";
import TradingStats from "@/componentS/profile/TradingStats";
import AccountInformation from "@/componentS/profile/AccountInformation";
import SecurityCard from "@/componentS/profile/SecurityCard";
import PreferencesCard from "@/componentS/profile/PreferencesCard";
import { requireUser } from "@/lib/auth/requireUser";

export default async function ProfilePage() {

    const user = await requireUser();

    return (

        <div className="space-y-8">

            <ProfileHeader user={user} />
            <TradingStats />
            <div className="grid gap-8 xl:grid-cols-5">

                <div className="space-y-8 xl:col-span-3">
                    <AccountInformation user={user} />
                </div>

                <div className="space-y-8 xl:col-span-2">
                    <SecurityCard user={user} />
                    <PreferencesCard />
                </div>
            </div>
        </div>
    );
}