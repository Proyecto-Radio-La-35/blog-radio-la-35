"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function EliminarContenido() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  const [loadingPublicaciones, setLoadingPublicaciones] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo");

  const nombreSingular = tipo === "comentarios" ? "Comentario" : "Publicación";
  const nombrePlural = tipo === "comentarios" ? "comentarios" : "publicaciones";
  const campoTitulo = tipo === "comentarios" ? "Mensaje" : "Título";

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminFlag = localStorage.getItem("is_admin");

    if (!token || adminFlag !== "true") {
      router.push("/");
      return;
    }

    setIsAdmin(true);
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (isAdmin && tipo) {
      cargarPublicaciones();
    }
  }, [isAdmin, tipo]);

  const cargarPublicaciones = async () => {
    setLoadingPublicaciones(true);
    try {
      const token = localStorage.getItem("access_token");

      const url =
        tipo === "comentarios"
          ? `${API_URL}/contenido/comentarios/todos`
          : `${API_URL}/contenido?tipo=${tipo}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setPublicaciones(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPublicaciones(false);
    }
  };

  const handleEliminar = async () => {
    if (!selectedId) return;

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        tipo === "comentarios"
          ? `${API_URL}/contenido/comentarios/${selectedId}`
          : `${API_URL}/contenido/${selectedId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Eliminación exitosa");
        setShowModal(false);
        setSelectedId(null);
        cargarPublicaciones(); // Recargar la lista
      } else {
        alert("Error al eliminar: " + data.error);
      }
    } catch {
      alert(`Error al eliminar ${nombreSingular.toLocaleLowerCase}`);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.verificacion}>
        Verificando permisos...
      </div>
    );
  }

  if (!isAdmin) return null;

  if (!tipo || !["noticia", "entrada", "evento", "comentarios"].includes(tipo)) {
    return (
      <div className={styles.mensajeCentral}>
        <p>Tipo de contenido inválido</p>
        <Link href="/administrador" className={styles.volver}>
          Volver al dashboard
        </Link>
      </div>
    );
  }

  const tipoCapitalizado = tipo.charAt(0).toUpperCase() + tipo.slice(1);

  return (
    <>
      <main className={styles.contenedor}>
        <div className={styles.cabecera}>
          <h1 className={styles.titulo}>Eliminar {tipoCapitalizado}</h1>
          <Link href="/administrador" className={styles.volver}>
            Volver al Dashboard
          </Link>
        </div>

        {loadingPublicaciones ? (
          <div className={styles.mensajeCentral}>
            Cargando {nombrePlural}...
          </div>
        ) : publicaciones.length === 0 ? (
          <div className={styles.mensajeCentral}>
            No hay {tipo} para eliminar
          </div>
        ) : (
          <div className={styles.wrapperTabla}>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{campoTitulo}</th>
                  <th>Fecha de creación</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {publicaciones.map((pub) => {
                  const id =
                    tipo === "comentarios"
                      ? pub.id_comentario
                      : pub.id_publicacion;

                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>
                        {tipo === "comentarios"
                          ? pub.contenido.slice(0, 40) + "..."
                          : pub.titulo}
                      </td>
                      <td>
                        {new Date(
                          tipo === "comentarios"
                            ? pub.fecha_comentario
                            : pub.created_at
                        ).toLocaleDateString("es-ES")}
                      </td>
                      <td>
                        <button
                          className={styles.botonEliminar}
                          onClick={() => {
                            setSelectedId(id);
                            setShowModal(true);
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showModal && (
        <div className={styles.overlayModal}>
          <div className={styles.modal}>
            <h2 className={styles.tituloModal}>Confirmar eliminación</h2>
            <p className={styles.textoModal}>
              ¿Estás seguro de que deseas eliminar esto? Esta acción
              no se puede deshacer.
            </p>
            <div className={styles.accionesModal}>
              <button
                className={styles.botonCancelar}
                onClick={() => {
                  setShowModal(false);
                  setSelectedId(null);
                }}
              >
                Cancelar
              </button>
              <button
                className={styles.botonEliminar}
                onClick={handleEliminar}
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