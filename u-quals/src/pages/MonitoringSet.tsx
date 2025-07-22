import { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import MonitoringTables from "../components/monitoring/viewmonitoring";
import RiwayatAuditTables from "../components/monitoring/riwayataudit"; 
import PaginationWithText from "../components/ui/pagination/page";
import ComponentCard from "../components/common/ComponentCard";
import { Plus } from "lucide-react";



export default function TabelsMonitoring() {
  const [activeTab, setActiveTab] = useState<"audit" | "riwayat">("audit");
  const [selectedPeriode, setSelectedPeriode] = useState<string>("");

  const dummyPeriode = [
    "Periode 2024/2025",
    "Periode 2023/2024",
    "Periode 2022/2023",
  ];

  return (
    <div>
      <PageMeta title="U-Quals - Monitoring" description="" />
      <PageBreadcrumb pageTitle="Monitoring" />

      <ComponentCard
        title={
          <div className="flex flex-col gap-2 w-full">
            {/* Tab Header */}
            <div className="flex gap-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("audit")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "audit"
                    ? "text-brand-600 border-b-2 border-brand-500"
                    : "text-gray-500"
                }`}
              >
                Audit Saat Ini
              </button>
              <button
                onClick={() => setActiveTab("riwayat")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "riwayat"
                    ? "text-brand-600 border-b-2 border-brand-500"
                    : "text-gray-500"
                }`}
              >
                Riwayat Audit
              </button>
            </div>

            {/* Judul */}
            <div className="flex items-center justify-between">

              {/* Dropdown & Filter */}
              {activeTab === "audit" ? (

                  /* Filter Jumlah Data (Audit Saat Ini) */
                  <div className="flex items-center justify-between w-full gap-4 mt-3">


                  {/* KIRI: Search + Periode + Download */}
                  <div className="flex items-center gap-2">
                    {/* Search */}
                    <form>
                      <div className="relative">
                        <button className="absolute -translate-y-1/2 left-4 top-1/2">
                          {/* Search icon */}
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
                          placeholder="Cari disini"
                          className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px]"
                        />
                      </div>
                    </form>
                
                    {/* Dropdown Periode */}
                    <div className="relative w-48">
                      <select className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                        <option>Semua periode</option>
                        <option>2024/2025</option>
                        <option>2023/2024</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                
                    {/* Tombol Download */}
                    <button className="h-11 px-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                      <svg className="inline-block w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4v12m0 0l4-4m-4 4l-4-4m8 8H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Download
                    </button>
                  </div>
                
                  {/* KANAN: Jumlah data */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Menampilkan</span>
                
                    <div className="relative w-20">
                      <select className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                
                    <span className="text-sm text-gray-600">data</span>
                  </div>
                
                </div>
                
                
              ) : (
                /* Filter Jumlah Data (Riwayat Audit) */
                <div className="flex items-center justify-between w-full gap-4 mt-3">

                  {/* KIRI: Search + Periode + Download */}
                  <div className="flex items-center gap-2">
                    {/* Search */}
                    <form>
                      <div className="relative">
                        <button className="absolute -translate-y-1/2 left-4 top-1/2">
                          {/* Search icon */}
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
                          placeholder="Cari disini"
                          className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px]"
                        />
                      </div>
                    </form>
                
                    {/* Dropdown Periode */}
                    <div className="relative w-48">
                      <select className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                        <option>Semua periode</option>
                        <option>2024/2025</option>
                        <option>2023/2024</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                
                    {/* Tombol Download */}
                    <button className="h-11 px-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                      <svg className="inline-block w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4v12m0 0l4-4m-4 4l-4-4m8 8H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Download
                    </button>
                  </div>
                
                  {/* KANAN: Jumlah data */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Menampilkan</span>
                
                    <div className="relative w-20">
                      <select className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                
                    <span className="text-sm text-gray-600">data</span>
                  </div>
                
                </div>
              )}
            </div>
          </div>
        }
      >       

        {/* Konten Tabel Berdasarkan Tab */}
        {activeTab === "audit" ? (
          <MonitoringTables />
        ) : (
          <RiwayatAuditTables />
        )}

        {/* Pagination */}
        <PaginationWithText
          totalPages={10}
          initialPage={1}
          onPageChange={(page) => console.log("Pindah ke halaman:", page)}
        />
      </ComponentCard>
    </div>
  );
}
