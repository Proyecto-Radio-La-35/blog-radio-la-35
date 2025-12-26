"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function SobreNosotros() {
  const [menuActive, setMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Sobre nosotros</h1>

      <section className={styles.info}>
        <h2 className={styles.infoTitulo}>
          Descripción de la radio y antecedentes de trabajo
        </h2>
        <p className={styles.parrafo}>
          En septiembre de 2019, la escuela recibió una pequeña dotación de
          equipos: una consola, parlantes y micrófonos tanto unidireccionales
          como de ambiente. Distintos docentes y alumnos se reunieron en el área
          digital del establecimiento educativo el jueves 5 de septiembre a las
          18 hs, elaborando un acta inventario de todos los materiales recibidos.
          De allí surgió el interés de los jóvenes por realizar las conexiones
          necesarias para dar vida a los insumos radiales.
        </p>
      </section>

      <section className={styles.info}>
        <h2 className={styles.infoTitulo}>Espacio y presencia digital</h2>

        <p className={styles.parrafo}>
          Radio La 35 cuenta con un espacio propio dentro de la institución
          escolar. Puede escucharse a través de plataformas online como Twitch,
          Spotify, Instagram, Facebook, Discord y YouTube.
        </p>

        <p className={styles.parrafo}>
          Además, en la radio se graban podcasts de diversos temas:
        </p>

        <ul className={styles.lista}>
          <li className={styles.listaItem}>Videojuegos</li>
          <li className={styles.listaItem}>Campamento escolar Suyai</li>
          <li className={styles.listaItem}>Actividades institucionales</li>
          <li className={styles.listaItem}>
            Materias específicas, como Historia de 1er año
          </li>
        </ul>

        <p className={styles.parrafo}>
          Los principales productores del material son los alumnos y alumnas,
          mientras que los docentes participan en segundo lugar.
        </p>
      </section>

      <section className={styles.info}>
        <h2 className={styles.infoTitulo}>
          Cobertura de eventos escolares
        </h2>

        <p className={styles.parrafo}>
          Otra de las actividades importantes de la radio es la cobertura de
          eventos escolares, realizada en 2019 y 2022.
        </p>

        <p className={styles.parrafo}>Se han cubierto jornadas como:</p>

        <ul className={styles.lista}>
          <li className={styles.listaItem}>Día de la Educación Técnica</li>
          <li className={styles.listaItem}>Día del Estudiante</li>
          <li className={styles.listaItem}>Actos escolares</li>
          <li className={styles.listaItem}>
            Eventos de la especialidad de Automotor
          </li>
        </ul>

        <p className={styles.parrafo}>
          En julio de 2022, la radio cubrió el evento Entropía, donde los
          estudiantes entrevistaron a importantes autoridades ministeriales.
        </p>
      </section>

      <section className={styles.info}>
        <h2 className={styles.infoTitulo}>La institución escolar</h2>

        <p className={styles.parrafo}>
          El establecimiento educativo se destaca por su nivel académico y su
          trayectoria reconocida dentro del barrio Villa Real.
        </p>

        <p className={styles.parrafo}>
          La participación de las familias es muy alta, generando una gran
          comunidad educativa.
        </p>
      </section>
    </main>
  );
}