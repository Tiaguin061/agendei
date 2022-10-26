import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { apts, aptsAgendersStorageKey } from "../../services/api";

import "./styles.scss";

interface Apt {
  image: string;
  id: string;
  hour: string;
  date: string;
}

export function ListAptsAgendersPage() {
  const aptsStorage = localStorage.getItem(aptsAgendersStorageKey);

  const [aptsAgenders, setAptsAgenders] = useState<Apt[] | null>(null);

  useEffect(() => {
    const storage = aptsStorage ? (JSON.parse(aptsStorage) as Apt[]) : null;
    if (storage) {
      setAptsAgenders(storage);
    }
  }, []);

  return (
    <div className="unique_apt_container">
      <Header />
      <main id="list_apts_container">
        <header className="apts_header">
          <div className="go_back">
            <Link to="/home">&larr; Tela inicial</Link>
          </div>
          <h2>Agendamentos marcados ({aptsAgenders?.length})</h2>
        </header>

        <div className="apts_container">
          {aptsAgenders &&
            aptsAgenders.map((apt) => (
              <div className="apt" key={`${apt.id}-index`}>
                <img src={apt.image} alt={`A apt ${apt.image}`} />
                <h3 className="agender_text">Agendado para:</h3>
                <div className="apt_info_content">
                  <div className="apt_info">
                    <strong>Hora</strong>
                    <span>{apt.hour}</span>
                  </div>
                  <div className="apt_info">
                    <strong>Data</strong>
                    <span>
                      {new Date(apt.date).toLocaleDateString("pt-br", {})}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
