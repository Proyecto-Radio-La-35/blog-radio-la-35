"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Crear() {
    const [menuActive, setMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [autor, setAutor] = useState("");
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const tipo = searchParams.get("tipo"); // noticia, entrada, o evento
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const adminFlag = localStorage.getItem("is_admin");
        const userEmail = localStorage.getItem("user_email");
        
        if (!token || adminFlag !== "true") {
            router.push("/");
            return;
        }
        
        setIsLoggedIn(true);
        setIsAdmin(true);
        setAutor(userEmail || "");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("access_token");
        
        if (!token) {
            alert("Sesión expirada. Por favor inicia sesión nuevamente.");
            router.push("/login");
            return;
        }

        // Validaciones
        if (!titulo.trim()) {
            alert("El título es requerido");
            return;
        }

        if (!contenido.trim()) {
            alert("El contenido es requerido");
            return;
        }

        setIsSaving(true);
        
        try {
            const payload = { 
                tipo,
                titulo: titulo.trim(),
                contenido: contenido.trim(),
                imagen: "/radio_la_35.png"
            };

            console.log("Enviando payload:", payload);

            const res = await fetch(`${API_URL}/contenido/crear`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Error del servidor:", data);
                alert(`Error: ${data.error || "No se pudo crear el contenido"}`);
                setIsSaving(false);
                return;
            }

            console.log("Respuesta exitosa:", data);
            
            const tipoCapitalizado = tipo.charAt(0).toUpperCase() + tipo.slice(1);
            alert(`${tipoCapitalizado} creada exitosamente`);
            
            // Limpiar formulario
            setTitulo("");
            setContenido("");
            
            // Volver al dashboard
            router.push("/administrador");
        } catch (err) {
            console.error("Error al crear contenido:", err);
            alert("Error de conexión. Por favor verifica tu conexión e intenta nuevamente.");
        } finally {
            setIsSaving(false);
        }
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

    if (!isAdmin || !tipo || !["noticia", "entrada", "evento"].includes(tipo)) {
        if (!isAdmin) {
            return null;
        }
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '1.5rem',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <p>Tipo de contenido inválido</p>
                <Link 
                    href="/administrador"
                    style={{
                        marginTop: '1rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}
                >
                    Volver al Dashboard
                </Link>
            </div>
        );
    }

    const getTipoLabel = () => {
        switch(tipo) {
            case "noticia": return "Noticia";
            case "entrada": return "Entrada de Blog";
            case "evento": return "Evento";
            default: return "Contenido";
        }
    };

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
                        <li><a href="#">Miembros</a></li>
                        <li><a href="#">Premios</a></li>
                        <li><a href="#">Programas</a></li>
                        <li><a href="#">Noticias</a></li>
                        <li><a href="#">Trailer</a></li>
                        <li><a href="#">Eventos</a></li>
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

            <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Link 
                        href="/administrador"
                        style={{
                            textDecoration: 'none',
                            color: '#007bff',
                            fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        ← Volver al Dashboard
                    </Link>
                </div>

                <h1 style={{ marginBottom: '2rem', textAlign: 'center', color: '#333' }}>
                    Crear {getTipoLabel()}
                </h1>

                <form onSubmit={handleSubmit} style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1.5rem',
                    backgroundColor: '#f9f9f9',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <div>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Título: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input 
                            type="text" 
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            placeholder={`Título de la ${getTipoLabel().toLowerCase()}`}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                fontSize: '1rem',
                                border: '2px solid #ddd',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

                    <div>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Contenido: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea 
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            required
                            rows={12}
                            placeholder={`Escribe el contenido de la ${getTipoLabel().toLowerCase()}...`}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                fontSize: '1rem',
                                border: '2px solid #ddd',
                                borderRadius: '4px',
                                resize: 'vertical',
                                boxSizing: 'border-box',
                                fontFamily: 'inherit',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                        <small style={{ color: '#666', fontSize: '0.85rem' }}>
                            Puedes usar saltos de línea y formato básico
                        </small>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        gap: '1rem', 
                        justifyContent: 'center', 
                        marginTop: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        <button 
                            type="submit"
                            disabled={isSaving}
                            style={{
                                padding: '0.75rem 2.5rem',
                                fontSize: '1rem',
                                backgroundColor: isSaving ? '#6c757d' : '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isSaving ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                if (!isSaving) e.target.style.backgroundColor = '#218838';
                            }}
                            onMouseLeave={(e) => {
                                if (!isSaving) e.target.style.backgroundColor = '#28a745';
                            }}
                        >
                            {isSaving ? 'Guardando...' : `Crear ${getTipoLabel()}`}
                        </button>
                        
                        <button 
                            type="button"
                            onClick={() => router.push("/administrador")}
                            disabled={isSaving}
                            style={{
                                padding: '0.75rem 2.5rem',
                                fontSize: '1rem',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isSaving ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                if (!isSaving) e.target.style.backgroundColor = '#5a6268';
                            }}
                            onMouseLeave={(e) => {
                                if (!isSaving) e.target.style.backgroundColor = '#6c757d';
                            }}
                        >
                            Cancelar
                        </button>
                    </div>

                    <small style={{ textAlign: 'center', color: '#666', fontSize: '0.85rem' }}>
                        Los campos marcados con <span style={{ color: 'red' }}>*</span> son obligatorios
                    </small>
                </form>
            </main>
        </div>
    )
}