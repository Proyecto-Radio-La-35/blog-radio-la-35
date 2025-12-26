"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Trailer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("access_token");
    if (token) setIsLoggedIn(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Tráiler</h1>

      <p className={styles.parrafo}>
        En el 2023 la radio obtuvo el monto de Cooperar en Comunidad, con ese
        dinero se compró un tráiler a reparar para poder alojar en un futuro el
        equipamiento para transmitir desde ahí. A lo largo de ese año, la Radio
        continuó con nuevas programaciones y renovando sus equipos.
      </p>

      <p className={styles.parrafo}>
        Durante 2024, se enlazó con el Taller de la escuela para la reparación y
        acondicionamiento del tráiler adquirido desarrollando distintas jornadas
        conjuntas de trabajo entre la radio, el taller y la cooperadora.
      </p>

      <h2 className={styles.subtitulo}>Enlace con Taller</h2>

      <p className={styles.parrafo}>
        A partir de la compra del tráiler se estableció un cronograma de trabajo
        para poder reacondicionar y embellecer el carromato.
      </p>

      <p className={styles.parrafo}>
        Distintos miembros de la comunidad trabajaron cooperativamente en la
        reparación del tráiler adquirido en encuentros semanales.
      </p>

      <p className={styles.parrafo}>
        Actualmente se necesitan nuevos fondos para continuar con los arreglos
        y acelerar el acondicionamiento final del espacio móvil radial.
      </p>

      <p className={styles.parrafoImagenes}>
        A continuación se muestran imágenes tomadas durante la construcción del
        tráiler:
      </p>

      <div className={styles.galeria}>
        <Image
          src="/trailer1.png"
          alt="Trailer 1"
          width={400}
          height={300}
          className={styles.imagen}
        />
        <Image
          src="/trailer2.png"
          alt="Trailer 2"
          width={400}
          height={300}
          className={styles.imagen}
        />
        <Image
          src="/trailer3.png"
          alt="Trailer 3"
          width={400}
          height={200}
          className={styles.imagenAlta}
        />
        <Image
          src="/trailer4.png"
          alt="Trailer 4"
          width={400}
          height={200}
          className={styles.imagenAlta}
        />
      </div>
    </main>
  );
}