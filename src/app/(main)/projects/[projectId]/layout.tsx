import { SideNav } from "./_components/side-nav";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SideNav />
      {children}
    </div>
  );
}
