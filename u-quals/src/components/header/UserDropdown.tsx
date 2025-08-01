// UserDropdown.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../components/auth/AuthContext";

interface MyToken {
  id_pegawai: number;
  nama_pegawai: string;
  email: string;
  status: string;
  exp: number;
}

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    token, 
    setToken, 
    pegawai, 
    setPegawai, 
    currentRole, 
    setCurrentRole,
    availableRoles,
    setAvailableRoles
  } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<MyToken | null>(null);

  // const handleChangeRole = (roleId: number) => {
  //   const selectedRole = availableRoles.find((r) => r.id_role === roleId);
  //   if (selectedRole) {
  //     setCurrentRole(selectedRole);
  //     closeDropdown();
  //   }
  // };

  const handleChangeRole = async (roleId: number) => {
  try {
    // 1. Panggil API untuk ganti role
    const response = await axios.post('http://localhost:5000/change-role', {
      role_id: roleId
    }, {
      withCredentials: true
    });

    // 2. Update token dan role di context
    const newToken = response.data.accessToken;
    setToken(newToken);
    
    // 3. Decode token untuk dapat data terbaru
    const decoded = jwtDecode<MyToken>(newToken);
    const selectedRole = availableRoles.find(r => r.id_role === roleId);

    if (selectedRole) {
      setCurrentRole(selectedRole);
      
      // 4. Update data pegawai
      setPegawai({
        id_pegawai: decoded.id_pegawai,
        nama_pegawai: decoded.nama_pegawai,
        email: decoded.email,
        status: decoded.status
      });

    }
  } catch (error) {
    console.error('Gagal ganti role:', error);
  } finally {
    closeDropdown();
  }
};

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.get("http://localhost:5000/token", {
          withCredentials: true,
        });
        const newToken = res.data.accessToken;
        setToken(newToken);

        const decoded = jwtDecode<MyToken>(newToken);
        setUser(decoded);

        setPegawai({
          id_pegawai: decoded.id_pegawai,
          nama_pegawai: decoded.nama_pegawai,
          email: decoded.email,
          status: decoded.status,
        });

        if (decoded?.id_pegawai) {
          const roleRes = await axios.get(`http://localhost:5000/role-pegawai/${decoded.id_pegawai}`, {
            withCredentials: true,
          });
          setAvailableRoles(roleRes.data);
          if (roleRes.data.length > 0 && !currentRole) {
            setCurrentRole(roleRes.data[0]);
          }
        }

      } catch (error) {
        navigate("/signin");
      }
    };

    if (!token) {
      refreshToken();
    }
  }, [token, setToken, setPegawai, navigate, currentRole, setCurrentRole, setAvailableRoles]);

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      navigate("/signin");
      setToken("");
      setPegawai(null);
      setCurrentRole(null);
      setAvailableRoles([]);
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/user/owner.jpg" alt="User" />
        </span>

        <div className="flex flex-col">
          <span className="block mr-1 font-medium text-theme-sm">
            {pegawai?.nama_pegawai ?? "Memuat..."}
          </span>
          <span className="text-theme-xs text-gray-500 dark:text-gray-400">
            {currentRole?.nama_role ?? "Tidak Ada Role"}
          </span>
        </div>
        
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {pegawai?.nama_pegawai ?? "Memuat..."}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {currentRole?.nama_role ?? "Tidak Ada Role"}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-2 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <svg
                className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                  fill=""
                />
              </svg>
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <label className="block text-theme-xs text-gray-500 dark:text-gray-400 mb-1">
              Ganti Peran
            </label>            
            <div className="relative">
              <select
                value={currentRole?.id_role || ''}
                onChange={(e) => handleChangeRole(Number(e.target.value))}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px] appearance-none"
              >
                {availableRoles.map(role => (
                  <option key={role.id_role} value={role.id_role}>
                    {role.nama_role}
                  </option>
                ))}
              </select>

              {/* Dropdown Arrow fix */}
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"                  
                  viewBox="0 0 20 20"
                >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </li>
        </ul>
        <Link
          to="/signin"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 pr-5 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <svg
            className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z"
              fill=""
            />
          </svg>
          Sign out
        </Link>
      </Dropdown>
    </div>
  );
}