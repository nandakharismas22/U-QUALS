import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import BasicTableOne from "../components/auditor/PlotAuditor";
import { Plus } from "lucide-react";
import { useModal } from "../hooks/useModal";
// import { Modal } from "../components/ui/modal";
// import Button from "../components/ui/button/Button";
// import Input from "../components/form/input/InputField";
// import Label from "../components/form/Label";

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
            </div> 
            
          }
        >
          <div className="mb-4">
            <div className="flex items-center justify-between w-full gap-4">

            {/* Search + Dropdown Container */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search Bar */}
              <form action="https://formbold.com/s/unique_form_id" method="POST">
                <div className="relative">
                  <button className="absolute -translate-y-1/2 left-4 top-1/2">
                    <svg
                      className="fill-gray-500 dark:fill-gray-400"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                        fill=""
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder=" Cari disini"
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px]"
                  />
                </div>
              </form>

              {/* Dropdown Peran */}
              <div className="relative">
                <select
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px] appearance-none"
                >
                  <option>Semua Periode</option>
                  <option>Periode 2024/2025</option>
                  <option>Periode 2023/2024</option>
                  <option>Periode 2023/2022</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>



            {/* Dropdown Max Data */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Menampilkan</span>
              <div className="relative w-20">
                <select className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400">
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

    </>
  );
}