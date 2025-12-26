"use client";

import "./page.css";
import { useState, useEffect } from "react";

export default function Home() {
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

  return (
      <main className="contenido-principal">
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
  );
}
