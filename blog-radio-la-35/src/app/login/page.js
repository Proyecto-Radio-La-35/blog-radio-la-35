"use client";

import "./page.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [menuActive, setMenuActive] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
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
            <li><Link href="/login">Acceder</Link></li>
          </ul>
        </nav>

        <button className="menu-icon" onClick={() => setMenuActive(true)}>☰</button>
        <button className="cerrar-btn" onClick={() => setMenuActive(false)}>✕</button>
      </header>

      <main className="login-container">
        {showLogin ? (
          <div className="tarjeta">
            <h2>Iniciar sesión</h2>

            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Correo" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" placeholder="Contraseña" required value={password}  onChange={(e) => setPassword(e.target.value)}/>

              <button type="submit" className="btn">Iniciar sesión</button>
            </form>


            <p className="switch-text">
              ¿No tienes cuenta?{" "}
              <button
                className="switch-btn"
                onClick={() => setShowLogin(false)}
              >
                Registrarte
              </button>
            </p>
          </div>
        ) : (
          <div className="tarjeta">
            <h2>Crear cuenta</h2>

            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Nombre" required value={userName} onChange={(e) => setUserName(e.target.value)}/>
              <input type="email" placeholder="Correo" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)}/>

              <button type="submit" className="btn">Registrarse</button>
            </form>

            <p className="switch-text">
              ¿Ya tienes una cuenta?{" "}
              <button
                className="switch-btn"
                onClick={() => setShowLogin(true)}
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
