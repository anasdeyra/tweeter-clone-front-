import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contextes/AuthContext";
import axios from "axios";
import style from "./style.module.css";
import { Button } from "@chakra-ui/react";
import Formdata from "form-data";
import { useHistory } from "react-router-dom";

async function submitUpdate(token, data) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    mode: "no-cors",
  };
  let error = null;
  try {
    let response = await axios
      .put(`https://twetterclone.herokuapp.com/edit/user-info`, data, config)
      .then((res) => res)
      .catch((err) => (error = err));
    if (!error) {
      return response;
    } else {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserDetails(id, token) {
  let response = await axios
    .get(`https://twetterclone.herokuapp.com/feed/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => console.log({ err }));
  return response;
}

export default function Settings() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profileCover, setProfileCover] = useState("");
  const auth = useAuth();
  const usernameRef = useRef();
  const bioRef = useRef();
  const profilePictureRef = useRef();
  const profileCoverRef = useRef();
  const history = useHistory();

  function userDetailsHandler() {
    getUserDetails(auth.userId, auth.token).then(({ data }) => {
      const { user } = data;
      setBio(user.bio);
      bioRef.current.value = user.bio;
      setUsername(user.username);
      usernameRef.current.value = user.username;
      setProfilePicture(user.photoProf);
      setProfileCover(user.photoCover);
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    let data = new Formdata();
    if (username !== "") {
      data.set("username", username);
    }
    if (bio !== "") {
      data.set("bio", bio);
    }
    if (password !== "" && password === passwordConfirmation) {
      data.set("password", password);
    }

    submitUpdate(auth.token, data)
      .then((res) => {
        setIsLoading(false);
        console.log({ res });
      })
      .catch((err) => {
        setIsLoading(false);
        setError(JSON.stringify(err?.response?.data?.data[0]?.msg));
      });
  }
  useEffect(userDetailsHandler, []);
  return (
    <form onSubmit={submitHandler}>
      <div className={style.settingsContainer}>
        <input
          type="file"
          name="profileCover"
          id="profileCover"
          accept="image/*"
          style={{ display: "none" }}
          ref={profileCoverRef}
        />
        <input
          type="file"
          name="profilePicture"
          id="profilePicture"
          accept="image/*"
          style={{ display: "none" }}
          ref={profilePictureRef}
        />
        <img
          className={style.pc}
          src={`https://twetterclone.herokuapp.com/images/${profileCover}`}
          alt=""
          onClick={() => {
            profileCoverRef.current.click();
          }}
        />
        <img
          className={style.pp}
          src={`https://twetterclone.herokuapp.com/images/${profilePicture}`}
          alt=""
          onClick={() => {
            profilePictureRef.current.click();
          }}
        />
        <p className={style.error}>{error}</p>
        <div className={style.textInputList}>
          <label htmlFor="username">Username: </label>
          <input
            className={style.input}
            type="text"
            name="username"
            id="username"
            ref={usernameRef}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label htmlFor="bio">Biography: </label>
          <textarea
            className={style.input}
            rows="5"
            name="bio"
            id="bio"
            ref={bioRef}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />

          <label htmlFor="bio">Password: </label>
          <input
            className={style.input}
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <label htmlFor="bio">Password Confirmation: </label>
          <input
            className={style.input}
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
          />
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Updating"
          className={`pr ${style.submitButton}`}
        >
          Update Profile
        </Button>
      </div>
      <div> </div>
    </form>
  );
}