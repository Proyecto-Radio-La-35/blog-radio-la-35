"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Usa 'next/navigation' si usas App Router
import Link from "next/link";
import Image from "next/image";

// Componente para manejar la visualización de un contenido individual
export default function PublicacionDetalle() {
  const router = useRouter();
  const { id } = router.query; // Obtener el ID de la URL
  
  const [publicacion, setPublicacion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Asegúrate de definir esta variable de entorno en tu archivo .env.local
  const API_URL = process.env.NEXT_PUBLIC_API_URL; 
  
  // Función para obtener los datos de la publicación
  useEffect(() => {
    if (!id) {
        setIsLoading(false);
        return; 
    } // No hace nada si el id aún no está disponible

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
  }, [id, API_URL]); // Se ejecuta cuando el ID cambie

  const getTipoLabel = (tipo) => {
    switch(tipo) {
        case "noticia": return "Noticia";
        case "entrada": return "Entrada de Blog";
        case "evento": return "Evento";
        default: return "Contenido";
    }
  };

  if (isLoading) {
    return (
        <div style={styles.loadingContainer}>
            Cargando contenido...
        </div>
    );
  }

  if (error) {
    return (
        <div style={styles.errorContainer}>
            <p style={{ color: 'red', fontWeight: 'bold' }}>Error al cargar: {error}</p>
            <Link href="/" style={styles.volverButton}>
                Volver al Inicio
            </Link>
        </div>
    );
  }

  if (!publicacion) {
      return (
          <div style={styles.errorContainer}>
              <p style={{ color: 'orange', fontWeight: 'bold' }}>Publicación no encontrada o ID inválido.</p>
              <Link href="/" style={styles.volverButton}>
                  Volver al Inicio
              </Link>
          </div>
      );
  }

  // Formatear la fecha
  const fechaCreacion = new Date(publicacion.created_at).toLocaleDateString("es-ES", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div>
      {/* Aquí podrías incluir el componente Header/Nav si lo tienes 
        (el que usas en page.js, adaptándolo si es necesario) 
      */}

      <main style={styles.mainContainer}>
        <div style={styles.volverLinkContainer}>
            <Link 
                href="/" // O a la página de listado de publicaciones
                style={styles.volverLink}
            >
                ← Volver al listado
            </Link>
        </div>

        <article style={styles.article}>
          <p style={styles.tipo}>{getTipoLabel(publicacion.tipo)}</p>
          <h1 style={styles.titulo}>{publicacion.titulo}</h1>
          <p style={styles.meta}>
            Publicado el {fechaCreacion} por **{publicacion.autor_email}**
          </p>

          {publicacion.imagen && (
            <div style={styles.imageContainer}>
                {/* Usar Image de Next.js si la imagen está en el directorio public. 
                  Ajusta width, height y style según tus necesidades. 
                */}
                <Image 
                    src={publicacion.imagen} 
                    alt={publicacion.titulo} 
                    width={800} 
                    height={450} 
                    style={styles.imagen}
                />
            </div>
          )}

          <div style={styles.contenido}>
            {/* Mostrar el contenido. Si el contenido contiene saltos de línea 
              que quieres renderizar como párrafos, puedes usar el estilo 'whiteSpace: pre-wrap' 
              o una biblioteca como 'react-markdown' si se espera formato Markdown.
              Para un simple texto plano:
            */}
            <p style={{whiteSpace: 'pre-wrap'}}>{publicacion.contenido}</p>
          </div>
        </article>
      </main>

      {/* Aquí podrías incluir el componente Footer si lo tienes 
      */}
    </div>
  );
}


// Estilos básicos para la demostración
const styles = {
    loadingContainer: { 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem'
    },
    errorContainer: {
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        textAlign: 'center',
        padding: '2rem'
    },
    volverButton: {
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
    },
    mainContainer: { 
        padding: '2rem', 
        maxWidth: '800px', 
        margin: '0 auto' 
    },
    volverLinkContainer: { 
        marginBottom: '2rem' 
    },
    volverLink: {
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    article: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    },
    tipo: {
        fontSize: '0.9rem',
        color: '#6c757d',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    titulo: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '0.5rem'
    },
    meta: {
        fontSize: '0.95rem',
        color: '#666',
        borderBottom: '1px solid #eee',
        paddingBottom: '1rem',
        marginBottom: '1.5rem'
    },
    imageContainer: {
        marginBottom: '1.5rem',
        textAlign: 'center'
    },
    imagen: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '4px'
    },
    contenido: {
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: '#444'
    }
};