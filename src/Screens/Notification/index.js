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

const Notification = () => {
    const db = getDatabase(app);
    const [marquee, setMarquee] = useState({
        marqueeText: '',
    });
    const navigate = useNavigate()
    const handleMarqueeSubmit = () => {
        const reference = dbRef(db, `Notification/`);
        push(reference, marquee)
            .then(() => {
                alert("Submit Successfully!");
                navigate('/Dashboard')
            })
            .catch((err) => {
                alert(err);
            });
    }

    const [marqueeData, setMarqueeData] = useState()
    useEffect(() => {
        const getData = dbRef(db, `Notification/`);
        onValue(getData, (e) => {
            const val = e.val();
            const data = Object.entries(val).map(([key, value]) => {
                val.id = key
                val.data = value
            });
            setMarqueeData(val);
        });
    }, []);

    const deleteVideoLink = (id) => {
        const deleteMarquee = dbRef(db, `Notification/${id}`);
        remove(deleteMarquee)
            .then((deleted) => {
                alert("successfully deleted!")
                navigate('/Dashboard')
            })
            .catch((err) => alert("GOT THE ERROR ON DELETE", err));
    }

    return (
        <>
            <Slidebar
                title="Notification"
                style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
            />
            <Container>
                <Col lg="12">
                    <div style={{ color: "#222536" }}></div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {
                            marqueeData ?
                                <input
                                    className="form-control form__input"
                                    placeholder="Headline Text"
                                    disabled
                                />
                                :
                                <input
                                    className="form-control form__input"
                                    placeholder="Headline Text"
                                    onChange={(e) => setMarquee(e.target.value)}
                                />
                        }
                    </Form.Group>
                </Col>
                {
                    marqueeData ?
                        <button
                            className="button-sub px-4"
                            type="submit"
                            disabled
                        >
                            Submit
                        </button>
                        :
                        <button
                            className="button-sub px-4"
                            type="submit"
                            onClick={handleMarqueeSubmit}
                        >
                            Submit
                        </button>
                }

                {marqueeData &&
                    <Table style={{ marginTop: 20 }} striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Headline</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>{marqueeData && marqueeData.data}</td>

                                <td style={{ textAlign: "-webkit-center" }}>
                                    <button
                                        style={{ border: "none" }}
                                        onClick={() => deleteVideoLink(marqueeData.id)}
                                    >
                                        <AiFillDelete size={25} />
                                    </button>
                                </td>

                            </tr>
                        </tbody>
                    </Table>
                }
            </Container>
        </>
    );
};

export default Notification;
