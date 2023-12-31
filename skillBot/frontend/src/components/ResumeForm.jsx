import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/ResumeForm.css';

const ResumeForm = () => {

    const navigate = useNavigate();

    const initialState = {
        name: "",
        jobTitle: "",
        contact: "",
        email: "",
        description: "",
        linkedIn: "",
        languages: "",
        skills: "",
        school: "",
        schoolYear: "",
        college: "",
        collegeYear: "",
        experience: "",
        projects: "",
        location: "",
    };

    const [details, setDetails] = useState(initialState);

    const eventChange = (event) => {
        const { name, value } = event.target;
        setDetails((prevDetails) => {
            return {
                ...prevDetails,
                [name]: value,
            };
        });
    }

    const download = async (event) => {
        event.preventDefault();
        try {
            
            const pushData = await axios.post('http://localhost:2018/api/resume', details);
            console.log(pushData.data)
            const generatePdf = await axios.post('http://localhost:2018/api/resume/create-pdf', details);
            console.log(generatePdf.data)
            setTimeout(() => {
                let timerInterval;
                Swal.fire({
                    title: "Generating Resume !",
                    html: "Please wait for <b></b> milliseconds.",
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("finished");
                    }
                });
                navigate('/resume/download');
            }, 5000)
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <div className='resume'>
            <div className="details">
                <div className="enterdetails">
                    <h2 style={{marginTop:"20px"}}>Enter Your Details</h2>
                </div>
                <div className="formdetails">
                    <form action="">
                        <div className="columns">
                            <div className="column1">
                                <input type="text" id="name" name="name" placeholder="Name" value={details.name} onChange={eventChange} />
                                <br />
                                <br />
                                <input style={{ outline: "none", height: '50px', '-webkit-appearance': 'textfield' }} type="number" name="contact" id="contact" placeholder='Phone number' value={details.contact} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="description" id="description" placeholder='Description' value={details.description} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="languages" id="languages" placeholder='Languages Known' value={details.languages} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="school" id="school" placeholder='School Name' value={details.school} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="college" id="college" placeholder='College Name' value={details.college} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="experience" id="experience" placeholder='Experience' value={details.experience} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="location" id="location" placeholder='Location' value={details.location} onChange={eventChange} />
                                <br />
                                <br />
                            </div>
                            <div className="column2">
                                <input type="text" id="jobTitle" name="jobTitle" placeholder="Job Title" value={details.jobTitle} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="email" id="email" placeholder='Email' value={details.email} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="linkedIn" id="linkedIn" placeholder='Linkedin' value={details.linkedIn} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="skills" id="skills" placeholder='Skills Known' value={details.skills} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="schoolYear" id="schoolYear" placeholder='School Years' value={details.schoolYear} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="collegeYear" id="collegeYear" placeholder='College Years' value={details.collegeYear} onChange={eventChange} />
                                <br />
                                <br />
                                <input type="text" name="projects" id="projects" placeholder='Projects' value={details.projects} onChange={eventChange} />
                                <br />
                                <br />
                                <button type='submit' className='button-5' onClick={download}>Generate Resume</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResumeForm
