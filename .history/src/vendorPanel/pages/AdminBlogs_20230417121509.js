/** @format */

import React from "react";
import HOC from "../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


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
          <Modal.Title id="contained-modal-title-vcenter">
            Add Blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <br />
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
            All Blogs
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(!modalShow);
            }}
          >
            Add Blogs
          </Button>
        </div>
      </section>

      <section
        className="main-card--container"
        style={{ color: "black", marginBottom: "10%" }}
      >
        <div className="card-container">
          <div className="card">
            <div className="card-body">
              <img
                src="https://www.pixelstalk.net/wp-content/uploads/images6/Dark-Anime-Wallpapers-Desktop.jpg"
                style={{ width: "100%", height: "200px" }}
                alt=""
              />
              <div style={{ fontSize: "14px", textAlign: "center" }}>
                <p>
                  {" "}
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available
                </p>
              </div>
              <div>
                <Button variant="outline-danger" style={{ width: "100%" }}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container">
          <div className="card">
            <div className="card-body">
              <img
                src="https://w0.peakpx.com/wallpaper/781/986/HD-wallpaper-luffy-smile.jpg"
                style={{ width: "100%", height: "200px" }}
                alt=""
              />
              <div style={{ fontSize: "14px", textAlign: "center" }}>
                <p>
                  {" "}
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available{" "}
                </p>
              </div>
              <div>
                <Button variant="outline-danger" style={{ width: "100%" }}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container">
          <div className="card">
            <div className="card-body">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ79iHRHdnRAjAsz_g82qipibYDqh69mOFXSQ&usqp=CAU"
                style={{ width: "100%", height: "200px" }}
                alt=""
              />
              <div style={{ fontSize: "14px", textAlign: "center" }}>
                <p>
                  {" "}
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available
                </p>
              </div>
              <div>
                <Button variant="outline-danger" style={{ width: "100%" }}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(AdminBlogs);
