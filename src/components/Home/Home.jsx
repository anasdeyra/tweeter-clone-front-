import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "../../contextes/AuthContext";
import { Redirect } from "react-router";
import CreateTweet from "../Tweet/CreateTweet";
import style from "./style.module.css";
import Tweet from "../Tweet/Tweet";
import axios from "axios";

async function getTweetsFeed(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    mode: "no-cors",
  };
  let response = await axios
    .get("https://twetterclone.herokuapp.com/feed/followers-posts", config)
    .then((res) => {
      return res?.data?.posts;
    });
  return response;
}

export default function Home() {
  const Auth = useAuth();
  const [tweetList, setTweetList] = useState([]);

  const tweetFeed = tweetList.map((tweet) => (
    <Tweet auth={Auth} tweet={tweet.tweet} />
  ));

  useEffect(() => {
    getTweetsFeed(Auth?.token).then((res) => {
      setTweetList(res);
    });
  }, []);

  return (
    <>
      {Auth && (
        <div className={style.homeContainer}>
          <div className={style.homeFeed}>
            <CreateTweet />
            {tweetFeed}
          </div>
          <div className={style.homeSuggestions}></div>
        </div>
      )}
      {!Auth && <Redirect to="login" />}
    </>
  );
}
