/** @format */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const BannedItems = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
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
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function MyVerticallyCenteredModal(props) {
    const [bannedItems, setBannedItem] = useState("");
    const [restrictedItems, setRestrictedItem] = useState("");

    const [myArray, setMyArray] = useState([]);

    function handleAddButtonClick() {
      setMyArray((prevArray) => [...prevArray, bannedItems]);
      setBannedItem("");
      toast.success("Banned Item Added");
    }
    const [myArray2, setMyArray2] = useState([]);

    function handleAddButtonClick2() {
      setMyArray2((prevArray) => [...prevArray, restrictedItems]);
      setRestrictedItem("");
      toast.success("Restricted Item Added");
    }

    const postHandeler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/items",
          { bannedItems: myArray, restrictedItems: myArray2 },
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
            Add Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandeler}>
            <div
              className="d-flex "
              style={{ alignItems: "center", gap: "10px" }}
            >
              <Form.Group className="mb-3" style={{ width: "80%" }}>
                <Form.Label>Banned Items</Form.Label>
                <Form.Control
                  type="text"
                  value={ba}
                  onChange={(e) => setBannedItem(e.target.value)}
                />
              </Form.Group>
              <i
                className="fa-sharp fa-solid fa-plus"
                style={{ fontSize: "2rem", paddingTop: "10px" }}
                onClick={handleAddButtonClick}
              ></i>
            </div>
            <div
              className="d-flex "
              style={{ alignItems: "center", gap: "10px" }}
            >
              <Form.Group className="mb-3" style={{ width: "80%" }}>
                <Form.Label>Restricted Items</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setRestrictedItem(e.target.value)}
                />
              </Form.Group>
              <i
                className="fa-sharp fa-solid fa-plus"
                style={{ fontSize: "2rem", paddingTop: "10px" }}
                onClick={handleAddButtonClick2}
              ></i>
            </div>

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

  const delteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      toast.success("Deleted");
      fetchData()
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Banned Items ( Total : {data?.data?.length})
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
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => delteHandler(i._id)}
                  />
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
