/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Badge, Table } from "react-bootstrap";
import axios from "axios";

const Booking = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/bookings",
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
            All Order's
          </span>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Delivered Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((i, index) => (
              <tr key={index}>
                <td> #{index + 1} </td>
                <td> {i.userId?.firstName + " " + i.userId?.lastName} </td>
                <td> {i.shippingOrderId} </td>
                <td> {i.coupon} </td>
                <td> {i.discountAmount} </td>
                <td> {i.amount} </td>
                <td> {i.totalAmount} </td>
                <td> {i.paymentStatus} </td>
                <td>
                  {" "}
                  {i.orderApproved === "Approved" ? (
                    <Badge bg="success">Approved</Badge>
                  ) : (
                    ""
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(Booking);
