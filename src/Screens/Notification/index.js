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
    const initialData = {
        marqueeText: '',
        title: ''
    }
    const [marquee, setMarquee] = useState(initialData);
    const handleMarqueeSubmit = () => {
        const reference = dbRef(db, `Notification/`);
        push(reference, marquee)
            .then(() => {
                alert("Submit Successfully!");
                setMarquee(initialData)
            })
            .catch((err) => {
                alert(err);
            });
    }

    const [marqueeData, setMarqueeData] = useState([])
    useEffect(() => {
        const getData = dbRef(db, `Notification/`);
        onValue(getData, (e) => {
            const val = e.val();
            const data = Object.entries(val).map(([key, value]) => {
                return {
                    ...value,
                    id: key,
                };
            });
            setMarqueeData(data);
        });
    }, []);

    const deleteVideoLink = (id, i) => {
        const deleteMarquee = dbRef(db, `Notification/${id}`);
        remove(deleteMarquee)
            .then((deleted) => {
                alert("successfully deleted!")
            })
            .catch((err) => alert("GOT THE ERROR ON DELETE", err));
        setMarqueeData(
            marqueeData.filter((item, index) => {
                return index !== i;
            })
        );
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
                            marqueeData && marqueeData.length > 0 ?
                                <input
                                    className="form-control form__input"
                                    placeholder="Title"
                                    disabled
                                />
                                :
                                <input
                                    className="form-control form__input"
                                    placeholder="Title"
                                    value={marquee.title}
                                    maxLength={35}
                                    onChange={(e) => setMarquee({ ...marquee, title: e.target.value })}
                                />
                        }
                    </Form.Group>
                </Col>
                <Col lg="12">
                    <div style={{ color: "#222536" }}></div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {
                            marqueeData && marqueeData.length > 0 ?
                                <input
                                    className="form-control form__input"
                                    placeholder="Notification"
                                    disabled
                                />
                                :
                                <textarea
                                    className="form-control form__input"
                                    placeholder="Notification"
                                    maxLength={200}
                                    onChange={(e) => setMarquee({ ...marquee, marqueeText: e.target.value })}
                                />
                        }
                    </Form.Group>
                </Col>
                {
                    marqueeData && marqueeData.length > 0 ?
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

                {marqueeData.length > 0 &&
                    <Table style={{ marginTop: 20 }} striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Title</th>
                                <th>Headline</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {marqueeData.map((e, i) => {
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: "-webkit-center" }}>{i + 1}</td>
                                        <td>{e.title}</td>
                                        <td>{e.marqueeText}</td>

                                        <td style={{ textAlign: "-webkit-center" }}>
                                            <button
                                                style={{ border: "none" }}
                                                onClick={() => deleteVideoLink(e.id, i)}
                                            >
                                                <AiFillDelete size={25} />
                                            </button>
                                        </td>

                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>
                }
            </Container>
        </>
    );
};

export default Notification;
