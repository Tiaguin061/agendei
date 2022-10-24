import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStorageKey } from "../../services/api";
import { toast } from "react-toastify";
import "./styles.scss";

export function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: `${new Date()}`,
    email: "",
    password: "",
  });

  function handleSignIn(e: any) {
    e.preventDefault();

    if (!user.email) {
      return toast("Por favor, coloque o e-mail para entrar na conta.", {
        type: "error",
        style: {
          color: "#000",
        },
      });
    }

    if (!user.password) {
      return toast("Por favor, coloque a senha para entrar na conta.", {
        type: "error",
        style: {
          color: "#000",
        },
      });
    }

    // Apenas uma simulação, mas aqui seria um envio para o backend e salvar no banco de dados. O mesmo para a locação.
    localStorage.setItem(userStorageKey, JSON.stringify(user));

    toast("Login feito com sucesso!", {
      type: "success",
      style: {
        color: "#000",
      },
    });

    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }

  return (
    <div className="login_container">
      <main>
        <form onSubmit={handleSignIn}>
          <header>
            <h2 className="logo">@gendei</h2>
            <h3>Faça login na plataforma</h3>
          </header>

          <div className="form_content">
            <div className="inputs">
              <div className="input_container">
                <label htmlFor="input_email">E-mail</label>
                <input
                  id="input_email"
                  type="text"
                  onChange={(e) =>
                    setUser((prevState) => {
                      return {
                        ...prevState,
                        email: e.target.value,
                      };
                    })
                  }
                />
              </div>

              <div className="input_container">
                <label htmlFor="input_password">Senha</label>
                <input
                  id="input_password"
                  type="password"
                  onChange={(e) =>
                    setUser((prevState) => {
                      return {
                        ...prevState,
                        password: e.target.value,
                      };
                    })
                  }
                />
              </div>
            </div>
            <button className="signIn_btn" type="submit">
              Entrar na conta
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
