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

          </div>
  );
}