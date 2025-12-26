"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function Contacto() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userEmail = localStorage.getItem("user_email");
    const userName = localStorage.getItem("user_name");

    if (token) setIsLoggedIn(true);

    // Pre-rellenar nombre y correo si el usuario está logueado
    if (userName) setNombre(userName);
    if (userEmail) setCorreo(userEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que el usuario esté logueado
    if (!isLoggedIn) {
      setMensajeEstado({
        tipo: "error",
        texto: "Debes iniciar sesión para enviar un mensaje",
      });
      return;
    }

    // Validar que todos los campos estén completos
    if (!nombre || !correo || !asunto || !mensaje) {
      setMensajeEstado({
        tipo: "error",
        texto: "Por favor, completa todos los campos",
      });
      return;
    }

    setEnviando(true);
    setMensajeEstado(null);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:4000/contacto/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, correo, asunto, mensaje }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensajeEstado({
          tipo: "success",
          texto: "¡Mensaje enviado correctamente!",
        });
        
        // Limpiar solo el asunto y mensaje (mantener nombre y correo)
        setAsunto("");
        setMensaje("");
      } else {
        setMensajeEstado({
          tipo: "error",
          texto: data.error || "Error al enviar el mensaje",
        });
      }
    } catch {
      setMensajeEstado({
        tipo: "error",
        texto: "Error de conexión",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={styles.contenidoPrincipal}>
      <main>
        <h1>Contáctanos</h1>

        {!isLoggedIn && (
          <div
            style={{
              backgroundColor: "#fff3cd",
              color: "#856404",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <p>
              ⚠️ Debes{" "}
              <Link href="/login" style={{ fontWeight: "bold" }}>
                iniciar sesión
              </Link>{" "}
              para enviar un mensaje.
            </p>
          </div>
        )}

        {mensajeEstado && (
          <div
            style={{
              backgroundColor:
                mensajeEstado.tipo === "success" ? "#d4edda" : "#f8d7da",
              color:
                mensajeEstado.tipo === "success" ? "#155724" : "#721c24",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <p>{mensajeEstado.texto}</p>
          </div>
        )}

        <div id="contenido">
          <form onSubmit={handleSubmit}>
            <div id="nombre">
              <p>Nombre:</p>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={!isLoggedIn}
              />
            </div>

            <div id="correo">
              <p>Correo electrónico:</p>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={!isLoggedIn}
              />
            </div>

            <div id="asunto">
              <p>Asunto:</p>
              <input
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                disabled={!isLoggedIn}
              />
            </div>

            <div id="mensaje">
              <p>Mensaje:</p>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                disabled={!isLoggedIn}
              />
            </div>

            <button type="submit" disabled={!isLoggedIn || enviando}>
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}