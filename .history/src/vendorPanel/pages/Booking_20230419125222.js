/** @format */

import React from "react";
import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";

const Booking = () => {
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
            <tr>
              <td>#1</td>
              <td>Luka Modric</td>
              <td>12 March, 2032</td>
              <td>₹500 </td>
            </tr>
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(Booking);
