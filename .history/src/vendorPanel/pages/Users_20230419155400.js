/** @format */

import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import { useCallback, useState } from "react";
import axios from "axios";

const Users = () => {

    const [ data , setData ]= useState([])

    const fetchData = async ()=>{
      try {
        const { data } = await axios.get("http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/legal/privacy")
        setData(data)
      }catch(e) { 
        console.log(e)
      }
    }

    use

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Privacy Policy
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Privacy Policy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available. Wikipedia
                </td>
                <td>
                  <i className="fa-solid fa-edit" />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Users);
