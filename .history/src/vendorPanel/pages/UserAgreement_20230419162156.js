import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";


const UserAgreement = () => {

    const [ data , setData ]= useState([])

    const fetchData = async ()=>{
      try {
        const { data } = await axios.get("http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/legal/enduser")
        setData(data)
      }catch(e) { 
        console.log(e)
      }
    }

    useEffect(() => {
      fetchData()
    },[])

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            User Agreement
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Number</th>
                <th>Agreement</th>
                <th>Create At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {data?.endUser?.map((i , index) => (
                    <tr key={index}>
                        <td>#{index + 1}</td>
                        <td> {i.} </td>
                    </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(UserAgreement)