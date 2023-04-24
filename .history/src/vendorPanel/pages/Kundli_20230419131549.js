/** @format */

import React from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import HOC from "../layout/HOC";

const Kundli = () => {
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

            <Button style={{ backgroundColor: "#19376d", borderRadius: "0" }}  type="submit">
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
              <th> Mobile Number   </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1</td>
              <td>Carlos</td>
              <td>Caros@gmail.com</td>
              <td>9354241447</td>
        
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

export default HOC(Kundli);
