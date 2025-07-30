import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} 

from "../../../components/ui/table/index";

import { ArrowUpDown, Circle, FileText, Calendar,  Edit, Trash2 } from "lucide-react";

interface Project {
  id: number;
  nama_standar: string;
  versi: string;
  thn_rilis: string;
}

// Define the table data
const tableData: Project[] = [
  {
    id: 1,
    nama_standar: "SPT 2025",
    versi: "1.0",
    thn_rilis: "2025",
  },
  {
    id: 2,
    nama_standar: "SPT 2024",
    versi: "1.0",
    thn_rilis: "2025",
  },
  {
    id: 3,
    nama_standar: "SPT 2023",
    versi: "1.0",
    thn_rilis: "2025",
  },
  {
    id: 4,
    nama_standar: "SPT 2022",
    versi: "1.0",
    thn_rilis: "2025",
  },
];

export default function BasicTableOne() {
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
                  Standar Mutu
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>              
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  Versi
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  Tahun Rilis
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  File
                  <ArrowUpDown className="w-3 h-3" />
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
            {tableData.map((project, index) => (
              <TableRow key={project.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    {project.nama_standar}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    {project.versi}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    {project.thn_rilis}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <button className="h-11 px-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                      <svg className="inline-block w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4v12m0 0l4-4m-4 4l-4-4m8 8H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Download
                    </button>
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
