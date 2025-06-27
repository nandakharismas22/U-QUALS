import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { Plus } from "lucide-react";
export default function Blank() {
  // Contoh dummy tableData dan openModal jika belum ada
  const tableData = []; // Ganti dengan data asli
  const openModal = () => {
    console.log("Modal dibuka");
  };

  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Blank Page" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-5">
        
          <div className="space-y-6">
            <div className="flex items-center justify-between w-full">
              <span className="text-base font-medium text-gray-800 dark:text-white/90">
                Semua Pengguna: {tableData.length}
              </span>
              <button
                onClick={openModal}
                className="ml-auto relative w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Pengguna
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
