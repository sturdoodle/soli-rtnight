import { ClientOnlyEditor } from "@/components/ClientOnlyEditor";
import { getMetadata } from "@/lib/seo-config";

export const generateMetadata = () => getMetadata({
  title: "Resume Templates | V5 Professional | QPkendra",
  path: "/template",
  robots: { index: false, follow: false }
});

export default function TemplatePage() {
  return <ClientOnlyEditor version="v5" tab="template" />;
}
