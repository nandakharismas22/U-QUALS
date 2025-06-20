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

const axiosJWT = axios.create();

export default function Home() {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  interface MyToken {
    id_pegawai: number;
    nama_pegawai: string;
    email: string;
    exp: number;
  }

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    const res = await axios.get("http://localhost:5000/token", { withCredentials: true });
    setToken(res.data.accessToken);
    const decoded = jwtDecode<MyToken>(res.data.accessToken);
    setExpire(decoded.exp);
    setEmail(decoded.email);
    setName(decoded.nama_pegawai);
  };

  axiosJWT.interceptors.request.use(async (config) => {
    const now = new Date();
    if (expire * 1000 < now.getTime()) {
      const res = await axios.get("http://localhost:5000/token", { withCredentials: true });
      config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      setToken(res.data.accessToken);
      const decoded = jwtDecode<MyToken>(res.data.accessToken);
      setExpire(decoded.exp);
      setEmail(decoded.email);
      setName(decoded.nama_pegawai);
    }
    return config;
  });

  const getPegawai = async () => {
    const response = await axiosJWT.get("http://localhost:5000/pegawai", {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data);
  };
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
