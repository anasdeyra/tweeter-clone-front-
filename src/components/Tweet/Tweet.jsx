import style from "./style.module.css";
import React from "react";
import { Avatar } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

export default function Tweet() {
  return (
    <div className={style.tweetContainer}>
      <div className={style.tweetAuth}>
        <Avatar variant="rounded" />
        <div className={style.authStats}>
          <h4 className={style.authName}>Peyton Lyons</h4>
          <p className={style.tweetDate}>24 August at 20:43 </p>
        </div>
      </div>
      <p className={style.tweetCaption}>
        Traveling – it leaves you speechless, then turns you into a storyteller.
      </p>
      <div>
        <img
          className={style.tweetImage}
          src="https://s3-alpha-sig.figma.com/img/e8bd/0aa0/76776d7ccd43c1602fbc6aa3a6ee5ac5?Expires=1635724800&Signature=UL~JOgAgNhirjXyGY5uyxZXHe~DYku6nKbueuI173yvGj8vnVbdV3hDdhpJcMwVjvPtSEJ1A3d7xZBoBPRCa7A6ZcBI8DdStxXVEICLU~RgmoHb5YP3hCZGVca-o7i862sw9RMDCKKUoyqrqiGMH0OF6SF6Hkqvfk6rzC-8OPm-HL6mRbjj2RBhYG29MQDsANopIJ0Uwbu1nQgQTmk9bXRb4hrjOY0O-jJN0V9Y4kxkWSL3lyV6ez7fUTJu7S7TYdTWTizedvnKcDUvZyxTnvozJjvUmQoYLezmL3rVdQTKwlBFofdroHh3frsMQdznQ6eaJsJhp9KiWorWgI9WfiA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          alt="tweet"
        />
      </div>
      <div className={style.tweetStats}>
        <div className={style.stat}>12.1k Comments</div>
        <div className={style.stat}>420k Retweets</div>
        <div className={style.stat}>11k Saved</div>
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
        <Avatar variant="rounded" />
        <input
          className={style.commentInput}
          type="text"
          placeholder="Tweet your reply"
        />
      </div>
    </div>
  );
}
