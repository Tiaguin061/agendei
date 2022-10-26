import { Header } from "../../components/Header";
import { apts } from "../../services/api";
import "./styles.scss";

export function HomePage() {
  return (
    <div className="home_container">
      <Header />
      <div className="content">
        <div className="top_content">
          <h2 className="logo">@gendei</h2>

          <div className="inside_top_content">
            <p>Encontre seu imóvel e agende uma visita em poucos cliques.</p>

            <a href="#apts_agender_container" className="agender_btn">
              Agende Agora
            </a>
          </div>
        </div>
      </div>

      <main id="apts_agender_container">
        <header className="apts_header">
          <h2>Locação</h2>
          <p>Visualize nossas ofertas de imóveis</p>
        </header>

        <div className="apts_container">
          {apts.map((apt) => (
            <div className="apt" key={`${apt.id}-index`}>
              <img src={apt.image} alt={`A apt ${apt.image}`} />
              <a href={`/apt/${apt.id}`} className="agender_btn">
                Agendar
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
