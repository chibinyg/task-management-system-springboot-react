import React, { useEffect, useState } from 'react';
import { getUser } from '../services/UserService';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const response = await getUser();
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-header'>
              <h2 className='text-center'>User Profile</h2>
            </div>
            <div className='card-body'>
              <form>
                <div className='row mb-3'>
                  <label className='col-md-3 control-label'>Username</label>
                  <div className='col-md-9'>
                    <input
                      type="text"
                      className="form-control bg-light text-muted"
                      value={user.username || ''}
                      readOnly
                      style={{
                        cursor: "not-allowed",
                        border: "1px solid #dee2e6",
                        opacity: 0.95
                      }}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-md-3 control-label'>Email</label>
                  <div className='col-md-9'>
                    <input
                      type="text"
                      className="form-control bg-light text-muted"
                      value={user.email || ''}
                      readOnly
                      style={{
                        cursor: "not-allowed",
                        border: "1px solid #dee2e6",
                        opacity: 0.95
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
