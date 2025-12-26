"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Programas() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminFlag = localStorage.getItem("is_admin");
    if (token) setIsLoggedIn(true);
    if (adminFlag === "true") setIsAdmin(true);
  }, []);

  const programas = [
    { titulo: "Mercurio Retrógrado", img: "/mercurio_retrogrado.png" },
    { titulo: "Café Latzina", img: "/cafe_latzina.png" },
    { titulo: "El Duna de la 35", img: "/el_duna_de_la_35.png" },
    { titulo: "Si lo Sabe, Hable", img: "/si_lo_sabe_hable.png" },
  ];

  return (
    <main className={styles.contenedor}>
      <h1 className={styles.titulo}>Programas de Radio La 35</h1>
      <p className={styles.intro}>
        Estos son los programas que conforman la radio. En ellos, principalmente encontrará discusión sobre noticias relevantes, temas generales e incluso entrevistas.
      </p>

      <div className={styles.programasGrid}>
        {programas.map((programa) => (
          <div key={programa.titulo} className={styles.programaCard}>
            <Image
              src={programa.img}
              alt={`Logo de ${programa.titulo}`}
              width={200}
              height={200}
            />
            <h3>{programa.titulo}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}