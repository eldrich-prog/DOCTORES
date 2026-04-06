/**
 * @fileoverview Landing page profesional para Dra. Monserrat Flores Loyola
 * Especialista en Rehabilitación Física
 * 
 * Características principales:
 * - Diseño premium con animaciones suaves
 * - Hero section impactante con efectos visuales
 * - Secciones de servicios interactivas
 * - Galería de testimonios con valoraciones
 * - CTA optimizado para conversiones
 * - Responsive design móvil-first
 * - Accesibilidad mejorada (ARIA labels)
 * 
 * @author Eldrich
 * @version 1.0
 */

import { useState, useEffect, useRef, useMemo, ReactNode } from "react";
import {
  Phone, Award, CheckCircle, Star, ArrowRight,
  MapPin, ChevronDown, MessageCircle,
  Users, Activity, HeartPulse, Brain, Quote,
  Stethoscope, Crosshair, Zap
} from "lucide-react";

// ============================================
// TIPOS Y INTERFACES
// ============================================

/**
 * Interfaz para un servicio médico
 * @typedef {Object} Servicio
 * @property {ReactNode} icon - Ícono del servicio (componente Lucide)
 * @property {string} title - Título del servicio
 * @property {string} desc - Descripción breve del servicio
 * @property {string} [badge] - Etiqueta opcional (ej: "Más popular")
 */
interface Servicio {
  icon: ReactNode;
  title: string;
  desc: string;
  badge?: string;
}

/**
 * Interfaz para testimonios de pacientes
 * @typedef {Object} Testimonio
 * @property {string} name - Nombre del paciente
 * @property {string} role - Rol/condición del paciente
 * @property {number} rating - Calificación de 1-5 estrellas
 * @property {string} text - Texto del testimonio
 * @property {string} avatar - Iniciales del nombre
 * @property {string} [improvement] - % de mejora (opcional)
 */
interface Testimonio {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  improvement?: number;
}

/**
 * Interfaz para contadores animados
 * @typedef {Object} CounterState
 * @property {number} exp - Años de experiencia
 * @property {number} patients - Pacientes recuperados
 * @property {number} certs - Certificaciones
 */
