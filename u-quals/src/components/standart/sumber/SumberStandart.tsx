import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table/index";

import { ArrowUpDown, Edit, Trash2 } from "lucide-react";

interface Standard {
  id: number;
  number: string;
  year: string;
  description: string;
}

const tableData: Standard[] = [
  {
    id: 1,
    number: "(nama sumber standar)",
    year: "2022",
    description: "deskripsi",
  },
  {
    id: 2,
    number: "(nama sumber standar)",
    year: "2021",
    description: "deskripsi",
  },
  {
    id: 3,
    number: "(nama sumber standar)",
    year: "2020",
    description: "deskripsi",
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
                  Sumber Standar
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Tahun
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Deskripsi
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                File
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
                  {item.number}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.year}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.description}
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
