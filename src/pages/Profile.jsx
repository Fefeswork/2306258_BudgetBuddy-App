import React, { useContext, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../css/Profile.css'

function Profile() {
    const { state, dispatch } = useAppContext();
  const [name, setName] = useState(state.user.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_USER_NAME', payload: name });
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Update Name</button>
      </form>
    </div>
  );
}

export default Profile;

