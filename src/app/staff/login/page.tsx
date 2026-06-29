import { redirect } from "next/navigation";
import { StaffLoginForm } from "@/components/staff-login-form";
import { hasStaffSession, staffCredentials } from "@/lib/staff-auth";

export default async function StaffLoginPage() {
  if (await hasStaffSession()) {
    redirect("/staff");
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-16">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(91,22,37,0.42),transparent_28rem),radial-gradient(circle_at_80%_0%,rgba(185,152,88,0.12),transparent_26rem)]" />
      <div className="relative w-full">
        <StaffLoginForm demoEmail={staffCredentials().email} />
      </div>
    </main>
  );
}
