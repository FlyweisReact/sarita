/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendorLogin from "./vendorPanel/forms/VendorLogin";
import AdminDiscount from "./vendorPanel/pages/AdminDiscount";
import AdminReview from "./vendorPanel/pages/AdminReview";
import Astrologers from "./vendorPanel/pages/Astrologers";
import Banners from "./vendorPanel/pages/Banners";
import Booking from "./vendorPanel/pages/Booking";
import Horoscope from "./vendorPanel/pages/Horoscope";
import Kundli from "./vendorPanel/pages/Kundli";
import Message from "./vendorPanel/pages/Message";
import UploadDocs from "./vendorPanel/pages/UploadDocs";
import Users from "./vendorPanel/pages/Users";
import VendorDashboard from "./vendorPanel/pages/VendorDashboard.jsx";
import AdminUsers from "./vendorPanel/pages/AdminUsers";
import AdminBlogs from "./vendorPanel/pages/AdminBlogs";
import AdminCategory from "./vendorPanel/pages/AdminCategory";
import Support from "./vendorPanel/pages/Support";
import AdminTerms from "./vendorPanel/pages/AdminTerms";
import BannedItems from "./vendorPanel/pages/BannedItems";
import Discpute from "./vendorPanel/pages/Discpute";
import UserAgreement from "./vendorPanel/pages/UserAgreement";
import Accessebility from "./vendorPanel/pages/Accessebility";
import LegalNotice from "./vendorPanel/pages/LegalNotice";
import SupportQuery from "./vendorPanel/pages/SupportQuery";
import FraudAwareness from "./vendorPanel/pages/FraudAwareness";
import Country from "./vendorPanel/pages/Country";
import State from "./vendorPanel/pages/State";


function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<VendorLogin />} />
        <Route path="/vendorDashboard" element={<VendorDashboard />} />
        <Route path="/msg" element={<Message />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/AdminDiscount" element={<AdminDiscount />} />
        <Route path="/Banners" element={<Banners />} />
        <Route path="/adminReviews" element={<AdminReview />} />

        <Route path="/admin/blogs" element={<AdminBlogs />} />
        <Route path="/book" element={<Booking />} />

        <Route path="/horo" element={<Horoscope />} />
        <Route path="/astro" element={<Astrologers />} />
        <Route path="/kundli" element={<Kundli />} />



        <Route path="/uploadDocs" element={<UploadDocs />} />
        <Route path="/privacy-policy" element={<Users />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/admin/support" element={<Support />} />
        <Route path="/admin/terms" element={<AdminTerms />} />


        <Route path="/bannedItem" element={<BannedItems />} />
        <Route path="/dispute" element={<Discpute />} />
        <Route path="/userAgreement" element={<UserAgreement />} />
        <Route path="/accssebility" element={<Accessebility />} />
        <Route path="/legalNotice" element={<LegalNotice />} />


        <Route path="/supportQuery" element={<SupportQuery />} />
        <Route path="/fraudAwareness" element={<FraudAwareness />} />
        <Route path="/counrty" element={<Country />} />
        <Route path="/state" element={<State />} />
        <Route path="/cities" element={<Ci}

      </Routes>
    </>
  );
}

export default App;