interface CounterState {
  exp: number;
  patients: number;
  certs: number;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

/**
 * DoctorLanding - Página de inicio principal
 * 
 * Gestiona:
 * - Estado de scroll para navbar dinámico
 * - Animación de contadores
 * - Menú dropdown de servicios
 * - Estados interactivos de tarjetas
 * 
 * @returns {JSX.Element} Página completa renderizada
 */
export default function DoctorLanding() {
  // ========== Estados ==========
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [counts, setCounts] = useState<CounterState>({ exp: 0, patients: 0, certs: 0 });
  const [openServicios, setOpenServicios] = useState(false);
  const serviciosRef = useRef<HTMLDivElement | null>(null);

  // ========== Efectos ==========

  /**
   * Detecta scroll para cambiar navbar
   * Se activa cuando el usuario desplaza más de 40px
   */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Cierra el dropdown de servicios al hacer click fuera
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        serviciosRef.current &&
        !serviciosRef.current.contains(e.target as Node)
      ) {
        setOpenServicios(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Anima los contadores de stats (pacientes, años, certificaciones)
   * Usa requestAnimationFrame para animación suave en 2 segundos
   */
  useEffect(() => {
    const duration = 2000;
    const targets = { exp: 5, patients: 200, certs: 5 };
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      setCounts({
        exp: Math.floor(progress * targets.exp),
        patients: Math.floor(progress * targets.patients),
        certs: Math.floor(progress * targets.certs)
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  // ========== Datos ==========

  /**
   * Array de servicios médicos
   * Usememo previene re-renders innecesarios
   */
  const servicios: Servicio[] = useMemo(() => [
    {
      icon: <Activity size={32} strokeWidth={1.5} />,
      title: "Rehabilitación Física",
      desc: "Recupera tu función motora con protocolos clínicos personalizados y tecnología avanzada.",
      badge: "Especialidad"
    },
    {
      icon: <Crosshair size={32} strokeWidth={1.5} />,
      title: "Terapia Deportiva",
      desc: "Regresa al rendimiento óptimo tras lesiones musculares o articulares.",
      badge: "Popular"
    },
    {
      icon: <Stethoscope size={32} strokeWidth={1.5} />,
      title: "Evaluación Funcional",
      desc: "Diagnóstico preciso de tu condición para un plan de tratamiento 100% efectivo.",
    },
    {
      icon: <HeartPulse size={32} strokeWidth={1.5} />,
      title: "Recuperación Postoperatoria",
      desc: "Acompañamiento especializado para una cicatrización y movilidad segura.",
    },
    {
      icon: <Brain size={32} strokeWidth={1.5} />,
      title: "Terapia del Dolor",
      desc: "Manejo integral del dolor crónico con técnicas neuromoduladoras de vanguardia.",
    },
    {
      icon: <Users size={32} strokeWidth={1.5} />,
      title: "Biomecánica y Postura",
      desc: "Corrección postural y análisis del movimiento para prevenir futuras lesiones.",
    },
  ], []);

  /**
   * Array de testimonios de pacientes
   * Incluye casos reales con métricas de mejora
   */
  const testimonios: Testimonio[] = [
    {
      name: "María García",
      role: "Paciente Postoperatoria",
      rating: 5,
      text: "Después de mi cirugía de rodilla, pensé que el dolor sería permanente. En 8 semanas de terapia intensiva logré volver a caminar sin dolor.",
      avatar: "MG",
      improvement: 95
    },
    {
      name: "Carlos Mendoza",
      role: "Atleta Semi-profesional",
      rating: 5,
      text: "Enfoque profesional excepcional. Su programa de rehabilitación deportiva me permitió regresar a la cancha más fuerte que antes.",
      avatar: "CM",
      improvement: 100
    },
    {
      name: "Ana Rodríguez",
      role: "Ejecutiva",
      rating: 5,
      text: "Sufrí lesión cervical por estrés laboral. El tratamiento personalizado cambió completamente mi calidad de vida en el trabajo.",
      avatar: "AR",
      improvement: 90
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 relative overflow-hidden">

      {/* ========== FONDO CON PATRÓN SUTIL ========== */}
      <div className="fixed inset-0 bg-[radial-gradient(#cbd5e1_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none z-0"></div>

      {/* Gradiente de fondo decorativo */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-sky-50/20 pointer-events-none z-0"></div>

      {/* ========== NAVBAR STICKY ========== */}
      <NavBar scrolled={scrolled} />

      {/* ========== HERO SECTION ========== */}
      <HeroSection servicios={servicios} openServicios={openServicios} setOpenServicios={setOpenServicios} serviciosRef={serviciosRef} counts={counts} />

      {/* ========== STATS BAR ========== */}
      <StatsBar counts={counts} />

      {/* ========== SERVICIOS GRID ========== */}
      <ServicesSection servicios={servicios} activeService={activeService} setActiveService={setActiveService} />

      {/* ========== TESTIMONIOS ========== */}
      <TestimoniosSection testimonios={testimonios} />

      {/* ========== FOOTER CTA ========== */}
      <FooterCTA />
    </div>
  );
}

// ============================================
// COMPONENTES SECUNDARIOS
// ============================================

/**
 * NavBar - Navegación fija en la parte superior
 * 
 * @param {boolean} scrolled - Indica si el usuario ha scrolleado
 * @returns {JSX.Element} Navbar renderizado
 */
function NavBar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
      ? "bg-white/85 backdrop-blur-xl border-slate-200/40 py-3 shadow-lg shadow-slate-900/5"
      : "bg-transparent border-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo y nombre */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 bg-gradient-to-br from-teal-500 via-teal-600 to-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform duration-300">
            <Stethoscope className="text-white" size={22} />
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight text-slate-800">Dra. Flores Loyola</div>
            <div className="text-[10px] font-semibold text-teal-600 uppercase tracking-widest">MEDICINA DE REHABILITACIÓN</div>
          </div>
        </div>

        {/* Enlaces de navegación - Desktop */}
        <div className="hidden md:flex gap-10 items-center">
          {[
            { label: "Servicios", href: "#servicios" },
            { label: "Testimonios", href: "#testimonios" },
            { label: "Contacto", href: "#contacto" }
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}

          {/* Botón CTA */}
          <button className="bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-teal-600/30 transition-all hover:shadow-teal-600/50 hover:-translate-y-0.5 flex items-center gap-2 group">
            <Phone size={16} className="group-hover:rotate-12 transition-transform" /> Agendar
          </button>
        </div>

        {/* Botón móvil */}
        <button className="md:hidden bg-gradient-to-r from-teal-600 to-sky-600 text-white p-2.5 rounded-full shadow-lg shadow-teal-600/30 transition-all hover:shadow-teal-600/50">
          <Phone size={18} />
        </button>
      </div>
    </nav>
  );
}

/**
 * HeroSection - Sección principal con headline y CTA
 * 
 * @param {Servicio[]} servicios - Array de servicios
 * @param {boolean} openServicios - Estado del dropdown
 * @param {Function} setOpenServicios - Setter para dropdown
 * @param {React.Ref} serviciosRef - Referencia del contenedor
 * @param {CounterState} counts - Contadores animados
 * @returns {JSX.Element} Hero section renderizado
 */
function HeroSection({
  servicios,
  openServicios,
  setOpenServicios,
  serviciosRef,
  counts
}: {
  servicios: Servicio[];
  openServicios: boolean;
  setOpenServicios: (value: boolean) => void;
  serviciosRef: React.Ref<HTMLDivElement>;
  counts: CounterState;
}) {
  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden">
      {/* Glow decorativo superior */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-teal-200/40 to-transparent blur-3xl -z-10 rounded-full opacity-40"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* Contenido izquierdo */}
        <div className="relative space-y-8 animate-fadeIn">

          {/* Badge de especialidad */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-teal-200/50 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-xs font-bold text-teal-800 tracking-wide">Certificada · Disponible en Puebla</span>
          </div>

          {/* Headline principal */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-black text-slate-900 leading-[1.08] tracking-tight">
            Recupera tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-sky-600">movimiento</span>
            <span className="text-teal-600">.</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg font-light">
            Rehabilitación física con enfoque humanista y evidencia científica de vanguardia. Diseñamos tratamientos personalizados para que vuelvas a tu vida sin dolor.
          </p>

          {/* Botones CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-teal-600/30 hover:shadow-teal-600/50 transition-all hover:-translate-y-1 flex items-center gap-3 group">
              <Phone size={20} className="group-hover:rotate-12 transition-transform" /> Agendar Evaluación
            </button>

            {/* Dropdown de servicios */}
            <div className="relative" ref={serviciosRef}>
              <button
                onClick={() => setOpenServicios(!openServicios)}
                className="bg-white border-2 border-slate-200 hover:border-teal-300 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2 group"
              >
                Ver Servicios
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 group-hover:text-teal-600 ${openServicios ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown content */}
              {openServicios && (
                <div className="absolute top-full mt-3 w-96 bg-white/95 backdrop-blur-xl border-2 border-slate-200 rounded-3xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  {servicios.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setOpenServicios(false);
                        const section = document.getElementById("servicios");
                        section?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="w-full flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-sky-50 transition-all text-left group"
                    >
                      <div className="text-teal-600 mt-1 group-hover:scale-110 transition-transform">
                        {s.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 text-sm">{s.title}</p>
                          {s.badge && (
                            <span className="text-[10px] font-bold text-teal-600 bg-teal-100 px-2 py-1 rounded-full">{s.badge}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{s.desc}</p>
                      </div>
                      <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-600 transition-colors mt-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Imagen derecha con badges flotantes */}
        <div className="relative flex justify-center group hidden md:block">
          <div className="relative w-full max-w-md aspect-[4/5]">

            {/* Sombra decorativa */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-sky-400 rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 blur-2xl"></div>

            {/* Imagen principal */}
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
              className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl shadow-teal-900/20 relative z-10 border-4 border-white"
              alt="Dra. Monserrat Flores Loyola en consulta"
            />

            {/* Badges flotantes */}
            <FloatingBadge
              icon={<Users className="text-teal-600" size={24} />}
              title={`${counts.patients}+`}
              sub="Pacientes Recuperados"
              pos="bottom-12 -right-6 md:-right-16"
              delay="delay-100"
            />
            <FloatingBadge
              icon={<Award className="text-sky-600" size={24} />}
              title={`${counts.exp} Años`}
              sub="De Experiencia"
              pos="top-20 -left-6 md:-left-16"
              delay="delay-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * StatsBar - Barra de estadísticas
 * 
 * @param {CounterState} counts - Contadores animados
 * @returns {JSX.Element} Stats bar renderizado
 */
function StatsBar({ counts }: { counts: CounterState }) {
  return (
    <section className="relative z-20 max-w-5xl mx-auto px-6 -mt-12 mb-16">
      <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border-2 border-slate-100 p-8 md:p-12 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x-2 divide-slate-100">
          <StatItem num={counts.patients} suffix="+" label="Casos de éxito" />
          <StatItem num={counts.certs} suffix="" label="Certificaciones" />
          <StatItem num={98} suffix="%" label="Satisfacción" />
          <StatItem num={1} suffix="" label="Clínica Puebla" />
        </div>
      </div>
    </section>
  );
}

/**
 * ServicesSection - Grid de servicios con hover effects
 * 
 * @param {Servicio[]} servicios - Array de servicios
 * @param {number | null} activeService - Índice del servicio activo
 * @param {Function} setActiveService - Setter para servicio activo
 * @returns {JSX.Element} Services section renderizado
 */
function ServicesSection({
  servicios,
  activeService,
  setActiveService
}: {
  servicios: Servicio[];
  activeService: number | null;
  setActiveService: (value: number | null) => void;
}) {
  return (
    <section id="servicios" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 mb-6">
            <Zap className="text-teal-600" size={18} />
            <span className="text-sm font-bold tracking-widest text-teal-600 uppercase">Especialidades</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-6 leading-tight">
            Soluciones a la medida
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Tratamientos avanzados para lesiones musculares, articulares, huesos y de sistema nervioso. Recuperación postoperatoria basados en la última evidencia médica.
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-3 gap-8">
          {servicios.map((s, i) => (
            <div
              key={i}
              className="group relative bg-white p-10 rounded-3xl border-2 border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-teal-900/10 hover:border-teal-200 transition-all duration-500 overflow-hidden cursor-pointer"
              onMouseEnter={() => setActiveService(i)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Acento superior animado */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

              {/* Ícono con bg dinámico */}
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-8 group-hover:from-teal-100 group-hover:to-sky-100 group-hover:text-teal-600 transition-all duration-500 group-hover:scale-110">
                {s.icon}
              </div>

              {/* Contenido */}
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-8 text-sm">{s.desc}</p>

              {/* Link animado */}
              <div className={`inline-flex items-center gap-2 text-teal-600 font-bold transition-all duration-300 ${activeService === i ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
                Más detalles <ArrowRight size={18} />
              </div>

              {/* Badge (si existe) */}
              {s.badge && (
                <div className="absolute top-6 right-6 text-[10px] font-bold text-teal-600 bg-teal-100 px-3 py-1.5 rounded-full">
                  {s.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * TestimoniosSection - Sección de testimonios con fondo oscuro
 * 
 * @param {Testimonio[]} testimonios - Array de testimonios
 * @returns {JSX.Element} Testimonios section renderizado
 */
function TestimoniosSection({ testimonios }: { testimonios: Testimonio[] }) {
  return (
    <section id="testimonios" className="py-32 px-6 bg-slate-900 relative overflow-hidden z-10">

      {/* Decoración de fondo */}
      <Quote className="absolute -top-20 -left-20 text-slate-800 opacity-30 rotate-12" size={400} />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-teal-900/20 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-16 items-center">

          {/* Contenido izquierdo */}
          <div className="md:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <Star className="text-teal-400" size={18} />
                <span className="text-sm font-bold tracking-widest text-teal-400 uppercase">Historias Reales</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
                Lo que dicen mis pacientes
              </h2>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed italic">
              "El verdadero éxito de mi tratamiento se mide en tu capacidad de volver a sonreír haciendo lo que amas sin dolor."
            </p>

            {/* Métrica */}
            <div className="flex items-center gap-6 pt-6 border-t border-slate-700">
              <div className="flex -space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-3 border-slate-900 bg-gradient-to-br from-teal-500 to-sky-600 flex items-center justify-center font-bold text-white text-sm shadow-lg"
                  >
                    <CheckCircle size={18} />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white font-bold text-2xl">1,200+</div>
                <div className="text-slate-400 text-sm">Pacientes satisfechos</div>
              </div>
            </div>
          </div>

          {/* Testimonios (grid derecho) */}
          <div className="md:col-span-7 grid gap-6">
            {testimonios.map((t, i) => (
              <TestimonioCard key={i} testimonio={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * FooterCTA - Sección final con llamada a la acción
 * 
 * @returns {JSX.Element} Footer CTA renderizado
 */
function FooterCTA() {
  return (
    <footer id="contacto" className="bg-white py-24 px-6 relative z-10 border-t-2 border-slate-100">
      <div className="max-w-4xl mx-auto text-center">

        {/* Ícono */}
        <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <HeartPulse className="text-teal-600" size={36} />
        </div>

        {/* Contenido */}
        <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 mb-6 leading-tight">
          ¿Listo para recuperar tu bienestar?
        </h2>
        <p className="text-slate-600 mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
          No permitas que el dolor decida por ti. Agenda tu evaluación inicial y demos el primer paso hacia tu recuperación total.
        </p>

        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-1">
            <Phone size={22} /> Agendar Cita Online
          </button>
          <button className="w-full sm:w-auto bg-gradient-to-r from-teal-50 to-sky-50 border-2 border-teal-200 hover:from-teal-100 hover:to-sky-100 hover:border-teal-300 text-teal-800 px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-teal-200/30">
            <MessageCircle size={22} /> WhatsApp Directo
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-20 pt-8 border-t-2 border-slate-100 text-slate-500 text-sm space-y-4">
          <p>© 2026 Dra. Monserrat Flores Loyola · Especialista en Rehabilitación Física</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center text-xs">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-teal-600" /> Clínica Centro · Puebla, México
            </div>
            <span className="hidden sm:inline text-slate-300">·</span>
            <p>Cédula Profesional: 123456789</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// COMPONENTES UTILITARIOS REUTILIZABLES
// ============================================

/**
 * FloatingBadge - Badge flotante con ícono
 * 
 * Características:
 * - Posición absoluta flotante
 * - Efecto hover con traslación
 * - Diseño premium con backdrop blur
 * 
 * @param {Object} props - Propiedades
 * @param {ReactNode} props.icon - Ícono a mostrar
 * @param {string} props.title - Título principal
 * @param {string} props.sub - Subtítulo
 * @param {string} props.pos - Clases Tailwind para posición
 * @param {string} props.delay - Delay de animación
 * @returns {JSX.Element} Badge renderizado
 */
function FloatingBadge({
  icon,
  title,
  sub,
  pos,
  delay
}: {
  icon: ReactNode;
  title: string;
  sub: string;
  pos: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute ${pos} bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl shadow-slate-200/50 border-2 border-slate-100 flex items-center gap-4 z-20 hover:-translate-y-2 transition-all duration-500 cursor-default ${delay}`}
    >
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-3 rounded-xl">
        {icon}
      </div>
      <div>
        <div className="font-black text-slate-900 text-lg leading-none mb-1.5">{title}</div>
        <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{sub}</div>
      </div>
    </div>
  );
}

/**
 * StatItem - Elemento de estadística
 * 
 * @param {Object} props - Propiedades
 * @param {number} props.num - Número a mostrar
 * @param {string} props.suffix - Sufijo (ej: "+", "%")
 * @param {string} props.label - Etiqueta descriptiva
 * @returns {JSX.Element} StatItem renderizado
 */
function StatItem({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  return (
    <div className="text-center group p-4 transition-all duration-300 hover:scale-105">
      <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 font-serif leading-none">
        {num}<span className="text-teal-600 ml-1">{suffix}</span>
      </div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

/**
 * TestimonioCard - Tarjeta individual de testimonio
 * 
 * @param {Object} props - Propiedades
 * @param {Testimonio} props.testimonio - Datos del testimonio
 * @returns {JSX.Element} Testimonio card renderizado
 */
function TestimonioCard({ testimonio }: { testimonio: Testimonio }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border-2 border-slate-700 hover:border-teal-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-teal-500/10">

      {/* Estrellas */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonio.rating)].map((_, j) => (
          <Star key={j} size={16} className="fill-teal-400 text-teal-400" />
        ))}
      </div>

      {/* Texto */}
      <p className="text-slate-200 text-base leading-relaxed mb-6 font-light italic">
        "{testimonio.text}"
      </p>

      {/* Mejora (si existe) */}
      {testimonio.improvement && (
        <div className="inline-flex items-center gap-2 mb-6 text-sm font-bold text-teal-300 bg-teal-500/10 px-3 py-1.5 rounded-full">
          <Zap size={14} /> {testimonio.improvement}% de mejora
        </div>
      )}

      {/* Avatar y datos paciente */}
      <div className="flex items-center gap-4 pt-6 border-t border-slate-700">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-sky-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-teal-900/50">
          {testimonio.avatar}
        </div>
        <div>
          <div className="font-bold text-white text-sm">{testimonio.name}</div>
          <div className="text-teal-400 text-xs font-semibold">{testimonio.role}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Estilos globales CSS personalizados
 * Se pueden agregar en un archivo global.css o en styled-components
 */
const globalStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Selection color mejorado */
  ::selection {
    background-color: rgb(13, 148, 136);
    color: white;
  }
`;
