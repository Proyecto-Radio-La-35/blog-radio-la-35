"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import Link from "next/link";
import Image from "next/image";

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
    return <div style={styles.loadingContainer}>Cargando contenido...</div>;
  }

  if (error || !publicacion) {
      const mensaje = error || "Publicación no encontrada o ID inválido.";
      
      return (
          <div style={styles.errorContainer}>
              <p style={{ color: error ? 'red' : 'orange', fontWeight: 'bold' }}>{mensaje}</p>
              <Link href="/blog" style={styles.volverButton}>
                  Volver al Blog
              </Link>
          </div>
      );
  }
  
  return (
    <div>
        <header className="header">
          <Link href="/"><Image src="/radio_la_35.png" alt="Radio La 35" className="logo" width={70} height={70} /></Link>

          <nav className={`nav ${menuActive ? "active" : ""}`} id="menu">
            <ul>
              {isAdmin && (
                <li><Link href="/administrador">Administrador</Link></li>
                )}
              <li><Link href="/sobrenosotros">Sobre nosotros</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href="#">Historia</a></li>
              <li><a href="#">Miembros</a></li>
              <li><Link href="/premios">Premios</Link></li>
              <li><a href="#">Programas</a></li>
              <li><Link href="/noticias">Noticias</Link></li>
              <li><Link href="/trailer">Trailer</Link></li>
              <li><Link href="/eventos">Eventos</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
              {isLoggedIn ? (
                <li>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              ) : (
                <li><Link href="/login">Acceder</Link></li>
              )}
            </ul>
          </nav>

          <button className="menu-icon" id="menu-btn" onClick={() => setMenuActive(true)}>☰</button>
          <button className="cerrar-btn" id="cerrar-btn" onClick={() => setMenuActive(false)}>✕</button>
        </header>
        <main style={styles.mainContainer}>
            <div style={styles.volverLinkContainer}>
                <Link 
                    href="/blog" 
                    style={styles.volverLink}
                >
                    ← Volver al listado
                </Link>
            </div>

            <article style={styles.article}>
                <p style={styles.tipo}>{getTipoLabel(publicacion.tipo)}</p>
                <h1 style={styles.titulo}>{publicacion.titulo}</h1>
                <p style={styles.meta}>
                  Publicado el {formatearFecha(publicacion.created_at)} por **{publicacion.nombre_usuario}**
                </p>

                {publicacion.imagen && (
                    <div style={styles.imageContainer}>
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
                    <p style={{whiteSpace: 'pre-wrap'}}>{publicacion.contenido}</p>
                </div>
            </article>
        </main>
    </div>
  );
}

const styles = {
    loadingContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem' },
    errorContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', fontSize: '1.2rem', textAlign: 'center', padding: '2rem' },
    volverButton: { marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' },
    mainContainer: { padding: '2rem', maxWidth: '800px', margin: '2rem auto' },
    volverLinkContainer: { marginBottom: '1rem' },
    volverLink: { textDecoration: 'none', color: '#007bff', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' },
    article: { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
    tipo: { fontSize: '0.9rem', color: '#6c757d', fontWeight: 'bold', textTransform: 'uppercase' },
    titulo: { fontSize: '2rem', color: '#333', marginBottom: '0.5rem' },
    meta: { fontSize: '0.95rem', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1.5rem' },
    imageContainer: { marginBottom: '1.5rem', textAlign: 'center' },
    imagen: { width: '100%', height: 'auto', borderRadius: '4px' },
    contenido: { fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }
};