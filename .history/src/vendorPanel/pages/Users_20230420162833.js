/** @format */

import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {

    const [ data , setData ]= useState([])

    const fetchData = async ()=>{
      try {
        const { data } = await axios.get("http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:7777/api/v1/legal/privacy")
        setData(data)
      }catch(e) { 
        console.log(e)
      }
    }

    useEffect(() => {
      fetchData()
    },[])

    function MyVerticallyCenteredModal(props) {
      const [each, setEach] = useState([]);
      const [content, setContent] = useState("");
  
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
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data);
          toast.success("Added");
          props.onHide();
          fetchData();
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

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Privacy Policy
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Privacy Policy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            
              <tr>
                <td>
             {data?.privacy?.privacy}
                </td>
                <td>
                  <i className="fa-solid fa-edit" />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Users);
