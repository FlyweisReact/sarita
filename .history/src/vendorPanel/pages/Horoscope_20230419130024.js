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
            Add Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

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
            ALl Locations          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
            style={{ textTransform: "uppercase" }}
          >
            Add Location
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1</td>
              <td>Portugal</td>
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

export default HOC(Horoscope);
