"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./page.css"

export default function Noticias() {
    const [menuActive, setMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [noticias, setNoticias] = useState([]);
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

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("is_admin");
        localStorage.removeItem("user_email");
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return(
        <div>
            <header className="header">
                <Link href="/">
                    <Image src="/radio_la_35.png" alt="Radio La 35" className="logo" width={70} height={70} />
                </Link>

                <nav className={`nav ${menuActive ? "active" : ""}`} id="menu">
                    <ul>
                        {isAdmin && (
                            <li><Link href="/administrador">Administrador</Link></li>
                        )}
                        <li><Link href="/sobrenosotros">Sobre nosotros</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><a href="#">Historia</a></li>
                        <li><a href="#">Miembros</a></li>
                        <li><a href="#">Premios</a></li>
                        <li><a href="#">Programas</a></li>
                        <li><Link href="/noticias">Noticias</Link></li>
                        <li><a href="#">Trailer</a></li>
                        <li><a href="#">Eventos</a></li>
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

            <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
                    Noticias
                </h1>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }}>
                        Cargando noticias...
                    </div>
                ) : error ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '3rem', 
                        fontSize: '1.2rem',
                        color: '#dc3545' 
                    }}>
                        {error}
                    </div>
                ) : noticias.length === 0 ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '3rem', 
                        fontSize: '1.2rem',
                        color: '#666'
                    }}>
                        No hay noticias publicadas todavía.
                    </div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2rem',
                        marginTop: '2rem'
                    }}>
                        {noticias.map((noticia) => (
                            <article 
                                key={noticia.id}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                }}
                            >
                                <div style={{ position: 'relative', height: '200px', backgroundColor: '#f0f0f0' }}>
                                    <Image 
                                        src={noticia.imagen || "/radio_la_35.png"}
                                        alt={noticia.titulo}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                
                                <div style={{ padding: '1.5rem' }}>
                                    <h2 style={{ 
                                        marginBottom: '0.5rem',
                                        fontSize: '1.5rem',
                                        color: '#333'
                                    }}>
                                        {noticia.titulo}
                                    </h2>
                                    
                                    <p style={{ 
                                        color: '#666',
                                        fontSize: '0.9rem',
                                        marginBottom: '1rem'
                                    }}>
                                        {formatearFecha(noticia.created_at)}
                                    </p>
                                    
                                    <p style={{ 
                                        color: '#555',
                                        lineHeight: '1.6',
                                        marginBottom: '1rem'
                                    }}>
                                        {noticia.contenido.length > 150 
                                            ? noticia.contenido.substring(0, 150) + '...'
                                            : noticia.contenido
                                        }
                                    </p>
                                    
                                    <Link 
                                        href={`/noticias/${noticia.id}`}
                                        style={{
                                            display: 'inline-block',
                                            color: '#007bff',
                                            textDecoration: 'none',
                                            fontWeight: 'bold',
                                            transition: 'color 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#0056b3'}
                                        onMouseLeave={(e) => e.target.style.color = '#007bff'}
                                    >
                                        Leer más →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}