import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table/index";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";

interface LembagaAkre{
  id: number;
  level: "Nasional" | "Internasional";
  lembaga: string;
  negara: string;
  website: string;
  email: string;
  noTelp: string;
}

const tableData: LembagaAkre[] = [
  {
    id: 1,
    level: "Nasional",
    lembaga: "BAN-PT",
    negara: "Indonesia",
    website: "www.banpt.or.id",
    email: "sekretariat@banpt.or.id",
    noTelp: "02157946110",
  },
  {
    id: 2,
    level: "Nasional",
    lembaga: "LAM INFOKOM",
    negara: "Indonesia",
    website: "www.laminfokom.or.id",
    email: "sekretariat@laminfokom.or.id",
    noTelp: "02178839502",
  },
  {
    id: 3,
    level: "Nasional",
    lembaga: "LAM-PTKes",
    negara: "Indonesia",
    website: "www.lamptkes.org",
    email: "sekretariat@lamptkes.org",
    noTelp: "02127653495",
  },
  {
    id: 4,
    level: "Nasional",
    lembaga: "LAM Teknik",
    negara: "Indonesia",
    website: "www.lamteknik.or.id",
    email: "info@lamteknik.or.id",
    noTelp: "085783810387",
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
                  Negara
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Website
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Email
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  No.Telp
                  <ArrowUpDown className="w-3 h-3" />
                </div>
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
                  {item.level}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.lembaga}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.negara}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.website}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.noTelp}
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
