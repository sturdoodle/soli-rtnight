import { ClientOnlyEditor } from "@/components/ClientOnlyEditor";
import { getMetadata } from "@/lib/seo-config";

export const generateMetadata = () => getMetadata({
  title: "V5 Professional Resume Editor | QPkendra",
  path: "/v5",
  robots: { index: false, follow: false }
});


export default function V5Page() {
  return (
    <ClientOnlyEditor version="v5" />
  );
}
