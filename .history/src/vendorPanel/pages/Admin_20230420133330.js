
import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Button, FloatingLabel, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const token = localStorage.getItem("token");
    const [modalShow, setModalShow] = React.useState(false);
    const [edit, setEdit] = useState(false);
  
    const fetchData = useCallback(async () => {
      try {
        const { data } = await axios.get(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admins",
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
      const [each, setEach] = useState([]);
      const [content , setContent] = useState("");
  
      const fetchParcel = useCallback(async () => {
        try {
          const { data } = await axios.get(
            `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/fraudawareness/${id}`,
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
  
      const postHandler = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post(
            "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/fraudawareness",
            {
              content,
            },  {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
            console.log(data)
            toast.success("Added")
            props.onHide()
            fetchData()
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
            <Modal.Title id="contained-modal-title-vcenter">
              {edit ? "  View Content" : "Add Content"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {edit ? (
              <p className="View">
                {" "}
                <strong>Content : {each?.data?.content} </strong>
              </p>
            ) : (
              <Form onSubmit={postHandler}>
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingTextarea2" label="Content">
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Button
                  style={{ backgroundColor: "#19376d", borderRadius: "0" }}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      );
    }
  
    const deleteHandler = async (id) => {
      try{
          const { data } = await axios.delete(`http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/admin/fraudawareness/${id}`, {
              headers : {
                  Authorization : `Bearer ${token}`
              }
          })
          console.log(data)
          fetchData()
          toast.success('Deleted')
      }catch(e) {
          console.log(e)
      }
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
              All Admins ( Total : {data?.length} )
            </span>
  
            <button
              onClick={() => {
                setEdit(false);
                setModalShow(true);
              }}
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider uppercase"
            >
              Add admin
            </button>
          </div>
  
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>DOB</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td >
                    #{index + 1}{" "}
                  </td>
                  <td>{i.content?.substring(0, 100) + "..."}</td>
                  <td> {i.createdAt?.slice(0, 10)} </td>
                  <td>
                    <i className="fa-solid fa-trash" onClick={() => deleteHandler(i._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </>
    );
  };
  
export default HOC(Admin)