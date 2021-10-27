import React, { useState } from "react";
import style from "./style.module.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useEffect } from "react";
import { useAuth } from "../../contextes/AuthContext";
import { useParams } from "react-router";
import axios from "axios";

export async function getUser(token, uid) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    mode: "no-cors",
  };
  let response = await axios
    .get(`https://twetterclone.herokuapp.com/feed/${uid}`, config)
    .then((res) => {
      return res;
    });
  return response;
}

export default function Profile(props) {
  const Auth = useAuth();
  const paramId = useParams().id;
  const id = paramId ? paramId : Auth.userId;
  const [photoCover, setPhotoCover] = useState("");
  const [photoProf, setPhotoProf] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  useEffect(
    () =>
      getUser(Auth.token, id).then((res) => {
        const user = res.data.user;
        setPhotoCover(user.photoCover);
        setPhotoProf(user.photoProf);
        setUsername(user.username);
        setBio(user.bio);
        setFollowers(user.followers);
        setFollowing(user.following);
      }),
    // eslint-disable-next-line
    []
  );
  return (
    <div className={style.profileContainer}>
      <div className={style.profile}>
        <div className={style.backgroundImage}>
          <img
            className={style.bgv2}
            src={
              photoCover
                ? `https://twetterclone.herokuapp.com/images/${photoCover}`
                : ""
            }
            alt="pc"
          />
          <div className={style.profileInfo}>
            <div className={style.profileImage}>
              <img
                src={
                  photoProf
                    ? `https://twetterclone.herokuapp.com/images/${photoProf}`
                    : ""
                }
                alt="pp"
                className={style.img}
              />
            </div>

            <div className={style.column}>
              <h3 className={style.name}>{username}</h3>
              <p className={style.bio}>{bio}</p>
            </div>
            <div className={style.stats}>
              {following.length}
              <p className={style.muted}>Following</p>
              {followers.length}
              <p className={style.muted}>Followers</p>
            </div>
            {Auth.username !== username ? (
              <button className={`pr ${style.followButton}`}>
                <ControlPointIcon sx={{ width: 14, height: 14 }} />
                Follow
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
      <div className={style.profileContent}>
        <div className={style.contentFilter}></div>
        <div className={style.contentFeed}></div>
      </div>
    </div>
  );
}
