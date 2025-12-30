"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import Link from "next/link";
import Image from "next/image";

import styles from "./page.module.css";

// Componente para manejar la visualización de un contenido individual
export default function PublicacionDetalle() {
  // Usar useParams para acceder a la ID en el App Router
  const params = useParams();
  const id = params.id; // La ID se llama 'id' por el nombre de la carpeta [id]
  
  const [publicacion, setPublicacion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL; 
  
  // Hook para cargar los datos de la publicación
  useEffect(() => {
    // Si la ID no está disponible (por ejemplo en el primer render), sale.
    if (!id) {
      setIsLoading(false);
      return; 
    } 

    const fetchPublicacion = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/contenido/${id}`);
        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.error || "No se pudo cargar la publicación.");
          setPublicacion(null);
          return;
        }

        setPublicacion(data.data);
      } catch (err) {
        setError("Error de conexión al servidor.");
        console.error("Error al cargar publicación:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicacion();
  }, [id, API_URL]); // Se ejecuta cada vez que el ID o la URL de la API cambien
  
  // ... (Resto del código de renderizado (getTipoLabel, formatearFecha, if(isLoading), etc.))
  
  const getTipoLabel = (tipo) => {
    switch(tipo) {
      case "noticia": return "Noticia";
      case "entrada": return "Entrada de Blog";
      case "evento": return "Evento";
      default: return "Contenido";
    }
  };
  
  const formatearFecha = (fecha) => {
    if (!fecha) return 'Fecha desconocida';
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (isLoading) {
    return <div className={styles.mensajeCarga}>Cargando contenido...</div>;
  }

  if (error || !publicacion) {
    const mensaje = error || "Publicación no encontrada o ID inválido.";
      
    return (
      <div className={styles.contenedorError}>
        <p className={styles.error}>{mensaje}</p>
        <Link href="/noticias" className={styles.botonVolver}>
          Volver a Noticias
        </Link>
      </div>
    );
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.contenedorVolver}>
        <Link href="/noticias" className={styles.enlaceVolver}>
          ← Volver al listado
        </Link>
      </div>

      <article className={styles.articulo}>
        <p className={styles.tipo}>{getTipoLabel(publicacion.tipo)}</p>
        <h1 className={styles.titulo}>{publicacion.titulo}</h1>
        <p className={styles.meta}>
          Publicado el {formatearFecha(publicacion.created_at)} por{" "}
          <strong>{publicacion.nombre_usuario}</strong>
        </p>

        {publicacion.imagen && (
          <div className={styles.wrapperImagen}>
            <Image 
              src={publicacion.imagen} 
              alt={publicacion.titulo} 
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className={styles.imagen}
            />
          </div>
        )}

        <div className={styles.contenido}>
          <p>{publicacion.contenido}</p>
        </div>
      </article>
    </main>
  );
}