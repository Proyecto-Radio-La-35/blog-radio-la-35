"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function Crear() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Sesión expirada. Por favor inicia sesión nuevamente.");
      router.push("/login");
      return;
    }

    // Validaciones
    if (!titulo.trim() || !contenido.trim()) {
      alert("Todos los campos obligatorios deben completarse");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        tipo,
        titulo: titulo.trim(),
        contenido: contenido.trim(),
        imagen: "/radio_la_35.png",
      };

      const res = await fetch(`${API_URL}/contenido/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "No se pudo crear el contenido");
        return;
      }

      alert(`${getTipoLabel(tipo)} creada exitosamente`);

      // Limpiar formulario
      setTitulo("");
      setContenido("");

      // Volver al dashboard
      router.push("/administrador");
    } catch {
      alert("Error de conexión");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.mensajeCentral}>
        Verificando permisos...
      </div>
    );
  }

  if (!isAdmin || !["noticia", "entrada", "evento"].includes(tipo)) {
    return (
      <div className={styles.mensajeCentral}>
        <p>Tipo de contenido inválido</p>
        <Link href="/administrador" className={styles.enlacePrimario}>
          Volver al Dashboard
        </Link>
      </div>
    );
  }

  return (
    <main className={styles.contenedor}>
      <div className={styles.volver}>
        <Link href="/administrador">← Volver al Dashboard</Link>
      </div>

      <h1 className={styles.title}>Crear {getTipoLabel(tipo)}</h1>

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.grupoFormulario}>
          <label className={styles.label}>
            Título <span className={styles.requerido}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder={`Título de la ${getTipoLabel(tipo).toLowerCase()}`}
            required
          />
        </div>

        <div className={styles.grupoFormulario}>
          <label className={styles.label}>
            Contenido <span className={styles.requerido}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            rows={12}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder={`Escribe el contenido de la ${getTipoLabel(
              tipo
            ).toLowerCase()}...`}
            required
          />
          <small className={styles.textoAyuda}>
            Puedes usar saltos de línea y formato básico
          </small>
        </div>

        <div className={styles.acciones}>
          <button
            type="submit"
            className={styles.botonSubmit}
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : `Crear ${getTipoLabel(tipo)}`}
          </button>

          <button
            type="button"
            className={styles.botonCancelar}
            disabled={isSaving}
            onClick={() => router.push("/administrador")}
          >
            Cancelar
          </button>
        </div>

        <small className={styles.notaFormulario}>
          Los campos marcados con <span className={styles.required}>*</span> son
          obligatorios
        </small>
      </form>
    </main>
  );
}

function getTipoLabel(tipo) {
  switch (tipo) {
    case "noticia":
      return "Noticia";
    case "entrada":
      return "Entrada de Blog";
    case "evento":
      return "Evento";
    default:
      return "Contenido";
  }
}