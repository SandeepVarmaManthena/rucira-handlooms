import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SectionScope } from "@/components/layout/section-scope";
import { ChatWidget } from "@/components/chat-widget";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SectionScope>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </SectionScope>
  );
}
