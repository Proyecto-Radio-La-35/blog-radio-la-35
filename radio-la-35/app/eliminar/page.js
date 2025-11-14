"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import "./page.css";

export default function EliminarContenido() {
    const [menuActive, setMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [publicaciones, setPublicaciones] = useState([]);
    const [loadingPublicaciones, setLoadingPublicaciones] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const tipo = searchParams.get("tipo");

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const adminFlag = localStorage.getItem("is_admin");
        
        if (!token || adminFlag !== "true") {
            router.push("/");
            return;
        }
        
        setIsLoggedIn(true);
        setIsAdmin(true);
        setIsLoading(false);
    }, [router]);

    useEffect(() => {
        if (isAdmin && tipo) {
            cargarPublicaciones();
        }
    }, [isAdmin, tipo]);

    const cargarPublicaciones = async () => {
        setLoadingPublicaciones(true);
        try {
            let url;

            if (tipo === "comentarios") {
            url = `${API_URL}/comentarios/todos`;
            } else {
            url = `${API_URL}/contenido?tipo=${tipo}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
            setPublicaciones(data.data);
            } else {
            console.error("Error al cargar:", data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingPublicaciones(false);
        }
    };

    const handleEliminar = async () => {
        if (!selectedId) return;

        const token = localStorage.getItem("access_token");
        
        try {
            const response = await fetch(
            tipo === "comentarios"
                ? `${API_URL}/contenido/comentarios/${selectedId}`
                : `${API_URL}/contenido/${selectedId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

            const data = await response.json();

            if (data.success) {
                alert("Publicación eliminada exitosamente");
                setShowModal(false);
                setSelectedId(null);
                cargarPublicaciones(); // Recargar la lista
            } else {
                alert("Error al eliminar: " + data.error);
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Error al eliminar la publicación");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("is_admin");
        localStorage.removeItem("user_email");
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push("/");
    };

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '1.5rem'
            }}>
                Verificando permisos...
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    if (!tipo || !["noticia", "entrada", "evento", "comentarios"].includes(tipo)) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '1.5rem',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                Tipo de contenido inválido
                <Link href="/administrador" style={{ color: '#d44994' }}>
                    Volver al dashboard
                </Link>
            </div>
        );
    }

    const tipoCapitalizado = tipo.charAt(0).toUpperCase() + tipo.slice(1);

    return(
        <div>
            <header className="header">
                <Link href="/">
                    <Image src="/radio_la_35.png" alt="Radio La 35" className="logo" width={70} height={70} />
                </Link>

                <nav className={`nav ${menuActive ? "active" : ""}`} id="menu">
                    <ul>
                        <li><Link href="/administrador">Administrador</Link></li>
                        <li><Link href="/sobrenosotros">Sobre nosotros</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><a href="#">Historia</a></li>
                        <li><Link href="/miembros">Miembros</Link></li>
                        <li><Link href="/premios">Premios</Link></li>
                        <li><a href="#">Programas</a></li>
                        <li><Link href="/noticias">Noticias</Link></li>
                        <li><Link href="/trailer">Trailer</Link></li>
                        <li><Link href="/eventos">Eventos</Link></li>
                        <li><Link href="/contacto">Contacto</Link></li>
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
                    </ul>
                </nav>

                <button className="menu-icon" id="menu-btn" onClick={() => setMenuActive(true)}>☰</button>
                <button className="cerrar-btn" id="cerrar-btn" onClick={() => setMenuActive(false)}>✕</button>
            </header>

            <main style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0 }}>Eliminar {tipoCapitalizado}</h1>
                    <Link 
                        href="/administrador"
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#d44994',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Volver al Dashboard
                    </Link>
                </div>

                {loadingPublicaciones ? (
                    <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }}>
                        Cargando publicaciones...
                    </div>
                ) : publicaciones.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }}>
                        No hay publicaciones de tipo ``{tipo}`` para eliminar
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ 
                            width: '100%', 
                            borderCollapse: 'collapse',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>ID</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>Título</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>Fecha de Creación</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {publicaciones.map((pub) => (
                                    <tr key={tipo === "comentarios" ? pub.id_comentario : pub.id_publicacion}>
                                    <td>
                                        {tipo === "comentarios" ? pub.id_comentario : pub.id_publicacion}
                                    </td>

                                    <td>
                                        {tipo === "comentarios"
                                            ? pub.contenido.slice(0, 40) + "..."
                                            : pub.titulo}
                                    </td>

                                    <td>
                                        {tipo === "comentarios"
                                            ? new Date(pub.fecha_comentario).toLocaleDateString("es-ES")
                                            : new Date(pub.created_at).toLocaleDateString("es-ES")}
                                    </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <button
                                                onClick={() => {
                                                    setSelectedId(pub.id_publicacion);
                                                    setShowModal(true);
                                                }}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Modal de confirmación */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#2a1a72',
                        padding: '2rem',
                        borderRadius: '10px',
                        maxWidth: '500px',
                        width: '90%',
                        border: '2px solid #d44994'
                    }}>
                        <h2 style={{ marginBottom: '1rem' }}>Confirmar Eliminación</h2>
                        <p style={{ marginBottom: '2rem' }}>
                            ¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedId(null);
                                }}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleEliminar}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
