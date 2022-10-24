import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { apts, aptsAgendersStorageKey } from "../../services/api";

import "./styles.scss";

export function UniqueApartmentPage() {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;
  const foundApt = apts.find((where) => where.id === id);

  useEffect(() => {
    if (!foundApt) {
      navigate("/");
    }
  }, []);

  const [aptAgender, setAptAgender] = useState({
    id: foundApt?.id,
    date: "",
    hour: "",
  });

  function agenderApt(e: any) {
    e.preventDefault();

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

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div className="unique_apt_container">
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
  );
}
