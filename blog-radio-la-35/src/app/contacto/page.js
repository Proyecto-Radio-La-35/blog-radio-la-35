"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./page.css"

export default function Contacto() {
    const [menuActive, setMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
    };
    
    return(
        <div>
            <header className="header">
                <Link href="/"><Image src="/radio_la_35.png" alt="Radio La 35" className="logo" width={70} height={70} /></Link>

                <nav className={`nav ${menuActive ? "active" : ""}`} id="menu">
                <ul>
                    <li><Link href="/sobrenosotros">Sobre nosotros</Link></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Historia</a></li>
                    <li><a href="#">Miembros</a></li>
                    <li><a href="#">Premios</a></li>
                    <li><a href="#">Programas</a></li>
                    <li><a href="#">Noticias</a></li>
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

            <main>
                <h1>Contáctanos</h1>

                <div id="contenido">
                    <form>
                        <div id="nombre">
                            <p>Nombre:</p>
                            <input type="text"></input>
                        </div>

                        <div id="correo">
                            <p>Correo electrónico:</p>
                            <input type="email"></input>
                        </div>

                        <div id="mensaje">
                            <p>Mensaje:</p>
                            <textarea cols={7}></textarea>
                        </div>

                        <button type="submit"><span>Enviar mensaje</span></button>
                    </form>
                </div>
            </main>

            <footer className="footer">
                <div className="footer-top">
                <Image src="/radio_la_35.png" alt="Radio La 35" className="logo" width={70} height={70} />
                <div className="redes">
                    <a href="https://www.facebook.com/Radiola35/"><Image src="/facebook.png" alt="Facebook" width={28} height={28} /></a>
                    <a href="https://open.spotify.com/show/0Ocey29aAxzIZ7ml3jzVVQ"><Image src="/spotify.png" alt="Spotify" width={28} height={28} /></a>
                    <a href="https://www.instagram.com/radiola35/"><Image src="/instagram.png" alt="Instagram" width={28} height={28} /></a>
                    <a href="https://x.com/radiola35"><Image src="/twitter.png" alt="Twitter" width={28} height={28} /></a>
                    <a href="https://www.youtube.com/channel/UCOH9BIW2C-04nOBjE08zDUw"><Image src="/youtube.png" alt="YouTube" width={41} height={28} /></a>
                </div>
                </div>

                <nav className="footer-nav">
                <ul>
                    <li><Link href="/sobrenosotros">Sobre nosotros</Link></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Eventos</a></li>
                    <li><a href="#">Historia</a></li>
                    <li><a href="#">Programas</a></li>
                    <li><Link href="/contacto">Contacto</Link></li>
                    <li><a href="#">Miembros</a></li>
                    <li><a href="#">Noticias</a></li>
                    <li><a href="#">Premios</a></li>
                    <li><a href="#">Trailer</a></li>
                </ul>
                </nav>
            </footer>
        </div>
    );
}