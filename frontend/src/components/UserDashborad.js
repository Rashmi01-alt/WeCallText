import React, { useState } from "react";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    gender: "Male",
    age: 30,
    password: "********",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false); // Disable editing after submission
    // Handle form submission (e.g., send data to server)
    // Here, you might want to add code to save/update user profile
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            disabled={!isEditing} // Enable editing if isEditing is true
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={userInfo.gender}
            onChange={handleChange}
            disabled={!isEditing} // Enable editing if isEditing is true
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={userInfo.age}
            onChange={handleChange}
            disabled={!isEditing} // Enable editing if isEditing is true
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            disabled={!isEditing} // Enable editing if isEditing is true
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={handleEditClick}>{isEditing ? "Cancel" : "Edit"}</button>
    </div>
  );
};

export default UserProfile;
