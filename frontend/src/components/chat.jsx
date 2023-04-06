import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";

import "./chat.css"

export default function App() {
  return (
    <MDBContainer className="py-5">
      {/* Create a row with centered content */}
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          {/* Create a card with a custom id and borderRadius */}
          <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
            {/* Create a card header with custom styles for the top border radius */}
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              {/* Create a left angle icon */}
              <MDBIcon fas icon="angle-left" />
              {/* Create a bold title */}
              <p className="mb-0 fw-bold">Live chat</p>
              {/* Create a times icon */}
              <MDBIcon fas icon="times" />
            </MDBCardHeader>

            {/* Create a card body */}
            <MDBCardBody>
              {/* Create a left aligned message */}
              <div className="d-flex flex-row justify-content-start mb-4">
                {/* Create an image avatar */}
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                {/* Create a message container with a background color */}
                <div
                  className="p-3 ms-3"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(57, 192, 237,.2)",
                  }}
                >
                  {/* Create a small message */}
                  <p className="small mb-0">
                    Hello and thank you for visiting MDBootstrap. Please click
                    the video below.
                  </p>
                </div>
              </div>

              {/* Create a right aligned message */}
              <div className="d-flex flex-row justify-content-end mb-4">
                {/* Create a message container with a border */}
                <div
                  className="p-3 me-3 border"
                  style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
                >
                  {/* Create a small message */}
                  <p className="small mb-0">
                    Thank you, I really like your product.
                  </p>
                </div>
                {/* Create an image avatar */}
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
              </div>

              {/* Create a left aligned message */}
              <div className="d-flex flex-row justify-content-start mb-4">
                {/* Create an image avatar */}
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                {/* Create a video container */}
                <div className="ms-3" style={{ borderRadius: "15px" }}>
                  <div className="bg-image">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp"
                      style={{ borderRadius: "15px" }}
                      alt="video"
                    />
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  className="p-3 ms-3"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p className="small mb-0">...</p>
                </div>
              </div>

              <MDBTextArea
                className="form-outline"
                label="Type your message"
                id="textAreaExample"
                rows={4}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
