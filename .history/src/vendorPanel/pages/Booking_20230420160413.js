/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Badge, Modal, Table } from "react-bootstrap";
import axios from "axios";

const Booking = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/bookings",
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
    const [parcelStatus, setParcelStatus] = useState("");

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/shippings/${id}`,
          { parcelStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        props.onHide()
        fetchData();
        toast.success("Edited");
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
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ textTransform: "uppercase" }}
          >
          Edit Order Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={putHandler}>
            <Form.Select
              className="mb-3"
              onChange={(e) => setParcelStatus(e.target.value)}
            >
              <option>-- Select Status --</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="cancel">Cancel</option>
            </Form.Select>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
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
            All Order's
          </span>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Customer</th>
              <th>Shipping Order</th>
              <th>Coupon</th>
              <th>Discounted Amount</th>
              <th>Amount</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((i, index) => (
              <tr key={index}>
                <td> #{index + 1} </td>
                <td> {i.userId?.firstName + " " + i.userId?.lastName} </td>
                <td> {i.shippingOrderId} </td>
                <td> {i.coupon} </td>
                <td> ₹{i.discountAmount} </td>
                <td> ₹{i.amount} </td>
                <td> ₹{i.totalAmount} </td>
                <td>
                  {" "}
                  {i.paymentStatus === true ? (
                    <Badge bg="success">Completed</Badge>
                  ) : (
                    ""
                  )}{" "}
                  {" "}
                  {i.paymentStatus === false ? (
                    <Badge bg="danger">Cancelled</Badge>
                  ) : (
                    ""
                  )}{" "}
                </td>
                <td>
                  {" "}
                  {i.orderApproved === "Approved" ? (
                    <Badge bg="success">Approved</Badge>
                  ) : (
                    ""
                  )}{" "}
                  {i.orderApproved === "Pending" ? (
                    <Badge bg="success">Pending</Badge>
                  ) : (
                    ""
                  )}{" "}
                  {i.orderApproved === "cancel" ? (
                    <Badge bg="success">Cancelled</Badge>
                  ) : (
                    ""
                  )}{" "}
                </td>
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

export default HOC(Booking);
