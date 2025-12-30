"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Blog() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [entradas, setEntradas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminFlag = localStorage.getItem("is_admin");
    if (token) setIsLoggedIn(true);
    if (adminFlag === "true") setIsAdmin(true);
  }, []);

  useEffect(() => {
    cargarEntradas();
  }, []);

  const cargarEntradas = async () => {
    try {
      const res = await fetch(`${API_URL}/contenido?tipo=entrada`);
      const data = await res.json();

      if (res.ok) {
        setEntradas(data.data || []);
      } else {
        setError("Error al cargar las entradas");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Blog</h1>

      {isLoading ? (
        <div className={styles.mensajeCarga}>Cargando entradas...</div>
      ) : error ? (
        <div className={`${styles.centerMessage} ${styles.error}`}>
          {error}
        </div>
      ) : entradas.length === 0 ? (
        <div className={`${styles.mensajeCarga} ${styles.vacio}`}>
          No hay entradas de blog publicadas todavía.
        </div>
      ) : (
        <div className={styles.grid}>
          {entradas.map((entrada) => (
            <article key={entrada.id_publicacion} className={styles.card}>
              <div className={styles.wrapperImagen}>
                <Image
                  src={entrada.imagen || "/radio_la_35.png"}
                  className={styles.imagenEntrada}
                  alt={entrada.titulo}
                  fill
                />
              </div>

              <div className={styles.contenido}>
                <h2 className={styles.tituloCard}>{entrada.titulo}</h2>

                <p className={styles.fecha}>
                  {formatearFecha(entrada.created_at)}
                </p>

                <p className={styles.texto}>
                  {entrada.contenido.length > 150
                    ? entrada.contenido.substring(0, 150) + "..."
                    : entrada.contenido}
                </p>

                <Link
                  href={`/blog/${entrada.id_publicacion}`}
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