"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function Trailer() {
    const [menuActive, setMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem("access_token");
        if (token) setIsLoggedIn(true);
    }, []);

    if (!mounted) {
        return null;
    }

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
            <li><a href="#">Miembros</a></li>
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
        <h1>Tráiler</h1>

        <p>
          En el 2023 la radio obtuvo el monto de Cooperar en Comunidad, con ese dinero se compró un tráiler a reparar para poder alojar en un futuro el equipamiento para transmitir desde ahí. A lo largo de ese año, la Radio continuó con nuevas programaciones y renovando sus equipos. Participando en distintas ferias distritales, actividades escolares y la Expo Automotor.
        </p>

        <p>
          Durante 2024, se enlazó con el Taller de la escuela para la reparación y acondicionamiento del tráiler adquirido desarrollando distintas jornadas conjuntas de trabajo entre la radio, el taller y la cooperadora (continúa en el siguiente apartado). Asimismo, a lo largo del año continuaron renovandose la programación con nuevos equipos y ya habituales estudiantes participes de la radio. También, la radio participó de la actividad escolar por el Día del Estudiante trasmitiendo en vivo durante toda la jornada y como ya es habitual, participó de la Expo Automotor y entre otras iniciativas escolares y distritales.
        </p>

        <h2 style={{ textAlign: "center", fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>Enlace con Taller</h2>

        <p>
          A partir de la compra del tráiler se estableció un cronograma de trabajo para poder reacondicionar y embellecer el carromato. Con ayuda de dos docentes de taller se planificaron encuentros de trabajo, principalmente de soldadura.
        </p>

        <p>
          En una experiencia enriquecedora, distintos miembros de la comunidad, docentes, estudiantes y miembros de la cooperadora trabajaron cooperativamente y de manera desinteresada en la reparación del tráiler adquirido en encuentros pactados para los días miércoles.
        </p>

        <p>
          Los materiales utilizados fueron por cuenta de la Cooperadora. En este momento, nos encontramos con la necesidad de percibir nuevos fondos para poder continuar con los arreglos y acelerar el acondicionamiento final del espacio móvil radial.
        </p>
        
        <p style={{ marginTop: "30px", color: "#f9f8f8ff" }}>
          A continuación se muestran imágenes tomadas durante la construcción del tráiler:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "30px" }}>
          <Image src="/trailer1.png" alt="Trailer 1" width={400} height={300} style={{ width: "100%", height: "auto" }} />
          <Image src="/trailer2.png" alt="Trailer 2" width={400} height={300} style={{ width: "100%", height: "auto" }} />
          <Image src="/trailer3.png" alt="Trailer 3" width={400} height={200} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
          <Image src="/trailer4.png" alt="Trailer 4" width={400} height={200} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
        </div>
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