import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ArrowUpDown, Edit } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface User {
  id: number;
  periode: string;
  prodi: string;
  auditor1: string;
  auditor2: string;
}

// Sample auditor options
const auditorOptions = [
  "Dianne Russell",
  "Annette Black",
  "Nanda Kharisma",
  "Talia Apiarnti",
  "John Doe"
];

const tableData: User[] = [
  {
    id: 1,
    periode: "Periode 2024/2025",
    prodi: "S1 Sistem Informasi",
    auditor1: "Dianne Russell",
    auditor2: "Annette Black",
  },
  {
    id: 2,
    periode: "Periode 2024/2025",
    prodi: "S1 Informatika",
    auditor1: "Dianne Russell",
    auditor2: "Annette Black",
  },
  {
    id: 3,
    periode: "Periode 2024/2025",
    prodi: "S1 Sains Data",
    auditor1: "Dianne Russell",
    auditor2: "Annette Black",
  },
  {
    id: 4,
    periode: "Periode 2024/2025",
    prodi: "S1 Teknik Industri",
    auditor1: "Dianne Russell",
    auditor2: "Annette Black",
  },
  {
    id: 5,
    periode: "Periode 2024/2025",
    prodi: "S1 Teknik Kimia",
    auditor1: "Dianne Russell",
    auditor2: "Annette Black",
  },
  {
    id: 6,
    periode: "Periode 2024/2025",
    prodi: "S1 Teknik Mesin",
    auditor1: "Dianne Russell",
    auditor2: "Annette Black",
  },
  {
    id: 7,
    periode: "Periode 2024/2025",
    prodi: "S1 Teknik Elektro",
    auditor1: "Dianne Russell",
    auditor2: "Annette Black",
  },
];

export default function AuditorTables() {
  const [users, setUsers] = useState<User[]>(tableData);
  const [editing, setEditing] = useState<{id: number | null, field: string | null}>({id: null, field: null});
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>(auditorOptions);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (editing.id) {
          handleSave(editing.id);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing, inputValue]);

  const handleEditStart = (id: number, field: string, currentValue: string) => {
    setEditing({id, field});
    setInputValue(currentValue);
    setFilteredOptions(auditorOptions.filter(option => 
      option.toLowerCase().includes(currentValue.toLowerCase())
    ));
    
    // Focus input after a small delay to ensure it's rendered
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(auditorOptions.filter(option => 
      option.toLowerCase().includes(value.toLowerCase())
    ));
  };

  const handleSave = (id: number) => {
    if (editing.field) {
      setUsers(users.map(user => {
        if (user.id === id) {
          return {
            ...user,
            [editing.field as keyof User]: inputValue
          };
        }
        return user;
      }));
    }
    setEditing({id: null, field: null});
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      handleSave(id);
    }
  };
  
  const handleOptionSelect = (option: string, id: number) => {
    setInputValue(option);
    setUsers(users.map(user => {
      if (user.id === id && editing.field) {
        return {
          ...user,
          [editing.field]: option
        };
      }
      return user;
    }));
    setEditing({id: null, field: null});
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table className="min-w-full">
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow className="hover:bg-transparent">
              {["No", "Periode", "Prodi", "Auditor 1", "Auditor 2"].map((header, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
                >
                  <div className="flex items-center gap-1 cursor-pointer">
                    {header}
                    {["Periode", "Prodi", "Auditor 1", "Auditor 2"].includes(header) && (
                      <ArrowUpDown className="w-3 h-3" />
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {users.map((user, index) => (
              <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
                <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.periode}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.prodi}
                </TableCell>
                
                {/* Auditor 1 Cell */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {editing.id === user.id && editing.field === 'auditor1' ? (
                    <div className="relative" ref={dropdownRef}>
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleKeyDown(e, user.id)}
                        className="dark:bg-dark-900 h-8 w-full rounded-lg border border-gray-200 bg-transparent py-1 pl-3 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px] appearance-none"
                        autoFocus
                      />
                      {filteredOptions.length > 0 && (
                        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg xl:w-[230px] overflow-auto max-h-60">
                          {filteredOptions.map((option, i) => (
                            <div
                              key={i}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleOptionSelect(option, user.id)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div 
                      className="flex items-center justify-between cursor-pointer group"
                      onClick={() => handleEditStart(user.id, 'auditor1', user.auditor1)}
                    >
                      {user.auditor1}
                      <Edit className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 text-gray-400" />
                    </div>
                  )}
                </TableCell>
                
                {/* Auditor 2 Cell */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                {editing.id === user.id && editing.field === 'auditor2' ? (
                  <div className="relative" ref={dropdownRef}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, user.id)}
                      className="dark:bg-dark-900 h-8 w-full rounded-lg border border-gray-200 bg-transparent py-1 pl-3 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px] appearance-none"
                      autoFocus
                    />
                    {filteredOptions.length > 0 && (
                      <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg xl:w-[230px] overflow-auto max-h-60">
                        {filteredOptions.map((option, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleOptionSelect(option, user.id)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div 
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => handleEditStart(user.id, 'auditor2', user.auditor1)}
                  >
                    {user.auditor1}
                    <Edit className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 text-gray-400" />
                  </div>
                )}
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}