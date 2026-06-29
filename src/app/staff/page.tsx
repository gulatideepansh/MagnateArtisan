import { redirect } from "next/navigation";
import { StaffDashboard } from "@/components/staff-dashboard";
import { hasStaffSession } from "@/lib/staff-auth";

export default async function StaffPage() {
  if (!(await hasStaffSession())) redirect("/staff/login");

  return <StaffDashboard />;
}
