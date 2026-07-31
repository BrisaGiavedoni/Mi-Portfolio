import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Download,
  Globe,
  BriefcaseBusiness,
  Mail,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from "lucide-react";
import "./styles.css";

const projects = [
  {
    title: "Chulis Lovers",
    type: "Producto digital",
    image: "chulis-lovers.png",
    url: "https://chulis-lovers.vercel.app/",
    description:
      "E-commerce con catálogo filtrable, carrito y pedidos por WhatsApp.",
    tech: ["React", "Context API", "CSS"],
  },
  {
    title: "Lemax Pilates",
    type: "Web institucional",
    image: "lemax.png",
    url: "https://lemax-pilates.vercel.app/",
    description:
      "Una experiencia elegante y clara para un estudio de movimiento.",
    tech: ["React", "UX/UI", "CSS"],
  },
  {
    title: "ADAPets",
    type: "Producto digital",
    image: "adapets.png",
    url: "https://adapets.netlify.app/",
    description:
      "Plataforma para veterinaria y adopción con foco en experiencia.",
    tech: ["React", "UX/UI", "JavaScript"],
  },
  {
    title: "Petshop",
    type: "E-commerce",
    image: "petshop.png",
    url: "https://petshopbrisa.netlify.app/",
    description: "Tienda de mascotas responsive, simple y fácil de recorrer.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Superhero Page",
    type: "Landing page",
    image: "superhero.png",
    url: "https://superheropage.netlify.app/",
    description: "Landing temática con composición visual y personalidad.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Tabla periódica",
    type: "Experimento",
    image: "parte-de-la-tabla-periodica.png",
    url: "https://parte-de-la-tabla-periodica.netlify.app",
    description: "Maquetación visual interactiva para explorar elementos.",
    tech: ["HTML", "CSS"],
  },
];

const skills = [
  ["React.js", "react-logo.png"],
  ["JavaScript", "js.png"],
  ["Node.js", "nodejs.png"],
  ["HTML5", "html5.png"],
  ["CSS3", "css-3.png"],
  ["Git", "git.png"],
  ["Odoo 18", "Odoo.png"],
];

function CodeRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const characters = "{}[]<>/\\=;01const return npm React CSS";
    let columns = [];
    let animationFrame;
    let width = 0;
    let height = 0;

    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      columns = Array.from({ length: Math.ceil(width / 15) }, (_, index) => ({
        x: index * 15,
        y: Math.random() * -height,
        speed: 0.7 + Math.random() * 1.1,
        length: 7 + Math.floor(Math.random() * 12),
      }));
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      context.font = "11px DM Mono, monospace";
      columns.forEach((column) => {
        for (let index = 0; index < column.length; index += 1) {
          const character =
            characters[Math.floor(Math.random() * characters.length)];
          const opacity = (1 - index / column.length) * 0.42;
          context.fillStyle = `rgba(185, 140, 255, ${opacity})`;
          context.fillText(character, column.x, column.y - index * 15);
        }
        column.y += column.speed * 1.8;
        if (column.y - column.length * 15 > height)
          column.y = Math.random() * -180;
      });
      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    render();
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="code-rain" ref={canvasRef} aria-hidden="true" />;
}

