/** @format */

import React  , {useState ,useCallback  , useEffect} from "react";
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

  return (
    <>
      <p
        style={{
          fontSize: "18px",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        All Users ( Total  : {data?.length} )     </p>

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
          {data?.}
            <tr>
              <td>#1</td>
              <td>Adam</td>
              <td>Adam@gmail.com</td>
              <td>9874587445</td>
              <td>
                <i className="fa-solid fa-trash" />
              </td>
            </tr>
            <tr>
              <td>#2</td>
              <td>John</td>
              <td>John@gmail.com</td>
              <td>9874587445</td>
              <td>
                <i className="fa-solid fa-trash" />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default HOC(AdminUsers);
