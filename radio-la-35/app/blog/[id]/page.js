"use client";

import { useState, useEffect } from "react";
// Importar useParams de next/navigation para el App Router
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
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [enviandoComentario, setEnviandoComentario] = useState(false);
  const [errorComentario, setErrorComentario] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL; 
  
  // Hook para cargar los datos de la publicación
  useEffect(() => {
    // Si la ID no está disponible (ej. en el primer render, aunque con useParams es menos común), sal.
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

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setUsuario({ token });
    }
  }, []);

  useEffect(() => {
    if (!id || !publicacion || publicacion.tipo !== "entrada") {
      return;
    }

    const fetchComentarios = async () => {
      try {
        const res = await fetch(`${API_URL}/contenido/${id}/comentarios`);
        const data = await res.json();

        if (res.ok && data.success) {
          setComentarios(data.data);
        }
      } catch (err) {
        console.error("Error al cargar comentarios:", err);
      }
    };

    fetchComentarios();
  }, [id, publicacion, API_URL]);
  
  // ... (Resto del código de renderizado (getTipoLabel, formatearFecha, if(isLoading), etc.))
  // ... (El resto del componente de detalle es el mismo que el anterior)

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

  const handleEnviarComentario = async (e) => {
    e.preventDefault();

    if (!nuevoComentario.trim()) {
      setErrorComentario("El comentario no puede estar vacío");
      return;
    }

    if (!usuario?.token) {
      setErrorComentario("Debes iniciar sesión para comentar");
      return;
    }

    setEnviandoComentario(true);
    setErrorComentario(null);

    try {
      const res = await fetch(`${API_URL}/contenido/${id}/comentarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usuario.token}`
        },
        body: JSON.stringify({ contenido: nuevoComentario })
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorComentario(data.error || "Error al publicar comentario");
        return;
      }

      // Recargar comentarios
      const resComentarios = await fetch(`${API_URL}/contenido/${id}/comentarios`);
      const dataComentarios = await resComentarios.json();

      if (resComentarios.ok && dataComentarios.success) {
        setComentarios(dataComentarios.data);
      }

      setNuevoComentario("");
    } catch (err) {
      setErrorComentario("Error de conexión al servidor");
      console.error("Error al enviar comentario:", err);
    } finally {
      setEnviandoComentario(false);
    }
  };

  if (isLoading) {
    return <div className={styles.mensajeCarga}>Cargando contenido...</div>;
  }

  if (error || !publicacion) {
    return (
      <div className={styles.contenedorError}>
        <p className={styles.error}>{error || "Publicación no encontrada."}</p>
        <Link href="/blog" className={styles.botonVolver}>
          Volver al Blog
        </Link>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <Link href="/blog" className={styles.enlaceVolver}>
        ← Volver al listado
      </Link>

      <article className={styles.articulo}>
        <p className={styles.tipo}>{getTipoLabel(publicacion.tipo)}</p>
        <h1 className={styles.titulo}>{publicacion.titulo}</h1>
        <p className={styles.meta}>
          Publicado el {formatearFecha(publicacion.created_at)} por <strong>{publicacion.nombre_usuario}</strong>
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

      {/* Sección de comentarios solo para entradas */}
      {publicacion.tipo === "entrada" && (
        <section className={styles.comentarios}>
          <h2 className={styles.tituloComentarios}>
            Comentarios ({comentarios.length})
          </h2>

          {usuario ? (
            <form onSubmit={handleEnviarComentario} className={styles.formComentario}>
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu comentario..."
                className={styles.textarea}
              />
              {errorComentario && (
                <p className={styles.error}>{errorComentario}</p>
              )}
              <button
                type="submit"
                disabled={enviandoComentario}
                className={styles.botonComentario}
              >
                {enviandoComentario ? "Publicando..." : "Publicar comentario"}
              </button>
            </form>
          ) : (
            <p className={styles.loginAviso}>
              <Link href="/login" className={styles.loginEnlace}>
                Inicia sesión
              </Link>{" "}
              para comentar
            </p>
          )}

          <div className={styles.listaComentarios}>
            {comentarios.length === 0 ? (
              <p className={styles.vacio}>
                Aún no hay comentarios.
              </p>
            ) : (
              comentarios.map((comentario) => (
                <div key={comentario.id_comentario} className={styles.comentario}>
                  <div className={styles.comentarioHeader}>
                    <span className={styles.autor}>{comentario.nombre_usuario}</span>
                    <span className={styles.fecha}>
                      {formatearFecha(comentario.fecha_comentario)}
                    </span>
                  </div>
                  <p>{comentario.contenido}</p>
                </div>
              ))
            )}
          </div>
        </section>
      )}
    </main>
  );
}