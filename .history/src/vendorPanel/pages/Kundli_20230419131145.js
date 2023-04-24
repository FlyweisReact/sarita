/** @format */

import React, { useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const Kundli = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const [open, setOpen] = useState(false);

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
            Add Kundli
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select aria-label="Default select example" className="mb-3">
              <option>Open to select user</option>
              <option value="">User</option>
              <option value="">User2</option>
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Kundli</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  function ViewDocument(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ borderBottom: "0" }}></Modal.Header>
        <Modal.Body>
          <img
            src={"https://www.astrosage.com/kundli/images/kundali.jpg"}
            alt=""
            style={{ width: "100%" }}
          />
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
      <ViewDocument show={open} onHide={() => setOpen(false)} />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Delivery Person's
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider uppercase"
          >
            Add Kundli
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User</td>
             
              <td>
                <i className="fa-solid fa-trash" onClick={() => toast.success("Kundli Deleted Successfully")} />
              </td>
            </tr>
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(Kundli);
