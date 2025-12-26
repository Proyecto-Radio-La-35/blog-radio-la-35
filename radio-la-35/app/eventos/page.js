"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const res = await fetch(`${API_URL}/contenido?tipo=evento`);
      const data = await res.json();

      if (res.ok) {
        setEventos(data.data || []);
      } else {
        setError("Error al cargar los eventos");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className={styles.contenedor}>
      <h1 className={styles.titulo}>Eventos</h1>

      {isLoading ? (
        <div className={styles.mensajeCentral}>Cargando eventos...</div>
      ) : error ? (
        <div className={`${styles.centerMessage} ${styles.error}`}>
          {error}
        </div>
      ) : eventos.length === 0 ? (
        <div className={`${styles.centerMessage} ${styles.empty}`}>
          No hay eventos publicados todavía.
        </div>
      ) : (
        <div className={styles.grid}>
          {eventos.map((evento) => (
            <article key={evento.id_publicacion} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={evento.imagen || "/radio_la_35.png"}
                  alt={evento.titulo}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.contenido}>
                <h2 className={styles.tituloCard}>{evento.titulo}</h2>

                <p className={styles.fecha}>
                  {formatearFecha(evento.created_at)}
                </p>

                <p className={styles.texto}>
                  {evento.contenido.length > 150
                    ? evento.contenido.slice(0, 150) + "..."
                    : evento.contenido}
                </p>

                <Link
                  href={`/eventos/${evento.id_publicacion}`}
                  className={styles.leerMas}
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