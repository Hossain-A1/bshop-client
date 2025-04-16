import Header from "@/components/admin-dashboard/Header";
import Sidebar from "@/components/admin-dashboard/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Header />
      <div className='flex justify-between gap-4'>
        <Sidebar />

        <main className='ml-[210px] mt-16 w-full overflow-y-hidden no-scroll'>
          <div>{children}</div>
        </main>
      </div>
    </>
  );
}
