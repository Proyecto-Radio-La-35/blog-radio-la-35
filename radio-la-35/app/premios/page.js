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

          </div>
  );
}