"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function Miembros() {
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
          <section className="miembros-section">
            <h1>Miembros de Radio La 35</h1>
            <p className="intro">
              Conocé al equipo que hace posible cada programa, entrevista y producción
              de nuestra radio escolar 🎙️
            </p>

            <div className="miembros-grid">
              {/* === Placeholders de miembros === */}
              {/* <div className="miembro-card">
                <Image src="/placeholder_persona.png" alt="Miembro" width={150} height={150} />
                <h3>Nombre Apellido</h3>
                <p className="rol">Locutor/a principal</p>
                <p className="desc">
                  Apasionado por la música y la comunicación. Conduce el programa “La Mañana en La 35”.
                </p>
              </div> */}

              <div className="miembro-card">
                <Image src="/guadalupe.png" alt="Miembro" width={200} height={200} />
                <h3>Guadalupe Cortez</h3>
                <p className="rol">Gestora de la radio</p>
                <p className="desc">
                  Es Profesora de Enseñanza Media y Superior en Historia, egresada de la UBA. También estudia Astrología en Casa XI. Tiene un posgrado en Gestión Cultural y Políticas Culturales (Unsam IDAES) y una diplomatura en geopolítica por la Universidad de Ciencias Sociales (UBA). Gestiona y coordina Radio La 35 con regularidad desde el 2019
                </p>
              </div>

              <div className="miembro-card">
                <Image src="/lizarraga.png" alt="Miembro" width={200} height={200} />
                <h3>Lizarraga</h3>
                <p className="rol">Gestor de la radio</p>
                <p className="desc">
                  Docente encargado de la coordinación de distintos eventos y entrevistas involucrando a la radio. También colaboró en el desarrollo del trailer de la radio, además de supervisar y ayudar en algunos episodios.
                </p>
              </div>

              {/* <div className="miembro-card">
                <Image src="/placeholder_persona.png" alt="Miembro" width={150} height={150} />
                <h3>Nombre Apellido</h3>
                <p className="rol">Editor/a</p>
                <p className="desc">
                  Edita los clips y videos para redes sociales, manteniendo el estilo de la radio.
                </p>
              </div> */}
            </div>
          </section>
      </main>

          </div>
  );
}