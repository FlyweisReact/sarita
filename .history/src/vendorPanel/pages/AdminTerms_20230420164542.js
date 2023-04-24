import React, { useEffect, useState } from 'react'
import HOC from '../layout/HOC'
import { Button, Form, Modal, Table } from "react-bootstrap"
import axios from 'axios';
import { toast } from 'react-toastify';

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
  }, []);  function MyVerticallyCenteredModal(props) {
    const [privacy, setPrivacy] = useState("");
    const token = localStorage.getItem('token')

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/terms`,
          { terms : privacy } ,{
            headers : {
              Authorization : `Bearer ${token}`
            }
          }
        );
        console.log(data);
        toast.success("Edited");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Terms
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
            <Form.Label>Terms</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPrivacy(e.target.value)}
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }


  return (
    <>
    <MyVerticallyCenteredModal show={modal} onHide={() => setModal(false)} />
    <section>
    <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
      <span className="tracking-widest text-slate-900 font-semibold uppercase ">
        Terms & Condition ( Total : {data?.data?.length})
      </span>
      <button
            onClick={() => {
              setModal(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add 
          </button>
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