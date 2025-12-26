"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function PublicacionDetalle() {
  const router = useRouter();
  const { id } = router.query;

  const [publicacion, setPublicacion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Función para obtener los datos de la publicación
  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    } // No hace nada si el id aún no está disponible

    const fetchPublicacion = async () => {
      try {
        const res = await fetch(`${API_URL}/contenido/${id}`);
        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.error || "No se pudo cargar la publicación.");
          return;
        }

        setPublicacion(data.data);
      } catch {
        setError("Error de conexión al servidor.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicacion();
  }, [id, API_URL]); // Se ejecuta cuando el ID cambie

  if (isLoading) {
    return (
      <div className={styles.contenedorCargando}>
        Cargando contenido...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.contenedorError}>
        <p className={styles.textoError}>
          Error al cargar: {error}
        </p>
        <Link href="/" className={styles.botonVolver}>
          Volver al Inicio
        </Link>
      </div>
    );
  }

  if (!publicacion) {
    return (
      <div className={styles.contenedorError}>
        <p className={styles.textoAdvertencia}>
          Publicación no encontrada.
        </p>
        <Link href="/" className={styles.botonVolver}>
          Volver al Inicio
        </Link>
      </div>
    );
  }

  // Formatear la fecha
  const fechaCreacion = new Date(publicacion.created_at).toLocaleDateString(
    "es-ES",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.enlaceVolver}>
        ← Volver al listado
      </Link>

      <article className={styles.articulo}>
        <p className={styles.tipo}>{publicacion.tipo}</p>

        <h1 className={styles.titulo}>
          {publicacion.titulo}
        </h1>

        <p className={styles.meta}>
          Publicado el {fechaCreacion} por {publicacion.autor_email}
        </p>

        {publicacion.imagen && (
          <div className={styles.contenedorImagen}>
            <Image
              src={publicacion.imagen}
              alt={publicacion.titulo}
              width={800}
              height={450}
              className={styles.imagen}
            />
          </div>
        )}

        <div className={styles.contenido}>
          <p className={styles.textoContenido}>
            {publicacion.contenido}
          </p>
        </div>
      </article>
    </main>
  );
}