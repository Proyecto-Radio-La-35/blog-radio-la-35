"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return(
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
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/eventos">Eventos</Link></li>
            <li><a href="#">Historia</a></li>
            <li><Link href="/programas">Programas</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/miembros">Miembros</Link></li>
            <li><Link href="/noticias">Noticias</Link></li>
            <li><Link href="/premios">Premios</Link></li>
            <li><Link href="/trailer">Trailer</Link></li>
          </ul>
        </nav>
      </footer>
    );
}