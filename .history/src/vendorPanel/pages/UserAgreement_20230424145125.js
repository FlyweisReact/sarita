/** @format */

import HOC from "../layout/HOC";
import { Form, Modal, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const UserAgreement = () => {
  const [data, setData] = useState([]);
  const [ modalShow , setModalShow ] = useState(false)

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/legal/enduser"
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [message , setMessage ] = useState("")

    const putHandler  = async () => {
      
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
            Edit User Agreement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <Form>
        <Form.Group className="mb-3">
          <Form.Label>Agreement</Form.Label>
          <Form.Control type='text' />
        </Form.Group>
       </Form>
        </Modal.Body>
      </Modal>
    );
  }
  

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
                <th>Agreement</th>
                <th>Create At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {data?.endUser?.message} </td>
                <td> {data?.endUser?.updatedAt?.slice(0, 10)} </td>
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

export default HOC(UserAgreement);
