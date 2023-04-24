/** @format */

import React from "react";
import HOC from "../layout/HOC";
import {  Table, Modal, Form, Button } from "react-bootstrap";

const AdminDiscount = () => {
  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"> Add Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Min.Amount</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Activation Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Coupon's
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Coupon
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Discount</th>
              <th>Min. Amount</th>
              <th>Activation Date</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JUNE24</td>
              <td>50%</td>
              <td>₹500</td>
              <td>12 March 2023</td>
              <td>12 March 2024</td>
              <td>
                <i className="fa-solid fa-trash" />
              </td>
            </tr>
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(AdminDiscount);
