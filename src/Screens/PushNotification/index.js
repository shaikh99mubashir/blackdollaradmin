import React, { useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import { Form, Table, Button, Container, Col } from "react-bootstrap";
import app from "../../FirebaseConfig/Config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AiFillDelete } from "react-icons/ai";
import {
  getDatabase,
  onValue,
  ref as dbRef,
  push,
  set,
  update,
  remove,
} from "firebase/database";
import { useNavigate, useNavigation } from "react-router-dom";
import { getMessaging } from "firebase/messaging";
import axios from "axios";

let messaging = getMessaging(app)

const PushNotification = () => {
  const db = getDatabase(app);
  const initialData = {
    pushNotificationTitle: '',
    pushNotificationText: '',
  }
  const [pushNotification, setPushNotification] = useState(initialData);
  const navigate = useNavigate()
  const handlePushNotification = () => {
    fetch('https://shy-rose-bee-gown.cyclic.app/api/sendNotification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'AAAAZxqXbNk:APA91bHdE5eQ6ABVGWF0d30YlCxdPzb2IMZ7SEe8As0M_PqcZRi0xD7iO89k6SFb8pff_m27Z6h31RlAaJe40ipxPEbZKpk9mkOgir954LXQCiX3z2-ZmOmC3j5rtF6IYUrC51-gD4uB'
      },
      body: JSON.stringify({
        notification: {
          title: pushNotification.pushNotificationTitle,
          body: pushNotification.pushNotificationText,
        },
        topic: 'allDevices'
      })
    }).then((res) => {

      let data = res?.body

      alert(data?.message)
      setPushNotification(initialData)
    }).catch((error) => {
      console.log(error)
    })
      ;
  }

  // firebaseAdmin.messaging().sendToTopic('all_users', initialData)
  //   .then((response) => {
  //     axios.post('https://192.168.10.20:5000/api/sendNotification', response)
  //   })
  //   .catch((error) => {
  //     console.error('Error sending notification:', error);
  //   });


  // const [pushNotificationData, setPushNotificationData] = useState([])
  // useEffect(() => {
  //   const getData = dbRef(db, `PushNotification/`);
  //   onValue(getData, (e) => {
  //     const val = e.val();
  //     const valData = []
  //     const data = Object.entries(val).map(([key, value]) => {
  //       return {
  //         data: value,
  //         id: key
  //       }

  //     });
  //     setPushNotificationData(data);
  //   });
  // }, []);

  // const deletePushNotificationData = (id, i) => {
  //   const deleteLink = dbRef(db, `PushNotification/${id}`);
  //   remove(deleteLink)
  //     .then((deleted) => {
  //       alert("successfully deleted");
  //     })
  //     .catch((err) => alert("GOT THE ERROR ON DELETE", err));
  //   setPushNotificationData(
  //     pushNotificationData.filter((item, index) => {
  //       return index !== i;
  //     })
  //   );
  // }

  return (
    <>
      <Slidebar
        title="Push Notification"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />

      <Container>
        <Col lg="12">
          <div style={{ color: "#222536" }}></div>
          <Form.Group className="mb-3" controlId="formBasicEmail">

            <input
              className="form-control form__input"
              // maxlength="25"
              placeholder="Notification Title"
              value={pushNotification.pushNotificationTitle}
              onChange={(e) => setPushNotification({ ...pushNotification, pushNotificationTitle: e.target.value })}
            />

          </Form.Group>
        </Col>
        <Col lg="12">
          <div style={{ color: "#222536" }}></div>
          <Form.Group className="mb-3" controlId="formBasicEmail">

            <input
              className="form-control form__input"
              placeholder="Notification body"
              value={pushNotification.pushNotificationText}
              onChange={(e) => setPushNotification({ ...pushNotification, pushNotificationText: e.target.value })}
            />

          </Form.Group>
        </Col>
        <button
          className="button-sub px-4"
          type="submit"
          onClick={handlePushNotification}
        >
          Submit
        </button>

        {/* {pushNotificationData &&
          <Table style={{ marginTop: 20 }} striped bordered hover>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Headline</th>
                <th>Delete</th>
              </tr>
            </thead>

            {pushNotificationData.map((e, i) => {
              return (
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{e.data}</td>

                    <td style={{ textAlign: "-webkit-center" }}>
                      <button
                        style={{ border: "none" }}
                        onClick={() => deletePushNotificationData(e.id, i)}
                      >
                        <AiFillDelete size={25} />
                      </button>
                    </td>

                  </tr>
                </tbody>
              );
            })}
          </Table>
        } */}
      </Container>
    </>
  );
};

export default PushNotification;
