/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Container, Badge } from "react-bootstrap";
import axios from "axios";

const Astrologers = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/shippings",
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
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ textTransform: "uppercase" }}
          >
            Assign parcel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select className="mb-3">
              <option>--Select --</option>
              <option>R9</option>
              <option>CR7</option>
              <option></option>
            </Form.Select>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  function ViewModal(props) {
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
            View Quote
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <p className="View">
              {" "}
              <strong>Customer : </strong> Sancho{" "}
            </p>
            <p className="View">
              {" "}
              <strong> Shipping From : </strong> India 110037 New Delhi{" "}
            </p>
            <p className="View">
              {" "}
              <strong> Shipping To : </strong> Australia 3075 Northcote
            </p>
            <p className="View">
              {" "}
              <strong> What is getting Shipped : </strong> Document{" "}
            </p>
            <p className="View">
              {" "}
              <strong> Weight : </strong> 60 Grams{" "}
            </p>
            <p className="View">
              {" "}
              <strong> Length (cm) : </strong> 60{" "}
            </p>
            <p className="View">
              {" "}
              <strong> Width : </strong> 40{" "}
            </p>
            <p className="View">
              {" "}
              <strong>Height (cm) : </strong> 30.0{" "}
            </p>
            <p className="View">
              {" "}
              <strong> Quantity : </strong> 2{" "}
            </p>
            <p className="View">
              {" "}
              <strong> Shipment Value : </strong> $50{" "}
            </p>
          </Container>
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
      <ViewModal show={viewModal} onHide={() => setViewModal(false)} />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Parcels
          </span>
        </div>

        <div className="wcomp overflow-x-auto">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Number</th>
                <th>Customer</th>
                <th>Shipping From </th>
                <th>Shipping To</th>
                <th>Quote Date</th>
                <th>Shipped</th>
                <th>Approve/DissApprove</th>
                <th>Assign</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td>Neymar</td>
                <td>India 110037 New Delhi</td>
                <td>Austraila 3075 Northcote vict</td>
                <td>25 March, 2023</td>
                <td>Document</td>
                <td>
                  <Button variant="outline-success">Approve</Button>
                </td>
                <td>
                  <Button
                    style={{ backgroundColor: "#19376d", borderRadius: "0" }}
                    onClick={() => setModalShow(true)}
                  >
                    {" "}
                    Assign
                  </Button>
                </td>
                <td>
                  <span className="d-flex gap-2">
                    <i className="fa-solid fa-trash" />
                    <i
                      className="fa-sharp fa-solid fa-eye"
                      onClick={() => setViewModal(true)}
                    ></i>
                  </span>
                </td>
              </tr>
              <tr>
                <td>#2</td>
                <td>Sancho</td>
                <td>India 110037 New Delhi</td>
                <td>Austraila 3075 Northcote vict</td>
                <td>25 June, 2023</td>
                <td>Package</td>
                <td>
                  <Button variant="outline-danger">Approve</Button>
                </td>
                <td>
                  <Button
                    style={{ backgroundColor: "#19376d", borderRadius: "0" }}
                    onClick={() => setModalShow(true)}
                  >
                    Assign
                  </Button>
                </td>
                <td>
                  <span className="d-flex gap-2">
                    <i className="fa-solid fa-trash" />
                    <i
                      className="fa-sharp fa-solid fa-eye"
                      onClick={() => setViewModal(true)}
                    ></i>
                  </span>
                </td>
              </tr>
              {data?.data?.map((i, index) => (
                <tr key={index}>
                  <td>#{index + 1} </td>
                  <td>{i.userId}</td>
                  <td>
                    <span>
                      {i.shippingFrom?.city +
                        " " +
                        i.shippingFrom?.state +
                        " " +
                        i.shippingFrom?.pinCode +
                        " " +
                        i.shippingFrom?.city}
                    </span>
                  </td>
                  <td>
                    <ul>
                      {i.packages?.map((a, index) => (
                        <li key={index}> {a.packageCategory} </li>
                      ))}
                    </ul>
                  </td>
                  <td>5 </td>
                  <td>$400.00 </td>
                  <td>
                    <Badge bg="success"> Success </Badge>{" "}
                  </td>
                  <td>
                    <Badge bg="info"> Pending </Badge>{" "}
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

export default HOC(Astrologers);
