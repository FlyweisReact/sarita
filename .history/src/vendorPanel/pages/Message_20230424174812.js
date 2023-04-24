/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const Message = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [ data , setData ] = useState([])

  const fetchData = async ( ) => {
    try{
      const { data } = await axios.get("http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/notifications")
      setData(data)
    }catch(e) {
       console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  function MyVerticallyCenteredModal(props) {
    const [title , setTitle ] = useState('')
    const [message , setMessage ] = useState('')

    const postHandler = async (e) => {
      e.preventDefault()
      try { 
        const { data } = await axios.post(`http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/notifications` , {
          title , message 
        })
        console.log(data)
        toast.success("Added")
        fetchData()
        props.onHide()
      }catch(e) { 
        console.log(e)
      }
    } 


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Add Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler} >
            <Form.Group className="mb-3">
              <Form.Label>Notification</Form.Label>
              <Form.Control type="text" />
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Push Notification
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Notification
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {data?.data?.map(( i , index) => (
            <tr key={index}>
            <td> {i.title} </td>
            <td> {i.message} </td>
            <td> {i.createdAt?.slice(0,10)} </td>
            <td>
            <i className="fa-solid fa-trash" />
             </td>
             </tr>
          ))}
      
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(Message);