function App() {
  const [filter, setFilter] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [isCartoon, setIsCartoon] = useState(true);
  const [contactStatus, setContactStatus] = useState("idle");

  const filters = [
    "Todos",
    "Producto digital",
    "Web institucional",
    "E-commerce",
    "Landing page",
  ];

  const visibleProjects =
    filter === "Todos"
      ? projects
      : projects.filter((project) => project.type === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("section-visible");
            window.requestAnimationFrame(() =>
              entry.target.classList.add("section-visible"),
            );
          } else {
            entry.target.classList.remove("section-visible");
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".section-reveal")
      .forEach((section) => sectionObserver.observe(section));

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, [filter]);

  useEffect(() => {
    let frame;
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress);
      frame = window.requestAnimationFrame(updateProgress);
    };
    frame = window.requestAnimationFrame(updateProgress);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const portraitTimer = window.setInterval(() => {
      setIsCartoon((mode) => !mode);
    }, 4200);
    return () => window.clearInterval(portraitTimer);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("No se pudo enviar");
      form.reset();
      setContactStatus("success");
    } catch {
      setContactStatus("error");
    }
  };

  return (
    <div className={light ? "app light" : "app"}>
      <header className="topbar">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span>BG</span>
          <strong>Brisa Giavedoni</strong>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#work" onClick={closeMenu}>
            Trabajo
          </a>
          <a href="#about" onClick={closeMenu}>
            Sobre mí
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contacto
          </a>
          <button
            className="theme-button"
            onClick={() => setLight(!light)}
            aria-label="Cambiar tema"
          >
            {light ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell section-reveal">
          <div className="hero-copy reveal is-visible">
            <p className="eyebrow">
              DESARROLLADORA FULLSTACK <span>● DISPONIBLE PARA PROYECTOS</span>
            </p>
            <h1>
              Interfaces que
              <br />
              <em>se sienten.</em>
            </h1>
            <p className="hero-text">
              Diseño y desarrollo experiencias web con intención: claras,
              expresivas y hechas para que las personas quieran volver.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Ver proyectos <ArrowDown size={15} />
              </a>
              <a className="text-link" href="#contact">
                Hablemos <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="hero-art reveal is-visible">
            <CodeRain />
            <div className="art-ring ring-one" />
            <div className="art-ring ring-two" />
            <div className={`art-card ${isCartoon ? "cartoon" : ""}`}>
              <img
                className="art-image"
                src={
<<<<<<< HEAD
                  isCartoon
                    ? `${import.meta.env.BASE_URL}img/avatar-comic.png`
                    : `${import.meta.env.BASE_URL}img/avatarabout.png`
=======
                 <img src={isCartoon ? `${import.meta.env.BASE_URL}img/avatar-comic.png` : `${import.meta.env.BASE_URL}img/avatarabout.png`} alt="Avatar" />
>>>>>>> 9fc46e6b6332dc52b61f8b4cbbc33f0137160157
                }
                alt={
                  isCartoon ? "Retrato ilustrado de Brisa" : "Retrato de Brisa"
                }
              />
              <span>
                CREATIVE
                <br />
                DEVELOPER
              </span>
            </div>
            <div className="art-caption">
              ROSARIO, SANTA FE
              <br />
              <b>ARG / 2025</b>
            </div>
            <button
              className="portrait-switch"
              onClick={() => setIsCartoon((mode) => !mode)}
              aria-label="Cambiar entre ilustración y retrato"
            >
              {isCartoon ? "VER FOTO" : "VER CÓMIC"} <ArrowUpRight size={12} />
            </button>
          </div>
        </section>

        <section
          id="work"
          className="work section-shell section-reveal"
          aria-labelledby="work-title"
        >
          <div className="section-heading reveal">
            <div>
              <p className="kicker">PROYECTOS SELECCIONADOS</p>
              <h2 id="work-title">
                Trabajo con
                <br />
                <em>curiosidad.</em>
              </h2>
            </div>
            <p>
              Una selección de proyectos donde estrategia, diseño y código se
              encuentran para resolver algo real.
            </p>
          </div>

          <div className="filters" role="tablist">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <a
                className={`project reveal ${index === 0 ? "featured" : ""}`}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                key={project.title}
                style={{ "--delay": `${index * 70}ms` }}
              >
                <div className="project-image">
                  <img
                    src={`${import.meta.env.BASE_URL}img/${project.image}`}
                    alt={`Vista previa de ${project.title}`}
                  />
                  <span className="project-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div className="project-meta">
                  <div>
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="tags">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="about section-shell section-reveal"
          aria-labelledby="about-title"
        >
          <div className="about-grid">
            <div className="section-heading reveal">
              <div>
                <p className="kicker">SOBRE MÍ</p>
                <h2 id="about-title">
                  Código con
                  <br />
                  <em>sensibilidad.</em>
                </h2>
              </div>
            </div>
            <div className="about-copy reveal">
              <p className="lead">
                Soy Brisa, artista digital y desarrolladora fullstack. Me gusta
                convertir ideas complejas en interfaces que se sienten simples.
              </p>
              <p>
                Desde el front-end hasta el back-end, disfruto cada parte del
                proceso de creación. Busco que cada decisión tenga un porqué y
                que el resultado no solo funcione, sino que conecte.
              </p>
              <a
                className="button outline"
                href={`${import.meta.env.BASE_URL}img/CV BRISA GIAVEDONI.pdf`}
                download="CV_Brisa_Giavedoni.pdf"
              >
                Descargar CV <Download size={15} />
              </a>
            </div>
          </div>

          <div className="skills-list reveal">
            {skills.map(([skill, image], index) => (
              <div
                className="skill reveal"
                key={skill}
                style={{ "--delay": `${index * 90}ms` }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}img/${image}`}
                  alt=""
                />
                <strong>{skill}</strong>
                <span className="skill-mark">
                  <Code2 size={14} />
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="contact section-shell section-reveal"
          aria-labelledby="contact-title"
        >
          <div className="contact-top reveal">
            <p className="kicker">CONTACTO</p>
            <h2 id="contact-title">
              ¿Creamos algo
              <br />
              <em>memorable?</em>
            </h2>
            <a href="mailto:giavedonibrisa@gmail.com" className="email-link">
              <Mail size={18} /> giavedonibrisa@gmail.com{" "}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="contact-bottom reveal">
            <div>
              <p>
                Estoy abierta a colaborar en proyectos que tengan una buena
                pregunta detrás.
              </p>
              <div className="socials">
                <a
                  href="https://github.com/BrisaGiavedoni"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Globe size={15} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/giavedoni-brisa/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BriefcaseBusiness size={15} /> LinkedIn
                </a>
              </div>
            </div>

            <form
              className="contact-form"
              action="https://formspree.io/f/xwpndpdn"
              method="POST"
              onSubmit={handleContactSubmit}
            >
              <input
                type="hidden"
                name="_subject"
                value="Nuevo contacto desde el portfolio de Brisa"
                readOnly
              />
              <label htmlFor="name">Tu nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="¿Cómo te llamás?"
                required
                minLength="2"
              />
              <label htmlFor="email">Tu email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
              />
              <label htmlFor="message">Tu mensaje</label>
              <textarea
                id="message"
                name="message"
                placeholder="Contame sobre tu idea..."
                required
                minLength="10"
                rows="4"
              />
              <button
                className="button primary"
                type="submit"
                disabled={contactStatus === "sending"}
              >
                {contactStatus === "sending" ? "Enviando..." : "Enviar mensaje"}
                <Send size={15} />
              </button>
              {contactStatus === "success" && (
                <p className="form-feedback success">
                  Mensaje enviado. Te respondo pronto.
                </p>
              )}
              {contactStatus === "error" && (
                <p className="form-feedback error">
                  No se pudo enviar. Escribime directamente a
                  giavedonibrisa@gmail.com.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2025 BRISA GIAVEDONI</span>
        <span>HECHO CON REACT + CURIOSIDAD</span>
        <a href="#top">
          VOLVER ARRIBA <ArrowUpRight size={12} />
        </a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);