/** @format */

import React, { useState } from "react";
import HOC from "../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Banners = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");


  const fetchData = useC(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/fraudawareness",
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
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Banner
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

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" />
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

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Banner
          </span>
          <Button
            style={{ backgroundColor: "#19376d", borderRadius: "0" }}
            onClick={() => {
              setModalShow(!modalShow);
            }}
          >
            Add-Banner
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
              <div style={{ fontSize: "1.6rem", textAlign: "center" }}>
                <p> Banner </p>
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "#d4281c",
                    border: "1px solid #d4281c",
                    borderRadius: "0",
                    width: "100%",
                  }}
                >
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
              <div style={{ fontSize: "1.6rem", textAlign: "center" }}>
                <p> Banner </p>
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "#d4281c",
                    border: "1px solid #d4281c",
                    borderRadius: "0",
                    width: "100%",
                  }}
                >
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
              <div style={{ fontSize: "1.6rem", textAlign: "center" }}>
                <p> Banner </p>
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "#d4281c",
                    border: "1px solid #d4281c",
                    borderRadius: "0",
                    width: "100%",
                  }}
                >
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

export default HOC(Banners);
