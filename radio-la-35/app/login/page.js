"use client";

import "./page.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [menuActive, setMenuActive] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminFlag = localStorage.getItem("is_admin");
    if (token) setIsLoggedIn(true);
    if (adminFlag === "true") setIsAdmin(true);
  }, []);

  // Verificar si está guardada la sesión
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLoginSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await fetch(`${API_URL}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
              const errorBody = await res.text(); 
              
              try {
                  const errorData = JSON.parse(errorBody);
                  alert(`Fallo en el inicio de sesión: ${res.status} - ${errorData.error || "Error desconocido"}`);
              } catch (e) {
                  console.error("Respuesta no JSON:", errorBody);
                  alert(`Fallo en el inicio de sesión: El servidor devolvió una respuesta no válida. Código: ${res.status}`);
              }
              return;
          }

          const data = await res.json(); 

          if (res.ok && data.session?.access_token) {
            localStorage.setItem("access_token", data.session.access_token);
            localStorage.setItem("user_email", email);

            if (data.userName) {
              localStorage.setItem("user_name", data.userName); 
            } else {
              localStorage.removeItem("user_name");
            }

            if (data.isAdmin) {
              localStorage.setItem("is_admin", "true");
            } else {
              localStorage.removeItem("is_admin");
            }

            alert("Inicio de sesión exitoso");
            router.push("/");
          }
          else {
            alert(data.error || "Error al iniciar sesión");
          }
        } catch (err) {
          console.error(err);
        }
      };

  const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await fetch(`${API_URL}/auth/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password, userName }),
          });

          if (!res.ok) {
              const errorText = await res.text();
              console.error("Error del servidor:", errorText);
              alert(`Fallo en el registro: ${res.status} - ${errorText}`);
              return; 
          }

          const data = await res.json(); 

          if (data.user) {
            const loginRes = await fetch(`${API_URL}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });
            const loginData = await loginRes.json();

            if (loginRes.ok && loginData.session?.access_token) {
              localStorage.setItem("access_token", loginData.session.access_token);
              localStorage.setItem("user_email", email);

              if (loginData.userName) {
                localStorage.setItem("user_name", loginData.userName);
              } else {
                localStorage.removeItem("user_name");
              }

              if (loginData.isAdmin) {
                localStorage.setItem("is_admin", "true");
              } else {
                localStorage.removeItem("is_admin");
              }

              alert("Cuenta creada e inicio de sesión exitoso");
              router.push("/");
            }
          }
          else {
            alert("Fallo en el registro: Datos no válidos.");
          }
          
      } catch (error) {
          console.error("Error de red o procesamiento:", error);
          alert("Ocurrió un error al intentar registrarte.");
      }
  };

  return (
    <div>
      <header className="header">
        <Link href="/">
          <Image
            src="/radio_la_35.png"
            alt="Radio La 35"
            className="logo"
            width={70}
            height={70}
          />
        </Link>

        <nav className={`nav ${menuActive ? "active" : ""}`} id="menu">
          <ul>
            {isAdmin && (
              <li><Link href="/administrador">Administrador</Link></li>
              )}
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

        <button className="menu-icon" onClick={() => setMenuActive(true)}>☰</button>
        <button className="cerrar-btn" onClick={() => setMenuActive(false)}>✕</button>
      </header>

      <main className="login-container">
        {showLogin ? (
          <div className="tarjeta">
            <h2>Iniciar sesión</h2>

            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Correo" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />

              <button type="submit" className="btn">Iniciar sesión</button>
            </form>

            <p className="switch-text">
              ¿No tienes cuenta?{" "}
              <button className="switch-btn" onClick={() => setShowLogin(false)}>
                Registrarte
              </button>
            </p>
          </div>
        ) : (
          <div className="tarjeta">
            <h2>Crear cuenta</h2>

            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Nombre" required value={userName} onChange={(e) => setUserName(e.target.value)} />
              <input type="email" placeholder="Correo" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />

              <button type="submit" className="btn">Registrarse</button>
            </form>

            <p className="switch-text">
              ¿Ya tienes una cuenta?{" "}
              <button className="switch-btn" onClick={() => setShowLogin(true)}>
                Iniciar sesión
              </button>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
