import { ClientOnlyEditor } from "@/components/ClientOnlyEditor";
import { getMetadata } from "@/lib/seo-config";

export const generateMetadata = () => getMetadata({
  title: "Settings & Backups | V5 Professional | QPkendra",
  path: "/setting",
  robots: { index: false, follow: false }
});

export default function SettingPage() {
  return <ClientOnlyEditor version="v5" tab="setting" />;
}
