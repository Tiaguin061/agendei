import { useEffect, useState } from "react";
import emailJs from "emailjs-com";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";

import { apts, aptsAgendersStorageKey, userAuthKey } from "../../services/api";

import "./styles.scss";

export function UniqueApartmentPage() {
  const params = useParams();
  const navigate = useNavigate();

  const userStorage = localStorage.getItem(userAuthKey);
  const [userAuth, setUserAuth] = useState(
    userStorage ? JSON.parse(userStorage) : null
  );

  const id = params.id;
  const foundApt = apts.find((where) => where.id === id);

  useEffect(() => {
    if (!foundApt) {
      navigate("/home");
    }
  }, []);

  const [aptAgender, setAptAgender] = useState({
    ...foundApt,
    date: "",
    hour: "",
  });

  async function agenderApt(e: any) {
    e.preventDefault();

    if (!userAuth) {
      return toast("Entre em sua conta para poder agendar uma visita", {
        type: "info",
        style: {
          color: "#000",
        },
      });
    }

    if (!aptAgender.date) {
      return toast("Por favor, coloque a data para agendar.", {
        type: "info",
        style: {
          color: "#000",
        },
      });
    }

    if (!aptAgender.hour) {
      return toast("Por favor, coloque a hora para agendar.", {
        type: "info",
        style: {
          color: "#000",
        },
      });
    }

    const agendersStorage = localStorage.getItem(aptsAgendersStorageKey);

    let aptsData = [];

    if (!agendersStorage) {
      aptsData = [aptAgender];
    } else {
      aptsData = [...JSON.parse(agendersStorage), aptAgender];
    }

    localStorage.setItem(aptsAgendersStorageKey, JSON.stringify(aptsData));

    toast("Agendamento criado com sucesso!", {
      type: "success",
      style: {
        color: "#000",
      },
    });

    const emailJsServiceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailJsTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailJsUserID = import.meta.env.VITE_EMAILJS_USER_ID;

    if (userAuth && emailJsServiceID && emailJsTemplateID && emailJsUserID) {
      await emailJs.send(
        emailJsServiceID,
        emailJsTemplateID,
        {
          assunto: "Agendamento concluído",
          name: userAuth.name,
          to: userAuth.email,
          message: `Estamos enviando este e-mail para que você saiba que foi agendado a visita dia ${aptAgender.date} às ${aptAgender.hour}`,
          from_name: "@gendei",
        },
        emailJsUserID
      );

      toast(`Um e-mail foi enviado para ${userAuth.email}`, {
        type: "success",
        style: {
          color: "#000",
        },
      });
    }

    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }

  return (
    <div className="unique_apt_container">
      <Header />
      <div className="unique_apt_content">
        <main id="apts_agender_container">
          <header className="apts_header">
            <div className="go_back">
              <Link to="/home">&larr; Tela inicial</Link>
            </div>
            <h2>Agendar</h2>
            <p>Agende sua visita agora mesmo</p>
          </header>

          <div className="apts_container">
            <form className="apt" onSubmit={agenderApt}>
              <img src={foundApt?.image} alt={`A apt ${foundApt?.image}`} />

              <div className="inputs">
                <div className="input_container">
                  <label htmlFor="input_date">Escolher data</label>
                  <input
                    id="input_date"
                    type="date"
                    onChange={(e) =>
                      setAptAgender((prevState) => {
                        return {
                          ...prevState,
                          date: e.target.value,
                        };
                      })
                    }
                  />
                </div>

                <div className="input_container">
                  <label htmlFor="input_time">Escolher hora</label>
                  <input
                    id="input_time"
                    type="time"
                    onChange={(e) =>
                      setAptAgender((prevState) => {
                        return {
                          ...prevState,
                          hour: e.target.value,
                        };
                      })
                    }
                  />
                </div>
              </div>
              <button className="agender_btn" type="submit">
                Agendar
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
