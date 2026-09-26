import { useEffect, useRef, useState, type ReactNode } from "react";

// ─── Número de WhatsApp del barbero (sin +, sin espacios) ───────────────────
const WHATSAPP_NUMBER = "51919530059"; // ← reemplazar con el número real

// ─── Fotos ──────────────────────────────────────────────────────────────────
const photos = {
  hero: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=2200&q=90",
  gallery: [
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1599011176306-4a96f1516d4d?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85",
  ],
};

// ─── Servicios ───────────────────────────────────────────────────────────────
const services = [
  { number: "01", title: "Corte signature", description: "Asesoría, lavado y corte diseñado para tu estilo y tipo de cabello.", time: "50 min", price: "S/ 32", icon: "✂️" },
  { number: "02", title: "Ritual de barba", description: "Perfilado preciso, vapor y toalla caliente con acabado hidratante.", time: "40 min", price: "S/ 28", icon: "🪒" },
  { number: "03", title: "Corte + barba", description: "La experiencia completa de la casa, sin prisas y con atención total.", time: "75 min", price: "S/ 52", icon: "👑" },
  { number: "04", title: "Face reset", description: "Limpieza profunda, exfoliación y mascarilla facial detox de carbón.", time: "30 min", price: "S/ 24", icon: "💆" },
  { number: "05", title: "Servicio VIP", description: "Corte a domicilio con la misma calidad y precisión de la barbería. Nosotros llegamos a ti.", time: "90 min", price: "S/ 65", icon: "🏠", isVip: true },
];

// ─── Productos ───────────────────────────────────────────────────────────────
const products = [
  { name: "Pomada mate", category: "Fijación / 100 ml", price: "S/ 19", image: "https://images.unsplash.com/photo-1567721664085-6752c1ef6ade?auto=format&fit=crop&w=800&q=85" },
  { name: "Aceite para barba", category: "Nutrición / 30 ml", price: "S/ 22", image: "https://images.unsplash.com/photo-1775126454589-53b494ca57ac?auto=format&fit=crop&w=800&q=85" },
  { name: "Crema styling", category: "Textura / 75 ml", price: "S/ 18", image: "https://images.unsplash.com/photo-1734892498467-9344ffc6917b?auto=format&fit=crop&w=800&q=85" },
  { name: "Kit Daily Ritual", category: "Cuidado / 3 piezas", price: "S/ 49", image: "https://images.unsplash.com/photo-1718490953028-021d352b14fd?auto=format&fit=crop&w=800&q=85" },
];

// ─── Barberos ─────────────────────────────────────────────────────────────────
const barbers = [
  {
    name: "Carlos Mendoza",
    role: "Master Barber · Fundador",
    specialty: "Fades & Cortes Clásicos",
    years: "8 años de experiencia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Diego Ríos",
    role: "Senior Barber",
    specialty: "Barba & Diseños",
    years: "5 años de experiencia",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Andrés Vega",
    role: "Junior Barber",
    specialty: "Cortes Modernos & Skincare",
    years: "3 años de experiencia",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=85",
  },
];

