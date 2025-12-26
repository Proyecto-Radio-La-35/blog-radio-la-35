"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Administrador() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminEmailInput, setAdminEmailInput] = useState("");
  const [adminsList, setAdminsList] = useState([]);

  const router = useRouter();
  const userEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("user_email")
      : null;

  // Fetch de admins
  useEffect(() => {
    async function fetchAdmins() {
      const res = await fetch("/admins/list", {
        headers: { "x-admin-email": userEmail },
      });
      const data = await res.json();
      setAdminsList(data.admins);
    }
    fetchAdmins();
  }, [userEmail]);

  // Revisar permisos
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

  const handleAddAdmin = async () => {
    const res = await fetch("/admins/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-email": userEmail,
      },
      body: JSON.stringify({ email: adminEmailInput }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    setAdminsList(data.admins);
    setAdminEmailInput("");
  };

  const handleRemoveAdmin = async (email) => {
    const res = await fetch("/admins/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-email": userEmail,
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    setAdminsList(data.admins);
  };

  // Mostrar loading mientras verifica permisos
  if (isLoading) {
    return <div className={styles.loading}>Verificando permisos...</div>;
  }

  // Si no es admin, no mostrar nada (redirige)
  if (!isAdmin) return null;

  return (
    <main className={styles.contenedor}>
      <h1 className={styles.titulo}>Dashboard</h1>

      <h2>Creación</h2>
      <div className={styles.acciones}>
        <Link href="/crear?tipo=noticia" className={styles.cajaCrear}>
          Noticia
          <span>+</span>
        </Link>

        <Link href="/crear?tipo=entrada" className={styles.cajaCrear}>
          Entrada
          <span>+</span>
        </Link>

        <Link href="/crear?tipo=evento" className={styles.cajaCrear}>
          Evento
          <span>+</span>
        </Link>
      </div>

      <h2 className={styles.tituloSeccion}>Eliminación</h2>
      <div className={styles.acciones}>
        <Link href="/eliminar?tipo=noticia" className={styles.cajaEliminar}>
          Noticia
          <span>−</span>
        </Link>

        <Link href="/eliminar?tipo=entrada" className={styles.cajaEliminar}>
          Entrada
          <span>−</span>
        </Link>

        <Link href="/eliminar?tipo=evento" className={styles.cajaEliminar}>
          Evento
          <span>−</span>
        </Link>

        <Link href="/eliminar?tipo=comentarios" className={styles.cajaEliminar}>
          Comentarios
          <span>−</span>
        </Link>
      </div>

      <div className={styles.seccionAdmin}>
        <h2>Administradores</h2>

        <h3>Agregar administrador</h3>
        <input
          className={styles.inputAdmin}
          type="email"
          placeholder="Email del administrador"
          value={adminEmailInput}
          onChange={(e) => setAdminEmailInput(e.target.value)}
        />
        <button className={styles.botonAgregar} onClick={handleAddAdmin}>
          Agregar
        </button>

        <h3>Administradores actuales</h3>
        <ul className={styles.listaAdmins}>
          {adminsList.map((email) => (
            <li key={email} className={styles.itemAdmin}>
              {email}
              <button
                className={styles.botonEliminar}
                onClick={() => handleRemoveAdmin(email)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}