import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router";
import {AuthProvider} from "./components/auth/AuthContext";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
// import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ViewMetrics from "./pages/DashboardView/DashHome";
import TablesPengguna from "./pages/PlotingUser";
import TablesPeriode from "./pages/Periode";
import TabelsAuditor from "./pages/PlotingAuditor";
import TabelsStandart from "./pages/Standar/SumberStandar";
import TabelsDaftarStandar from "./pages/Standar/DaftarStandar";
import TabelsMonitoring from "./pages/MonitoringSet";
import TabelsAkreLab from "./pages/Akreditasi/LabAkre";
import TabelsAkreProdi from "./pages/Akreditasi/AkreProdi";
import TabelsInstitusi from "./pages/Akreditasi/InstitusiAkre";
import TabelsLembaga from "./pages/Akreditasi/LembagaAkre";
import TablesAudit from "./pages/JenisAudit";
import TablesLaporanAudit from "./pages/Laporan";

export default function App() {
  return (
    <>
      <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
        Redirect root path to /signin
        <Route index path="/" element={<Navigate to="/signin" replace />} />

          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            {/* <Route path="/" element={<Blank />} /> */}
            {/* <Route path="/dashboard" element={<ViewMetrics />} /> */}
            <Route path="/home" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/periode" element={<TablesPeriode />} />
            <Route path="/pengguna" element={<TablesPengguna />} />
            <Route path="/auditor" element={<TabelsAuditor />} />
            <Route path="/audit" element={<TablesAudit />} />

            <Route path="/monitoring" element={<TabelsMonitoring />} />
           
            {/* Satandart */}
            <Route path="/sumber" element={<TabelsStandart />} />
            <Route path="/listdaftar" element={<TabelsDaftarStandar />} />

            {/* Akreditasi */}
            <Route path="/lembaga" element={<TabelsLembaga />} />
            <Route path="/institusi" element={<TabelsInstitusi />} />
            <Route path="/prodi" element={<TabelsAkreProdi />} />
            <Route path="/lab" element={<TabelsAkreLab />} />
            
            {/* Laporan Audit */}
            <Route path="/laporan" element={<TablesLaporanAudit />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      </AuthProvider>
    </>
  );
}
