
import { UsersIcon, AcademicCapIcon, BuildingLibraryIcon } from '@heroicons/react/24/solid'




export default function ViewMatrics() {
     return (
  <>
    <div className="w-full">
      <h1 className="text-xl font-bold text-brand-500 dark:text-white/90 mb-4">
        Selamat Datang di U-Quals
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Halo, Ryan Taylor! Saat ini Anda login sebagai Admin LPMPP
      </p>
    </div>

    <div className="flex flex-wrap gap-4 w-full">
      {[
        { label: "Fakultas", value: 7, icon: <BuildingLibraryIcon className="size-7" /> },
        { label: "Prodi", value: 25, icon: <AcademicCapIcon className="size-7" /> },
        { label: "Auditor", value: 50, icon: <UsersIcon className="size-7" /> },
        { label: "Text", value: 50, icon: <UsersIcon className="size-7" /> },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-1 items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] shadow-sm"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-300 to-yellow-500 text-white">
            {item.icon}
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white/90">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  </>
);
}
