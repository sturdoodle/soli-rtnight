import { ClientOnlyEditor } from "@/components/ClientOnlyEditor";
import { getMetadata } from "@/lib/seo-config";

export const generateMetadata = () => getMetadata({
  title: "V6 Modern CV Designer | QPkendra",
  path: "/v6",
  robots: { index: false, follow: false }
});


export default function V6Page() {
  return (
    <ClientOnlyEditor version="v6" />
  );
}
