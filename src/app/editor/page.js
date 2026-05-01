import { ClientOnlyEditor } from "@/components/ClientOnlyEditor";
import { getMetadata } from "@/lib/seo-config";

export const generateMetadata = () => getMetadata({
  title: "Resume Editor | V5 Professional | QPkendra",
  path: "/editor",
  robots: { index: false, follow: false }
});

export default function EditorPage() {
  return <ClientOnlyEditor version="v5" tab="editor" />;
}
