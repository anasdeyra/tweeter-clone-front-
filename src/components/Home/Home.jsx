import React, { useContext } from "react";
import { AuthContext } from "../../contextes/AuthContext";
import { Redirect } from "react-router";
import CreateTweet from "../Tweet/CreateTweet";
import style from "./style.module.css";

export default function Home() {
  const Auth = useContext(AuthContext);

  if (!Auth.user) {
    return <Redirect to="login" />;
  } else {
    return (
      <>
        {Auth.user && (
          <div className={style.homeContainer}>
            <div className={style.homeFeed}>
              <CreateTweet />
            </div>
            <div className={style.homeSuggestions}></div>
          </div>
        )}
      </>
    );
  }
}
