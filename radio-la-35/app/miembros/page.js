"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Miembros() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminFlag = localStorage.getItem("is_admin");

    if (token) setIsLoggedIn(true);
    if (adminFlag === "true") setIsAdmin(true);
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.titulo}>Miembros de Radio La 35</h1>

        <p className={styles.intro}>
          Conocé al equipo que hace posible cada programa, entrevista y
          producción de nuestra radio escolar 🎙️
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Image
              src="/guadalupe.png"
              alt="Guadalupe Cortez"
              width={200}
              height={200}
              className={styles.avatar}
            />
            <h3 className={styles.nombre}>Guadalupe Cortez</h3>
            <p className={styles.rol}>Gestora de la radio</p>
            <p className={styles.bio}>
              Profesora de Historia (UBA), con posgrado en Gestión Cultural y
              diplomatura en Geopolítica. Gestiona y coordina Radio La 35 desde
              2019.
            </p>
          </div>

          <div className={styles.card}>
            <Image
              src="/lizarraga.png"
              alt="Lizarraga"
              width={200}
              height={200}
              className={styles.avatar}
            />
            <h3 className={styles.nombre}>Lizarraga</h3>
            <p className={styles.rol}>Gestor de la radio</p>
            <p className={styles.bio}>
              Docente encargado de coordinar eventos y entrevistas, colaborando
              en el desarrollo de contenidos y producciones especiales.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}