/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const Horoscope = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [ id,  setId ] = useState("")
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://xlweh818ib.execute-api.ap-south-1.amazonaws.com/dev/horoscope"
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [date, setDate] = useState("");
    const [horoScope, setHoroscope] = useState("");
    const [profession, setProfession] = useState("");
    const [emotions, setEmotions] = useState("");
    const [health, setHealth] = useState("");
    const [travel, setTravel] = useState("");
    const [love, setLove] = useState("");
    const [luck, setLuck] = useState("");
    const [duration, setDuration] = useState("");
    const [rashi, setRashi] = useState("");
    const [ item , setItem  ] = useState([])

    const AddHoroscope = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://xlweh818ib.execute-api.ap-south-1.amazonaws.com/dev/horoscope",
          {
            date,
            horoScope,
            profession,
            emotions,
            health,
            travel,
            love,
            luck,
            duration,
            rashi,
          }
        );

        console.log(data);
        toast.success("Horoscope Added");
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    const ViewSingle = async () => {
      try{
        const { data} = await axios.get(`https://xlweh818ib.execute-api.ap-south-1.amazonaws.com/dev/horoscope/${id}`)
        setItem(data)
      }catch(e){
        console.log(e)
      }
    }


    useEffect(() => {
   if(props.show === true ) {
    ViewSingle()
   }
    },[props.show])

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
            {" "}
            Add Horoscope
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {edit ? (
            <>
              <p className="View">
                {" "}
                <strong>Date :</strong>{item?.details?.date}
              </p>
              <p className="View">
                {" "}
                <strong>Horoscope : </strong>  {item?.details?.horoScope}
              </p>
              <p className="View">
                {" "}
                <strong>Professional : </strong> {item?.details?.PROFESSION}
              </p>

              <p className="View">
                {" "}
                <strong>Emotions : </strong> {item?.details?.EMOTIONS} 
              </p>

              <p className="View">
                {" "}
                <strong>Health : </strong> {item?.details?.HEALTH}
              </p>
              <p className="View">
                {" "}
                <strong>Travel : </strong> {item?.details?.TRAVEL}
              </p>
              <p className="View">
                {" "}
                <strong>Luck : </strong> {item?.details?.LUCK}
              </p>
              <p className="View">
                {" "}
                <strong>Duration : </strong> {item?.details?.duration}
              </p>
              <p className="View">
                {" "}
                <strong>Rashi : </strong> {item?.details?.rashi}
              </p>
            </>
          ) : (
            <Form onSubmit={AddHoroscope}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Horoscope</Form.Label>
                <Form.Control type="text"  onChange={(e) => setHoroscope(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Profession</Form.Label>
                <Form.Control type="text"  onChange={(e) => setProfession(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Emotions</Form.Label>
                <Form.Control type="text"  onChange={(e) => setEmotions(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Health</Form.Label>
                <Form.Control type="text"   onChange={(e) => setHealth(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Travel</Form.Label>
                <Form.Control type="text"  onChange={(e) => setTravel(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Love</Form.Label>
                <Form.Control type="text"  onChange={(e) => setLove(e.target.value)} />
              </Form.Group>
         
              <Form.Group className="mb-3">
                <Form.Label>Luck</Form.Label>
                <Form.Control type="text"  onChange={(e) => setLuck(e.target.value)} />
              </Form.Group>
         
              <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control type="text"  onChange={(e) => setDuration(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rashi</Form.Label>
                <Form.Control type="text"  onChange={(e) => setRashi(e.target.value)} />
              </Form.Group>
         
              <Button variant="outline-success" type="submit">
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
      const { data } = await axios.delete(`https://xlweh818ib.execute-api.ap-south-1.amazonaws.com/dev/horoscope/${id}`)
      console.log(data)
      toast.success("Deleted")
      fetchData()
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
            ALl Horoscopes ( Total : {data?.details?.length})
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
            style={{ textTransform: "uppercase" }}
          >
            Add Horoscropes
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Horoscope</th>
              <th>Professional</th>
              <th>Emotions</th>
              <th>Health</th>
              <th>Travel</th>
              <th>Luck</th>
              <th>Duration</th>
              <th>Rashi</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.details?.map((i, index) => (
              <tr key={index}>
                <td> {i.horoScope} </td>
                <td> {i.PROFESSION} </td>
                <td> {i.EMOTIONS} </td>
                <td> {i.HEALTH} </td>
                <td> {i.TRAVEL} </td>
                <td> {i.LUCK} </td>
                <td> {i.duration} </td>
                <td> {i.rashi} </td>
                <td> {i.date} </td>
                <td>
                  <span className="d-flex gap-2">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() =>
                        deleteHandler(i._id)
                      }
                    />
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => {
                        setId(i._id)
                        setEdit(true);
                        setModalShow(true);
                      }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(Horoscope);
