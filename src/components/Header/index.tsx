import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userAuthKey } from "../../services/api";

import "./styles.scss";

export function Header() {
  const userStorage = localStorage.getItem(userAuthKey);
  const [userAuth, setUserAuth] = useState(
    userStorage ? JSON.parse(userStorage) : null
  );

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
              <Link to="/apts-agenders" className="agenders-link">
                Agendamentos marcados
              </Link>
              <button className="signOut_btn" onClick={handleSignOut}>
                Sair
              </button>
              <div>
                <span>{userAuth?.name}</span>
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
