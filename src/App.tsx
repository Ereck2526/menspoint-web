import { useEffect, useRef, useState, type ReactNode } from "react";

// ─── Número de WhatsApp del barbero (sin +, sin espacios) ───────────────────
const WHATSAPP_NUMBER = "51999999999"; // ← reemplazar con el número real

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
  {
    number: "01",
    title: "Corte signature",
    description: "Asesoría, lavado y corte diseñado para tu estilo y tipo de cabello.",
    time: "50 min",
    price: "S/ 32",
    icon: "✂️",
  },
  {
    number: "02",
    title: "Ritual de barba",
    description: "Perfilado preciso, vapor y toalla caliente con acabado hidratante.",
    time: "40 min",
    price: "S/ 28",
    icon: "🪒",
  },
  {
    number: "03",
    title: "Corte + barba",
    description: "La experiencia completa de la casa, sin prisas y con atención total.",
    time: "75 min",
    price: "S/ 52",
    icon: "👑",
  },
  {
    number: "04",
    title: "Face reset",
    description: "Limpieza profunda, exfoliación y mascarilla facial detox de carbón.",
    time: "30 min",
    price: "S/ 24",
    icon: "💆",
  },
  {
    number: "05",
    title: "Servicio VIP",
    description: "Corte a domicilio con la misma calidad y precisión de la barbería. Nosotros llegamos a ti.",
    time: "90 min",
    price: "S/ 65",
    icon: "🏠",
    isVip: true,
  },
];

