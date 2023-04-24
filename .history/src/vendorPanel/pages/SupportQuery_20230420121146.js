/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import {  Table } from "react-bootstrap";
import axios from "axios";

const SupportQuery = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/supports/admin/technicalsupport",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Support Query ( Total : )
          </span>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Days</th>
              <th>Message</th>
              <th>Timing</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((i, index) => (
              <tr key={index}>
                <td>#{index + 1} </td>
                <td>{i.gmailAddress}</td>
                <td> {i.phoneNumber} </td>
                <td> {i.days} </td>
                <td> {i.message} </td>
                <td> {i.timing} </td>
                <td> {i.createdAt?.slice(0,10)} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(SupportQuery);
