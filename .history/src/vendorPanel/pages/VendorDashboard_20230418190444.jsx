/** @format */

import React from "react";
import {
  MdDashboardCustomize,
  MdReviews,
} from "react-icons/md";
import { FaPeriscope } from "react-icons/fa";
import {
  AiOutlineUsergroupDelete,
  AiFillFileImage,
  AiFillNotification,
} from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { TbDiscount } from "react-icons/tb";
import HOC from "../layout/HOC";

const VendorDashboard = () => {
  const card = [
    {
      progress: "bg-blue-400",
      title: "Total Revenue",
      number: "10",
      icon: (
        <AiOutlineUsergroupDelete className="text-2xl text-[rgb(240,72,88)]" />
      ),
      bg: "#ff5370",
    },
    {
      progress: "bg-green-400",
      title: "All Users",
      number: "100",
      icon: <FiUser className="text-2xl text-[#4099ff]" />,
      bg: "#4099ff",
    },
    {
      progress: "bg-yellow-400",
      title: "All Coupon's",
      number: "150",
      icon: <MdReviews className="text-2xl text-[#ffb64d]" />,
      bg: "#ffb64d",
    },
    {
      progress: "bg-yellow-400",
      title: "All Booking's",
      number: "150",
      icon: <MdDashboardCustomize className="text-2xl text-[#19ac5e]" />,
      bg: "#19ac5e",
    },

    {
      progress: "bg-yellow-400",
      title: "All Banner's",
      number: "150",
      icon: <AiFillFileImage className="text-2xl text-[#4388e8]" />,
      bg: "#4388e8",
    },
    {
      progress: "bg-yellow-400",
      title: "All Coupon's",
      number: "150",
      icon: <TbDiscount className="text-2xl text-[#ed4d4d]" />,
      bg: "#ed4d4d",
    },
    {
      progress: "bg-yellow-400",
      title: "All Horocope's",
      number: "150",
      icon: <FaPeriscope className="text-2xl text-[#ff5370]" />,
      bg: "#ff5370",
    },
    {
      progress: "bg-yellow-400",
      title: "All Notification's",
      number: "150",
      icon: <AiFillNotification className="text-2xl text-[#4099ff]" />,
      bg: "#4099ff",
    },
    {
      progress: "bg-yellow-400",
      title: "All Blog's",
      number: "150",
      icon: <AiFillNotification className="text-2xl text-[#ffb64d]" />,
      bg: "#ffb64d",
    },
    {
      progress: "bg-yellow-400",
      title: "All Feedback's",
      number: "150",
      icon: <AiFillNotification className="text-2xl text-[#19ac5e]" />,
      bg: "#19ac5e",
    },

  ];
  return (
    <>
      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
              key={index}
              style={{ backgroundColor: `${card.bg}` , textTransform : 'uppercase' }}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div
                  className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn"
              
                >
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(VendorDashboard);
