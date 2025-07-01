// import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import PageMeta from "../../components/common/PageMeta";
import ViewMatrics from "../../components/dashboard/ViewMatrik";
import Rekapitulasi from "../../components/dashboard/Rekapitulasi";
import { useAuth } from "../../components/auth/AuthContext";
import RekapitulasiMatrics from '../../components/dashboard/Rekapitulasi';

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
      <div className="w-full gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 w-full">
          <ViewMatrics />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <Rekapitulasi />
        </div>
{/* 
        <div className="col-span-12">
          <StatisticsChart />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-7">
          <RecentOrders /> */}
        {/* </div> */}
            </div>
    </>
  );
}