"use client";

import "./page.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
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
    router.push("/"); // opcional: volver al inicio
  };


  return (
    <div>      
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

          </div>
  );
}
