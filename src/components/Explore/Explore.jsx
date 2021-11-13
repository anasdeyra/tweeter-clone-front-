import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import style from "./style.module.css";
import Tweet from "../Tweet/Tweet.jsx";
import { MiniProfile } from "../Profile/Profile.jsx";
import { CircularProgress as Spinner } from "@mui/material";
import { AuthContext } from "../../contextes/AuthContext";
import { followUserHandler, getUser } from "../Profile/Profile.jsx";

async function getTweets(token, type = "Top") {
  let endpoint = "Top";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    mode: "no-cors",
  };

  switch (type) {
    case "Latest":
      endpoint = "latest-tweets";
      break;
    case "Media":
      endpoint = "tweet-media";
      break;
    case "People":
      endpoint = "popular-people";
      break;
    default:
      endpoint = "top-tweets";
      break;
  }

  let response = await axios.get(
    `https://twetterclone.herokuapp.com/feed/${endpoint}`,
    config
  );

  return response;
}

function FilterContent({ type, changeFilter }) {
  const typesList = ["Top", "Latest", "People", "Media"];
  return (
    <div className={style.filterContainer}>
      {typesList.map((cat) => (
        <div
          key={cat}
          onClick={() => {
            changeFilter(cat);
          }}
          className={`${style.filterCategory} ${cat === type && style.active}`}
        >
          {cat}
        </div>
      ))}
    </div>
  );
}

export default function Explore() {
  const [filter, setFilter] = useState("Top");
  const [feedList, setFeedList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [followersId, setFollowersId] = useState([]);
  const Auth = useContext(AuthContext);
  const filtredFeed = feedList?.posts
    ? feedList?.posts?.map((tweet) => (
        <Tweet auth={Auth?.user} key={tweet._id} tweet={tweet} />
      ))
    : feedList?.users?.map((user) => {
        let isFollowed = followersId.includes(user._id);
        return (
          <div className={style.miniProfileContainer}>
            <MiniProfile
              style={{ width: "100%" }}
              key={user._id}
              id={user._id}
              name={user.username}
              bio={user.bio}
              profilePicture={user.photoProf}
              count={`${user.followers?.length} followers`}
              followUserHandler={() =>
                followUserHandler(Auth?.user?.token, user?._id)
              }
              isFollowed={isFollowed}
            />
          </div>
        );
      });
  useEffect(() => {
    setIsLoading(true);
    getTweets(Auth?.user?.token, filter)
      .then((res) => {
        setFeedList(res?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, [filter]);
  useEffect(() => {
    getUser(Auth?.user?.token, Auth?.user?.userId).then((res) => {
      setFollowersId(
        res.data.user.following.map((follower) => follower.userId)
      );
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className={style.exploreContainer}>
      <FilterContent type={filter} changeFilter={setFilter} />
      {isLoading ? (
        <div style={{ justifySelf: "center", margin: "0 auto" }}>
          <Spinner />
        </div>
      ) : (
        <>
          {feedList?.posts?.length > 0 || feedList?.users?.length > 0 ? (
            <div className={style.feedContainer}>{filtredFeed}</div>
          ) : (
            <div className={style.noTweets}>There are no tweets.</div>
          )}
        </>
      )}
    </div>
  );
}
