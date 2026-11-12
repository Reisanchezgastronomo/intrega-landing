import Link from "next/link";
import Image from "next/image";

const modalities = [
  {
    id: "01",
    title: "Dirección Ejecutiva Fraccionada",
    detail: "Responsabilidad y seguimiento ejecutivo con dedicación parcial, atribuciones acordadas y prioridades medibles.",
  },
  {
    id: "02",
    title: "Dirección Ejecutiva Intensiva",
    detail: "Intervención presencial para ordenar, ejecutar y transformar operaciones que requieren conducción directa.",
  },
  {
    id: "03",
    title: "Dirección Ejecutiva a Tiempo Completo",
    detail: "Incorporación ejecutiva para dirigir operaciones, producción o una unidad de negocio con responsabilidad continuada.",
  },
];

const sectors = [
  {
    title: "Panadería, pastelería y producción",
    detail: "Planificación de producción, rendimientos, mermas, estándares y desarrollo de equipos.",
  },
  {
    title: "Restaurantes y cafeterías multisede",
    detail: "Coherencia de la experiencia, coordinación entre unidades y disciplina de costes y servicio.",
  },
  {
    title: "Catering y foodservice",
    detail: "Organización productiva, abastecimiento, cumplimiento y control operativo en servicios de alimentación.",
  },
];

