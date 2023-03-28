import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  AiOutlineBars,
  AiFillSchedule,
  AiOutlineOrderedList,
  AiFillPushpin,
  AiFillSetting,
  BiSupport,
} from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../../FirebaseConfig/Config";
const Slidebar = (props) => {
  const { title, style, data } = props;
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = getAuth(app);
  const logoutUser = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleNavigation = () => {
    data && navigate("/Setting", { state: data });
  };

  return (
    <>
      <button
        style={{
          background: "none",
          border: "none",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          gap: 20,
        }}
        onClick={handleShow}
      >
        <AiOutlineBars id="sliderIcon" color="#222536" size={30} />
        <span style={style}>{title}</span>
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={require("../../Images/logo.png")}
              style={{ width: 40, height: 40 }}
            />
            <span style={{ fontSize: 24, fontWeight: 700 }}>Black Dollar</span>
          </div>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div>
            <Link to="/Dashboard" style={{ textDecoration: "none" }}>
              <div style={{ marginBottom: 20 }}>
                <button
                  className="sliderButton"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 5,
                  }}
                >
                  {" "}
                  <RxDashboard id="sliderIcon" color="white" size={20} />
                  <span style={{ fontSize: 20 }}>Dashboard</span>{" "}
                </button>
              </div>
            </Link>
            <Link to="/UploadVideo" style={{ textDecoration: "none" }}>
              <div style={{ marginBottom: 20 }}>
                <button
                  className="sliderButton"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 5,
                  }}
                >
                  {" "}
                  <AiFillSchedule id="sliderIcon" color="white" size={20} />
                  <span style={{ fontSize: 20 }}>Scheduled New Video</span>{" "}
                </button>
              </div>
            </Link>
            <Link to="/ScheduledVideoList" style={{ textDecoration: "none" }}>
              <div style={{ marginBottom: 20 }}>
                <button
                  className="sliderButton"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 5,
                  }}
                >
                  {" "}
                  <AiOutlineOrderedList
                    id="sliderIcon"
                    color="white"
                    size={20}
                  />
                  <span style={{ fontSize: 20 }}>Scheduled Video List</span>{" "}
                </button>
              </div>
            </Link>
            <Link to="/PushNotification" style={{ textDecoration: "none" }}>
              <div
                onClick={handleNavigation}
                style={{ textDecoration: "none" }}
              >
                <div style={{ marginBottom: 20 }}>
                  <button
                    className="sliderButton"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      borderRadius: 5,
                    }}
                  >
                    {" "}
                    <AiFillPushpin id="sliderIcon" color="white" size={20} />
                    <span style={{ fontSize: 20 }}>Push Notification</span>{" "}
                  </button>
                </div>
              </div>
            </Link>
            <Link to="/Setting" style={{ textDecoration: "none" }}>
              <div style={{ marginBottom: 20 }}>
                <button
                  className="sliderButton"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 5,
                  }}
                >
                  {" "}
                  <AiFillSetting id="sliderIcon" color="white" size={20} />
                  <span style={{ fontSize: 20 }}>Setting</span>{" "}
                </button>
              </div>
            </Link>
            <Link to="/Marquee" style={{ textDecoration: "none" }}>
              <div style={{ marginBottom: 20 }}>
                <button
                  className="sliderButton"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 5,
                  }}
                >
                  {" "}
                  <MdOutlineContactSupport
                    id="sliderIcon"
                    color="white"
                    size={20}
                  />
                  <span style={{ fontSize: 20 }}>Headline</span>{" "}
                </button>
              </div>
            </Link>
            <Link to="/DailyHistory" style={{ textDecoration: "none" }}>
              <div style={{ marginBottom: 20 }}>
                <button
                  className="sliderButton"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 5,
                  }}
                >
                  <MdOutlineContactSupport
                    id="sliderIcon"
                    color="white"
                    size={20}
                  />
                  <span style={{ fontSize: 20 }}>Daily History</span>{" "}
                </button>
              </div>
            </Link>
            <Link to="/Notification" style={{ textDecoration: "none" }}>
              <div style={{ marginBottom: 20 }}>
                <button
                  className="sliderButton"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 5,
                  }}
                >
                  <MdOutlineContactSupport
                    id="sliderIcon"
                    color="white"
                    size={20}
                  />
                  <span style={{ fontSize: 20 }}>Notification</span>
                </button>
              </div>
            </Link>
            <Link to="/Support" style={{ textDecoration: "none" }}>
              <div style={{ marginBottom: 20 }}>
                <button
                  className="sliderButton"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 5,
                  }}
                >
                  {" "}
                  <MdOutlineContactSupport
                    id="sliderIcon"
                    color="white"
                    size={20}
                  />
                  <span style={{ fontSize: 20 }}>Support</span>{" "}
                </button>
              </div>
            </Link>

          </div>

          <div onClick={logoutUser} style={{ marginBottom: 20 }}>
            <button
              className="sliderButton"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                alignItems: "center",
                gap: 10,
                borderRadius: 5,
              }}
            >
              {" "}
              <GoSignOut id="sliderIcon" color="white" size={20} />
              <span style={{ fontSize: 20 }}>Sign Out</span>{" "}
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Slidebar;
