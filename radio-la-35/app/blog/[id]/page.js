"use client";

import { useState, useEffect } from "react";
// Importar useParams de next/navigation para el App Router
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

    const data = await res.json();

    if (!res.ok) {
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

          {/* Sección de comentarios solo para entradas */}
          {publicacion.tipo === "entrada" && (
            <div style={styles.comentariosSection}>
              <h2 style={styles.comentariosTitulo}>
                Comentarios ({comentarios.length})
              </h2>

              {/* Formulario para nuevo comentario */}
              {usuario ? (
                <form onSubmit={handleEnviarComentario} style={styles.comentarioForm}>
                  <textarea
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    placeholder="Escribe tu comentario..."
                    style={styles.comentarioTextarea}
                    rows={4}
                  />
                  {errorComentario && (
                    <p style={styles.errorComentario}>{errorComentario}</p>
                  )}
                  <button 
                    type="submit" 
                    disabled={enviandoComentario}
                    style={{
                      ...styles.comentarioButton,
                      ...(enviandoComentario ? styles.comentarioButtonDisabled : {})
                    }}
                  >
                    {enviandoComentario ? "Publicando..." : "Publicar comentario"}
                  </button>
                </form>
              ) : (
                <p style={styles.loginPrompt}>
                  <Link href="/login" style={styles.loginLink}>
                    Inicia sesión
                  </Link>
                  {" "}para dejar un comentario
                </p>
              )}

              {/* Lista de comentarios */}
              <div style={styles.comentariosList}>
                {comentarios.length === 0 ? (
                  <p style={styles.noComentarios}>
                    Aún no hay comentarios. ¡Sé el primero en comentar!
                  </p>
                ) : (
                  comentarios.map((comentario) => (
                    <div key={comentario.id_comentario} style={styles.comentarioItem}>
                      <div style={styles.comentarioHeader}>
                        <span style={styles.comentarioAutor}>
                          {comentario.nombre_usuario}
                        </span>
                        <span style={styles.comentarioFecha}>
                          {formatearFecha(comentario.fecha_comentario)}
                        </span>
                      </div>
                      <p style={styles.comentarioContenido}>
                        {comentario.contenido}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
      </main>
  </div>
  );
}

// Estilos básicos (omitidos por brevedad, usa los estilos que ya tenías)
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
    contenido: { fontSize: '1.1rem', lineHeight: '1.8', color: '#444' },
    comentariosSection: { 
  marginTop: '3rem', 
  backgroundColor: '#fff', 
  padding: '2rem', 
  borderRadius: '8px', 
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
},
comentariosTitulo: { 
  fontSize: '1.5rem', 
  color: '#333', 
  marginBottom: '1.5rem',
  borderBottom: '2px solid #007bff',
  paddingBottom: '0.5rem'
},
comentarioForm: { 
  marginBottom: '2rem' 
},
comentarioTextarea: { 
  width: '100%', 
  padding: '0.75rem', 
  fontSize: '1rem', 
  border: '1px solid #ddd', 
  borderRadius: '4px',
  resize: 'vertical',
  fontFamily: 'inherit'
},
errorComentario: { 
  color: 'red', 
  fontSize: '0.9rem', 
  marginTop: '0.5rem' 
},
comentarioButton: { 
  marginTop: '0.75rem',
  padding: '0.75rem 1.5rem', 
  backgroundColor: '#007bff', 
  color: 'white', 
  border: 'none',
  borderRadius: '4px', 
  fontSize: '1rem',
  cursor: 'pointer',
  fontWeight: 'bold'
},
comentarioButtonDisabled: { 
  backgroundColor: '#6c757d', 
  cursor: 'not-allowed' 
},
loginPrompt: { 
  padding: '1rem', 
  backgroundColor: '#f8f9fa', 
  borderRadius: '4px',
  textAlign: 'center',
  marginBottom: '2rem'
},
loginLink: { 
  color: '#007bff', 
  fontWeight: 'bold', 
  textDecoration: 'none' 
},
comentariosList: { 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '1rem' 
},
noComentarios: { 
  textAlign: 'center', 
  color: '#6c757d', 
  fontStyle: 'italic',
  padding: '2rem'
},
comentarioItem: { 
  padding: '1rem', 
  backgroundColor: '#f8f9fa', 
  borderRadius: '4px',
  borderLeft: '3px solid #007bff'
},
comentarioHeader: { 
  display: 'flex', 
  justifyContent: 'space-between', 
  marginBottom: '0.5rem',
  alignItems: 'center'
},
comentarioAutor: { 
  fontWeight: 'bold', 
  color: '#007bff' 
},
comentarioFecha: { 
  fontSize: '0.85rem', 
  color: '#6c757d' 
},
comentarioContenido: { 
  margin: 0, 
  color: '#444',
  lineHeight: '1.6'
}
};