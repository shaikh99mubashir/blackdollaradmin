import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Slidebar from '../Slidebar'
import app from "../../FirebaseConfig/Config";
import {
    getDatabase,
    onValue,
    ref as dbRef,
    push,
    set,
    update,
    remove,
} from "firebase/database";
const DailyHistory = () => {
    const [history, setHistory] = useState({
        date: '',
    });
    const db = getDatabase(app);
    // console.log('history', history);
    const [numFields, setNumFields] = useState(1);

    const handleAddField = () => {
        setNumFields(numFields + 1);
    };

    const handleInputChange = (e, i) => {
        const { name, value } = e.target;
        setHistory({
            ...history,
            [name + i]: value,
        });
    };

    const fields = [];
    for (let i = 1; i <= numFields; i++) {
        fields.push(
            <Row key={i}>
                <Col lg="6">
                    <Row>
                        <Col>
                            <input
                                className="form-control form__input"
                                placeholder={`Withdraw Name ${i}`}
                                name={`TokenName`}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </Col>
                        <Col>
                            <input
                                className="form-control form__input"
                                placeholder={`Withdraw Code ${i}`}
                                name={`TokenNumber`}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    const handleHistorySubmit = () => {
        const reference = dbRef(db, `DailyHistory/`);
        push(reference, history)
            .then(() => {
                alert("Submit Successfully!");
            })
            .catch((err) => {
                alert(err);
            });
    }


    return (
        <>
            <Slidebar
                title="Daily History"
                style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
            />
            <Container fluid>
                <Row>
                    <Col lg="6">
                        <fieldset>
                            <label for="" style={{ color: "#222536" }}>
                                Date & Time
                            </label>

                            <input
                                className="form-control form__input"
                                style={{ marginTop: "5px" }}
                                type="datetime-local"
                                id="startDateTime"
                                name="Schedule Date And Time"
                                value={history.date}
                                onChange={(e) => {
                                    setHistory({
                                        ...history,
                                        date: e.target.value,
                                    });
                                }}
                            />
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <label for="" style={{ color: "#222536" }}>
                        Withdraw Name
                    </label>
                    {fields}
                    <div className="py-4">
                        <button className="button-sub px-5" onClick={handleAddField}>
                            Add
                        </button>
                    </div>

                </Row>
                <Row>

                    <div className="py-4">
                        <button className="button-sub px-5" onClick={handleHistorySubmit}>
                            Submit
                        </button>
                    </div>

                </Row>
            </Container>
        </>
    )
}

export default DailyHistory