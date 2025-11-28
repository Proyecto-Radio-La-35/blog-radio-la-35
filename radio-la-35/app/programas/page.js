"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function Programas() {
 const [menuActive, setMenuActive] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminFlag = localStorage.getItem("is_admin");
    if (token) setIsLoggedIn(true);
    if (adminFlag === "true") setIsAdmin(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("is_admin");
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/");
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
            <li><Link href="/programas">Programas</Link></li>
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
          <section className="programas-section">
            <h1>Programas de Radio La 35</h1>
            <p className="intro">
                Estos son los programas que conforman la radio. En ellos, principalmente encontrará discusión sobre noticias relevantes, temas generales e incluso entrevistas.
            </p>

            <div className="programas-grid">
              <div className="programa-card">
                <Image src="/mercurio_retrogrado.png" alt="Logo de Mercurio Retrógrado" width={200} height={200} />
                <h3>Mercurio Retrógrado</h3>
              </div>

              <div className="programa-card">
                <Image src="/cafe_latzina.png" alt="Logo de Café Latzina" width={200} height={200} />
                <h3>Café Latzina</h3>
              </div>

              <div className="programa-card">
                <Image src="/el_duna_de_la_35.png" alt="Logo de El Duna de la 35" width={200} height={200} />
                <h3>El Duna de la 35</h3>
              </div>

              <div className="programa-card">
                <Image src="/si_lo_sabe_hable.png" alt="Logo de Si Lo Sabe, Hable" width={200} height={200} />
                <h3>Si lo Sabe, Hable</h3>
              </div>
            </div>
          </section>
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
            <li><Link href="/programas">Programas</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/miembros">Miembros</Link></li>
            <li><Link href="/noticias">Noticias</Link></li>
            <li><Link href="/premios">Premios</Link></li>
            <li><Link href="/trailer">Trailer</Link></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}