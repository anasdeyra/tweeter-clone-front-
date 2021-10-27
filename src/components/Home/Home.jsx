import React, { useContext } from "react";
import { AuthContext } from "../../contextes/AuthContext";
import { Redirect } from "react-router";
import { logout } from "../auth/auth";

export default function Home() {
  const Auth = useContext(AuthContext);
  function clickHandler() {
    logout(Auth);
  }

  if (!Auth.user) {
    return <Redirect to="login" />;
  } else {
    return (
      <div id="Profile">
        {Auth.user && (
          <>
            <h3
              style={{
                color: "red",
                textAlign: "center",
                background: "black",
                margin: 0,
                minHeight: "500px",
              }}
            >
              {JSON.stringify(Auth.user.userId)}
            </h3>
            <button onClick={() => clickHandler(Auth)} className="pr">
              Lougout
            </button>
          </>
        )}
      </div>
    );
  }
}
