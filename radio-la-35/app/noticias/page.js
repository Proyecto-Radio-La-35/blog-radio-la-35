"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminFlag = localStorage.getItem("is_admin");
    if (token) setIsLoggedIn(true);
    if (adminFlag === "true") setIsAdmin(true);
  }, []);

  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = async () => {
    try {
      const res = await fetch(`${API_URL}/contenido?tipo=noticia`);
      const data = await res.json();

      if (res.ok) {
        setNoticias(data.data || []);
      } else {
        setError("Error al cargar las noticias");
      }
    } catch (err) {
      console.error("Error al cargar noticias:", err);
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className={styles.contenedor}>
      <h1 className={styles.titulo}>Noticias</h1>

      {isLoading ? (
        <div className={styles.mensaje}>Cargando noticias...</div>
      ) : error ? (
        <div className={`${styles.message} ${styles.error}`}>{error}</div>
      ) : noticias.length === 0 ? (
        <div className={`${styles.message} ${styles.empty}`}>
          No hay noticias publicadas todavía.
        </div>
      ) : (
        <div className={styles.grid}>
          {noticias.map((noticia) => (
            <article key={noticia.id_publicacion} className={styles.card}>
              <div className={styles.imagenCard}>
                <Image
                  src={noticia.imagen || "/radio_la_35.png"}
                  alt={noticia.titulo}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.contenidoCard}>
                <h2 className={styles.tituloCard}>{noticia.titulo}</h2>
                <p className={styles.fechaCard}>
                  {formatearFecha(noticia.created_at)}
                </p>
                <p className={styles.cardText}>
                  {noticia.contenido.length > 150
                    ? noticia.contenido.substring(0, 150) + "..."
                    : noticia.contenido}
                </p>
                <Link
                  href={`/noticias/${noticia.id_publicacion}`}
                  className={styles.enlaceCard}
                >
                  Leer más →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}