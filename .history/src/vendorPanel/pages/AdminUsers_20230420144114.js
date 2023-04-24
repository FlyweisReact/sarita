/** @format */

import React, { useState, useCallback, useEffect } from "react";
import { Table } from "react-bootstrap";
import HOC from "../layout/HOC";
import axios from "axios";

const AdminUsers = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/users",
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

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data)
      fetchData()
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <p
        style={{
          fontSize: "18px",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        All Users ( Total : {data?.length} ){" "}
      </p>

      <div style={{ width: "100%", overflow: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Mobile Number</th>
              <th>DOB</th>
              <th>Country</th>
              <th>Registered At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => (
              <tr key={index}>
                <td> #{index + 1} </td>
                <td> {i.firstName + " " + i.lastName} </td>
                <td> {i.email} </td>
                <td> {i.phone} </td>
                <td> {i.DOB} </td>
                <td> {i.country} </td>
                <td> {i.createdAt?.slice(0, 10)} </td>
                <td>
                  <i className="fa-solid fa-trash" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default HOC(AdminUsers);
