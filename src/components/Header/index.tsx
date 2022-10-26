import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userAuthKey } from "../../services/api";

import "./styles.scss";

export function Header() {
  const [userAuth, setUserAuth] = useState(localStorage.getItem(userAuthKey));

  useEffect(() => {
    if (userAuth) {
      setUserAuth(JSON.parse(userAuth));
    } else {
      setUserAuth(null);
    }
  }, []);

  async function handleSignOut() {
    localStorage.removeItem(userAuthKey);

    toast("Você saiu da sua conta", {
      type: "info",
      style: {
        color: "#000",
      },
    });

    setUserAuth(null);
  }

  return (
    <>
      <header className="header_container">
        <h1 className="logo">@gendei</h1>
        <div className="header_content">
          {userAuth ? (
            <div className="logged_container">
              <button className="signOut_btn" onClick={handleSignOut}>
                Sair
              </button>
              <div>
                <span>tiaguin</span>
              </div>
            </div>
          ) : (
            <div className="noLogged_container">
              <Link to="/login">Entrar</Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
