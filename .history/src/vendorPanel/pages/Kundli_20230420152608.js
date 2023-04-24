/** @format */

import React, { useState, useCallback, useEffect } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import HOC from "../layout/HOC";
import axios from "axios";

const Kundli = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/pickupmens",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Partner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number </Form.Label>
              <Form.Control type="tel" pattern="[0-9]{10}" required />
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
            All Partner's
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] uppercase  text-white tracking-wider"
          >
            Add partner
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Email Address</th>
              <th> Mobile Number </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((i, index) => (
              <tr key={index}>
                <td>#{index + 1} </td>
                <td>{i.name}</td>
                <td>
                  {" "}
                  {i.shippingOrderId?.shippingFrom?.city +
                    " " +
                    i.shippingOrderId?.shippingFrom?.state +
                    " " +
                    i.shippingOrderId?.shippingFrom?.pinCode +
                    " , " +
                    i.shippingOrderId?.shippingFrom?.country }{" "}
                </td>
                <td>
                  {" "}
                  {i.shippingOrderId?.shippingTo?.city +
                    " " +
                    i.shippingOrderId?.shippingTo?.state +
                    " " +
                    i.shippingOrderId?.shippingTo?.pinCode +
                    " , " +
                    i.shippingOrderId?.shippingTo?.country }{" "}
                </td>
                <td> 
                {i.shippingOrderId?.packages?.map((item , index) => (
                  <p key={index}> {item.packageCategory}  </p>
                ))}
                </td>
                <td>
                  {i.?parcelStatus}
                </td>
                <td>
                  <i className="fa-solid fa-trash" />
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(Kundli);
