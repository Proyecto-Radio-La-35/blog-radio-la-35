"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Verificar si está guardada la sesión
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) router.push("/");
  }, [router]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al iniciar sesión");
        return;
      }

      localStorage.setItem("access_token", data.session.access_token);
      localStorage.setItem("user_email", email);

      if (data.userName) {
        localStorage.setItem("user_name", data.userName);
      }

      if (data.isAdmin) {
        localStorage.setItem("is_admin", "true");
      }

      alert("Inicio de sesión exitoso");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
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
        const text = await res.text();
        alert(text);
        return;
      }

      // Auto login
      await handleLoginSubmit(e);
    } catch (error) {
      console.error(error);
      alert("Error al registrarse");
    }
  };

  return (
    <main className={styles.contenedor}>
      {showLogin ? (
        <div className={styles.card}>
          <h2 className={styles.titulo}>Iniciar sesión</h2>

          <form className={styles.formulario} onSubmit={handleLoginSubmit}>
            <input
              className={styles.input}
              type="email"
              placeholder="Correo"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className={styles.boton} type="submit">
              Iniciar sesión
            </button>
          </form>

          <p className={styles.switchTexto}>
            ¿No tienes cuenta?{" "}
            <button
              className={styles.switchBoton}
              onClick={() => setShowLogin(false)}
            >
              Registrarte
            </button>
          </p>
        </div>
      ) : (
        <div className={styles.card}>
          <h2 className={styles.titulo}>Crear cuenta</h2>

          <form className={styles.formulario} onSubmit={handleRegisterSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              className={styles.input}
              type="email"
              placeholder="Correo"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className={styles.boton} type="submit">
              Registrarse
            </button>
          </form>

          <p className={styles.switchTexto}>
            ¿Ya tienes una cuenta?{" "}
            <button
              className={styles.switchBoton}
              onClick={() => setShowLogin(true)}
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      )}
    </main>
  );
}