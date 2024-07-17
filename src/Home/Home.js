import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import men from '../photo/men.png';
import Sign_in_square from '../photo/Sign_in_squre.svg';
import home from '../photo/Home.png';
import job from '../photo/Order.svg';
import trashIcon from '../photo/Trash.svg';
import editIcon from '../photo/Edit.png';
import './Home.css';

const statuses = ['pending', 'completed'];
const engineers = ['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Davis'];
const jobTypes = ['Repair', 'Installation', 'Maintenance', 'Inspection'];

function Home({ onLogout }) {
    const [showJobText, setShowJobText] = useState(false);
    const [showHomeText, setShowHomeText] = useState(true);
    const [jobRequests, setJobRequests] = useState([]);
    const [showAddRequest, setShowAddRequest] = useState(false);
    const [showEditRequest, setShowEditRequest] = useState(false);
    const [newRequest, setNewRequest] = useState({
        id: '',
        job_type: jobTypes[0],
        status: statuses[0],
        description: '',
        assigned_engineer: engineers[0],
    });
    const [currentEditIndex, setCurrentEditIndex] = useState(null);

    useEffect(() => {
        const storedRequests = JSON.parse(localStorage.getItem('jobRequests')) || [];
        setJobRequests(storedRequests);
    }, []);

    const saveToLocalStorage = (requests) => {
        localStorage.setItem('jobRequests', JSON.stringify(requests));
    };

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
        setNewRequest({
            id: jobRequests.length + 1,
            job_type: jobTypes[0],
            status: statuses[0],
            description: '',
            assigned_engineer: engineers[0],
        });
        setShowAddRequest(true);
    };

    const handleSaveRequest = () => {
        const updatedRequests = [...jobRequests, newRequest];
        setJobRequests(updatedRequests);
        saveToLocalStorage(updatedRequests);
        setShowAddRequest(false);
    };

    const handleDeleteRequest = (index) => {
        const updatedRequests = jobRequests.filter((_, i) => i !== index);
        setJobRequests(updatedRequests);
        saveToLocalStorage(updatedRequests);
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
        saveToLocalStorage(updatedRequests);
        setShowEditRequest(false);
        setNewRequest({
            id: '',
            job_type: jobTypes[0],
            status: statuses[0],
            description: '',
            assigned_engineer: engineers[0],
        });
        setCurrentEditIndex(null);
    };

    const totalJobs = jobRequests.length;
    const pendingJobs = jobRequests.filter(request => request.status === 'pending').length;
    const completedJobs = jobRequests.filter(request => request.status === 'completed').length;

    return (
        <div className="home_section">
            <div className="container_home">
                <div className="personal_info">
                    <img src={men} alt="Profile" />
                    <h2>Oleg Borys</h2>
                    <h3>Admin</h3>
                </div>
                <div className="navigation">
                    <Link to="/" className={`navigation_home ${showHomeText ? 'active' : ''}`} onClick={handleHome}>
                        <img src={home} alt="Home" />
                        Home
                    </Link>
                    <Link to="/job-requests" className={`navigation_vacation ${showJobText ? 'active' : ''}`} onClick={handleJobRequest}>
                        <img src={job} alt="Job Request" />
                        Job Request
                    </Link>
                    <button className="navigation_log_out" onClick={handleLogout}>
                        Log out
                        <img src={Sign_in_square} alt="Sign Out" />
                    </button>
                </div>
            </div>
            <div className="container_job">
                {showHomeText && (
                    <div className="dashboard">
                        <h1>Dashboard</h1>
                        <div className="dashboard_score">
                            <div className='Total'>
                                Total Jobs:
                                <div>{totalJobs}</div>
                            </div>
                            <div className='Pending'>
                                Pending Jobs:
                                <div>{pendingJobs}</div>
                            </div>
                            <div className='Completed'>
                                Completed Jobs:
                                <div>{completedJobs}</div>
                            </div>
                        </div>
                    </div>
                )}
                {showJobText && (
                    <>
                        <h1>Job Request List</h1>
                        <button onClick={handleAddNewRequest}>Add New Request</button>
                        <div className="cards-container">
                            {jobRequests.map((request, index) => (
                                <div className="card" key={index}>
                                    <h2>Job ID: {request.id}</h2>
                                    <h3>Type: {request.job_type}</h3>
                                    <p>Status: {request.status}</p>
                                    <p>Description: {request.description}</p>
                                    <p>Assigned Engineer: {request.assigned_engineer}</p>
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
                <>
                    <div className="modal-backdrop" onClick={() => setShowAddRequest(false)}></div>
                    <div className="add-request-modal">
                        <h2>Add New Job Request</h2>
                        <input
                            type="text"
                            placeholder="Job ID"
                            value={newRequest.id}
                            readOnly
                        />
                        <select
                            value={newRequest.job_type}
                            onChange={(e) => setNewRequest({ ...newRequest, job_type: e.target.value })}
                        >
                            {jobTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <select
                            value={newRequest.status}
                            onChange={(e) => setNewRequest({ ...newRequest, status: e.target.value })}
                        >
                            {statuses.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Description"
                            value={newRequest.description}
                            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                        />
                        <select
                            value={newRequest.assigned_engineer}
                            onChange={(e) => setNewRequest({ ...newRequest, assigned_engineer: e.target.value })}
                        >
                            {engineers.map((engineer, index) => (
                                <option key={index} value={engineer}>{engineer}</option>
                            ))}
                        </select>
                        <button onClick={handleSaveRequest}>Save</button>
                    </div>
                </>
            )}
            {showEditRequest && (
                <>
                    <div className="modal-backdrop" onClick={() => setShowEditRequest(false)}></div>
                    <div className="add-request-modal">
                        <h2>Edit Job Request</h2>
                        <input
                            type="text"
                            placeholder="Job ID"
                            value={newRequest.id}
                            readOnly
                        />
                        <select
                            value={newRequest.job_type}
                            onChange={(e) => setNewRequest({ ...newRequest, job_type: e.target.value })}
                        >
                            {jobTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <select
                            value={newRequest.status}
                            onChange={(e) => setNewRequest({ ...newRequest, status: e.target.value })}
                        >
                            {statuses.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Description"
                            value={newRequest.description}
                            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                        />
                        <select
                            value={newRequest.assigned_engineer}
                            onChange={(e) => setNewRequest({ ...newRequest, assigned_engineer: e.target.value })}
                        >
                            {engineers.map((engineer, index) => (
                                <option key={index} value={engineer}>{engineer}</option>
                            ))}
                        </select>
                        <button onClick={handleUpdateRequest}>Update</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
