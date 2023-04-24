/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Button, FloatingLabel, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDiscount = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const token = localStorage.getItem("token");
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/coupens",
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
    const [coupenCode, setCouponCode] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [maxDiscountAmount, setMaxDiscountAmount] = useState("");
    const [activationDate, setActivationDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/fraudawareness",
          {
            coupenCode,
            minAmount,
            maxDiscountAmount,
            activationDate,
            expiryDate,
            discountPercent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast.success("Added");
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
            Add Coupon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Min. Amount</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setMinAmount(e.target.value)}
              />
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Max. Discounted Amount</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setMaxDiscountAmount(e.target.value)}
              />
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Activation Date</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setActivationDate(e.target.value)}
              />
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCouponCode(e.target.value)}
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

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/fraudawareness/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      fetchData();
      toast.success("Deleted");
    } catch (e) {
      console.log(e);
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
            All Coupons ( Total : {data?.data?.length} )
          </span>

          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Coupons
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Coupon Code</th>
              <th>Min. Amount</th>
              <th>Max Discount Amount</th>
              <th>Discount</th>
              <th>Activation Date</th>
              <th>Expiry Date</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((i, index) => (
              <tr key={index}>
                <td>#{index + 1} </td>
                <td>{i.coupenCode}</td>
                <td>₹{i.minAmount}</td>
                <td>₹{i.maxDiscountAmount}</td>
                <td>{i.discountPercent}%</td>
                <td>{i.activationDate?.slice(0, 10)}</td>
                <td>{i.expiryDate?.slice(0, 10)}</td>
                <td> {i.createdAt?.slice(0, 10)} </td>
                <td>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => deleteHandler(i._id)}
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

export default HOC(AdminDiscount);
