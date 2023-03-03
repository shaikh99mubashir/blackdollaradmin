import React, { useEffect, useState } from 'react'
// import app from '../../../FirebaseConfig/Config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";
import app from "../../FirebaseConfig/Config";
import ReactPlayer from 'react-player'
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
import { Form, Table, Button } from 'react-bootstrap';
import Slidebar from '../Slidebar';

const UploadVideo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const auth = getAuth(app);
    const db = getDatabase(app);


    const [videoData, setVideoData] = useState([])
    React.useEffect(() => {
        const getData = dbRef(db, `videolink/`);
        onValue(getData, (e) => {
            const val = e.val()
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
        videoName: '',
        videoLink: '',
        startDate: '',
        endDate: ''
    })

    console.log('uploadVideo', uploadVideo);

    function handleFileInputChange(event) {
        const file = event.target.files[0];
        if (file && file.type === 'video/mp4') {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Create a storage reference
        const storage = getStorage();
        const storageRef = ref(storage, 'videos/' + selectedFile.name);
        // Upload the file to Firebase Storage
        const uploadTask = uploadBytes(storageRef, selectedFile);
        console.log('upload', uploadTask);
        uploadTask.then((snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            getDownloadURL(storageRef).then((downloadURL) => {
                setUploadVideo({ ...uploadVideo, videoLink: downloadURL })
                // console.log('File available at', downloadURL);
            });
        })

    }

    const sendVideo = () => {


        const isOverlap = videoData.length > 0 && videoData.every((scheduledVideo) => {

            let startDate = new Date(scheduledVideo.startDate)
            let endDate = new Date(scheduledVideo.endDate)
            let userStartDate = new Date(uploadVideo?.startDate)
            let userEndDate = new Date(uploadVideo.endDate)
            let startTime = userStartDate.getTime()
            let endTime = endDate.getTime()
            return startTime < endTime
        });

        console.log(isOverlap, 'isOverlapisOverlapisOverlapisOverlap');

        if (isOverlap) {

            alert("The selected time overlaps with an existing scheduled video.");
        }
        else if (uploadVideo.videoLink == "" || uploadVideo.startDate == "" || uploadVideo.endDate == "") {
            alert('Kindly Fill The Fields')
        }
        else {
            const reference = dbRef(db, `videolink/`)
            push(reference, uploadVideo).then(() => {
                alert('Successfully Scheduled!')
                uploadVideo.videoName = ""
                uploadVideo.videoLink = ""
                uploadVideo.startDate = ""
                uploadVideo.endDate = ""
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const deleteVideoLink = (id, i) => {
        const deleteLink = dbRef(db, `videolink/${id}`);
        remove(deleteLink)
            .then((deleted) => {
                console.log("successfully deleted");
            })
            .catch((err) => console.log("GOT THE ERROR ON DELETE", err));
        console.log('id', id);
        // setVideoData(videoData.filter((item, index) => {
        //     return index !== i;
        // }))

    }


    return (
        <>
            <Slidebar title='Schedule Video' style={{ color: "#d47617", fontSize: 30, fontWeight: 'bold' }} />
            <div class="row">
                <div class="col-lg-4">
                    <div style={{ marginTop: 40, border: '1px solid white', borderRadius: 5, padding: 30 }}>
                        <div style={{ color: '#222536' }}>Video Name</div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <input className="form__input" type='email' placeholder="Video Name" onChange={(e) => setUploadVideo({ ...uploadVideo, videoName: e.target.value, })} />
                        </Form.Group>
                        <div style={{ color: '#222536', }}>UploadVideo</div>
                        <input className='form-control form__input' type="file" accept="video/mp4" onChange={handleFileInputChange} />
                        <button className='button-sub px-4' type="submit" onClick={handleSubmit} disabled={!selectedFile}>{uploadVideo.videoLink ? 'Upload Successfully' : 'Upload'}</button>
                        <br />
                        <label for="" style={{ color: '#222536' }}> Vedio Start Date And Time</label>

                        <input
                            className='form-control form__input'
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

                        <label for="" style={{ color: '#222536' }}> Vedio End Date And Time </label>
                        <input
                            className='form-control form__input'
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
                        <button className="button-sub px-4" type="submit" onClick={sendVideo}>Submit</button>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div style={{ marginTop: 40, border: '1px solid white', borderRadius: 5, padding: 30 }}>
                        <ReactPlayer controls url={uploadVideo.videoLink} />
                    </div>
                </div>
                <div class="col-lg-4">
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Video Link</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {videoData && videoData.map((e, i) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{i + 1}</td>
                                <td>{e.videoLink}</td>
                                <td>{e.startDate}</td>
                                <td>{e.endDate}</td>
                                <td><button onClick={() => deleteVideoLink(e.id, i)}>Delete</button></td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
        </>
    )
}

export default UploadVideo