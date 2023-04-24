
import React, {  useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import HOC from "../layout/HOC";

const Support = () => {
  const [open, setOpen] = useState(false);

  function EditModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Support
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Email.</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Whatsapp No.</Form.Label>
              <Form.Control type="tel" pattern="[0-9]{10}" />
            </Form.Group>

            <Button variant="outline-success">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <EditModal show={open} onHide={() => setOpen(false)} />

      <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
        <span className="tracking-widest text-slate-900 font-semibold uppercase ">
          Support
        </span>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
        >
          Add Support
        </button>
      </div>

      <Table striped bordered hover>
        <thead>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Whatsapp No.</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr>
            <td>945642656</td>
            <td>support@gmail.com</td>
            <td>945642656</td>
            <td>
              {" "}
              <i className="fa-solid fa-trash" />{" "}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

  export default HOC(Support);
