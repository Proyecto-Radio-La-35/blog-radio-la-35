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
  const [adminAEliminar, setAdminAEliminar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const fetchAdmins = async () => {
    const res = await fetch(`${API_URL}/admins/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) return;

    const data = await res.json();
    setAdminsList(data.admins ?? []);
  };

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

  // Fetch de admins
  useEffect(() => {
    if (!isAdmin) return;
    fetchAdmins();
  }, [isAdmin]);

  const handleAddAdmin = async () => {
    const res = await fetch(`${API_URL}/admins/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify({ email: adminEmailInput }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    setAdminsList(data.admins);
    setAdminEmailInput("");
  };

  const handleRemoveAdmin = async (email) => {
    const res = await fetch(`${API_URL}/admins/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    setShowModal(false);

    // 🔁 volver a pedir la lista real
    await fetchAdmins();
  };

  // Mostrar loading mientras verifica permisos
  if (isLoading) {
    return <div className={styles.loading}>Verificando permisos...</div>;
  }

  // Si no es admin, no mostrar nada (redirige)
  if (!isAdmin) return null;

  return (
    <>
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
        <h2 className={styles.tituloSeccion}>Administradores</h2>

        <h3>Agregar administrador</h3>
        <div className={styles.agregarAdmin}>
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
        </div>

        <h3>Administradores actuales</h3>
        <ul className={styles.listaAdmins}>
          {Array.isArray(adminsList) && adminsList.map((email) => (
            <li key={email} className={styles.itemAdmin}>
              {email}
              <button
                className={styles.botonEliminar}
                onClick={() => {
                  setAdminAEliminar(email);
                  setShowModal(true)
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>

    {showModal && (
        <div className={styles.overlayModal}>
          <div className={styles.modal}>
            <h2 className={styles.tituloModal}>Confirmar eliminación</h2>
            <p className={styles.textoModal}>
              ¿Estás seguro de que deseas eliminar al administrador {adminAEliminar}? Esta acción
              no se puede deshacer.
            </p>
            <div className={styles.accionesModal}>
              <button
                className={styles.botonCancelar}
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancelar
              </button>
              <button
                className={styles.botonEliminar}
                onClick={() => handleRemoveAdmin(adminAEliminar)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}