// ─── Antes/Después ────────────────────────────────────────────────────────────
const beforeAfterPairs = [
  {
    label: "Fade clásico",
    before: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=900&q=85",
    after:  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=85",
  },
  {
    label: "Ritual de barba",
    before: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?auto=format&fit=crop&w=900&q=85",
    after:  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85",
  },
  {
    label: "Corte Signature",
    before: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85",
    after:  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=85",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "¿Necesito reservar con anticipación?", a: "Recomendamos reservar con al menos 24 horas de anticipación, especialmente los fines de semana. Puedes hacerlo directamente por WhatsApp en minutos." },
  { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos efectivo, Yape, Plin y transferencias bancarias. Todos los precios son finales, sin cobros adicionales." },
  { q: "¿Cuánto tiempo dura un servicio?", a: "Un corte básico demora entre 30 y 50 minutos. El servicio completo (corte + barba) puede tomar hasta 75 minutos. El servicio VIP a domicilio toma 90 minutos." },
  { q: "¿El servicio a domicilio tiene costo adicional?", a: "El servicio VIP tiene precio propio (S/ 65) y está disponible en zonas cercanas al Callao. Escríbenos por WhatsApp para confirmar cobertura en tu zona." },
  { q: "¿Qué productos usan en los servicios?", a: "Trabajamos exclusivamente con productos profesionales de alta gama: Kevin Murphy, Layrite y American Crew. También los vendemos para que mantengas el look en casa." },
  { q: "¿Puedo llegar sin cita?", a: "Sí, recibimos clientes sin cita según disponibilidad. Para garantizar tu atención, lo mejor es escribirnos por WhatsApp antes de venir." },
];

// ─── Reseñas ─────────────────────────────────────────────────────────────────
const reviews = [
  { name: "Rafael M.", rating: 5, text: "El mejor fade que me han hecho en toda mi vida. Llevo 3 meses viniendo y nunca me decepciona. Carlos es un artista.", service: "Corte Signature" },
  { name: "Sebastián T.", rating: 5, text: "Vine por primera vez y definitivamente no será la última. La atención es increíble y el resultado fue exactamente lo que quería.", service: "Corte + Barba" },
  { name: "Álvaro R.", rating: 5, text: "El servicio de Face Reset es espectacular. Nunca pensé que una barbería fuera a cuidarme tanto la piel. Totalmente recomendado.", service: "Face Reset" },
  { name: "Josué L.", rating: 5, text: "Pedí el servicio VIP a domicilio y quedé flipando. Misma calidad que en el local pero en la comodidad de mi depa. Vale cada sol.", service: "Servicio VIP" },
  { name: "Erick P.", rating: 5, text: "El ritual de barba me dejó con la cara como seda. El equipo es muy profesional y el ambiente del local es súper premium.", service: "Ritual de Barba" },
];

// ─── Programa de Fidelidad ────────────────────────────────────────────────────
const LOYALTY_TOTAL = 6;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function openWhatsApp(message: string) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
}

// ─── Icono SVG genérico ───────────────────────────────────────────────────────
function Icon({ children, size = 20, className = "" }: { children: ReactNode; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <Icon size={18}>
      <path d={direction === "right" ? "M5 12h14m-6-6 6 6-6 6" : "M19 12H5m6-6-6 6 6 6"} />
    </Icon>
  );
}

// ─── Hook de animación al hacer scroll ──────────────────────────────────────
function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("fade-in-visible");
        else el.classList.remove("fade-in-visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useFadeInOnScroll();
  return (
    <div ref={ref} className={`fade-in-section ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Icono WhatsApp ───────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Componente de Reserva en línea (sección dedicada) ──────────────────────
function InlineBooking() {
  const [selService, setSelService] = useState<string | null>(null);
  const [selBarber, setSelBarber] = useState<string>("Cualquier barbero");
  const barberOptions = ["Cualquier barbero", ...barbers.map((b) => b.name)];
  const serviceObj = services.find((s) => s.title === selService);

  const handleConfirm = () => {
    if (!selService) return;
    const barberLine = selBarber === "Cualquier barbero" ? "Cualquier barbero disponible" : selBarber;
    const message =
      `Hola Men´s Point, quiero reservar una cita.\n\n` +
      `- *Servicio:* ${serviceObj?.title}${serviceObj?.isVip ? " (a domicilio)" : ""}\n` +
      `- *Barbero:* ${barberLine}\n` +
      `- *Precio referencial:* ${serviceObj?.price}\n\n` +
      `Por favor indíquenme disponibilidad. Gracias!`;
    openWhatsApp(message);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
      {/* Columna izquierda: pasos */}
      <div className="space-y-8">
        <FadeIn>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">01 · Servicio</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {services.map((service) => (
              <button
                key={service.title}
                onClick={() => setSelService(service.title)}
                className={`group flex items-center justify-between border p-4 text-left transition ${
                  selService === service.title
                    ? "border-black bg-black text-white"
                    : "border-black/12 text-black hover:border-black/40"
                }`}
              >
                <div>
                  <p className={`font-display text-base font-extrabold uppercase tracking-[-0.02em] ${selService === service.title ? "text-white" : "text-black"}`}>
                    {service.title}
                  </p>
                  <p className={`mt-0.5 text-xs ${selService === service.title ? "text-white/60" : "text-black/40"}`}>{service.description}</p>
                </div>
                <strong className={`ml-4 shrink-0 text-sm font-black ${selService === service.title ? "text-white" : "text-black"}`}>{service.price}</strong>
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">02 · Barbero</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {barberOptions.map((name) => (
              <button
                key={name}
                onClick={() => setSelBarber(name)}
                className={`border px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                  selBarber === name
                    ? "border-black bg-black text-white"
                    : "border-black/15 text-black/60 hover:border-black/40 hover:text-black"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Columna derecha: resumen */}
      <FadeIn delay={120}>
        <div className="sticky top-24 border border-black/10 p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Tu reserva</p>

          <div className="mt-5 space-y-4 border-b border-black/08 pb-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-black/35">Servicio</span>
              <span className="text-sm font-bold text-black">{selService ?? "Por elegir"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-black/35">Barbero</span>
              <span className="text-sm font-bold text-black">{selBarber}</span>
            </div>
            {serviceObj && (
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-black/35">Precio</span>
                <span className="text-sm font-black text-black">{serviceObj.price}</span>
              </div>
            )}
          </div>

          <p className="mt-4 text-[10px] leading-5 text-black/35">
            Te confirmamos disponibilidad en minutos. La cita se coordina directamente por WhatsApp.
          </p>

          <button
            onClick={handleConfirm}
            disabled={!selService}
            className={`mt-6 flex h-14 w-full items-center justify-between px-5 text-xs font-black uppercase tracking-wider transition ${
              selService
                ? "bg-[#25D366] text-white hover:bg-[#1ebe5d]"
                : "cursor-not-allowed bg-black/5 text-black/25"
            }`}
          >
            <span className="flex items-center gap-3">
              <WhatsAppIcon size={18} />
              {selService ? "Confirmar por WhatsApp" : "Elige un servicio"}
            </span>
            {selService && <Arrow />}
          </button>
        </div>
      </FadeIn>
    </div>
  );
}

// ─── Componente Slider Antes/Después ─────────────────────────────────────────
function BeforeAfterSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) updatePos(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };

  const onTouchMove = (e: React.TouchEvent) => { updatePos(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="before-after-container w-full" style={{ aspectRatio: "3/4", maxHeight: "600px" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      aria-label={`Comparación antes y después: ${label}`}
    >
      {/* Imagen ANTES */}
      <img src={before} alt={`Antes - ${label}`} className="w-full h-full object-cover grayscale" />

      {/* Imagen DESPUÉS (recortada) */}
      <div className="before-after-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={after} alt={`Después - ${label}`} className="w-full h-full object-cover" />
      </div>

      {/* Divisor */}
      <div className="before-after-divider" style={{ left: `${pos}%` }} />
      <div className="before-after-handle" style={{ left: `${pos}%` }}>
        <Icon size={18} className="text-black">
          <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
        </Icon>
      </div>

      {/* Etiquetas */}
      <span className="absolute bottom-4 left-4 z-20 bg-black/70 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">Antes</span>
      <span className="absolute bottom-4 right-4 z-20 bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-black">Después</span>
    </div>
  );
}

// ─── Componente FAQ Item ──────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="pr-8 text-sm font-bold text-black sm:text-base">{q}</span>
        <span className={`shrink-0 grid h-8 w-8 place-items-center border border-black/15 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <Icon size={16} className="text-black">
            <path d="M12 5v14M5 12h14" />
          </Icon>
        </span>
      </button>
      <div className={`faq-answer ${open ? "open" : ""}`}>
        <p className="pb-5 text-sm leading-7 text-black/60">{a}</p>
      </div>
    </div>
  );
}

// ─── Modal de reserva ─────────────────────────────────────────────────────────
function BookingModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string>("Cualquier barbero");
  const barberOptions = ["Cualquier barbero", ...barbers.map((b) => b.name)];

  const handleSend = () => {
    if (!selected) return;
    const service = services.find((s) => s.title === selected);
    const barberLine = selectedBarber === "Cualquier barbero" ? "Cualquier barbero disponible" : selectedBarber;
    const message =
      `Hola Men´s Point 👋, quiero reservar una cita.\n\n` +
      `📋 *Servicio:* ${service?.title}${service?.isVip ? " 🏠 (a domicilio)" : ""}\n` +
      `💈 *Barbero:* ${barberLine}\n` +
      `💰 *Precio referencial:* ${service?.price}\n\n` +
      `Por favor indíquenme disponibilidad. Gracias!`;
    openWhatsApp(message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-5 backdrop-blur-md" onMouseDown={onClose}>
      <div className="glass-card booking-modal relative w-full max-w-2xl p-7 sm:p-10" onMouseDown={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-white/15 transition hover:border-white hover:text-white" aria-label="Cerrar">
          <Icon><path d="M6 6l12 12M18 6 6 18" /></Icon>
        </button>

        <p className="eyebrow">Reserva online</p>
        <h2 className="font-display mt-4 text-4xl font-black uppercase tracking-[-0.04em]">Tu silla te espera.</h2>
        <p className="mt-3 text-sm leading-6 text-white/45">
          Elige el servicio y tu barbero, y te abriremos WhatsApp para coordinar día y hora.
        </p>

        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">01 · Servicio</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <button
              key={service.number}
              onClick={() => setSelected(service.title)}
              className={`service-card text-left ${selected === service.title ? "service-card--active" : ""} ${service.isVip ? "service-card--vip sm:col-span-2 lg:col-span-1" : ""}`}
              aria-pressed={selected === service.title}
            >
              <span className="text-2xl">{service.icon}</span>
              <div className="mt-3">
                <h3 className="font-display mt-1 text-base font-extrabold uppercase tracking-[-0.03em]">{service.title}</h3>
                <p className="mt-1 text-xs leading-5 text-white/40">{service.description}</p>
              </div>
              <div className="mt-3 flex items-center justify-end">
                <strong className="text-base text-white">{service.price}</strong>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">02 · Barbero</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {barberOptions.map((name) => (
            <button
              key={name}
              onClick={() => setSelectedBarber(name)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition ${selectedBarber === name ? "bg-white text-black border-white" : "border-white/20 text-white/60 hover:border-white/50"}`}
            >
              {name}
            </button>
          ))}
        </div>

        <button
          onClick={handleSend}
          disabled={!selected}
          className={`mt-6 flex h-14 w-full items-center justify-between px-6 text-xs font-black uppercase tracking-wider transition ${selected ? "bg-[#25D366] text-white hover:bg-[#1ebe5d]" : "cursor-not-allowed bg-white/10 text-white/30"}`}
        >
          <span className="flex items-center gap-3">
            <WhatsAppIcon size={20} />
            {selected ? `Confirmar por WhatsApp` : "Selecciona un servicio"}
          </span>
          {selected && <Arrow />}
        </button>
      </div>
    </div>
  );
}

