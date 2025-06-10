import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { ArrowUpDown, Circle, FileText, Calendar,  Edit, Trash2 } from "lucide-react";

interface Project {
  id: number;
  periode: string;
  startDate: string;
  endDate: string;
  status: "Aktif" | "Selesai";
}

// Define the table data
const tableData: Project[] = [
  {
    id: 1,
    periode: "Periode 2024/2025",
    startDate: "25 Februari 2025",
    endDate: "22 Maret 2025",
    status: "Aktif",
  },
  {
    id: 2,
    periode: "Periode 2023/2024",
    startDate: "15 Januari 2024",
    endDate: "10 Februari 2024",
    status: "Selesai",
  },
  {
    id: 3,
    periode: "Periode 2024/2025",
    startDate: "10 Maret 2025",
    endDate: "5 April 2025",
    status: "Selesai",
  },
  {
    id: 4,
    periode: "Periode 2022/2023",
    startDate: "1 Desember 2022",
    endDate: "20 Januari 2023",
    status: "Selesai",
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
                  Periode
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  Tanggal Mulai dan Tanggal Selesai
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  Status
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
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {project.periode}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {project.startDate} - {project.endDate}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Circle 
                      className={`w-3 h-3 ${project.status === "Aktif" ? "text-green-500" : "text-gray-400"}`} 
                      fill={project.status === "Aktif" ? "currentColor" : "none"}
                    />
                    {project.status}
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
