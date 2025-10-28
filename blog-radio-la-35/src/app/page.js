"use client";

import "./page.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div>
      <header className="header">
        <Link href="/"><Image src="/radio_la_35.png" alt="Radio La 35" className="logo" width={70} height={70} /></Link>

        <nav className={`nav ${menuActive ? "active" : ""}`} id="menu">
          <ul>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Historia</a></li>
            <li><a href="#">Miembros</a></li>
            <li><a href="#">Premios</a></li>
            <li><a href="#">Programas</a></li>
            <li><a href="#">Noticias</a></li>
            <li><a href="#">Trailer</a></li>
            <li><a href="#">Eventos</a></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </nav>

        <button className="menu-icon" id="menu-btn" onClick={() => setMenuActive(true)}>☰</button>
        <button className="cerrar-btn" id="cerrar-btn" onClick={() => setMenuActive(false)}>✕</button>
      </header>

      <main className="contenido">
        <section className="blog">
          <div className="bloque"></div>
          <h2>Blog</h2>
          <div className="bloque"></div>
        </section>

        <section className="programas">
          <h2>Programas</h2>
          <div className="bloques">
            <div className="bloque"></div>
            <div className="bloque"></div>
            <div className="bloque"></div>
          </div>
        </section>

        <section className="unirte">
          <h2>¿Quieres unirte?</h2>
          <p>

          </p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <Image src="/radio_la_35.png" alt="Radio La 35" className="logo" width={70} height={70} />
          <div className="redes">
            <a href="https://www.facebook.com/Radiola35/"><Image src="/facebook.png" alt="Facebook" width={28} height={28} /></a>
            <a href="https://open.spotify.com/show/0Ocey29aAxzIZ7ml3jzVVQ"><Image src="/spotify.png" alt="Spotify" width={28} height={28} /></a>
            <a href="https://www.instagram.com/radiola35/"><Image src="/instagram.png" alt="Instagram" width={28} height={28} /></a>
            <a href="https://x.com/radiola35"><Image src="/twitter.png" alt="Twitter" width={28} height={28} /></a>
            <a href="https://www.youtube.com/channel/UCOH9BIW2C-04nOBjE08zDUw"><Image src="/youtube.png" alt="YouTube" width={41} height={28} /></a>
          </div>
        </div>

        <nav className="footer-nav">
          <ul>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Eventos</a></li>
            <li><a href="#">Historia</a></li>
            <li><a href="#">Programas</a></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><a href="#">Miembros</a></li>
            <li><a href="#">Noticias</a></li>
            <li><a href="#">Premios</a></li>
            <li><a href="#">Trailer</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}
