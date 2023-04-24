/** @format */

import axios from "axios";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const BannedItems = () => {
    const [ data , setData ] = useState([])
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data)
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Banned Items
          </span>
          <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider">
            Add Notification
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Notification</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {data?.data?.map(( i ,index) => (

          ))}
           
          </tbody>
        </Table>

      </section>
    </>
  );
};

export default HOC(BannedItems);
