import React from 'react';
import { Link } from 'react-router-dom';

const HostDashboard = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundColor: '#b3d1c0', minHeight: '100vh' }}>
      <div className="card bg-light shadow" style={{ width: '60%', maxWidth: '800px', borderRadius: '10px' }}>
        <div className="card-body text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <div className="mb-4">
            <h2 style={{ color: '#394a4a' }}>Applied Events</h2>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <Link to="/event/1" style={{ color: '#394a4a' }}>Event 1</Link>
                <span className="badge bg-primary rounded-pill">Approved</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <Link to="/event/2" style={{ color: '#394a4a' }}>Event 2</Link>
                <span className="badge bg-warning text-dark rounded-pill">Pending</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <Link to="/event/3" style={{ color: '#394a4a' }}>Event 3</Link>
                <span className="badge bg-danger rounded-pill">Rejected</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <Link to="/event/3" style={{ color: '#394a4a' }}>Event 3</Link>
                <span className="badge bg-danger rounded-pill">Rejected</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <Link to="/event/3" style={{ color: '#394a4a' }}>Event 3</Link>
                <span className="badge bg-danger rounded-pill">Rejected</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <Link to="/event/3" style={{ color: '#394a4a' }}>Event 3</Link>
                <span className="badge bg-danger rounded-pill">Rejected</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <Link to="/event/3" style={{ color: '#394a4a' }}>Event 3</Link>
                <span className="badge bg-danger rounded-pill">Rejected</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <Link to="/event/3" style={{ color: '#394a4a' }}>Event 3</Link>
                <span className="badge bg-danger rounded-pill">Rejected</span>
              </li>
              {/* Add more list items as needed */}
            </ul>
          </div>
          <div>
            {/* Display event status here */}
            {/* You can add more components or logic to display event status */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
