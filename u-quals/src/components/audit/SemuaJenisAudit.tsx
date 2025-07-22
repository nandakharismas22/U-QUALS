import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { ArrowUpDown, Circle, FileText, Calendar,  Edit, Trash2 } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/id"; 
dayjs.locale("id");

interface JenisAudit {
    id_jenis_audit: number;
    nama_jenis: string;
    kode_jenis?: string;
  }

export default function AuditTable() {
  const [tableData, setTableData] = React.useState<JenisAudit[]>([]);
  const { token } = useAuth();
  const [selectedJenis, setSelectedJenis] = React.useState<JenisAudit | null>(null);
  const [jenis_audit, setJenisAudit] = React.useState<{ id_jenis_audit: number; nama_jenis: string }[]>([]);

  const fetchJenisAudit = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jenis-audit", {
        withCredentials: true,
      });
      setTableData(response.data);
    } catch (error) {
      console.error("Gagal fetch data jenis audit:", error);
    }
  };

  React.useEffect(() => {
    const fetchJenisAudit = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jenis-audit", {
          withCredentials: true
        });
        
        // Simpan data jenis audit ke state
        setJenisAudit(response.data);
        
        console.log("Data jenis audit berhasil diambil:", response.data);
      } catch (error) {
        console.error("Gagal mengambil data jenis audit:", error);
        
        // Error handling lebih detail
        if (axios.isAxiosError(error)) {
          console.error("Error response:", error.response?.data);
        }
      }
    };
  
    fetchJenisAudit();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell                
                isHeader
                className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
              >
                No
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  Jenis Audit
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  Plot Standar
                </div>
              </TableCell>              
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {jenis_audit.map((jenis, index) => (
              <TableRow key={jenis.id_jenis_audit}>
                  <TableCell className="px-5 py-4 sm:px-6 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {index + 1}
                  </TableCell>
                  
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      {jenis.nama_jenis === 'Tahunan' 
                        ? `Audit ${jenis.nama_jenis}`
                        : jenis.nama_jenis.startsWith('TW') 
                          ? `Monitoring ${jenis.nama_jenis}`
                          : jenis.nama_jenis
                      }
                    </div>
                  </TableCell>
                  
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                      {jenis.kode_jenis || '-'}
                  </div>
                  </TableCell>
  
             <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-2">
                  {/* Ikon FileText */}
                  <div 
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => console.log("FileText clicked")}
                  >
                    <FileText className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                  </div>

                  {/* Ikon Edit */}
                  <div 
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 cursor-pointer"
                    onClick={() => console.log("Edit clicked")}
                  >
                    <Edit className="w-4 h-4 text-blue-500 dark:text-blue-300" />
                  </div>

                  {/* Ikon Trash2 */}
                  <div 
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 cursor-pointer"
                    onClick={() => console.log("Delete clicked")}
                  >
                    <Trash2 className="w-4 h-4 text-red-500 dark:text-red-300" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
