import { ClientOnlyEditor } from "@/components/ClientOnlyEditor";
import { getMetadata } from "@/lib/seo-config";

export const generateMetadata = () => getMetadata({
  title: "V7 Ultimate Studio Workspace | QPkendra",
  path: "/v7",
  robots: { index: false, follow: false }
});


export default function V7Page() {
  return (
    <ClientOnlyEditor version="v7" />
  );
}
