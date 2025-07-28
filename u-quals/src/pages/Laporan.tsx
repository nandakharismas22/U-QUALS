import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PaginationWithText from "../components/ui/pagination/page";
import PageMeta from "../components/common/PageMeta";
import LaporanAuditTable from "../components/Laporan/laporanaudit";
import { Plus } from "lucide-react";
import React from "react";
import { useAuth } from "../components/auth/AuthContext";
import axios from "axios";

interface Periode {
  id_periode: number;
  nama_jenis: string;
  periode: string;
  tgl_mulai: string;
  tgl_selesai: string;
  status: "Aktif" | "Selesai";
}

export default function TablesLaporanAudit() {
  const handleTambahPeriode = () => {
    console.log("Tombol Tambah Periode diklik");
  };
  const [tableData, setTableData] = React.useState<Periode[]>([]);
  const { token } = useAuth();
  const [selectedPeriode, setSelectedPeriode] = React.useState<Periode | null>(null);
  const [periode, setPeriode] = React.useState<Periode[]>([]);
  const [originalData, setOriginalData] = React.useState<Periode[]>([]);

  React.useEffect(() => {
    const fetchPeriode = async () => {
      try {
        const response = await axios.get("http://localhost:5000/periode", {
          withCredentials: true,
        });
  
        // Data dari database langsung dipakai tanpa map
        console.log("Data periode dari server:", response.data);
        setTableData(response.data);
        setPeriode(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error("Gagal fetch data periode:", error);
      }
    };
  
    fetchPeriode();
  }, [token]);

  return (
    <>
      <PageMeta
        title="U-Quals - Laporan"
        description=""
      />
      <PageBreadcrumb pageTitle="Laporan" />
      <div className="space-y-6">
      <ComponentCard
          title={
            <div className="flex items-center justify-between w-full">
              <span className="text-base font-medium text-gray-800 dark:text-white/90">
                Semua Laporan: {tableData.length}
              </span>
              <button
                onClick={handleTambahPeriode}
                className="ml-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Periode
              </button>
            </div>
          } >
          <div className="mb-4">
            <div className="flex items-center justify-between w-full gap-4">

              {/* Dropdown Semua Periode */}
              <div className="relative w-48">
                  <select className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none"
                    value={selectedPeriode?.periode || ""}
                    onChange={(e) => {
                      const selectedNama = e.target.value;
                      setSelectedPeriode({ ...selectedPeriode!, periode: selectedNama });
                  
                      if (selectedNama === "") {
                        setTableData(originalData);
                      } else {
                        const filtered = originalData.filter(
                          (item) => item.periode === selectedNama
                        );
                        setTableData(filtered);
                      }
                    }}>
                    <option value="">Pilih Periode</option>
                      {periode.map((periode) => (
                        <option key={periode.id_periode} value={periode.periode}>
                          {periode.periode}
                        </option>
                      ))}
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
          
          <LaporanAuditTable />
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
