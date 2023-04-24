import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Badge, Table } from "react-bootstrap";
import axios from "axios";

const SupportQuery = () => {
    const [ data , setData] = useState([])

    const token = localStorage.getItem("token")
  
    const fetchData = useCallback(async() => {
      try {
        const { data } = await axios.get("http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/supports/admin/technicalsupport" ,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        setData(data)
      }catch(e) { 
        console.log(e)
      }
    },[token])
  
    useEffect(() => {
      fetchData()
    },[fetchData])
  
    return (
      <>
        <section>
          <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
            <span className="tracking-widest text-slate-900 font-semibold uppercase ">
              All Support Query
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
                <td>#{index + 1} </td>
                <td>{i.gmailAddress}</td>
                <td> {i.phoneNumber} </td>
                <td>
                <ul>
                {i.packages?.map((a , index) => (
                  <li key={index}> {a.packageCategory} </li>
                ))}
                </ul>
                 </td>
                <td>5 </td>
                <td>$400.00 </td>
                <td><Badge bg='success' > Success </Badge> </td>
                <td><Badge bg='info' > Pending </Badge> </td>
                <td>
                <i className="fa-solid fa-edit" />
                 </td>
              </tr>
            ))}
             
            </tbody>
          </Table>
        </section>
      </>
    );
  };
  

export default HOC(SupportQuery)