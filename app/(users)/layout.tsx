import Navbar from "@/components/layouts/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="bg-zinc-200 min-h-screen">{children}</div>
    </>
  );
}
