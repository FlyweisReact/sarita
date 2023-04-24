/** @format */

import React from "react";
import HOC from "../layout/HOC";
import {  Table } from "react-bootstrap";

const AdminReview = () => {
  const Lorem = "IIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia  "
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
              All FeedBacks
          </span>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Review</th>
              <th>Create At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="https://cdn.shopify.com/s/files/1/0850/2114/files/tips_to_help_heighten_senses_480x480.png?v=1624399167"
                  alt=""
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "100%",
                  }}
                />
              </td>
              <td>
                  {Lorem.substring(0,100) + '...'}
              </td>
              <td>12 March 2023</td>
              <td>
                <span className="d-flex gap-2">
                  <i className="fa-solid fa-trash" />
                  <i className="fa-solid fa-eye" />
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(AdminReview);
