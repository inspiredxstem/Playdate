import { React, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile({ users, current }) {
  const [isEditingUser, setIsEditingUser] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [species, setSpecies] = useState("");
  // const [location, setLocation] = useState("");
  // const [breed, setBreed] = useState("");
  const [profile_pic, setProfile_pic] = useState("");

  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("current_user"));
  const currentUser = userDetails.user;

  // const profileFooter = {
  //   position: "relative",
  // };

  const toggleEditingUser = () => {
    setIsEditingUser((current) => !current);
  };

  function handleEditUser(e) {
    e.preventDefault();
    axios.patch(`http://localhost:3000/users/${currentUser.id}`,
      {
        username: username,
        password: password,
        name: name,
        age: age,
        gender: gender,
        bio: bio,
        species: species,
        // location: location,
        // breed: breed,
        profile_pic: profile_pic
      });
    console.log("User details successfully edited");
    window.location.reload();
  }

  function handleDelete() {
    fetch(`http://localhost:3000/users/${currentUser.id}`, {
      method: "DELETE",
    });
    localStorage.removeItem("current_user");
    alert(`Sorry to see you go, @${currentUser.username}!`);
    navigate("/");
  }

  function handleLogout() {
    localStorage.removeItem("current_user");
    console.log("You have successfully logged out");
    navigate("/");
    window.location.reload();
  }

  return (
    <div>
      <Navbar />
      <div className="feed-container">
        <div className="profile-cont">
          <div className="profile-title">
            ACCOUNT
            <i
              className="bx bxs-edit"
              id="edit-button"
              onClick={toggleEditingUser}
            ></i>
          </div>
          {isEditingUser ? (
            <>
              <form onSubmit={handleEditUser}>
                <div className="profile-info">
                  <div className="profile-subtitle">USER</div>
                  <div className="show-line" />
                  <div className="profile-category">username</div>
                  <input
                    type="text"
                    placeholder={currentUser.username}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="profile-category">password</div>
                  <input
                    type="password"
                    placeholder={currentUser.password}
                    value={current - password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="line" />
                  <div className="line" />
                  <div className="profile-subtitle">PET</div>
                  <div className="show-line" />
                  <div className="profile-category">name</div>
                  <input
                    type="text"
                    placeholder={currentUser.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="profile-category">bio</div>
                  <input
                    type="text"
                    placeholder={currentUser.bio}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <div className="profile-category">age</div>
                  <input
                    type="text"
                    placeholder={currentUser.age}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <div className="profile-category">gender</div>
                  <input
                    type="text"
                    placeholder={currentUser.gender}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <div className="profile-category">species</div>
                  <input
                    type="text"
                    placeholder={currentUser.animal}
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                  />
                  <div className="profile-category">profile picture</div>
                  <input
                    type="text"
                    placeholder={currentUser.profile_pic}
                    value={profile_pic}
                    onChange={(e) => setProfile_pic(e.target.value)}
                  />
                  <div className="line" />
                </div>
                <div className="submit-btn">
                  <button type="submit" id="edit-form-submit">
                    SAVE CHANGES
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="profile-info">
                <div className="profile-subtitle">USER</div>
                <div className="show-line" />
                <div className="profile-category">username</div>
                <div className="profile-values">{currentUser.username}</div>
                <div className="profile-category">password</div>
                <div className="profile-values">{currentUser.password}</div>
              </div>
              <div className="line" />
              <div className="profile-info">
                <div className="profile-subtitle">PET</div>
                <div className="show-line" />
                <div className="profile-category">name</div>
                <div className="profile-values">{currentUser.name}</div>
                <div className="profile-category">bio</div>
                <div className="profile-values">{currentUser.bio}</div>
                <div className="profile-category">age</div>
                <div className="profile-values">{currentUser.age}</div>
                <div className="profile-category">gender</div>
                <div className="profile-values">{currentUser.gender}</div>
                <div className="profile-category">species</div>
                <div className="profile-values">{currentUser.animal}</div>
                <div className="profile-category">profile picture</div>
                <div className="profile-values">
                  <img
                    className="pfp-preview"
                    src={currentUser.profile_pic}
                    alt="profile"
                  />
                </div>
              </div>
              <div className="profile-buttons">
                <button onClick={handleLogout}>LOGOUT</button>
                <button className="deactivate" onClick={handleDelete}>
                  DELETE ACCOUNT
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <Footer style={profileFooter} /> */}
    </div>
  );
}

export default Profile;
