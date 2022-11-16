import { React, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

function Profile({ users, current }) {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingPet, setIsEditingPet] = useState(false);

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

  const toggleEditingUser = () => {
    setIsEditingUser((current) => !current);
  };

  const toggleEditingPet = () => {
    setIsEditingPet((current) => !current);
  };

  function handleEditUser(e) {
    e.preventDefault();
    // fetch(`http://localhost:3000/users/${users.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: users.username,
    //     password: users.password_digest,
    //   }),
    // });
    console.log("User details successfully edited!");
    console.log({ username, password });
  }

  function handleEditPet(e) {
    e.preventDefault();
    // fetch(`http://localhost:3000/users/${users.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: users.name,
    //     age: users.age,
    //     gender: users.gender,
    //     bio: users.bio,
    //     species: users.species,
    //     // location: users.location,
    //     // breed: users.breed,
    //     profile_pic: users.profile_pic,
    //   }),
    // });
    console.log("Pet details successfully edited!");
    console.log({ name, age, gender, bio, species, profile_pic });
  }

  function handleDelete() {
    // fetch(`http://localhost:3000/users/${users.id}`, {
    //   method: "DELETE",
    // });
    alert("Are you sure you want to delete your account?");
    // window.location.reload();
  }

  return (
    <div>
      <Navbar />
      <div className="feed-container">
        <div className="profile-title">account details</div>
        <div className="profile-cont">
          {/* <div className="profile-title">account details</div> */}
          {/* <div className="line" /> */}
          <div className="profile-subtitle">
            USER
            <i
              className="bx bxs-edit"
              id="edit-button"
              onClick={toggleEditingUser}
            ></i>
          </div>
          {isEditingUser ? (
            <form onSubmit={handleEditUser} className="form-info">
              <div className="profile-category">username</div>
              <input
                type="text"
                placeholder="username"
                value={username}
                id="edit-account"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button id="edit-form-submit">
                <i className="bx bx-check"></i>
              </button>
              <div className="profile-category">password</div>
              <input
                type="text"
                placeholder="password"
                value={password}
                id="edit-account"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button id="edit-form-submit">
                <i className="bx bx-check"></i>
              </button>
            </form>
          ) : (
            <div className="profile-info">
              <div className="profile-category">username</div>
              <div className="profile-values">test</div>
              <div className="profile-category">password</div>
              <div className="profile-values">test</div>
            </div>
          )}
          <div className="line" />
          <div className="profile-subtitle">
            PET
            <i
              className="bx bxs-edit"
              id="edit-button"
              onClick={toggleEditingPet}
            ></i>
          </div>
          {isEditingPet ? (
            <form onSubmit={handleEditPet} className="form-info">
              <div className="profile-category">name</div>
              <input
                type="text"
                placeholder="name"
                value={name}
                id="edit-account"
                onChange={(e) => setName(e.target.value)}
              />
              <button id="edit-form-submit">
                <i className="bx bx-check"></i>
              </button>
              <div className="profile-category">bio</div>
              <input
                type="text"
                placeholder="bio"
                value={bio}
                id="edit-account"
                onChange={(e) => setBio(e.target.value)}
              />
              <button id="edit-form-submit">
                <i className="bx bx-check"></i>
              </button>
              <div className="profile-category">age</div>
              <input
                type="text"
                placeholder="age"
                value={age}
                id="edit-account"
                onChange={(e) => setAge(e.target.value)}
              />
              <button id="edit-form-submit">
                <i className="bx bx-check"></i>
              </button>
              <div className="profile-category">gender</div>
              <input
                type="text"
                placeholder="gender"
                value={gender}
                id="edit-account"
                onChange={(e) => setGender(e.target.value)}
              />
              <button id="edit-form-submit">
                <i className="bx bx-check"></i>
              </button>
              <div className="profile-category">species</div>
              <input
                type="text"
                placeholder="species"
                value={species}
                id="edit-account"
                onChange={(e) => setSpecies(e.target.value)}
              />
              <button id="edit-form-submit">
                <i className="bx bx-check"></i>
              </button>
              <div className="profile-category">profile picture</div>
              <input
                type="text"
                placeholder="url"
                value={profile_pic}
                id="edit-account"
                onChange={(e) => setProfile_pic(e.target.value)}
              />
              <button id="edit-form-submit">
                <i className="bx bx-check"></i>
              </button>
            </form>
          ) : (
            <div className="profile-info">
              <div className="profile-category">name</div>
              <div className="profile-values">test</div>
              <div className="profile-category">bio</div>
              <div className="profile-values">test</div>
              <div className="profile-category">age</div>
              <div className="profile-values">test</div>
              <div className="profile-category">gender</div>
              <div className="profile-values">test</div>
              <div className="profile-category">species</div>
              <div className="profile-values">test</div>
              <div className="profile-category">profile picture</div>
              <div className="profile-values">test</div>
            </div>
          )}
          <div className="profile-buttons">
            <button>LOGOUT</button>
            <button className="deactivate" onClick={handleDelete}>
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
