import style from "./style.module.css";
import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import axios from "axios";

async function doAction(action, postId, token) {
  const data = { postId };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    mode: "no-cors",
  };
  var endPoint = "";
  switch (action) {
    case "like":
      endPoint = "like-post";
      break;
    case "save":
      endPoint = "save-tweet";
      break;
    case "retweet":
      endPoint = "retweet-post";
      break;
    default:
      endPoint = "like-post";
  }

  let response = await axios
    .post(`https://twetterclone.herokuapp.com/feed/${endPoint}`, data, config)
    .then((res) => {
      return res;
    });
  return response;
}

export default function Tweet(props) {
  const [isLiked, setIsLiked] = useState(false);
  function parseLikes() {
    try {
      props.tweet.likes.forEach((like) => {
        if (props.auth.userId === like.userId) {
          setIsLiked(true);
          throw {};
        }
      });
    } catch {}
  }
  const [isSaved, setIsSaved] = useState(
    props.tweet.saves.includes(props.auth.userId)
  );
  const [isRetweeted, setIsRetweeted] = useState(
    props.tweet.retweets.includes(props.auth.userId)
  );

  useEffect(() => {
    parseLikes();
  }, []);

  return (
    <div className={style.tweetContainer}>
      <div className={style.tweetAuth}>
        <Avatar
          variant="rounded"
          src={`https://twetterclone.herokuapp.com/images/${props.img}`}
        />
        <div className={style.authStats}>
          <h4 className={style.authName}>{props.tweet.username}</h4>
          <p className={style.tweetDate}>{props.tweet.timeCreated}</p>
        </div>
      </div>
      <p className={style.tweetCaption}>{props.tweet.comment}</p>
      <div>
        <img
          className={style.tweetImage}
          src={`https://twetterclone.herokuapp.com/${props.tweet.imageUrl}`}
          alt="tweet"
        />
      </div>
      <div className={style.tweetStats}>
        <div className={style.stat}>{props.tweet.comments.length} Comments</div>
        <div className={style.stat}>{props.tweet.retweets.length} Retweets</div>
        <div className={style.stat}>{props.tweet.saves.length} Saved</div>
      </div>
      <div className={style.tweetActions}>
        <button className={style.actionButton}>
          <ModeCommentOutlinedIcon />
          <p className={style.buttonText}>Comments</p>
        </button>
        <button
          onClick={() => {
            doAction("retweet", props.tweet._id, props.auth.token).then((res) =>
              setIsRetweeted(!isRetweeted)
            );
          }}
          style={isRetweeted ? { color: "rgb(var(--g))" } : null}
          className={style.actionButton}
        >
          <AutorenewOutlinedIcon /> <p className={style.buttonText}>Retweet</p>
        </button>
        <button
          onClick={() => {
            doAction("like", props.tweet._id, props.auth.token).then((res) =>
              setIsLiked(!isLiked)
            );
          }}
          style={isLiked ? { color: "rgb(var(--r))" } : null}
          className={style.actionButton}
        >
          <FavoriteBorderOutlinedIcon />
          <p className={style.buttonText}>Like</p>
        </button>
        <button
          onClick={() => {
            doAction("save", props.tweet._id, props.auth.token).then((res) =>
              setIsSaved(!isSaved)
            );
          }}
          style={isSaved ? { color: "rgb(var(--b))" } : null}
          className={style.actionButton}
        >
          <BookmarkBorderOutlinedIcon />
          <p className={style.buttonText}> Bookmark</p>
        </button>
      </div>
      <div className={style.tweetComment}>
        <Avatar
          variant="rounded"
          src={`https://twetterclone.herokuapp.com/images/${props.img}`}
        />
        <input
          className={style.commentInput}
          type="text"
          placeholder="Tweet your reply"
        />
      </div>
    </div>
  );
}
