import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";



export default function Rekapitulasi() {
    return (
    <>
      <div className="w-full pt-6">
        <h1 className="text-xl font-bold text-brand-500  dark:text-white/90 mb-6">
            Rekapitulasi Akreditasi
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Akreditasi Institusi */}
        <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center justify-center shadow">
         {/* Gambar + Teks */}
        <div className="flex items-center self-start mb-16">
        <img
            src="/images/dashboard/checklist.png"
            alt="Trophy Icon"
            className="w-8 h-8 mr-5"
        />
        <div className="text-md font-bold text-gray-600 dark:text-white/70">
            Akreditasi Institusi
        </div>

        </div>
        <img src="./images/dashboard/Trophy.png" alt="Trophy" className="w-40 h-40 mb-4" />
        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1 text-center">
            Akreditasi A
        </div>
        <p className="text-sm text-gray-600 dark:text-white/70 mb-4 text-center">
            BAN-PT (2022 - 2027)
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold px-6 py-2 rounded-full w-full">
            Lihat
        </button>
      </div>
      

        {/* Kolom kanan: Nasional & Internasional */}
        <div className="grid grid-cols-1 gap-6">
  {/* Akreditasi Nasional */}
  <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 p-6 shadow">
    
    <div className="flex items-center mb-4">
      <img
        src="/images/dashboard/checklist.png"
        alt="checklist Icon"
        className="w-8 h-8 mr-5"
      />
      <div className="text-md font-semibold text-gray-600 dark:text-white/70">
        Akreditasi Nasional
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4 text-center mb-4">
      <div>
        <div className="text-2xl font-bold text-gray-800 dark:text-white">15</div>
        <div className="text-sm text-gray-600 dark:text-white/70">A/Unggul</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-800 dark:text-white">20</div>
        <div className="text-sm text-gray-600 dark:text-white/70">B/Baik Sekali</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-800 dark:text-white">5</div>
        <div className="text-sm text-gray-600 dark:text-white/70">C/Baik</div>
      </div>
    </div>
    <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold px-6 py-2 rounded-full w-full">
      Lihat
    </button>
  </div>

  {/* Akreditasi Internasional */}
  <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 p-6 shadow">
    <div className="flex items-center mb-4">
      <img
        src="/images/dashboard/checklist.png"
        alt="checklist Icon"
        className="w-8 h-8 mr-5"
      />
      <div className="text-md font-semibold text-gray-600 dark:text-white/70">
        Akreditasi Internasional
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 text-center mb-4">
      <div>
        <div className="text-2xl font-bold text-gray-800 dark:text-white">15</div>
        <div className="text-sm text-gray-600 dark:text-white/70">FIBAA</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-800 dark:text-white">20</div>
        <div className="text-sm text-gray-600 dark:text-white/70">ASIIN</div>
      </div>
    </div>
    <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold px-6 py-2 rounded-full w-full">
      Lihat
    </button>
  </div>
</div>
      </div>
    </>
  );
}
