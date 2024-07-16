import React, { useState } from 'react';
import men from '../foto/men.png';
import Sign_in_square from '../foto/Sign_in_squre.svg';
import home from '../foto/Home.png';
import job from '../foto/Order.svg';
import trashIcon from '../foto/Trash.svg';
import editIcon from '../foto/Edit.png';
import './Home.css';

function Home({ onLogout }) {
    const [showJobText, setShowJobText] = useState(false);
    const [showHomeText, setShowHomeText] = useState(true);
    const [jobRequests, setJobRequests] = useState([]);
    const [showAddRequest, setShowAddRequest] = useState(false);
    const [showEditRequest, setShowEditRequest] = useState(false);
    const [newRequest, setNewRequest] = useState({ firstName: '', lastName: '', jobTitle: '', jobDescription: '' });
    const [currentEditIndex, setCurrentEditIndex] = useState(null);

    const handleJobRequest = () => {
        setShowJobText(true);
        setShowHomeText(false);
    };

    const handleHome = () => {
        setShowHomeText(true);
        setShowJobText(false);
    };

    const handleLogout = () => {
        onLogout();
    };

    const handleAddNewRequest = () => {
        setShowAddRequest(true);
    };

    const handleSaveRequest = () => {
        setJobRequests([...jobRequests, newRequest]);
        setNewRequest({ firstName: '', lastName: '', jobTitle: '', jobDescription: '' });
        setShowAddRequest(false);
    };

    const handleDeleteRequest = (index) => {
        const updatedRequests = jobRequests.filter((_, i) => i !== index);
        setJobRequests(updatedRequests);
    };

    const handleEditRequest = (index) => {
        setCurrentEditIndex(index);
        setNewRequest(jobRequests[index]);
        setShowEditRequest(true);
    };

    const handleUpdateRequest = () => {
        const updatedRequests = jobRequests.map((request, index) =>
            index === currentEditIndex ? newRequest : request
        );
        setJobRequests(updatedRequests);
        setShowEditRequest(false);
        setNewRequest({ firstName: '', lastName: '', jobTitle: '', jobDescription: '' });
        setCurrentEditIndex(null);
    };

    return (
        <div className="home_section">
            <div className="container_home">
                <div className="personal_info">
                    <img src={men} alt="Profile" />
                    <h2>Oleg Borys</h2>
                    <h3>Admin</h3>
                </div>
                <div className="navigation">
                    <button className={`navigation_home ${showHomeText ? 'active' : ''}`} onClick={handleHome}>
                        <img src={home} alt="Home" />
                        Home
                    </button>
                    <button className={`navigation_vacation ${showJobText ? 'active' : ''}`} onClick={handleJobRequest}>
                        <img src={job} alt="Job Request" />
                        Job Request
                    </button>
                    <button className="navigation_log_out" onClick={handleLogout}>
                        Log out
                        <img src={Sign_in_square} alt="Sign Out" />
                    </button>
                </div>
            </div>
            <div className="container_job">
                {showHomeText && <h1>Привіт ще HOME</h1>}
                {showJobText && (
                    <>
                        <h1>Job Request List</h1>
                        <button onClick={handleAddNewRequest}>Add New Request</button>
                        <div className="cards-container">
                            {jobRequests.map((request, index) => (
                                <div className="card" key={index}>
                                    <h2>{request.firstName} {request.lastName}</h2>
                                    <h3>{request.jobTitle}</h3>
                                    <p>{request.jobDescription}</p>
                                    <div>
                                        <img src={trashIcon} alt="Delete" onClick={() => handleDeleteRequest(index)} />
                                        <img src={editIcon} alt="Edit" onClick={() => handleEditRequest(index)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            {showAddRequest && (
                <div className="add-request-modal">
                    <h2>Add New Job Request</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newRequest.firstName}
                        onChange={(e) => setNewRequest({ ...newRequest, firstName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newRequest.lastName}
                        onChange={(e) => setNewRequest({ ...newRequest, lastName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={newRequest.jobTitle}
                        onChange={(e) => setNewRequest({ ...newRequest, jobTitle: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Job Description"
                        value={newRequest.jobDescription}
                        onChange={(e) => setNewRequest({ ...newRequest, jobDescription: e.target.value })}
                    />
                    <button onClick={handleSaveRequest}>Save</button>
                </div>
            )}
            {showEditRequest && (
                <div className="add-request-modal">
                    <h2>Edit Job Request</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newRequest.firstName}
                        onChange={(e) => setNewRequest({ ...newRequest, firstName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newRequest.lastName}
                        onChange={(e) => setNewRequest({ ...newRequest, lastName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={newRequest.jobTitle}
                        onChange={(e) => setNewRequest({ ...newRequest, jobTitle: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Job Description"
                        value={newRequest.jobDescription}
                        onChange={(e) => setNewRequest({ ...newRequest, jobDescription: e.target.value })}
                    />
                    <button onClick={handleUpdateRequest}>Update</button>
                </div>
            )}
        </div>
    );
}

export default Home;
