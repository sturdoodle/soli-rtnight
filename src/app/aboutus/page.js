import { ClientOnlyEditor } from "@/components/ClientOnlyEditor";
import { getMetadata } from "@/lib/seo-config";

export const generateMetadata = () => getMetadata({
  title: "About Us | QPkendra",
  path: "/aboutus",
  robots: { index: false, follow: false }
});

export default function AboutUsPage() {
  return <ClientOnlyEditor version="v5" tab="aboutus" />;
}
