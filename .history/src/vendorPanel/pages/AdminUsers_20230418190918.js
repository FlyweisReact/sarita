/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const AdminUsers = () => {
  

  return (
    <>
      <p
        style={{
          fontSize: "18px",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        All Users ( Total  : 2 )     </p>

      <div style={{ width: "100%", overflow: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Mobile Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1</td>
              <td>Adam</td>
              <td>Adam@gmail.com</td>
              <td>Adam@gmail.com</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default HOC(AdminUsers);
