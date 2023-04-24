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
        All Users ( Total :{" "}
      </p>

      <div style={{ width: "100%", overflow: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Address</th>
              <th>Mobile Number</th>
              <th>Role</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </div>
    </>
  );
};

export default HOC(AdminUsers);
