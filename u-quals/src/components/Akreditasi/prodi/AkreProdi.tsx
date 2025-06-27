import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table/index";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";

interface ProdiAkre{
  id: number;
  fakultas: string;
  prodi: string;
  level: string;
  lembaga: string;
  nilai: string;
  mulai: string;
  berakhir: string;
}

const tableData: ProdiAkre[] = [
  {
    id: 1,
    fakultas: "Ilmu Komputer",
    prodi: "Informatika", 
    level: "S1",         
    lembaga: "BAN-PT",
    nilai: "B/Baik Sekali",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },

  {
    id: 2,
    fakultas: "Ilmu Komputer",
    prodi: "Sistem Informasi", 
    level: "S1",          
    lembaga: "BAN-PT",
    nilai: "A/Unggul",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },

  {
    id: 3,
    fakultas: "Ilmu Komputer",
    prodi: "Sistem Informasi", 
    level: "S1",          
    lembaga: "BAN-PT",
    nilai: "A/Unggul",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },

  {
    id: 4,
    fakultas: "Teknik",
    prodi: "Teknik Kimia", 
    level: "S1",          
    lembaga: "BAN-PT",
    nilai: "B/Baik Sekali",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },
  
  {
    id: 5,
    fakultas: "Teknik",
    prodi: "Teknik Industri", 
    level: "S1",          
    lembaga: "BAN-PT",
    nilai: "B/Baik Sekali",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },

];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                No
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Fakultas
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Prodi
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Level
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Lembaga
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Nilai
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Mulai
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Berakhir
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                Sertifikat
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.fakultas}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.prodi}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.level}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.lembaga}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.nilai}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.mulai}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.berakhir}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span className="text-blue-600 hover:underline cursor-pointer">Lihat</span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 cursor-pointer"
                      onClick={() => console.log("Edit clicked")}
                    >
                      <Edit className="w-4 h-4 text-orange-500 dark:text-orange-300" />
                    </div>
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
