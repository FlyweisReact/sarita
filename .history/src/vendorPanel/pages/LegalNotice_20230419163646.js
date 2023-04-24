/** @format */

import HOC from "../layout/HOC";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Accessebility = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/legal/accessibility"
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
    const [message, setMessage] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/legal/accessibility",
          {
            accessibility : message,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast.success("Added");
        fetchData();
        props.onHide();
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
            {" "}
            Add Accessebility
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Accessebility</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setMessage(e.target.value)}
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


  const deleteHandler  = async (id) => {
    try{
        // const { data } = await axios.delete(`http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/legal/disputes/${id}`,   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   })
        // console.log(data)
        // fetchData()
        toast.success("Deleted")
    }catch(e) { 
        console.log(e)
    }
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
            All Accessebility
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Accessebility
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Disputes</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((i, index) => (
                <tr key={index}>
                  <td> {i.accessibility} </td>
                  <td> {i.createdAt?.slice(0, 10)} </td>
                  <td>
                    <i className="fa-solid fa-trash" onClick={() => deleteHandler(i._id)} />
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

export default HOC(LegalNotice);
