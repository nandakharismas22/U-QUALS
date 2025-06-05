import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import BasicTableOne from "../components/pengguna/PlotUser";
import { Plus } from "lucide-react";
import { useModal } from "../hooks/useModal";
import { Modal } from "../components/ui/modal";
import Button from "../components/ui/button/Button";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";

export default function TabelsAuditor() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Pengguna" />
      
      <div className="space-y-6">
        <ComponentCard
          title={
            <div className="flex items-center justify-between w-full">
              <span className="text-base font-medium text-gray-800 dark:text-white/90">
                Semua Pengguna : 2
              </span>
              <button
                onClick={openModal}
                className="ml-auto left-185 relative w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Pengguna
              </button>
            </div>
          }
        >
          <div className="mb-4">
            <div className="flex items-center justify-between w-full gap-4">
              {/* Dropdown Semua Periode */}
              <div className="relative w-48">
                <select className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <option>Semua Peran</option>
                  <option>Admin LPMPP</option>
                  <option>Auditor LPM</option>
                  <option>Koprodi</option>
                  <option>Tim Penjaminan Mutu Prodi</option>
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
                <div className="relative w-20">
                  <select className="appearance-none border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
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
        </ComponentCard>
      </div>

      {/* Modal for adding new user */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Tambah Pengguna Baru
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Masukkan detail pengguna baru.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-y-5">
                {/* Baris 1: Nama */}
                <div>
                  <Label>Nama</Label>
                  <Input 
                    type="text" 
                    placeholder="Masukkan nama lengkap" 
                    className="w-full"
                  />
                </div>
                
                {/* Baris 2: Email */}
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="Masukkan email" 
                    className="w-full"
                  />
                </div>
                
                {/* Baris 3: Peran (Dropdown) */}
                <div>
                  <Label>Peran</Label>
                  <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <option value="">Semua Peran</option>
                    <option>Admin LPMPP</option>
                    <option>Auditor LPM</option>
                    <option>Koprodi</option>
                    <option>Tim Penjaminan Mutu Prodi</option>
                  </select>
                </div>
                
                {/* Baris 4: Status (Dropdown) */}
                <div>
                  <Label>Status</Label>
                  <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <option value="">Pilih Status</option>
                    <option>Aktif</option>
                    <option>Nonaktif</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Batal
              </Button>
              <Button size="sm" onClick={handleSave}>
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