export default function Home() {
  return (
    <main id="inicio" className="bg-[#0b1115] text-[#f6f3ed]">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-5 pb-24 pt-36 sm:px-8 md:pb-32 md:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_20%,rgba(169,193,174,0.12),transparent_42%),linear-gradient(135deg,#101d23,#0b1115_65%)]" />
        <div className="mx-auto max-w-6xl">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.24em] text-[#b7ccbc]">
            Dirección de operaciones F&B · Producción · Multisede
          </p>
          <h1 className="max-w-5xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
            Dirección ejecutiva para transformar operaciones gastronómicas y alimentarias.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#c4d0cb] md:text-xl">
            Simplificamos la complejidad operativa, establecemos prioridades y asumimos responsabilidades de dirección para conectar equipos, procesos y rentabilidad.
          </p>
          <p className="mt-8 text-base font-medium tracking-wide text-[#d7b98c]">
            Simplificar para transformar.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contacto" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#bdd1c1] px-7 py-3 font-semibold text-[#102017] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bdd1c1]">
              Conversemos sobre tus prioridades
            </Link>
            <a href="#modalidades" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3 font-medium text-white transition-colors hover:border-white/70">
              Conoce cómo trabajamos
            </a>
          </div>
          <div className="mt-20 grid gap-6 border-t border-white/15 pt-8 text-sm text-[#aebcb6] sm:grid-cols-3">
            <p><span className="block font-semibold text-white">Responsabilidad real</span>Mandatos con funciones y autoridad delimitadas.</p>
            <p><span className="block font-semibold text-white">Ejecución verificable</span>Prioridades, responsables, indicadores y seguimiento.</p>
            <p><span className="block font-semibold text-white">Identidad operativa</span>Procesos coherentes con la propuesta de valor del negocio.</p>
          </div>
        </div>
      </section>

      <section id="prioridades" className="scroll-mt-24 px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#b7ccbc]">Dónde aportamos valor</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">La rentabilidad se construye desde la operación.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-[#b7c4bd]">
            <p>Una empresa puede vender más y continuar perdiendo margen. Puede tener buenos productos y una operación que dependa demasiado de unas pocas personas.</p>
            <p>Nuestro trabajo comienza por comprender el negocio, identificar la restricción principal y organizar decisiones ejecutables con la propiedad y el equipo.</p>
            <div className="grid gap-3 border-t border-white/10 pt-7 text-sm sm:grid-cols-2">
              {["Productividad y control de costes", "Planificación y flujo productivo", "Personas, mandos y estándares", "Experiencia e identidad de marca", "Información para decidir", "Coordinación y continuidad"].map((item) => (
                <p key={item} className="flex gap-3"><span aria-hidden="true" className="text-[#d7b98c]">—</span>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="modalidades" className="scroll-mt-24 border-y border-white/10 bg-[#121c20] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#b7ccbc]">Cómo asumimos responsabilidad</p>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">La modalidad responde a la necesidad de la empresa.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {modalities.map((item) => (
              <article key={item.id} className="flex flex-col rounded-2xl border border-white/15 bg-white/[0.025] p-7">
                <p className="mb-9 font-mono text-sm text-[#d7b98c]">{item.id}</p>
                <h3 className="text-2xl font-semibold leading-snug">{item.title}</h3>
                <p className="mt-5 leading-relaxed text-[#b7c4bd]">{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 rounded-xl border border-[#b7ccbc]/25 p-6 text-sm leading-relaxed text-[#c1ccc6]">
            <strong className="text-white">Alcances por mercado.</strong> En Colombia podemos acordar activaciones operativas iniciales de 30 días. En Venezuela evaluamos mandatos presenciales de 90 a 180 días. En todos los casos, el alcance, la autoridad, los recursos y las condiciones se definen antes de asumir responsabilidad.
          </div>
        </div>
      </section>

      <section id="sectores" className="scroll-mt-24 px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#b7ccbc]">Sectores</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">Experiencia operativa en negocios donde producir y servir bien es decisivo.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {sectors.map((item) => (
              <article key={item.title} className="border-t border-[#b7ccbc]/40 pt-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-[#b7c4bd]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>



      <section id="destinos-gastronomicos" className="scroll-mt-24 border-y border-white/10 bg-[#142121] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#bdd1c1]">Vertical de desarrollo territorial · Venezuela</p>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Dirección y desarrollo de destinos gastronómicos.</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#c4d0cb]">
                Convertimos la identidad gastronómica de un destino en experiencias turísticas de valor.
                Mejoramos cómo funcionan los negocios con INTEGRA, preparamos sus estándares con Sello Valor
                y presentamos sus rutas y experiencias al visitante mediante VIAJA.
              </p>
              <p className="mt-5 leading-relaxed text-[#bdcbc3]">
                <strong className="text-white">Venezuela Auténtica</strong> es el MVP comercial de esta iniciativa;
                Colonia Tovar es su primer demostrador. Rei Sánchez | Dirección Ejecutiva asume la dirección
                del proyecto y conserva sus modalidades empresariales de servicio.
              </p>
              <Link href="/contacto" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#bdd1c1] px-6 py-3 font-semibold text-[#102017] transition-colors hover:bg-white">
                Conversemos sobre el proyecto
              </Link>
            </div>
            <div className="space-y-4">
              <div className="border-t border-[#bdd1c1]/50 pt-4">
                <h3 className="text-xl font-semibold">INTEGRA · Transformación operativa</h3>
                <p className="mt-2 text-[#baccc2]">Intervención en producción, servicio, rentabilidad, equipos y coherencia de la experiencia con la identidad del destino.</p>
                <a href="https://intrega-landing.vercel.app" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex font-semibold text-[#bdd1c1] underline underline-offset-4">Conocer INTEGRA</a>
              </div>
              <div className="border-t border-white/15 pt-4">
                <h3 className="text-xl font-semibold">Sello Valor · Estándares en desarrollo</h3>
                <p className="mt-2 text-[#baccc2]">Estándares de autenticidad, operación y experiencia en preparación. El sello aún no se ha otorgado.</p>
              </div>
              <div className="border-t border-white/15 pt-4">
                <h3 className="text-xl font-semibold">VIAJA · Experiencias del visitante</h3>
                <p className="mt-2 text-[#baccc2]">Explora rutas e itinerarios de muestra en Colonia Tovar. La compra de experiencias aún no está habilitada.</p>
                <a href="https://viaja-ven.vercel.app" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex font-semibold text-[#bdd1c1] underline underline-offset-4">Explorar el demostrador</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trayectoria" className="scroll-mt-24 bg-[#e6e8e1] px-5 py-20 text-[#14211e] sm:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(220px,360px)_1fr] md:gap-16">
            <figure className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl bg-[#bfc9c0] shadow-[0_24px_60px_rgba(10,23,17,0.14)]">
              <Image
                src="/rei-sanchez-retrato.webp"
                alt="Retrato ejecutivo de Rei Sánchez"
                width={480}
                height={527}
                sizes="(max-width: 767px) 90vw, 360px"
                className="block h-auto w-full"
              />
            </figure>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#49645a]">Quién dirige</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Rei Sánchez</h2>
              <p className="mt-4 text-lg font-medium">Ingeniero mecánico · Maestro panadero · Directivo de operaciones F&B</p>
              <p className="mt-6 max-w-2xl leading-relaxed text-[#465b53]">
                Combino ingeniería, producción gastronómica, dirección de equipos y gestión económica. Mi enfoque integra productividad, identidad empresarial y capacidad de ejecución.
              </p>
              <a
                href="https://www.linkedin.com/in/reisanchez-fyb-operations/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex font-semibold underline decoration-[#8aa494] underline-offset-8 hover:decoration-[#14211e]"
              >
                Revisar trayectoria profesional en LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-16 grid gap-8 border-t border-[#14211e]/20 pt-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold">Panaderei</h3>
              <p className="mt-3 leading-relaxed text-[#465b53]">Gerencia general de operación de panadería, producción y desarrollo de equipos.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Vistacampo</h3>
              <p className="mt-3 leading-relaxed text-[#465b53]">Compras y abastecimiento en una operación alimentaria de producción continua.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Marroc Bar</h3>
              <p className="mt-3 leading-relaxed text-[#465b53]">Dirección de una operación gastronómica multisede y de equipos de servicio.</p>
            </div>
          </div>
          <p className="mt-7 text-sm text-[#52685f]">
            Los resultados cuantitativos de cada caso se presentan únicamente cuando exista evidencia apropiada y contexto.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#b7ccbc]">Primer paso</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Conversemos sobre la prioridad que hoy limita tu operación.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#b7c4bd]">Una conversación breve permite identificar si existe una necesidad concreta y si tiene sentido definir un mandato ejecutivo. Sin diagnósticos extensos ni promesas anticipadas.</p>
          <Link href="/contacto" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#bdd1c1] px-8 py-3 font-semibold text-[#102017] transition-colors hover:bg-white">
            Solicitar una conversación ejecutiva
          </Link>
        </div>
      </section>
    </main>
  );
}
