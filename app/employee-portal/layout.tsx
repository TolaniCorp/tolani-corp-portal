import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Portal | Tolani Corp",
  description: "Secure employee portal for Tolani Corp team members. Access HR resources, benefits, payroll, and internal tools.",
};

export default function EmployeePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
