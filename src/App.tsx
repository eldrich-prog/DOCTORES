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
 * - Responsive design móvil-first ✅ MEJORADO
 * - Accesibilidad mejorada (ARIA labels)
 * 
 * @author Eldrich
 * @version 2.0
 */

import { useState, useEffect, useRef, useMemo, ReactNode } from "react";
import Footer from "./components/Footer.tsx";
import {
  Phone, Award, CheckCircle, Star, ArrowRight,
  Users, Quote, ClipboardCheck, Syringe, Stethoscope,
  Move, ThermometerSnowflake, Accessibility, Zap
} from "lucide-react";

// ============================================
// TIPOS Y INTERFACES
// ============================================

interface Servicio {
  icon: ReactNode;
  title: string;
  desc: string;
  badge?: string;
}

interface Testimonio {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  improvement?: number;
}

interface CounterState {
  exp: number;
  patients: number;
  certs: number;
}

// ============================================
// HOOK: Detectar si es móvil
// ============================================

/**
 * useIsMobile - Detecta si la pantalla es móvil (<768px)
 * Escucha cambios de tamaño de ventana
 */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function DoctorLanding() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [counts, setCounts] = useState<CounterState>({ exp: 0, patients: 0, certs: 0 });
  const [openServicios, setOpenServicios] = useState(false);
  const serviciosRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (serviciosRef.current && !serviciosRef.current.contains(e.target as Node)) {
        setOpenServicios(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const servicios: Servicio[] = useMemo(() => [
    {
      icon: <ClipboardCheck size={32} strokeWidth={1.5} />,
      title: "Diagnóstico Especializado",
      desc: "Identificación precisa del origen de tu lesión mediante ecografía musculoesquelética y pruebas de limitación funcional.",
      badge: "Alta Precisión"
    },
    {
      icon: <Syringe size={32} strokeWidth={1.5} />,
      title: "Intervencionismo Médico",
      desc: "Procedimientos mínimamente invasivos diseñados para reducir la inflamación y acelerar la regeneración de tejidos.",
      badge: "Popular"
    },
    {
      icon: <Move size={32} strokeWidth={1.5} />,
      title: "Rehabilitación Integral",
      desc: "Planes terapéuticos personalizados para recuperar la movilidad y fuerza tras cirugías o lesiones crónicas.",
    },
    {
      icon: <ThermometerSnowflake size={32} strokeWidth={1.5} />,
      title: "Manejo de Articulaciones",
      desc: "Tratamiento avanzado para el alivio de dolor persistente en hombros, rodillas, columna y extremidades.",
    },
    {
      icon: <Zap size={32} strokeWidth={1.5} />,
      title: "Terapia Intervencionista",
      desc: "Control del dolor crónico mediante técnicas de neuromodulación y medicina física de última generación.",
    },
    {
      icon: <Accessibility size={32} strokeWidth={1.5} />,
      title: "Análisis Biomecánico",
      desc: "Evaluación detallada de la postura y el movimiento para corregir vicios mecánicos y prevenir futuras recaídas.",
    },
  ], []);

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
      <div className="fixed inset-0 bg-[radial-gradient(#cbd5e1_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-sky-50/20 pointer-events-none z-0"></div>

      <NavBar scrolled={scrolled} />
      <HeroSection
        servicios={servicios}
        openServicios={openServicios}
        setOpenServicios={setOpenServicios}
        serviciosRef={serviciosRef}
        counts={counts}
      />
      <StatsBar counts={counts} />
      <ServicesSection
        servicios={servicios}
        activeService={activeService}
        setActiveService={setActiveService}
      />
      <TestimoniosSection testimonios={testimonios} />
      <Footer />
    </div>
  );
}

// ============================================
// NAVBAR
// ============================================

