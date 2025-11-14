"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./page.css"

export default function Administrador() {
    const [menuActive, setMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [adminEmailInput, setAdminEmailInput] = useState("");
    const [adminsList, setAdminsList] = useState([]);
    const userEmail = typeof window !== "undefined" ? localStorage.getItem("user_email") : null;

    useEffect(() => {
    async function fetchAdmins() {
        const res = await fetch("/admins/list", {
            headers: { "x-admin-email": userEmail }
        });
        const data = await res.json();
        setAdminsList(data.admins);
    }
    fetchAdmins();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const adminFlag = localStorage.getItem("is_admin");
        
        if (!token || adminFlag !== "true") {
            // Si no está logueado o no es admin, redirigir a home
            router.push("/");
            return;
        }
        
        setIsLoggedIn(true);
        setIsAdmin(true);
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("is_admin");
        localStorage.removeItem("user_email");
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push("/");
    };

    async function handleAddAdmin() {
    const res = await fetch("/admins/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-admin-email": userEmail
        },
        body: JSON.stringify({ email: adminEmailInput })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    setAdminsList(data.admins);
    setAdminEmailInput("");
}

async function handleRemoveAdmin(email) {
    const res = await fetch("/admins/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-admin-email": userEmail
        },
        body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    setAdminsList(data.admins);
    }

    // Mostrar loading mientras verifica permisos
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

    // Si no es admin, no mostrar nada (redirige)
    if (!isAdmin) {
        return null;
    }

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
                        <li><a href="#">Premios</a></li>
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

            <main style={{ padding: '2rem', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>

                <h2 style={{ marginBottom: '2rem' }}>Creación</h2>
                
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '2rem',
                    flexWrap: 'wrap',
                    marginTop: '3rem'
                }}>
                    <Link 
                        href="/crear?tipo=noticia"
                        style={{
                            width: '150px',
                            height: '150px',
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#000',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: '2px solid #ccc',
                            borderRadius: '8px',
                            transition: 'transform 0.2s, background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.backgroundColor = '#d0d0d0';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = '#e0e0e0';
                        }}
                    >
                        Noticia
                        <span style={{ fontSize: '2rem', marginTop: '0.5rem' }}>+</span>
                    </Link>

                    <Link 
                        href="/crear?tipo=entrada"
                        style={{
                            width: '150px',
                            height: '150px',
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#000',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: '2px solid #ccc',
                            borderRadius: '8px',
                            transition: 'transform 0.2s, background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.backgroundColor = '#d0d0d0';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = '#e0e0e0';
                        }}
                    >
                        Entrada
                        <span style={{ fontSize: '2rem', marginTop: '0.5rem' }}>+</span>
                    </Link>

                    <Link 
                        href="/crear?tipo=evento"
                        style={{
                            width: '150px',
                            height: '150px',
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#000',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: '2px solid #ccc',
                            borderRadius: '8px',
                            transition: 'transform 0.2s, background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.backgroundColor = '#d0d0d0';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = '#e0e0e0';
                        }}
                    >
                        Evento
                        <span style={{ fontSize: '2rem', marginTop: '0.5rem' }}>+</span>
                    </Link>
                </div>

                <h2 style={{ marginBottom: '2rem', marginTop: '4rem' }}>Eliminación</h2>

                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '2rem',
                    flexWrap: 'wrap',
                    marginTop: '3rem'
                }}>
                    <Link 
                        href="/eliminar?tipo=noticia"
                        style={{
                            width: '150px',
                            height: '150px',
                            backgroundColor: '#ffebee',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#c62828',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: '2px solid #ef5350',
                            borderRadius: '8px',
                            transition: 'transform 0.2s, background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.backgroundColor = '#ffcdd2';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = '#ffebee';
                        }}
                    >
                        Noticia
                        <span style={{ fontSize: '2rem', marginTop: '0.5rem' }}>−</span>
                    </Link>

                    <Link 
                        href="/eliminar?tipo=entrada"
                        style={{
                            width: '150px',
                            height: '150px',
                            backgroundColor: '#ffebee',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#c62828',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: '2px solid #ef5350',
                            borderRadius: '8px',
                            transition: 'transform 0.2s, background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.backgroundColor = '#ffcdd2';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = '#ffebee';
                        }}
                    >
                        Entrada
                        <span style={{ fontSize: '2rem', marginTop: '0.5rem' }}>−</span>
                    </Link>

                    <Link 
                        href="/eliminar?tipo=evento"
                        style={{
                            width: '150px',
                            height: '150px',
                            backgroundColor: '#ffebee',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#c62828',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: '2px solid #ef5350',
                            borderRadius: '8px',
                            transition: 'transform 0.2s, background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.backgroundColor = '#ffcdd2';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = '#ffebee';
                        }}
                    >
                        Evento
                        <span style={{ fontSize: '2rem', marginTop: '0.5rem' }}>−</span>
                    </Link>
                    <Link 
                        href="/eliminar?tipo=comentarios"
                        style={{
                            width: '150px',
                            height: '150px',
                            backgroundColor: '#ffebee',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#c62828',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: '2px solid #ef5350',
                            borderRadius: '8px',
                            transition: 'transform 0.2s, background-color 0.2s'
                        }}
                    >
                        Comentarios
                        <span style={{ fontSize: '2rem', marginTop: '0.5rem' }}>−</span>
                    </Link>
                    <br/>

                    <div style={{ marginTop: "4rem" }}>
                        <h3>Agregar administrador</h3>
                        <br/>
                        <input
                            type="email"
                            placeholder="Email del administrador"
                            value={adminEmailInput}
                            onChange={(e) => setAdminEmailInput(e.target.value)}
                            style={{ padding: "0.5rem", width: "250px", marginRight: "1rem" }}
                        />
                        <button 
                            onClick={handleAddAdmin}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#4caf50",
                                color: "white",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}