// ─── Productos ───────────────────────────────────────────────────────────────
const products = [
  {
    name: "Pomada mate",
    category: "Fijación / 100 ml",
    price: "S/ 19",
    image: "https://images.unsplash.com/photo-1567721664085-6752c1ef6ade?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Aceite para barba",
    category: "Nutrición / 30 ml",
    price: "S/ 22",
    image: "https://images.unsplash.com/photo-1775126454589-53b494ca57ac?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Crema styling",
    category: "Textura / 75 ml",
    price: "S/ 18",
    image: "https://images.unsplash.com/photo-1734892498467-9344ffc6917b?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Kit Daily Ritual",
    category: "Cuidado / 3 piezas",
    price: "S/ 49",
    image: "https://images.unsplash.com/photo-1718490953028-021d352b14fd?auto=format&fit=crop&w=800&q=85",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function openWhatsApp(message: string) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
}

// ─── Componentes de iconos ───────────────────────────────────────────────────
function Icon({
  children,
  size = 20,
  className = "",
}: {
  children: ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
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

// ─── Hook de animación al hacer scroll (bidireccional, siempre activo) ──────
function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Entra al viewport → mostrar con animación
          el.classList.add("fade-in-visible");
        } else {
          // Sale del viewport → resetear para que vuelva a animarse
          el.classList.remove("fade-in-visible");
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    // No llamamos observer.disconnect() para que siga escuchando siempre
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Componente de sección animada ───────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useFadeInOnScroll();
  return (
    <div
      ref={ref}
      className={`fade-in-section ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Modal de reserva ─────────────────────────────────────────────────────────
function BookingModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSend = () => {
    if (!selected) return;
    const service = services.find((s) => s.title === selected);
    const message =
      `Hola Men´s Point 👋, quiero reservar una cita.\n\n` +
      `📋 *Servicio:* ${service?.title}${service?.isVip ? " 🏠 (a domicilio)" : ""}\n` +
      `💰 *Precio referencial:* ${service?.price}\n\n` +
      `Por favor indíquenme disponibilidad. Gracias!`;
    openWhatsApp(message);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-5 backdrop-blur-md"
      onMouseDown={onClose}
    >
      <div
        className="glass-card booking-modal relative w-full max-w-2xl p-7 sm:p-10"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-white/15 transition hover:border-[#f7a600] hover:text-[#f7a600]"
          aria-label="Cerrar"
        >
          <Icon>
            <path d="M6 6l12 12M18 6 6 18" />
          </Icon>
        </button>

        <p className="eyebrow">Reserva online</p>
        <h2 className="font-display mt-4 text-4xl font-black uppercase tracking-[-0.04em]">
          Tu silla te espera.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/45">
          Elige el servicio y te abriremos WhatsApp para coordinar día, hora y tus datos directamente con nosotros.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <button
              key={service.number}
              onClick={() => setSelected(service.title)}
              className={`service-card text-left ${selected === service.title ? "service-card--active" : ""} ${service.isVip ? "service-card--vip sm:col-span-2 lg:col-span-1" : ""}`}
              aria-pressed={selected === service.title}
            >
              <span className="text-2xl">{service.icon}</span>
              <div className="mt-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f7a600]">{service.number}</p>
                <h3 className="font-display mt-1 text-lg font-extrabold uppercase tracking-[-0.03em]">
                  {service.title}
                </h3>
                {service.isVip && (
                  <span className="mt-1 inline-block border border-[#f7a600]/50 bg-[#f7a600]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#f7a600]">
                    A domicilio
                  </span>
                )}
                <p className="mt-2 text-xs leading-5 text-white/40">{service.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-end">
                <strong className="text-base text-white">{service.price}</strong>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleSend}
          disabled={!selected}
          className={`mt-6 flex h-14 w-full items-center justify-between px-6 text-xs font-black uppercase tracking-wider transition ${
            selected
              ? "bg-[#25D366] text-white hover:bg-[#1ebe5d]"
              : "cursor-not-allowed bg-white/10 text-white/30"
          }`}
        >
          <span className="flex items-center gap-3">
            <WhatsAppIcon size={20} />
            {selected ? `Reservar "${selected}" por WhatsApp` : "Selecciona un servicio"}
          </span>
          {selected && <Arrow />}
        </button>
      </div>
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

// ─── App principal ────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [wishlist, setWishlist] = useState<Record<string, number>>({});
  const [toastProduct, setToastProduct] = useState("");
  const [showWishlistPanel, setShowWishlistPanel] = useState(false);
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
      if (nextQty <= 0) {
        delete next[name];
      } else {
        next[name] = nextQty;
      }
      return next;
    });
  };

  const removeFromWishlist = (name: string) => {
    setWishlist((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const sendWishlistToWhatsApp = () => {
    const entries = Object.entries(wishlist);
    if (entries.length === 0) return;
    const list = entries.map(([p, qty]) => `• ${qty}x ${p}`).join("\n");
    const message =
      `Hola Men´s Point 👋, estoy interesado en los siguientes productos:\n\n${list}\n\n¿Tienen disponibilidad? Gracias!`;
    openWhatsApp(message);
    setShowWishlistPanel(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a09] text-[#f4f0e8]">

      {/* ── HEADER ── */}
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#" className="flex items-center gap-3" aria-label="Men´s Point, inicio">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#f7a600] text-[11px] font-black tracking-tighter text-[#f7a600]">
              MP
            </span>
            <span className="font-display text-lg font-black uppercase tracking-[-0.03em]">Men´s Point</span>
          </a>

          <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 md:flex">
            <a className="nav-link transition hover:text-[#f7a600]" href="#servicios">Servicios</a>
            <a className="nav-link transition hover:text-[#f7a600]" href="#trabajo">Nuestro trabajo</a>
            <a className="nav-link transition hover:text-[#f7a600]" href="#tienda">Tienda</a>
            <a className="nav-link transition hover:text-[#f7a600]" href="#visitanos">Visítanos</a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Lista de productos para WhatsApp */}
            <button
              className="relative hidden h-10 items-center gap-2 border border-white/15 px-4 text-[11px] font-bold uppercase tracking-wider transition hover:border-[#25D366] hover:text-[#25D366] sm:flex"
              aria-label={`Lista de productos, ${wishlist.length} seleccionados`}
              onClick={() => setShowWishlistPanel(true)}
            >
              <WhatsAppIcon size={16} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#25D366] text-[10px] text-white">
                  {wishlist.length}
                </span>
              )}
              Lista
            </button>
            <button
              className="grid h-10 w-10 place-items-center border border-white/15 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Abrir menú"
            >
              <Icon>
                <path d={menuOpen ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} />
              </Icon>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-5 border-t border-white/10 bg-[#0a0a09]/95 px-6 py-7 text-sm font-bold uppercase tracking-wider backdrop-blur-xl md:hidden">
            {[
              ["Servicios", "#servicios"],
              ["Nuestro trabajo", "#trabajo"],
              ["Tienda", "#tienda"],
              ["Visítanos", "#visitanos"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative flex h-dvh min-h-150 flex-col justify-center pt-20">
        <img
          src={photos.hero}
          alt="Barbero realizando un perfilado con navaja"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,4,.97)_0%,rgba(5,5,4,.65)_50%,rgba(5,5,4,.25)_80%),linear-gradient(0deg,#0a0a09_0%,transparent_40%)]" />
        <div className="noise absolute inset-0 opacity-25" />

        <div className="relative z-10 mx-auto w-full max-w-360 px-5 sm:px-8 lg:px-12">
          <div className="hero-animate-eyebrow mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#f7a600]">
            <span className="eyebrow-line hero-animate-line" />
            Estilo, precisión y confianza
          </div>

          {/* Nombre grande y protagonista */}
          <div className="hero-brand hero-animate-brand mb-3">
            <span className="hero-brand-text font-display font-black uppercase">
              Men´s Point
            </span>
          </div>

          <h1 className="hero-animate-h1 font-display max-w-3xl text-[clamp(2.4rem,5.5vw,5.5rem)] font-black uppercase leading-[0.85] tracking-[-0.065em] text-white/80">
            Corte <br />
            <span className="text-outline">con actitud.</span>
          </h1>

          <div className="hero-animate-cta mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <button
              onClick={() => setBookingOpen(true)}
              className="group flex h-14 items-center gap-8 bg-[#f7a600] px-7 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-white"
            >
              Reserva tu cita
              <span className="transition-transform group-hover:translate-x-1">
                <Arrow />
              </span>
            </button>
            <p className="max-w-xs text-sm leading-6 text-white/55">
              Precisión, técnica y ritual. Tu mejor versión empieza en el sillón.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="relative py-24 sm:py-32">
        <div className="noise absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-14 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">01 / El ritual</p>
                <h2 className="section-title mt-4">Nuestros servicios</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/45">
                Oficio tradicional con una visión actual. Cada servicio se adapta a ti, nunca al revés.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-3 md:grid-cols-2">
            {services.map((service, i) => (
              <FadeIn key={service.number} delay={i * 80}>
                <article
                  className={`glass-card group relative min-h-64 overflow-hidden p-7 sm:p-9 cursor-pointer transition-all duration-300 hover:border-[#f7a600]/30 hover:-translate-y-1 ${service.isVip ? "md:col-span-2 vip-card" : ""}`}
                  onClick={() => setBookingOpen(true)}
                >
                  {service.isVip && (
                    <span className="absolute left-0 top-0 bg-[#f7a600] px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-black">
                      ✦ Servicio VIP · A domicilio
                    </span>
                  )}
                  <span className="text-xs font-bold text-[#f7a600]">{service.number}</span>
                  <div className={`flex items-end justify-between gap-5 ${service.isVip ? "mt-8" : "mt-12"}`}>
                    <div>
                      <h3 className="font-display text-3xl font-extrabold uppercase tracking-[-0.04em] sm:text-4xl">
                        {service.title}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-6 text-white/45">{service.description}</p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition group-hover:border-[#f7a600] group-hover:bg-[#f7a600] group-hover:text-black">
                      <Arrow />
                    </span>
                  </div>
                  <div className="absolute right-8 top-8 flex items-center gap-5 text-xs text-white/45">
                    <strong className="text-base text-white">{service.price}</strong>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section id="trabajo" className="bg-[#0e0e0d] py-24 sm:py-32">
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-14 flex items-end justify-between">
              <div>
                <p className="eyebrow">02 / Corte a corte</p>
                <h2 className="section-title mt-4">Nuestro trabajo</h2>
              </div>
              <a
                href="https://instagram.com"
                target="_blank" rel="noreferrer"
                className="hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#f7a600] sm:flex transition hover:text-white"
              >
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

      {/* ── TIENDA ── */}
      <section id="tienda" className="relative py-24 sm:py-32">
        <div className="noise absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">03 / Sigue el ritual</p>
                <h2 className="section-title mt-4">Cuida tu estilo</h2>
              </div>
              <div className="hidden gap-2 sm:flex">
                <button onClick={() => scrollProducts(-1)} className="slider-button" aria-label="Productos anteriores">
                  <Arrow direction="left" />
                </button>
                <button onClick={() => scrollProducts(1)} className="slider-button" aria-label="Productos siguientes">
                  <Arrow />
                </button>
              </div>
            </div>
            <p className="mb-8 text-sm text-white/40">
              Selecciona los productos que te interesan y te enviamos la lista directamente por WhatsApp.
            </p>
          </FadeIn>

          <div ref={productTrack} className="no-scrollbar flex snap-x gap-4 overflow-x-auto">
            {products.map((product) => {
              const qty = wishlist[product.name] || 0;
              return (
                <article key={product.name} className="glass-card group min-w-[84vw] snap-start overflow-hidden sm:min-w-85 lg:min-w-[calc(33.333%-11px)]">
                  <div className="relative h-96 overflow-hidden bg-[#161614]">
                    <img
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      src={product.image}
                      alt={product.name}
                    />
                    <span className="absolute left-5 top-5 border border-white/15 bg-black/30 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] backdrop-blur-md">
                      Men´s Point Essentials
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-5 p-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">{product.category}</p>
                      <h3 className="mt-2 font-display text-xl font-bold uppercase">{product.name}</h3>
                      <p className="mt-2 font-bold text-[#f7a600]">{product.price}</p>
                    </div>
                    <button
                      onClick={() => addToWishlist(product.name)}
                      className={`flex h-12 min-w-12 shrink-0 items-center justify-center gap-2 px-3 transition font-bold text-xs ${
                        qty > 0
                          ? "bg-[#25D366] text-white hover:bg-[#1ebe5d]"
                          : "bg-white text-black hover:bg-[#f7a600]"
                      }`}
                      aria-label={`Agregar ${product.name} a la lista`}
                      title="Agregar a la lista de WhatsApp"
                    >
                      {qty > 0 ? (
                        <>
                          <Icon size={16}><path d="M12 5v14M5 12h14" /></Icon>
                          <span>(x{qty})</span>
                        </>
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
                  Ver mi lista ({Object.values(wishlist).reduce((a, b) => a + b, 0)}) · Pedir por WhatsApp
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── FOOTER / VISÍTANOS ── */}
      <footer id="visitanos" className="border-t border-white/10 bg-[#070706]">
        <div className="mx-auto grid max-w-360 lg:grid-cols-2">
          <FadeIn className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
            <p className="eyebrow">04 / Ven a vernos</p>
            <h2 className="font-display mt-5 max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-7xl">
              Tu próximo corte empieza aquí.
            </h2>
            <button
              onClick={() => setBookingOpen(true)}
              className="mt-9 flex h-14 items-center gap-7 bg-[#f7a600] px-7 text-xs font-black uppercase tracking-wider text-black transition hover:bg-white"
            >
              Reserva tu cita <Arrow />
            </button>

            <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2">
              <div>
                <p className="footer-label">Ubicación</p>
                <p className="mt-4 text-sm leading-6 text-white/65">
                  Av. 1 de Mayo 399<br />Carmen de La Legua - Reynoso 07006
                </p>
                <a
                  href="https://maps.app.goo.gl/ELrpbHqTFGgR3Ru9A"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#f7a600] transition hover:text-white"
                >
                  Cómo llegar <Arrow />
                </a>
              </div>
              <div>
                <p className="footer-label">Horarios</p>
                <div className="mt-4 space-y-2 text-sm text-white/65">
                  <p className="flex justify-between"><span>Lun — Vie</span><span>10:00 — 21:00</span></p>
                  <p className="flex justify-between"><span>Sábado</span><span>09:00 — 20:00</span></p>
                  <p className="flex justify-between"><span>Domingo</span><span>11:00 — 17:00</span></p>
                </div>
              </div>
            </div>

            <div className="mt-12 border-l-2 border-[#f7a600] pl-6">
              <p className="footer-label">La experiencia Men´s Point</p>
              <div className="mt-5 grid max-w-xl gap-4 text-sm font-semibold uppercase tracking-[0.08em] text-white/75 sm:grid-cols-3">
                <span>Asesoría personalizada</span>
                <span>Máxima higiene</span>
                <span>Productos profesionales</span>
              </div>
            </div>
          </FadeIn>

          <div className="relative min-h-125 overflow-hidden border-l border-white/10 lg:min-h-full">
            <iframe
              title="Mapa de Men´s Point"
              src="https://www.google.com/maps?q=Av.%201%20de%20Mayo%20399%2C%20Carmen%20de%20La%20Legua%20-%20Reynoso%2007006&output=embed"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-[#f7a600]/5 mix-blend-color" />
            <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border border-white/15 bg-black/70 p-5 backdrop-blur-xl">
              <span className="font-display text-lg font-bold uppercase">Men´s Point · Callao</span>
              <span className="h-3 w-3 rounded-full bg-[#f7a600] shadow-[0_0_18px_#f7a600]" />
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-360 flex-col justify-between gap-5 px-5 pb-28 pt-7 text-[9px] font-bold uppercase tracking-[0.16em] text-white/30 sm:flex-row sm:pb-7 sm:px-8 lg:px-12">
            <span>© 2026 Men´s Point Barber Studio</span>
            <div className="flex gap-7 sm:mr-56 lg:mr-64">
              <a className="transition hover:text-[#f7a600]" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a className="transition hover:text-[#f7a600]" href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
              <button onClick={() => setShowPrivacy(true)} className="transition hover:text-[#f7a600]">Privacidad</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── BOTÓN FLOTANTE WHATSAPP ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Men´s Point 👋, tengo una consulta.")}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-fab"
        aria-label="Chatea con nosotros por WhatsApp"
        title="Chatea con nosotros"
      >
        <WhatsAppIcon size={28} />
        <span className="whatsapp-fab-label">¿Dudas? Escríbenos</span>
      </a>

      {/* ── MODAL RESERVA ── */}
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}

      {/* ── PANEL LISTA WISHLIST ── */}
      {showWishlistPanel && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-5 backdrop-blur-md"
          onMouseDown={() => setShowWishlistPanel(false)}
        >
          <div
            className="glass-card relative w-full max-w-md p-7 sm:p-10"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowWishlistPanel(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-white/15 transition hover:border-[#f7a600]"
              aria-label="Cerrar"
            >
              <Icon>
                <path d="M6 6l12 12M18 6 6 18" />
              </Icon>
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
                      <p className="text-xs text-[#f7a600]">{prod?.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-white/15">
                        <button onClick={() => updateQuantity(name, -1)} className="grid h-8 w-8 place-items-center text-white/40 hover:text-white transition">-</button>
                        <span className="w-6 text-center text-xs font-bold">{qty}</span>
                        <button onClick={() => updateQuantity(name, 1)} className="grid h-8 w-8 place-items-center text-white/40 hover:text-white transition">+</button>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(name)}
                        className="grid h-8 w-8 place-items-center bg-white/5 text-white/40 transition hover:bg-red-500/10 hover:text-red-500"
                        aria-label={`Quitar ${name}`}
                      >
                        <Icon size={14}><path d="M6 6l12 12M18 6 6 18" /></Icon>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={sendWishlistToWhatsApp}
              className="mt-6 flex h-14 w-full items-center justify-between bg-[#25D366] px-6 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#1ebe5d]"
            >
              <span className="flex items-center gap-3">
                <WhatsAppIcon size={18} />
                Pedir por WhatsApp
              </span>
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

      {/* ── MODAL DE PRIVACIDAD ── */}
      {showPrivacy && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-5 backdrop-blur-md"
          onMouseDown={() => setShowPrivacy(false)}
        >
          <div
            className="glass-card relative w-full max-w-md p-7 sm:p-10 text-center"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-white/15 transition hover:border-[#f7a600] hover:text-[#f7a600]"
              aria-label="Cerrar"
            >
              <Icon>
                <path d="M6 6l12 12M18 6 6 18" />
              </Icon>
            </button>

            <h2 className="font-display mb-4 text-2xl font-black uppercase tracking-[-0.04em]">
              Política de Privacidad
            </h2>
            <p className="text-sm leading-6 text-white/60">
              Esta página web es un portafolio de servicios que redirige tus consultas directamente a WhatsApp.
              <br /><br />
              <strong className="text-white">No solicitamos, no guardamos, ni vendemos ningún tipo de información personal, financiera o de navegación de nuestros usuarios.</strong>
              <br /><br />
              Toda comunicación y transacción se realiza de forma directa y privada entre el cliente y el negocio mediante la aplicación de WhatsApp.
            </p>
            
            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-8 flex h-12 w-full items-center justify-center bg-[#f7a600] text-xs font-black uppercase tracking-wider text-black transition hover:bg-white"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