function NavBar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
      ? "bg-white/85 backdrop-blur-xl border-slate-200/40 py-3 shadow-lg shadow-slate-900/5"
      : "bg-transparent border-transparent py-4 md:py-6"
      }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 group cursor-pointer min-w-0">
          <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 bg-gradient-to-br from-teal-500 via-teal-600 to-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform duration-300">
            <Stethoscope className="text-white" size={20} />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-base md:text-lg tracking-tight text-slate-800 truncate">Dra. Flores Loyola</div>
            <div className="text-[9px] md:text-[10px] font-semibold text-teal-600 uppercase tracking-widest hidden sm:block">MEDICINA DE REHABILITACIÓN</div>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-10 items-center">
          {[
            { label: "Certificación", href: "https://atum.conacem.net/consultar/4c1b4b64-9e3f-416d-a483-e1c2d9e5fcb4" },
            { label: "Servicios", href: "#servicios" },
            { label: "Testimonios", href: "#testimonios" },
            { label: "Contacto", href: "#contacto" }
          ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors duration-300 relative group">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <button
            onClick={() => window.location.href = "https://wa.me/527717023676"}
            className="bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-teal-600/30 transition-all hover:shadow-teal-600/50 hover:-translate-y-0.5 flex items-center gap-2 group">
            <Phone size={16} className="group-hover:rotate-12 transition-transform" />
            WhatsApp
          </button>
        </div>

        {/* Mobile CTA button */}
        <button
          onClick={() => window.location.href = "https://wa.me/527717023676"}
          className="md:hidden bg-gradient-to-r from-teal-600 to-sky-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-teal-600/30 flex items-center gap-1.5">
          <Phone size={14} />
          <span>WhatsApp</span>
        </button>
      </div>
    </nav>
  );
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection({
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
    <section className="relative pt-28 md:pt-40 pb-16 md:pb-32 px-4 md:px-6 overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-teal-200/40 to-transparent blur-3xl -z-10 rounded-full opacity-40"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">

        {/* Contenido izquierdo */}
        <div className="relative space-y-6 md:space-y-8 animate-fadeIn">

          {/* Badge de especialidad */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-teal-200/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:shadow-md transition-all w-fit">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold text-teal-800 tracking-wide">
              Certificada · Huehutla de Reyes, Hidalgo
            </span>
          </div>

          {/* Headline principal — escalonado para móvil */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-slate-900 leading-[1.08] tracking-tight">
            Recupera tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-sky-600">movimiento</span>
            <span className="text-teal-600">.</span>
          </h1>

          {/* Sección de texto */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 group">
              <div className="bg-teal-50 p-2 rounded-lg border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                <Award size={18} className="text-teal-600 group-hover:text-white" />
              </div>
              <span className="text-sm md:text-base text-slate-700 font-bold tracking-tight leading-tight">
                Certificada por el Consejo Mexicano de Medicina de Rehabilitación
              </span>
            </div>

            <p className="text-base md:text-lg lg:text-xl text-slate-500 leading-relaxed max-w-xl font-light">
              Especialista dedicada a la <span className="text-slate-900 font-medium">recuperación funcional</span> y el manejo del dolor, brindando atención de vanguardia a la comunidad de la <span className="text-teal-600 font-medium italic">Huasteca</span>.
            </p>
          </div>

          {/* Botones CTA — columna en móvil, fila en desktop */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
            <button
              onClick={() => window.location.href = "https://wa.me/527717023676"}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-2xl font-bold shadow-xl shadow-teal-600/30 hover:shadow-teal-600/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group">
              <Phone size={18} className="group-hover:rotate-12 transition-transform" />
              Agendar Evaluación
            </button>

            <div className="relative" ref={serviciosRef}>
              <a                href="#servicios"
                className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-teal-300 text-slate-700 px-6 md:px-8 py-3.5 md:py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                Ver Servicios
              </a>
            </div>
          </div>
        </div>

        {/* Imagen — oculta en móvil, visible desde md */}
        <div className="relative justify-center group hidden md:flex">
          <div className="relative w-full max-w-md aspect-[4/5]">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-sky-400 rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 blur-2xl"></div>
            <img
              src="/DraMonserrat.jpg"
              className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl shadow-teal-900/20 relative z-10 border-4 border-white"
              alt="Dra. Monserrat Flores Loyola en consulta"
            />
            <FloatingBadge
              icon={<Users className="text-teal-600" size={22} />}
              title={`${counts.patients}+`}
              sub="Pacientes Recuperados"
              pos="bottom-12 -right-4 lg:-right-16"
              delay="delay-100"
            />
            <FloatingBadge
              icon={<Award className="text-sky-600" size={22} />}
              title={`${counts.exp} Años`}
              sub="De Experiencia"
              pos="top-20 -left-4 lg:-left-16"
              delay="delay-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// STATS BAR
// ============================================

function StatsBar({ counts }: { counts: CounterState }) {
  return (
    <section className="relative z-20 max-w-5xl mx-auto px-4 md:px-6 -mt-8 md:-mt-12 mb-12 md:mb-16">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-slate-200/50 border-2 border-slate-100 p-6 md:p-8 lg:p-12 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 md:divide-x-2 divide-slate-100">
          <StatItem num={counts.patients} suffix="+" label="Casos de éxito" />
          <StatItem num={counts.certs} suffix="" label="Certificaciones" />
          <StatItem num={98} suffix="%" label="Satisfacción" />
          <StatItem num={1} suffix="" label="Clínica Huehutla de Reyes" />
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERVICES SECTION
// ============================================

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
    <section id="servicios" className="py-16 md:py-32 px-4 md:px-6 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
            <Zap className="text-teal-600" size={18} />
            <span className="text-sm font-bold tracking-widest text-teal-600 uppercase">Especialidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-900 mb-4 md:mb-6 leading-tight">
            Soluciones a la medida
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Tratamientos avanzados para lesiones musculares, articulares, huesos y de sistema nervioso. Recuperación postoperatoria basados en la última evidencia médica.
          </p>
        </div>

        {/* Grid: 1 col móvil / 2 tablet / 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {servicios.map((s, i) => (
            <div
              key={i}
              className="group relative bg-white p-7 md:p-10 rounded-2xl md:rounded-3xl border-2 border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-teal-900/10 hover:border-teal-200 transition-all duration-500 overflow-hidden cursor-pointer"
              onMouseEnter={() => setActiveService(i)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Acento superior */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

              {/* Ícono */}
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 md:mb-8 group-hover:from-teal-100 group-hover:to-sky-100 group-hover:text-teal-600 transition-all duration-500 group-hover:scale-110">
                {s.icon}
              </div>

              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4 group-hover:text-teal-600 transition-colors">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6 md:mb-8 text-sm">{s.desc}</p>

              <div className={`inline-flex items-center gap-2 text-teal-600 font-bold transition-all duration-300 ${activeService === i ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
                Más detalles <ArrowRight size={18} />
              </div>

              {s.badge && (
                <div className="absolute top-5 right-5 text-[10px] font-bold text-teal-600 bg-teal-100 px-3 py-1.5 rounded-full">
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

// ============================================
// TESTIMONIOS SECTION
// ============================================

/**
 * TestimoniosSection
 * En móvil muestra solo 1 reseña.
 * En desktop muestra todas.
 */
function TestimoniosSection({ testimonios }: { testimonios: Testimonio[] }) {
  const isMobile = useIsMobile();

  // En móvil muestra solo el primer testimonio, en desktop todos
  const visibleTestimonios = isMobile ? testimonios.slice(0, 1) : testimonios;

  return (
    <section id="testimonios" className="py-16 md:py-32 px-4 md:px-6 bg-slate-900 relative overflow-hidden z-10">

      {/* Decoración */}
      <Quote className="absolute -top-20 -left-20 text-slate-800 opacity-30 rotate-12" size={300} />
      <div className="absolute -bottom-20 -right-20 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-tl from-teal-900/20 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Contenido izquierdo */}
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
                <Star className="text-teal-400" size={18} />
                <span className="text-sm font-bold tracking-widest text-teal-400 uppercase">Historias Reales</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white mb-4 md:mb-6 leading-tight">
                Lo que dicen mis pacientes
              </h2>
            </div>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed italic">
              "El verdadero éxito de mi tratamiento se mide en tu capacidad de volver a sonreír haciendo lo que amas sin dolor."
            </p>

            <div className="flex items-center gap-4 md:gap-6 pt-4 md:pt-6 border-t border-slate-700">
              <div className="flex -space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-900 bg-gradient-to-br from-teal-500 to-sky-600 flex items-center justify-center font-bold text-white text-sm shadow-lg"
                  >
                    <CheckCircle size={16} />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white font-bold text-xl md:text-2xl">1,200+</div>
                <div className="text-slate-400 text-xs md:text-sm">Pacientes satisfechos</div>
              </div>
            </div>
          </div>

          {/* Testimonios */}
          <div className="md:col-span-7 grid gap-4 md:gap-6">
            {visibleTestimonios.map((t, i) => (
              <TestimonioCard key={i} testimonio={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENTES UTILITARIOS
// ============================================

function FloatingBadge({
  icon, title, sub, pos, delay
}: {
  icon: ReactNode;
  title: string;
  sub: string;
  pos: string;
  delay: string;
}) {
  return (
    <div className={`absolute ${pos} bg-white/90 backdrop-blur-md p-4 md:p-5 rounded-2xl shadow-2xl shadow-slate-200/50 border-2 border-slate-100 flex items-center gap-3 md:gap-4 z-20 hover:-translate-y-2 transition-all duration-500 cursor-default ${delay}`}>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-2.5 md:p-3 rounded-xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-black text-slate-900 text-base md:text-lg leading-none mb-1">{title}</div>
        <div className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider">{sub}</div>
      </div>
    </div>
  );
}

function StatItem({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  return (
    <div className="text-center group p-2 md:p-4 transition-all duration-300 hover:scale-105">
      <div className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-1 md:mb-2 font-serif leading-none">
        {num}<span className="text-teal-600 ml-0.5 md:ml-1">{suffix}</span>
      </div>
      <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">{label}</div>
    </div>
  );
}

function TestimonioCard({ testimonio }: { testimonio: Testimonio }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md p-6 md:p-8 rounded-2xl md:rounded-3xl border-2 border-slate-700 hover:border-teal-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-teal-500/10">
      <div className="flex gap-1 mb-4 md:mb-6">
        {[...Array(testimonio.rating)].map((_, j) => (
          <Star key={j} size={14} className="fill-teal-400 text-teal-400" />
        ))}
      </div>

      <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-4 md:mb-6 font-light italic">
        "{testimonio.text}"
      </p>

      {testimonio.improvement && (
        <div className="inline-flex items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm font-bold text-teal-300 bg-teal-500/10 px-3 py-1.5 rounded-full">
          <Zap size={13} /> {testimonio.improvement}% de mejora
        </div>
      )}

      <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-slate-700">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-500 to-sky-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg shadow-teal-900/50 flex-shrink-0">
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