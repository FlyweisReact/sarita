import React, { useEffect, useState } from 'react'
import HOC from '../layout/HOC'
import { Table } from "react-bootstrap"
import axios from 'axios';

const AdminTerms = () => {
  const [data, setData] = useState([]);
  const[ modal, setModal ] = useState(false)

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/terms"
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
    <section>
    <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
      <span className="tracking-widest text-slate-900 font-semibold uppercase ">
        Terms & Condition ( Total : {data?.data})
      </span>
    </div>

    <div style={{ overflowX: "auto" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Terms & Condition</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {data?.data?.map((i,index) => (
          <tr key={index}>
            <td>
        {i.terms}
            </td>
            <td>
              <i className="fa-solid fa-edit" />
            </td>
          </tr>
        ))}
         
        </tbody>
      </Table>
    </div>
  </section>
</>
);
};

export default HOC(AdminTerms)