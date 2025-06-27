import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PaginationWithText from "../components/ui/pagination/page";
import PageMeta from "../components/common/PageMeta";
import BasicTableOne from "../components/periode/SemuaPeriode";
import { Plus } from "lucide-react";




export default function TablesPeriode() {
  const handleTambahPeriode = () => {
    console.log("Tombol Tambah Periode diklik");
  };

  return (
    <>
      <PageMeta
        title="U-Quals - Periode"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Periode" />
      <div className="space-y-6">
          <div className="flex items-center justify-between w-full">
              <span className="text-base font-medium text-gray-800 dark:text-white/90">
                Semua Periode : 4
              </span>
              <button
                onClick={handleTambahPeriode}
                className="ml-auto relative w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Periode
              </button>
          </div>
        <ComponentCard>
          <div className="mb-4">
            <div className="flex items-center justify-between w-full gap-4">

              {/* Dropdown Semua Periode */}
              <div className="relative w-48">
                <select className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <option>Semua Periode</option>
                  <option>Periode 1</option>
                  <option>Periode 2</option>
                  <option>Periode 3</option>
                  <option>Periode 4</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* Dropdown Max Data */}
              <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Menampilkan</span>
              
              <div className="relative w-25">
                <select className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <option>0-10</option>
                  <option>10-20</option>
                  <option>20-30</option>
                  <option>30-40</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <span className="text-sm text-gray-600 dark:text-gray-400">data</span>
            </div>


            </div>
          </div>
          
          <BasicTableOne />
          <PaginationWithText
            totalPages={10}
            initialPage={1}
            onPageChange={(page) => console.log("Pindah ke halaman:", page)}
          />
        </ComponentCard>
      </div>
    </>
  );
}
