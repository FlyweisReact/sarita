/** @format */

import React from "react";
import HOC from "../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Badge, Table } from "react-bootstrap";

const AdminBlogs = () => {
  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
           <Form.Select className="mb-3">
            <option>-- Select Status --</option>
            <option>Pending</option>
            <option>Success</option>
            <option>Cancelled</option>
           </Form.Select>
            <Button style={{ backgroundColor: "#19376d", borderRadius: "0" }} type="submit">
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
            All Transaction
          </span>
        </div>

        <div style={{ width: "100%", overflow: "scroll" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td>Adam</td>
                <td>₹5000</td>
                <td>June 12 , 2004</td>
                <td>
                  <Badge bg="success">Success</Badge>
                </td>
                <td>
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => setModalShow(true)}
                  />
                </td>
              </tr>

              <tr>
                <td>#2</td>
                <td>John</td>
                <td>₹10,000</td>
                <td>June 14 , 2004</td>
                <td>
                  <Badge bg="info">Pending</Badge>
                </td>
                <td>
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => setModalShow(true)}
                  />
                </td>
              </tr>

              <tr>
                <td>#3</td>
                <td>Gareth Bale</td>
                <td>₹12,000</td>
                <td>June 25 , 2004</td>
                <td>
                  <Badge bg="danger">Success</Badge>
                </td>
                <td>
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => setModalShow(true)}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(AdminBlogs);