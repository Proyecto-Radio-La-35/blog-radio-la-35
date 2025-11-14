"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function Premios() {
    const [menuActive, setMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
    };

  return (
    <div>
      <header className="header">
        <Link href="/">
          <Image
            src="/radio_la_35.png"
            alt="Radio La 35"
            className="logo"
            width={70}
            height={70}
          />
        </Link>

        <nav className={`nav ${menuActive ? "active" : ""}`} id="menu">
          <ul>
            <li><Link href="/sobrenosotros">Sobre nosotros</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><a href="#">Historia</a></li>
            <li><Link href="/miembros">Miembros</Link></li>
            <li><Link href="/premios">Premios</Link></li>
            <li><a href="#">Programas</a></li>
            <li><Link href="/noticias">Noticias</Link></li>
            <li><Link href="/trailer">Trailer</Link></li>
            <li><Link href="/eventos">Eventos</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>

            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <li><Link href="/login">Acceder</Link></li>
            )}
          </ul>
        </nav>

        <button className="menu-icon" onClick={() => setMenuActive(true)}>☰</button>
        <button className="cerrar-btn" onClick={() => setMenuActive(false)}>✕</button>
      </header>

      <main className="contenido">
        <h1>Premios</h1>
        
 
         <p>
            En el 2020, obtuvimos una honorosa mención en los premio Pied por innovación tecnológica educativa a través de los podcast que realizaron los estudiantes durante todo ese año, fue una recompensa a todo el esfuerzo que se estaba haciendo.
          </p>
          <p>
            Pero no nos quedamos ahí, ya que años despues, el esfuerzo de todo el equipo volvió a rendir sus frutos.
          </p>
          <br/>
          <p>
            En el 2023 la radio obtuvo el monto de Cooperar en Comunidad, con ese dinero se compró un trailer a reparar para poder alojar en un futuro el equipamiento para transmitir desde ahí. A lo largo de ese año, la Radio continuó con nuevas programaciones y renovando sus equipos. Participando en distintas ferias distritales, actividades escolares y la Expo Automotor.
          </p>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <Image
            src="/radio_la_35.png"
            alt="Radio La 35"
            className="logo"
            width={70}
            height={70}
          />
          <div className="redes">
            <a href="https://www.facebook.com/Radiola35/">
              <Image src="/facebook.png" alt="Facebook" width={28} height={28} />
            </a>
            <a href="https://open.spotify.com/show/0Ocey29aAxzIZ7ml3jzVVQ">
              <Image src="/spotify.png" alt="Spotify" width={28} height={28} />
            </a>
            <a href="https://www.instagram.com/radiola35/">
              <Image src="/instagram.png" alt="Instagram" width={28} height={28} />
            </a>
            <a href="https://x.com/radiola35">
              <Image src="/twitter.png" alt="Twitter" width={28} height={28} />
            </a>
            <a href="https://www.youtube.com/channel/UCOH9BIW2C-04nOBjE08zDUw">
              <Image src="/youtube.png" alt="YouTube" width={41} height={28} />
            </a>
          </div>
        </div>
        <nav className="footer-nav">
          <ul>
            <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/eventos">Eventos</Link></li>
            <li><a href="#">Historia</a></li>
            <li><a href="#">Programas</a></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><a href="#">Miembros</a></li>
            <li><Link href="/noticias">Noticias</Link></li>
            <li><Link href="/premios">Premios</Link></li>
            <li><Link href="/trailer">Trailer</Link></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}