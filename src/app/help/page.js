import { ClientOnlyEditor } from "@/components/ClientOnlyEditor";
import { getMetadata } from "@/lib/seo-config";

export const generateMetadata = () => getMetadata({
  title: "Help & Support | V5 Professional | QPkendra",
  path: "/help",
  robots: { index: false, follow: false }
});

export default function HelpPage() {
  return <ClientOnlyEditor version="v5" tab="help" />;
}
