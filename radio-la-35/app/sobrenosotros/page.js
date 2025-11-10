"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function SobreNosotros() {
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
            <li><Link href="/sobrenosotros">Sobre nosotros</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><a href="#">Historia</a></li>
            <li><a href="#">Miembros</a></li>
            <li><a href="#">Premios</a></li>
            <li><a href="#">Programas</a></li>
            <li><Link href="/noticias">Noticias</Link></li>
            <li><a href="#">Trailer</a></li>
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

      <main className="contenido">
        <h1>Sobre nosotros</h1>
        
        <section className="info">
          <h2> Descripción de la radio y antecedentes de trabajo</h2>
          <p>
            En septiembre de 2019, la escuela recibió una pequeña dotación de equipos: una consola, parlantes y micrófonos tanto unidireccionales como de ambiente. Distintos docentes y alumnos se reunieron en el área digital del establecimiento educativo el jueves 5 de septiembre a las 18 hs, elaborando un acta inventario de todos los materiales recibidos. De allí surgió el interés de los jóvenes por realizar las conexiones necesarias para dar vida a los insumos radiales. La semana siguiente, nuevamente convocados con aviso a las autoridades, fueron los propios alumnos —junto a otros nuevos interesados— quienes abrieron las cajas y dieron sonido a cada parlante.
          </p>
        </section>

        <section className="info">
          <h2>Espacio y presencia digital</h2>
          <p>
            Radio La 35 cuenta con un espacio propio dentro de la institución escolar. Puede escucharse a través de plataformas online como Twitch, Spotify, Instagram, Facebook, Discord y YouTube.
          </p>
          <br/>
          <p>
            Además, en la radio se graban podcasts de diversos temas:
          </p>
          <ul>
            <li>Videojuegos,</li>
            <li>Campamento escolar Suyai,</li>
            <li>Actividades institucionales,</li>
            <li>Materias específicas, como Historia de 1er año.</li>
          </ul>
          <br/>
          <p>
            Los principales productores del material son los alumnos y alumnas, mientras que los docentes participan en segundo lugar, muchas veces a pedido de los mismos chicos, generando contenido colaborativo.
          </p>
        </section>

        <section className="info">
          <h2>Cobertura de eventos escolares</h2>
          <p>
            Otra de las actividades importantes de la radio es la cobertura de eventos escolares. Esto se realizó en 2019 y 2022, ubicando la radio en el centro del escenario del salón de actos y transmitiendo durante todo el día con entrevistas en vivo.
          </p>
          <br/>
          <p>
            Se han cubierto jornadas como:
          </p>
          <ul>
            <li>Día de la Educación Técnica,</li>
            <li>Día del Estudiante,</li>
            <li>Actos escolares,</li>
            <li>Eventos de la especialidad de Automotor.</li>
          </ul>
          <br/>
          <p>
            En julio de 2022, la radio cubrió el evento Entropía, donde los estudiantes entrevistaron a importantes autoridades ministeriales, entre ellos:
          </p>
          <ul>
            <li>Adrián Rastrelli, Director de Escuelas Técnicas,</li>
            <li>Lucia Faced, Subsecretaria de Coordinación Pedagógica y Equidad Educativa,</li>
            <li>Fabián Capponi, Director General de Educación Estatal.</li>
          </ul>
        </section>

        <section className="info">
          <h2>La institución escolar</h2>
          <p>
            El establecimiento educativo se destaca por su nivel académico y su trayectoria reconocida. Su pertenencia al barrio Villa Real está muy marcada: se encuentra próximo al Museo de Automotores de la calle Irigoyen y a diversos talleres mecánicos donde trabajan egresados del colegio.
          </p>
          <br/>
          <p>
            La participación de las familias es muy alta, y la Escuela 35 se caracteriza por su gran capacidad para generar encuentros, vínculos y relaciones interpersonales entre los distintos actores sociales. En definitiva, es una gran comunidad educativa.
          </p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <Image
            src="/radio_la_35.png"
            alt="Radio La 35"
            className="logo"
            width={70}
            height={70}
          />
          <div className="redes">
            <a href="https://www.facebook.com/Radiola35/">
              <Image src="/facebook.png" alt="Facebook" width={28} height={28} />
            </a>
            <a href="https://open.spotify.com/show/0Ocey29aAxzIZ7ml3jzVVQ">
              <Image src="/spotify.png" alt="Spotify" width={28} height={28} />
            </a>
            <a href="https://www.instagram.com/radiola35/">
              <Image src="/instagram.png" alt="Instagram" width={28} height={28} />
            </a>
            <a href="https://x.com/radiola35">
              <Image src="/twitter.png" alt="Twitter" width={28} height={28} />
            </a>
            <a href="https://www.youtube.com/channel/UCOH9BIW2C-04nOBjE08zDUw">
              <Image src="/youtube.png" alt="YouTube" width={41} height={28} />
            </a>
          </div>
        </div>
        <nav className="footer-nav">
          <ul>
            <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/eventos">Eventos</Link></li>
            <li><a href="#">Historia</a></li>
            <li><a href="#">Programas</a></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><a href="#">Miembros</a></li>
            <li><Link href="/noticias">Noticias</Link></li>
            <li><a href="#">Premios</a></li>
            <li><a href="#">Trailer</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}