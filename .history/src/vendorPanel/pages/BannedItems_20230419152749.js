/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const BannedItems = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [bannedItems, setBannedItem] = useState("");
    const [restrictedItems, setRestrictedItem] = useState("");

    const bannedItemArray = []
    console.log(bannedItems)
    bannedItemArray.push()

    const postHandeler = async (e) => {
        e.preventDefault()
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/items" ,
          { bannedItems, restrictedItems } , {
            headers : {
                Authorization : `Bearer ${token}`
            }
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
            Add Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandeler}>
            <Form.Group className="mb-3">
              <Form.Label>Banned Items</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setBannedItem(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Restricted Items</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setRestrictedItem(e.target.value)}
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Banned Items
          </span>
          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Banned Items
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Banned Items</th>
              <th>Restricted Items</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((i, index) => (
              <tr key={index}>
                <td> #{index + 1} </td>
                <td>
                  <ul>
                    {i.bannedItems?.map((item, index) => (
                      <li key={index}> {item} </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {i.restrictedItems?.map((item, index) => (
                      <li key={index}> {item} </li>
                    ))}
                  </ul>
                </td>
                <td> {i.createdAt?.slice(0, 10)} </td>
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

export default HOC(BannedItems);
