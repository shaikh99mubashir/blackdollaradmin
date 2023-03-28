import React, { useEffect, useState } from "react";
// import app from '../../../FirebaseConfig/Config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../FirebaseConfig/Config";
import ReactPlayer from "react-player";
import {
  getDatabase,
  onValue,
  ref as dbRef,
  push,
  set,
  update,
  remove,
} from "firebase/database";
// import Button from 'react-bootstrap';
import { Form, Table, Button, Container } from "react-bootstrap";
import Slidebar from "../Slidebar";
import Loader from "../../Images/loading.gif";
const UploadVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const auth = getAuth(app);
  const db = getDatabase(app);

  const [videoData, setVideoData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  React.useEffect(() => {
    const getData = dbRef(db, `videolink/`);
    onValue(getData, (e) => {
      const val = e.val();
      const data = Object.entries(val).map(([key, value]) => {
        return {
          ...value,
          id: key,
        };
      });
      setVideoData(data);
    });
  }, []);

  const [uploadVideo, setUploadVideo] = useState({
    videoName: "",
    videoLink: "",
    startDate: "",
    endDate: "",
  });


  function handleFileInputChange(event) {
    const file = event.target.files[0];
    if (file && file.type === "video/mp4") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Create a storage reference
    setIsLoader(true);

    const storage = getStorage();
    const storageRef = ref(storage, "videos/" + selectedFile.name);
    // Upload the file to Firebase Storage
    const uploadTask = uploadBytes(storageRef, selectedFile);
    uploadTask.then((snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
      getDownloadURL(storageRef).then((downloadURL) => {
        setUploadVideo({ ...uploadVideo, videoLink: downloadURL });
        setIsLoader(false);
      });
    });
  }

  const sendVideo = () => {
    const isOverlap =
      videoData.length > 0 &&
      videoData.every((scheduledVideo) => {
        let startDate = new Date(scheduledVideo.startDate);
        let endDate = new Date(scheduledVideo.endDate);
        let userStartDate = new Date(uploadVideo?.startDate);
        let userEndDate = new Date(uploadVideo.endDate);
        let startTime = userStartDate.getTime();
        let endTime = endDate.getTime();
        return startTime < endTime;
      });


    if (isOverlap) {
      alert("The selected time overlaps with an existing scheduled video.");
    } else if (
      uploadVideo.videoLink == "" ||
      uploadVideo.startDate == "" ||
      uploadVideo.endDate == ""
    ) {
      alert("Kindly Fill The Fields");
    } else {
      const reference = dbRef(db, `videolink/`);
      push(reference, uploadVideo)
        .then(() => {
          alert("Successfully Scheduled!");
          uploadVideo.videoName = "";
          uploadVideo.videoLink = "";
          uploadVideo.startDate = "";
          uploadVideo.endDate = "";
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  return (
    <>
      <Slidebar
        title="Schedule Video"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />
      <Container>
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div
              style={{
                marginTop: 40,
                border: "1px solid white",
                borderRadius: 5,
                padding: 30,
              }}
            >
              <div style={{ color: "#222536" }}>Video Name</div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <input
                  className="form-control form__input"
                  type="email"
                  placeholder="Video Name"
                  onChange={(e) =>
                    setUploadVideo({
                      ...uploadVideo,
                      videoName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <div style={{ color: "#222536" }}>UploadVideo</div>
              <input
                className="form-control form__input"
                type="file"
                accept="video/mp4"
                onChange={handleFileInputChange}
              />
              <button
                className="button-sub px-4"
                type="submit"
                onClick={handleSubmit}
                disabled={!selectedFile}
              >
                {uploadVideo.videoLink ? "Upload Successfully" : "Upload"}
              </button>
              <br />
              <label for="" style={{ color: "#222536" }}>
                Vedio Start Date And Time
              </label>

              <input
                className="form-control form__input"
                style={{ marginTop: "5px" }}
                type="datetime-local"
                id="startDateTime"
                name="Schedule Date And Time"
                value={uploadVideo.startDate}
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) => {
                  const selectedDateTime = new Date(e.target.value).getTime();
                  const currentDateTime = new Date().getTime();
                  if (selectedDateTime < currentDateTime) {
                    alert("Please select a current or future date and time.");
                  } else {
                    setUploadVideo({
                      ...uploadVideo,
                      startDate: e.target.value,
                    });
                  }
                }}
              />

              <label for="" style={{ color: "#222536" }}>
                Vedio End Date And Time
              </label>
              <input
                className="form-control form__input"
                style={{ marginTop: "5px" }}
                type="datetime-local"
                id="startDateTime"
                name="Schedule Date And Time"
                value={uploadVideo.endDate}
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) => {
                  const selectedDateTime = new Date(e.target.value).getTime();
                  const currentDateTime = new Date().getTime();
                  if (selectedDateTime < currentDateTime) {
                    alert("Please select a current or future date and time.");
                  } else {
                    setUploadVideo({
                      ...uploadVideo,
                      endDate: e.target.value,
                    });
                  }
                }}
              />

              <br />
              <button
                className="button-sub px-4"
                type="submit"
                onClick={sendVideo}
              >
                Submit
              </button>
            </div>
          </div>
          <div class="col-lg-6">
            <div className="ved-m">
              {isLoader ? (
                <img src={Loader} style={{ width: 30, height: 30 }} />
              ) : (
                ""
              )}
              <ReactPlayer controls url={uploadVideo.videoLink} />
            </div>
          </div>
        </div>

      </Container>
    </>
  );
};

export default UploadVideo;
