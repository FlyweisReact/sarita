import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const Discpute = () => {

    const [ data , setData ]= useState([])

    const fetchData = async ()=>{
      try {
        const { data } = await axios.get("http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/legal/disputes")
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
            All Disputes
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
            
             {data?.data?.map((i , index) => (
                <tr key={index} >
                    <td> {i.message} </td>
                </tr>
             ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Discpute)