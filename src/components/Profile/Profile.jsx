import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useAuth } from "../../contextes/AuthContext";
import { useParams } from "react-router";
import axios from "axios";
import Tweet from "../Tweet/Tweet";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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

async function getUserTweets(uid, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    mode: "no-cors",
  };
  let res = await axios
    .get(`https://twetterclone.herokuapp.com/feed/tweets/${uid}`, config)
    .then((res) => {
      return res;
    });
  return res;
}

export default function Profile(props) {
  const Auth = useAuth();
  const paramId = useParams().id;
  const id = paramId ? paramId : Auth.userId;
  const [photoCover, setPhotoCover] = useState("");
  const [photoProf, setPhotoProf] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [bio, setBio] = useState("");
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [tweetsList, setTweetsList] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  function parseFollowers() {
    try {
      followers.forEach((user) => {
        if (user.userId === Auth.userId) {
          console.log("g is follwing me");
          setIsFollowed(true);
          throw Error;
        }
      });
    } catch (e) {}
  }

  useEffect(
    () => {
      getUser(Auth.token, id).then((res) => {
        const user = res.data.user;
        setPhotoCover(user.photoCover);
        setPhotoProf(user.photoProf);
        setUsername(user.username);
        setBio(user.bio);
        setFollowers(user.followers);
        setFollowing(user.following);
        console.log(user);
        setUserId(user._id);
      });
      getUserTweets(id, Auth.token).then((res) =>
        setTweetsList(res?.data?.tweets)
      );
    },
    // eslint-disable-next-line
    [props.self]
  );
  useEffect(parseFollowers, [followers]);

  const tweetsFeed = tweetsList.map((tweet) => (
    <Tweet auth={Auth} key={tweet._id} tweet={tweet} />
  ));

  function followUserHandler() {
    const data = { followingId: id };
    const config = {
      headers: {
        Authorization: `Bearer ${Auth.token}`,
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      mode: "no-cors",
    };
    axios
      .post(`https://twetterclone.herokuapp.com/feed/follow-user`, data, config)
      .then(setIsFollowed(!isFollowed));
  }

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
              <div className={style.column2}>
                <h3 className={style.name}>{username}</h3>
                <div className={style.stats}>
                  {following.length}
                  <p className={style.muted}>Following</p>
                  {followers.length}
                  <p className={style.muted}>Followers</p>
                </div>
              </div>
              <p className={style.bio}>{bio}</p>
            </div>

            {Auth.userId !== userId ? (
              !isFollowed ? (
                <button
                  type="button"
                  onClick={followUserHandler}
                  className={`pr ${style.followButton}`}
                >
                  <ControlPointIcon sx={{ width: 14, height: 14 }} />
                  Follow
                </button>
              ) : (
                <button
                  type="button"
                  onClick={followUserHandler}
                  className={`pr ${style.followButton}`}
                  style={{ background: "#bdbdbd" }}
                >
                  <HighlightOffIcon sx={{ width: 14, height: 14 }} />
                  Following
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
      <div className={style.overflowSpacer}></div>
      <div className={style.profileContent}>
        <div className={style.contentFilter}>
          <button className={style.filterButton} type="button">
            Tweets
          </button>
          <button className={style.filterButton} type="button">
            Tweets & replies
          </button>
          <button className={style.filterButton} type="button">
            Media
          </button>
          <button className={style.filterButton} type="button">
            Likes
          </button>
        </div>
        <div className={style.contentFeed}>{tweetsFeed}</div>
      </div>
    </div>
  );
}
