import style from "./style.module.css";
import React from "react";
import { Avatar } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

export default function Tweet(props) {
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
          <ModeCommentOutlinedIcon />{" "}
          <p className={style.buttonText}>Comments</p>
        </button>
        <button className={style.actionButton}>
          <AutorenewOutlinedIcon /> <p className={style.buttonText}>Retweet</p>
        </button>
        <button className={style.actionButton}>
          <FavoriteBorderOutlinedIcon />
          <p className={style.buttonText}> Like</p>
        </button>
        <button className={style.actionButton}>
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
