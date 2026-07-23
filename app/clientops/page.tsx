import type { Metadata } from "next";
import { ClientOpsDashboard } from "@/app/components/ClientOpsDashboard";

export const metadata: Metadata = {
  title: "ClientOps live dashboard",
  description: "An interactive sales pipeline dashboard using synthetic demonstration data.",
};

export default function ClientOpsPage() {
  return <ClientOpsDashboard />;
}
