import Sidebar from "../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
