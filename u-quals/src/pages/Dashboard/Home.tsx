// import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../components/auth/AuthContext";

interface MyToken {
  id_pegawai: number;
  nama_pegawai: string;
  email: string;
  exp: number;
}

const axiosJWT = axios.create();

export default function Home() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [pegawais, setPegawais] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const refreshToken = async () => {
        try {
          const res = await axios.get("http://localhost:5000/token", {
            withCredentials: true,
          });
  
          const newToken = res.data.accessToken;
          setToken(newToken);
  
          const decoded = jwtDecode<MyToken>(newToken);
          console.log("Id Pegawai:", decoded.id_pegawai);
          console.log("Pegawai login:", decoded.nama_pegawai);
          console.log("Email:", decoded.email);
          console.log("exp:", decoded.exp);
        } catch (error) {
          navigate("/signin"); // Redirect ke login jika gagal
        }
      };
  
      if (!token) {
        refreshToken(); // ambil token jika belum ada
      }
    }, [token, setToken, navigate]);

  return (
    <>
      <PageMeta
        title="U-Quals - Dashboard"
        description=""
      />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Card Title Here
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Start putting content on grids or panels, you can also use different
            combinations of grids.Please check out the dashboard and other pages
          </p>
        </div>
      </div>
      {/* <div className="grid grid-cols-12 gap-4 md:gap-6"> */}
        {/* <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      {/* </div> */}
    </>
  );
}
