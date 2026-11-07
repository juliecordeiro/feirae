import { BottomNav } from "@/components/BottomNav";
import { TopNav } from "@/components/TopNav";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <TopNav />
      <main className="mx-auto w-full max-w-md px-4 pb-28 pt-4 lg:max-w-6xl lg:px-10 lg:pb-16 lg:pt-8 2xl:max-w-[1600px]">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
