/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Container, Badge } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Astrologers = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

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
      console.log(data)
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
            {edit ? "Edit Parcel Status" : "Assign parcel"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : ""}>
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

  function ViewModal(props) {
    const [each, setEach] = useState([]);

    const fetchParcel = useCallback(async () => {
      try {
        const { data } = await axios.get(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/shippings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEach(data);
      } catch (e) {
        console.log(e);
      }
    }, []);

    useEffect(() => {
      if (props.show === true) {
        fetchParcel();
      }
    }, [fetchParcel, props.show]);

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
            View Parcel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <p className="View">
              {" "}
              <strong>Customer : </strong> {each?.data?.userId}{" "}
            </p>
            <p className="View">
              {" "}
              <strong>Shipping From : </strong>{" "}
              {each?.data?.shippingFrom?.city +
                " " +
                each?.data?.shippingFrom?.state +
                " " +
                each?.data?.shippingFrom?.pinCode +
                " , " +
                each?.data?.shippingFrom?.country}{" "}
            </p>
            <p className="View">
              {" "}
              <strong>Shipping To : </strong>{" "}
              {each?.data?.shippingTo?.city +
                " " +
                each?.data?.shippingTo?.state +
                " " +
                each?.data?.shippingTo?.pinCode +
                " , " +
                each?.data?.shippingTo?.country}{" "}
            </p>

            {each?.data?.packages?.map((i, index) => (
              <>
                <div key={index}>
                  <p className="View">
                    {" "}
                    <strong>Package Length : </strong> {i.length}{" "}
                  </p>
                  <p className="View">
                    {" "}
                    <strong>Package Width : </strong> {i.width}{" "}
                  </p>
                  <p className="View">
                    {" "}
                    <strong>Package Height : </strong> {i.height}{" "}
                  </p>

                  <p className="View">
                    {" "}
                    <strong>Package : </strong> {i.packageCategory}{" "}
                  </p>
                  <p className="View">
                    {" "}
                    <strong>Package Weight : </strong> {i.weight}{" "}
                  </p>
                </div>
              </>
            ))}

            <p className="View">
              {" "}
              <strong>PickupMan : </strong> {each?.data?.pickupMan}{" "}
            </p>
            <p className="View">
              {" "}
              <strong>Parcel Status : </strong> {each?.data?.parcelStatus}{" "}
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
                <th>Parcel Status</th>
                <th>Pickup Man</th>
                <th>Packages</th>
                <th>Assign</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((i, index) => (
                <tr key={index}>
                  <td>#{index + 1} </td>
                  <td
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      setId(i._id);
                      setViewModal(true);
                    }}
                  >
                    {i.userId}
                  </td>
                  <td>
                    <span>
                      {i.shippingFrom?.city +
                        " " +
                        i.shippingFrom?.state +
                        " " +
                        i.shippingFrom?.pinCode +
                        " , " +
                        i.shippingFrom?.country}
                    </span>
                  </td>
                  <td>
                    <span>
                      {i.shippingTo?.city +
                        " " +
                        i.shippingTo?.state +
                        " " +
                        i.shippingTo?.pinCode +
                        " , " +
                        i.shippingTo?.country}
                    </span>
                  </td>
                  <td> {i.createdAt?.slice(0, 10)} </td>
                  <td>
                    {i.parcelStatus === "Approved" ? (
                      <Badge bg="success"> Approved </Badge>
                    ) : (
                      ""
                    )}
                    {i.parcelStatus === "Pending" ? (
                      <Badge bg="info"> Pending </Badge>
                    ) : (
                      ""
                    )}
                    {i.parcelStatus === "cancel" ? (
                      <Badge bg="danger"> Cancelled </Badge>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {i.pickupMan === "not assigned" ? (
                      <Badge bg="secondary"> Not Assigned </Badge>
                    ) : (
                      i.pickupMan
                    )}
                  </td>
                  <td>
                    <ul>
                      {i.packages?.map((a, index) => (
                        <li key={index}> {a.packageCategory} </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        setId(i._id)
                        setEdit(false);
                        setModalShow(true);
                      }}
                    >
                      Assign
                    </Button>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => {
                        setId(i._id);
                        setEdit(true);
                        setModalShow(true);
                      }}
                    />
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