// ─── App principal ────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [wishlist, setWishlist] = useState<Record<string, number>>({});
  const [toastProduct, setToastProduct] = useState("");
  const [showWishlistPanel, setShowWishlistPanel] = useState(false);
  const [loyaltyCount, setLoyaltyCount] = useState(3); // simulación: 3 de 6 sellos
  const [reviewIndex, setReviewIndex] = useState(0);
  const productTrack = useRef<HTMLDivElement>(null);

  const scrollProducts = (direction: number) => {
    productTrack.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  const addToWishlist = (name: string) => {
    setWishlist((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
    setToastProduct(name);
    window.setTimeout(() => setToastProduct(""), 2000);
  };

  const updateQuantity = (name: string, delta: number) => {
    setWishlist((prev) => {
      const nextQty = (prev[name] || 0) + delta;
      const next = { ...prev };
      if (nextQty <= 0) delete next[name];
      else next[name] = nextQty;
      return next;
    });
  };

  const removeFromWishlist = (name: string) => {
    setWishlist((prev) => { const next = { ...prev }; delete next[name]; return next; });
  };

  const sendWishlistToWhatsApp = () => {
    const entries = Object.entries(wishlist);
    if (entries.length === 0) return;
    const list = entries.map(([p, qty]) => `• ${qty}x ${p}`).join("\n");
    const message = `Hola Men´s Point, estoy interesado en los siguientes productos:\n\n${list}\n\n¿Tienen disponibilidad? Gracias!`;
    openWhatsApp(message);
    setShowWishlistPanel(false);
  };

  // Auto-avance del carrusel de reseñas
  useEffect(() => {
    const t = window.setInterval(() => setReviewIndex((i) => (i + 1) % reviews.length), 4500);
    return () => window.clearInterval(t);
  }, []);

  const wishlistTotal = Object.values(wishlist).reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-[#f5f5f5]">

      {/* ── HEADER ── */}
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#" className="flex items-center gap-3" aria-label="Men´s Point, inicio">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white text-[11px] font-black tracking-tighter text-white">MP</span>
            <span className="font-display text-lg font-black uppercase tracking-[-0.03em]">Men´s Point</span>
          </a>

          <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 md:flex">
            <a className="nav-link transition hover:text-white" href="#servicios">Servicios</a>
            <a className="nav-link transition hover:text-white" href="#barberos">Equipo</a>
            <a className="nav-link transition hover:text-white" href="#trabajo">Galería</a>
            <a className="nav-link transition hover:text-white" href="#tienda">Tienda</a>
            <a className="nav-link transition hover:text-white" href="#visitanos">Visítanos</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="relative hidden h-10 items-center gap-2 border border-white/15 px-4 text-[11px] font-bold uppercase tracking-wider transition hover:border-[#25D366] hover:text-[#25D366] sm:flex"
              aria-label={`Lista de productos, ${wishlistTotal} seleccionados`}
              onClick={() => setShowWishlistPanel(true)}
            >
              <WhatsAppIcon size={16} />
              {wishlistTotal > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#25D366] text-[10px] text-white">
                  {wishlistTotal}
                </span>
              )}
              Lista
            </button>
            <button className="grid h-10 w-10 place-items-center border border-white/15 md:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Abrir menú">
              <Icon><path d={menuOpen ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} /></Icon>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-5 border-t border-white/10 bg-[#080808]/95 px-6 py-7 text-sm font-bold uppercase tracking-wider backdrop-blur-xl md:hidden">
            {[["Servicios", "#servicios"], ["Equipo", "#barberos"], ["Galería", "#trabajo"], ["Tienda", "#tienda"], ["Visítanos", "#visitanos"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      {/* ── HERO (sección oscura) ── */}
      <section className="relative flex h-dvh min-h-150 flex-col justify-center pt-20 section-dark">
        <img src={photos.hero} alt="Barbero realizando un perfilado con navaja" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,4,.97)_0%,rgba(4,4,4,.65)_50%,rgba(4,4,4,.2)_80%),linear-gradient(0deg,#080808_0%,transparent_40%)]" />
        <div className="noise absolute inset-0 opacity-20" />

        <div className="relative z-10 mx-auto w-full max-w-360 px-5 sm:px-8 lg:px-12">
          <div className="hero-animate-eyebrow mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/50">
            <span className="eyebrow-line hero-animate-line" />
            Estilo, precisión y confianza
          </div>

          <div className="hero-brand hero-animate-brand mb-3">
            <span className="hero-brand-text font-display font-black uppercase">Men´s Point</span>
          </div>

          <h1 className="hero-animate-h1 font-display max-w-3xl text-[clamp(2.4rem,5.5vw,5.5rem)] font-black uppercase leading-[0.85] tracking-[-0.065em] text-white/75">
            Corte <br /><span className="text-outline">con actitud.</span>
          </h1>

          <div className="hero-animate-cta mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <button
              onClick={() => document.getElementById('reserva')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex h-14 items-center gap-8 bg-white px-7 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#e0e0e0]"
            >
              Reserva tu cita
              <span className="transition-transform group-hover:translate-x-1"><Arrow /></span>
            </button>
            <p className="max-w-xs text-sm leading-6 text-white/50">
              Precisión, técnica y ritual. Tu mejor versión empieza en el sillón.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS (sección blanca) ── */}
      <section id="servicios" className="relative py-24 sm:py-32 section-white">
        <div className="relative mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-12 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow-dark">01 / El ritual</p>
                <h2 className="section-title mt-4 text-black">Nuestros servicios</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-black/45">
                Oficio tradicional con una visión actual. Cada servicio se adapta a ti, nunca al revés.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-2 md:grid-cols-2">
            {services.map((service, i) => (
              <FadeIn key={service.number} delay={i * 60}>
                <article
                  className={`light-card group relative cursor-pointer overflow-hidden p-5 sm:p-6 ${service.isVip ? "md:col-span-2" : ""}`}
                  onClick={() => document.getElementById('reserva')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {service.isVip && (
                    <span className="mb-3 inline-block bg-black px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white">
                      ✦ A domicilio
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-extrabold uppercase tracking-[-0.03em] text-black sm:text-2xl">{service.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-black/45">{service.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <strong className="text-lg font-black text-black">{service.price}</strong>
                      <span className="grid h-9 w-9 place-items-center border border-black/15 text-black transition group-hover:bg-black group-hover:text-white">
                        <Arrow />
                      </span>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BARBEROS (sección oscura) ── */}
      <section id="barberos" className="py-24 sm:py-32 section-dark">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-14 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">02 / El equipo</p>
                <h2 className="section-title mt-4">Nuestros barberos</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/45">
                Artesanos del corte. Cada uno con su propio estilo y una obsesión: hacerte lucir impecable.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {barbers.map((barber, i) => (
              <FadeIn key={barber.name} delay={i * 100}>
                <div className="barber-card h-96 sm:h-120">
                  <img src={barber.image} alt={`Barbero ${barber.name}`} />
                  <div className="barber-card-info">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">{barber.role}</p>
                    <h3 className="font-display mt-2 text-xl font-black uppercase tracking-[-0.03em]">{barber.name}</h3>
                    <p className="mt-1 text-xs text-white/50">{barber.specialty}</p>
                    <p className="mt-2 text-[10px] text-white/35">{barber.years}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANTES Y DESPUÉS (sección blanca) ── */}
      <section className="py-24 sm:py-32 section-white">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-14 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow-dark">03 / La transformación</p>
                <h2 className="section-title mt-4 text-black">Antes y después</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-black/45">
                Arrastra la barra y descubre la diferencia. El resultado habla por sí solo.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-3">
            {beforeAfterPairs.map((pair, i) => (
              <FadeIn key={pair.label} delay={i * 100}>
                <div className="mx-auto w-full max-w-sm">
                  <h3 className="mb-4 text-center font-display text-lg font-black uppercase tracking-[-0.03em] text-black">
                    {pair.label}
                  </h3>
                  <BeforeAfterSlider
                    before={pair.before}
                    after={pair.after}
                    label={pair.label}
                  />
                  <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-widest text-black/35">
                    ← Arrastra para comparar →
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA (sección oscura) ── */}
      <section id="trabajo" className="py-24 sm:py-32 section-dark">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-14 flex items-end justify-between">
              <div>
                <p className="eyebrow">04 / Corte a corte</p>
                <h2 className="section-title mt-4">Nuestro trabajo</h2>
              </div>
              <a href="https://www.instagram.com/menspoint.peru?stkn=MTRqZjdndXNtNTl6NQ==" target="_blank" rel="noreferrer" className="hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-white/50 sm:flex transition hover:text-white">
                Ver en Instagram <Arrow />
              </a>
            </div>
          </FadeIn>
          <div className="gallery-grid">
            {photos.gallery.map((photo, index) => (
              <figure key={photo} className={`gallery-item gallery-item-${index + 1} group`}>
                <img src={photo} alt={`Trabajo de barbería Men´s Point, estilo ${index + 1}`} />
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-black/60 p-5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
                  MP / Look {String(index + 1).padStart(2, "0")}
                  <Arrow />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIENDA (sección blanca) ── */}
      <section id="tienda" className="py-24 sm:py-32 section-white">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow-dark">05 / Sigue el ritual</p>
                <h2 className="section-title mt-4 text-black">Cuida tu estilo</h2>
              </div>
              <div className="hidden gap-2 sm:flex">
                <button onClick={() => scrollProducts(-1)} className="slider-button" aria-label="Productos anteriores"><Arrow direction="left" /></button>
                <button onClick={() => scrollProducts(1)} className="slider-button" aria-label="Productos siguientes"><Arrow /></button>
              </div>
            </div>
            <p className="mb-8 text-sm text-black/40">
              Selecciona los productos que te interesan y te enviamos la lista directamente por WhatsApp.
            </p>
          </FadeIn>

          <div ref={productTrack} className="no-scrollbar flex snap-x gap-4 overflow-x-auto">
            {products.map((product) => {
              const qty = wishlist[product.name] || 0;
              return (
                <article key={product.name} className="light-card group min-w-[84vw] snap-start overflow-hidden sm:min-w-85 lg:min-w-[calc(33.333%-11px)]">
                  <div className="relative h-80 overflow-hidden bg-[#e8e8e8]">
                    <img className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={product.image} alt={product.name} />
                    <span className="absolute left-5 top-5 border border-black/15 bg-white/70 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] backdrop-blur-md text-black">
                      Men´s Point Essentials
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-5 p-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-black/40">{product.category}</p>
                      <h3 className="mt-2 font-display text-xl font-bold uppercase text-black">{product.name}</h3>
                      <p className="mt-2 font-bold text-black">{product.price}</p>
                    </div>
                    <button
                      onClick={() => addToWishlist(product.name)}
                      className={`flex h-12 min-w-12 shrink-0 items-center justify-center gap-2 px-3 transition font-bold text-xs ${qty > 0 ? "bg-[#25D366] text-white hover:bg-[#1ebe5d]" : "bg-black text-white hover:bg-[#333]"}`}
                      aria-label={`Agregar ${product.name} a la lista`}
                    >
                      {qty > 0 ? (
                        <><Icon size={16}><path d="M12 5v14M5 12h14" /></Icon><span>(x{qty})</span></>
                      ) : (
                        <Icon><path d="M12 5v14M5 12h14" /></Icon>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {Object.keys(wishlist).length > 0 && (
            <FadeIn>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowWishlistPanel(true)}
                  className="flex items-center gap-3 bg-[#25D366] px-6 py-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#1ebe5d]"
                >
                  <WhatsAppIcon size={18} />
                  Ver mi lista ({wishlistTotal}) · Pedir por WhatsApp
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── PROGRAMA DE FIDELIDAD (sección oscura) ── */}
      <section className="py-24 sm:py-32 section-dark">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <p className="eyebrow">06 / Recompensas</p>
              <h2 className="section-title mt-4">Programa de fidelidad</h2>
              <p className="mt-6 text-sm leading-7 text-white/50">
                Por cada visita a Men´s Point acumulas un sello. Al completar <strong className="text-white">6 sellos</strong>, tu próximo corte es completamente <strong className="text-white">gratis</strong>. Sin complicaciones, sin apps, solo lealtad recompensada.
              </p>
              <div className="mt-8 space-y-3">
                {[["✦", "Acumulas 1 sello por cada visita"], ["✦", "Sin vencimiento, los sellos no caducan"], ["✦", "El 6° corte es 100% gratis"], ["✦", "Aplica para todos los servicios"]].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="text-white/30">{icon}</span> {text}
                  </div>
                ))}
              </div>
              <button
                onClick={() => openWhatsApp("Hola Men´s Point, me interesa el programa de fidelidad. ¿Cómo funciona exactamente?")}
                className="mt-8 flex h-12 items-center gap-4 border border-white/20 px-6 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
              >
                <WhatsAppIcon size={16} /> Preguntar por WhatsApp
              </button>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Tu tarjeta de sellos</p>
                    <p className="mt-1 text-lg font-black uppercase">Ejemplo · {loyaltyCount} de {LOYALTY_TOTAL}</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[11px] font-black">MP</span>
                </div>

                <div className="grid grid-cols-6 gap-3 mb-6">
                  {Array.from({ length: LOYALTY_TOTAL }).map((_, i) => (
                    <div
                      key={i}
                      className={`loyalty-stamp ${i < 3 ? "filled text-white" : "empty text-black/20"}`}
                      aria-label={`Sello ${i + 1}`}
                    >
                      {i < 3 ? "✂️" : "○"}
                    </div>
                  ))}
                </div>

                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${(3 / LOYALTY_TOTAL) * 100}%` }} />
                </div>
                <p className="mt-3 text-[10px] text-white/35 uppercase tracking-wider">
                  3 cortes para tu corte gratis · Ejemplo ilustrativo
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── RESEÑAS (sección blanca) ── */}
      <section className="py-24 sm:py-32 section-white overflow-hidden">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-14 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow-dark">07 / Lo que dicen</p>
                <h2 className="section-title mt-4 text-black">Reseñas reales</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)} className="slider-button" aria-label="Reseña anterior"><Arrow direction="left" /></button>
                <button onClick={() => setReviewIndex((i) => (i + 1) % reviews.length)} className="slider-button" aria-label="Siguiente reseña"><Arrow /></button>
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((offset) => {
              const review = reviews[(reviewIndex + offset) % reviews.length];
              return (
                <FadeIn key={`${reviewIndex}-${offset}`} delay={offset * 80}>
                  <div className="light-card p-7 h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "star-filled" : "star-empty"}>★</span>
                      ))}
                    </div>
                    <p className="text-sm leading-7 text-black/70 flex-1">"{review.text}"</p>
                    <div className="mt-6 flex items-center justify-between border-t border-black/08 pt-4">
                      <div>
                        <p className="text-sm font-bold text-black">{review.name}</p>
                        <p className="text-[10px] text-black/40 uppercase tracking-wider">{review.service}</p>
                      </div>
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-black text-white text-xs font-black">
                        {review.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Indicadores */}
          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === reviewIndex % reviews.length ? "w-8 bg-black" : "w-3 bg-black/20"}`}
                aria-label={`Reseña ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (sección oscura) ── */}
      <section className="py-24 sm:py-32 section-dark">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <p className="eyebrow">08 / Preguntas</p>
              <h2 className="section-title mt-4">Preguntas frecuentes</h2>
              <p className="mt-6 text-sm leading-7 text-white/45">
                Todo lo que necesitas saber antes de visitarnos. ¿No encuentras tu respuesta? Escríbenos por WhatsApp.
              </p>
              <button
                onClick={() => openWhatsApp("Hola Men´s Point 👋, tengo una consulta sobre sus servicios.")}
                className="mt-8 flex h-12 items-center gap-4 bg-white px-6 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#e0e0e0]"
              >
                <WhatsAppIcon size={16} /> Escribir al WhatsApp
              </button>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="bg-white rounded-none p-2">
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── RESERVA DEDICADA (sección blanca) ── */}
      <section id="reserva" className="py-24 sm:py-32 section-white">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-12 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow-dark">09 / Tu turno</p>
                <h2 className="section-title mt-4 text-black">Reserva tu cita</h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-black/45">
                Elige tu servicio y barbero. Te confirmamos disponibilidad en minutos por WhatsApp.
              </p>
            </div>
          </FadeIn>

          <InlineBooking />
        </div>
      </section>

      {/* ── FOOTER / VISÍTANOS (sección oscura) ── */}
      <footer id="visitanos" className="border-t border-black/10 section-white">
        <div className="mx-auto grid max-w-360 lg:grid-cols-2">
          <FadeIn className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
            <p className="eyebrow-dark">10 / Ven a vernos</p>
            <h2 className="font-display mt-5 max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.055em] text-black sm:text-7xl">
              Tu próximo corte empieza aquí.
            </h2>
            <button
              onClick={() => document.getElementById('reserva')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-9 flex h-14 items-center gap-7 bg-black px-7 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#333]"
            >
              Reserva tu cita <Arrow />
            </button>

            <div className="mt-16 grid gap-10 border-t border-black/10 pt-10 sm:grid-cols-2">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">Ubicación</p>
                <p className="mt-4 text-sm leading-6 text-black/65">
                  Av. 1 de Mayo 399<br />Carmen de La Legua - Reynoso 07006
                </p>
                <a href="https://maps.app.goo.gl/ELrpbHqTFGgR3Ru9A" target="_blank" rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:text-black/50">
                  Cómo llegar <Arrow />
                </a>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">Horarios</p>
                <div className="mt-4 space-y-2 text-sm text-black/65">
                  <p className="flex justify-between"><span>Lun — Vie</span><span>10:00 — 21:00</span></p>
                  <p className="flex justify-between"><span>Sábado</span><span>09:00 — 20:00</span></p>
                  <p className="flex justify-between"><span>Domingo</span><span>11:00 — 17:00</span></p>
                </div>
              </div>
            </div>

            <div className="mt-12 border-l-2 border-black pl-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">La experiencia Men´s Point</p>
              <div className="mt-5 grid max-w-xl gap-4 text-sm font-semibold uppercase tracking-[0.08em] text-black/70 sm:grid-cols-3">
                <span>Asesoría personalizada</span>
                <span>Máxima higiene</span>
                <span>Productos profesionales</span>
              </div>
            </div>
          </FadeIn>

          <div className="relative min-h-125 overflow-hidden border-l border-black/10 lg:min-h-full">
            <iframe
              title="Mapa de Men´s Point"
              src="https://www.google.com/maps?q=Av.%201%20de%20Mayo%20399%2C%20Carmen%20de%20La%20Legua%20-%20Reynoso%2007006&output=embed"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
            />
            <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border border-black/15 bg-white/90 p-5 backdrop-blur-xl">
              <span className="font-display text-lg font-bold uppercase text-black">Men´s Point · Callao</span>
              <span className="h-3 w-3 rounded-full bg-black shadow-[0_0_18px_rgba(0,0,0,0.4)]" />
            </div>
          </div>
        </div>

        <div className="border-t border-black/10">
          <div className="mx-auto flex max-w-360 flex-col justify-between gap-5 px-5 pb-28 pt-7 text-[9px] font-bold uppercase tracking-[0.16em] text-black/30 sm:flex-row sm:pb-7 sm:px-8 lg:px-12">
            <span>© 2026 Men´s Point Barber Studio</span>
            <div className="flex gap-7 sm:mr-56 lg:mr-64">
              <a className="transition hover:text-black" href="https://www.instagram.com/menspoint.peru?stkn=MTRqZjdndXNtNTl6NQ==" target="_blank" rel="noreferrer">Instagram</a>
              <a className="transition hover:text-black" href="https://www.tiktok.com/@menspoint.peru?_r=1&_t=ZS-9A33HMjbFkD" target="_blank" rel="noreferrer">TikTok</a>
              <button onClick={() => setShowPrivacy(true)} className="transition hover:text-black">Privacidad</button>
            </div>
          </div>
        </div>
        <p className="text-center pb-4 text-[9px] font-bold uppercase tracking-widest text-black/20">
          Esta web solo redirige tus consultas a WhatsApp. No guardamos ni vendemos tu información personal.
        </p>
      </footer>

      {/* ── BOTÓN FLOTANTE WHATSAPP ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Men´s Point, tengo una consulta.")}`}
        target="_blank" rel="noreferrer"
        className="whatsapp-fab"
        aria-label="Chatea con nosotros por WhatsApp"
      >
        <WhatsAppIcon size={28} />
        <span className="whatsapp-fab-label">¿Dudas? Escríbenos</span>
      </a>


      {/* ── PANEL WISHLIST ── */}
      {showWishlistPanel && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-5 backdrop-blur-md" onMouseDown={() => setShowWishlistPanel(false)}>
          <div className="glass-card relative w-full max-w-md p-7 sm:p-10" onMouseDown={(e) => e.stopPropagation()}>
            <button onClick={() => setShowWishlistPanel(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-white/15 transition hover:border-white" aria-label="Cerrar">
              <Icon><path d="M6 6l12 12M18 6 6 18" /></Icon>
            </button>
            <p className="eyebrow">Mi lista</p>
            <h2 className="font-display mt-4 text-3xl font-black uppercase tracking-[-0.04em]">Productos seleccionados</h2>
            <ul className="mt-6 space-y-3">
              {Object.entries(wishlist).map(([name, qty]) => {
                const prod = products.find((p) => p.name === name);
                return (
                  <li key={name} className="flex items-center justify-between border border-white/10 p-4">
                    <div>
                      <p className="text-sm font-bold uppercase">{name}</p>
                      <p className="text-xs text-white/40">{prod?.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-white/15">
                        <button onClick={() => updateQuantity(name, -1)} className="grid h-8 w-8 place-items-center text-white/40 hover:text-white transition">-</button>
                        <span className="w-6 text-center text-xs font-bold">{qty}</span>
                        <button onClick={() => updateQuantity(name, 1)} className="grid h-8 w-8 place-items-center text-white/40 hover:text-white transition">+</button>
                      </div>
                      <button onClick={() => removeFromWishlist(name)} className="grid h-8 w-8 place-items-center bg-white/5 text-white/40 transition hover:bg-red-500/10 hover:text-red-500" aria-label={`Quitar ${name}`}>
                        <Icon size={14}><path d="M6 6l12 12M18 6 6 18" /></Icon>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button onClick={sendWishlistToWhatsApp} className="mt-6 flex h-14 w-full items-center justify-between bg-[#25D366] px-6 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#1ebe5d]">
              <span className="flex items-center gap-3"><WhatsAppIcon size={18} />Pedir por WhatsApp</span>
              <Arrow />
            </button>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toastProduct && (
        <div className="fixed bottom-24 right-5 z-50 flex items-center gap-3 border border-[#25D366]/40 bg-[#141412]/95 px-5 py-4 text-xs font-bold shadow-2xl backdrop-blur-xl">
          <WhatsAppIcon size={14} />
          <span className="mr-1 text-[#25D366]">Añadido a tu lista:</span>
          {toastProduct}
        </div>
      )}

      {/* ── MODAL PRIVACIDAD ── */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-5 backdrop-blur-md" onMouseDown={() => setShowPrivacy(false)}>
          <div className="glass-card relative w-full max-w-md p-7 sm:p-10 text-center" onMouseDown={(e) => e.stopPropagation()}>
            <button onClick={() => setShowPrivacy(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-white/15 transition hover:border-white" aria-label="Cerrar">
              <Icon><path d="M6 6l12 12M18 6 6 18" /></Icon>
            </button>
            <h2 className="font-display mb-4 text-2xl font-black uppercase tracking-[-0.04em]">Política de Privacidad</h2>
            <p className="text-sm leading-6 text-white/60">
              Esta página web es un portafolio de servicios que redirige tus consultas directamente a WhatsApp.
              <br /><br />
              <strong className="text-white">No solicitamos, no guardamos, ni vendemos ningún tipo de información personal, financiera o de navegación de nuestros usuarios.</strong>
              <br /><br />
              Toda comunicación y transacción se realiza de forma directa y privada entre el cliente y el negocio mediante la aplicación de WhatsApp.
            </p>
            <button onClick={() => setShowPrivacy(false)} className="mt-8 flex h-12 w-full items-center justify-center bg-white text-xs font-black uppercase tracking-wider text-black transition hover:bg-[#e0e0e0]">
              Entendido
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
