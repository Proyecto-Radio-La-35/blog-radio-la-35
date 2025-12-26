"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Premios() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <main className={styles.contenedor}>
      <h1 className={styles.titulo}>Premios</h1>

      <div className={styles.info}>
        <p className={styles.textoInfo}>
          En el 2020, obtuvimos una honorosa mención en los premios Pied por innovación tecnológica educativa a través de los podcast que realizaron los estudiantes durante todo ese año, fue una recompensa a todo el esfuerzo que se estaba haciendo.
        </p>
        <p className={styles.textoInfo}>
          Pero no nos quedamos ahí, ya que años después, el esfuerzo de todo el equipo volvió a rendir sus frutos.
        </p>
        <p className={styles.textoInfo}>
          En el 2023 la radio obtuvo el monto de Cooperar en Comunidad, con ese dinero se compró un trailer a reparar para poder alojar en un futuro el equipamiento para transmitir desde ahí. A lo largo de ese año, la Radio continuó con nuevas programaciones y renovando sus equipos. Participando en distintas ferias distritales, actividades escolares y la Expo Automotor.
        </p>
      </div>
    </main>
  );
}