import { MapPin, Phone, MessageCircle, Stethoscope, Clock, ShieldCheck, Instagram, Facebook } from "lucide-react";

/**
 * Footer Profesional - Optimizado para la práctica de la Dra. Flores Loyola
 * Localización: Huejutla de Reyes, Hgo.
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contacto" className="bg-white border-t border-slate-100 pt-20 pb-10 px-6 relative overflow-hidden">
            {/* Decoración sutil de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full blur-3xl -z-10 -mr-32 -mt-32"></div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Columna 1: Branding y Propuesta de Valor */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
                                <Stethoscope size={22} />
                            </div>
                            <div>
                                <span className="block font-serif font-bold text-lg text-slate-900 leading-none">Flores Loyola</span>
                                <span className="text-[10px] uppercase tracking-widest text-teal-600 font-bold">Medicina de Rehabilitación</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Especialista dedicada a la recuperación funcional y el manejo del dolor, brindando atención de vanguardia a la comunidad de la Huasteca.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/rehabiconciencia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-all shadow-sm">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.facebook.com/RehabiConCiencia" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-all shadow-sm">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Columna 2: Horarios de Atención */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                            <Clock size={16} className="text-teal-600" /> Horarios
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span>Lunes - Viernes</span>
                                <span className="font-bold text-slate-900">9:00 - 18:00</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-50 pb-2">
                                <span>Sábados</span>
                                <span className="font-bold text-slate-900">10:00 - 14:00</span>
                            </li>
                            <li className="flex justify-between text-slate-400">
                                <span>Domingos</span>
                                <span>Cerrado</span>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Ubicación Estratégica */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                            <MapPin size={16} className="text-teal-600" /> Dirección
                        </h4>

                        <div className="space-y-4">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                <span className="font-bold text-slate-900 block mb-1">
                                    Plaza Las Franquicias
                                </span>
                                Adolfo López Mateos, Col. Bugambilias<br />
                                Huejutla de Reyes, Hgo. CP 43000
                            </p>

                            <a
                                href="https://maps.app.goo.gl/nCWMcc8bHWy3Fbrk8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-teal-600 text-xs font-bold hover:underline relative z-10"
                            >
                                Ver en Google Maps <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Columna 4: Contacto Rápido */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Contacto Directo</h4>
                        <div className="space-y-3">
                            <a href="tel:+527717023676" className="flex items-center gap-4 group bg-slate-50 p-3 rounded-2xl hover:bg-teal-50 transition-colors">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm group-hover:scale-110 transition-transform">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <span className="block text-[10px] text-slate-400 uppercase font-black">Citas telefónicas</span>
                                    <span className="text-sm font-bold text-slate-700 underline decoration-teal-200 decoration-2">771 702 3676</span>
                                </div>
                            </a>
                            <a href="https://wa.me/527717023676" className="flex items-center gap-4 group bg-teal-600 p-3 rounded-2xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                                    <MessageCircle size={18} />
                                </div>
                                <div>
                                    <span className="block text-[10px] text-teal-100 uppercase font-black">WhatsApp</span>
                                    <span className="text-sm font-bold text-white">Enviar Mensaje</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Barra Legal y Cédula */}
                <div className="pt-8 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-slate-400 text-[11px] font-medium text-center md:text-left">
                            © {currentYear} Dra. Monserrat Flores Loyola. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                            <ShieldCheck size={12} className="text-teal-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cédula Prof: 123456789</span>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-teal-600 transition-colors">Privacidad</a>
                        <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-teal-600 transition-colors">Aviso Legal</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Icono auxiliar no importado previamente
function ArrowRight({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    );
}