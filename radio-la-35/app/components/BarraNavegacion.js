"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BarraNavegacion() {
  const [menuActive, setMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminFlag = localStorage.getItem("is_admin");

    setIsLoggedIn(!!token);
    setIsAdmin(adminFlag === "true");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/");
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  return (
    <header className="header">
      <Link href="/">
        <Image src="/radio_la_35.png" alt="Radio La 35" className="logo" width={70} height={70} />
      </Link>

      <nav className={`nav ${menuActive ? "active" : ""}`}>
        <ul>
          {isAdmin && (
            <li><Link href="/administrador" onClick={closeMenu}>Administrador</Link></li>
          )}
          <li><Link href="/sobrenosotros" onClick={closeMenu}>Sobre nosotros</Link></li>
          <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
          <li><a href="#" onClick={closeMenu}>Historia</a></li>
          <li><Link href="/miembros" onClick={closeMenu}>Miembros</Link></li>
          <li><Link href="/premios" onClick={closeMenu}>Premios</Link></li>
          <li><Link href="/programas" onClick={closeMenu}>Programas</Link></li>
          <li><Link href="/noticias" onClick={closeMenu}>Noticias</Link></li>
          <li><Link href="/trailer" onClick={closeMenu}>Trailer</Link></li>
          <li><Link href="/eventos" onClick={closeMenu}>Eventos</Link></li>
          <li><Link href="/contacto" onClick={closeMenu}>Contacto</Link></li>

          {isLoggedIn ? (
            <li>
              <button onClick={() => { handleLogout(); closeMenu(); }} className="logout-btn">
                Cerrar sesión
              </button>
            </li>
          ) : (
            <li><Link href="/login" onClick={closeMenu}>Acceder</Link></li>
          )}
        </ul>
      </nav>

      {!menuActive && (
        <button className="menu-icon" onClick={() => setMenuActive(true)}>☰</button>
      )}

      {menuActive && (
        <button className="cerrar-btn" onClick={() => setMenuActive(false)}>✕</button>
      )}
    </header>
  );
}