import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usersListStorageKey } from "../../services/api";
import "./styles.scss";

export function RegisterUserPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: `${new Date()}`,
    email: "",
    password: "",
    name: "",
  });

  function handleSignUp(e: any) {
    e.preventDefault();

    if (!user.email) {
      return toast("Por favor, coloque o e-mail para criar a conta.", {
        type: "error",
        style: {
          color: "#000",
        },
      });
    }

    if (!user.name) {
      return toast("Por favor, coloque o nome para criar a conta.", {
        type: "error",
        style: {
          color: "#000",
        },
      });
    }

    if (!user.password) {
      return toast("Por favor, coloque a senha para criar a conta.", {
        type: "error",
        style: {
          color: "#000",
        },
      });
    }

    // Apenas uma simulação, mas aqui seria um envio para o backend e salvar no banco de dados. O mesmo para a locação.

    const users = localStorage.getItem(usersListStorageKey);

    let usersList = [];

    if (!users) {
      usersList = [user];
    } else {
      usersList = [...JSON.parse(users)];

      const userExist = usersList.find((where) => where.email === user.email);

      if (userExist) {
        return toast("Usuário com este e-mail já existe.", {
          type: "error",
          style: {
            color: "#000",
          },
        });
      }

      usersList = [...JSON.parse(users), user];
    }

    localStorage.setItem(usersListStorageKey, JSON.stringify(usersList));

    toast("Criação de conta feito com sucesso!", {
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
        <form onSubmit={handleSignUp}>
          <header>
            <h2 className="logo">@gendei</h2>
            <h3>Crie uma conta na plataforma</h3>
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
                <label htmlFor="input_name">Nome</label>
                <input
                  id="input_name"
                  type="text"
                  onChange={(e) =>
                    setUser((prevState) => {
                      return {
                        ...prevState,
                        name: e.target.value,
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
            <button className="SignUp_btn" type="submit">
              Criar conta
            </button>
            <p className="redirect_to_register">
              Já possuí uma conta?
              <Link to="/login">Entre agora mesmo</Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
