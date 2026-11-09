import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto ejecutivo",
  description: "Conversemos sobre las prioridades operativas de tu empresa y la posibilidad de asumir un mandato ejecutivo.",
};

const emailAddress = "reisanchezgastronomo@gmail.com";
const emailSubject = encodeURIComponent("Conversación ejecutiva | Prioridades operativas");
const emailBody = encodeURIComponent("Hola, quisiera conversar sobre una prioridad operativa de mi empresa.\n\nEmpresa:\nCiudad / país:\nPrioridad principal:\n");
const emailLink = "mailto:" + emailAddress + "?subject=" + emailSubject + "&body=" + emailBody;
const whatsappMessage = encodeURIComponent("Hola, Rei. Revisé tu página de Dirección Ejecutiva y quisiera conversar sobre una prioridad operativa de mi empresa.");
const whatsappLink = "https://wa.me/573019900983?text=" + whatsappMessage;

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#0b1115] px-5 pb-24 pt-36 text-[#f6f3ed] sm:px-8 md:pt-44">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-[#b7ccbc] underline underline-offset-4 hover:text-white">← Volver al inicio</Link>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-[#b7ccbc]">Contacto ejecutivo</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Conversemos sobre tus prioridades operativas.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#b7c4bd]">Si diriges o eres propietario de una empresa gastronómica o de alimentación, podemos explorar si existe un mandato ejecutivo viable para tu organización.</p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <a href={emailLink} className="rounded-2xl border border-white/20 bg-[#142025] p-7 transition-colors hover:border-[#bdd1c1]">
            <p className="text-sm font-medium uppercase tracking-widest text-[#d7b98c]">Por correo electrónico</p>
            <h2 className="mt-5 text-xl font-semibold">Escribir a Rei Sánchez</h2>
            <p className="mt-3 break-all text-sm text-[#b7c4bd]">{emailAddress}</p>
            <p className="mt-8 text-sm font-semibold text-[#bdd1c1]">Abrir correo con mensaje preparado →</p>
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/20 bg-[#142025] p-7 transition-colors hover:border-[#bdd1c1]">
            <p className="text-sm font-medium uppercase tracking-widest text-[#d7b98c]">Por WhatsApp Colombia</p>
            <h2 className="mt-5 text-xl font-semibold">Iniciar una conversación</h2>
            <p className="mt-3 text-sm text-[#b7c4bd]">+57 301 990 0983</p>
            <p className="mt-8 text-sm font-semibold text-[#bdd1c1]">Abrir WhatsApp →</p>
          </a>
        </div>

        <div className="mt-10 rounded-xl border border-white/10 p-6 text-sm leading-relaxed text-[#b7c4bd]">
          <p className="font-semibold text-white">Para una conversación útil</p>
          <p className="mt-2">Indica el nombre de la empresa, la ciudad y el principal reto de operación, producción o rentabilidad. Revisaremos el encaje antes de acordar un alcance de trabajo.</p>
          <p className="mt-5">También puedes consultar el <a href="https://www.linkedin.com/in/reisanchez-fyb-operations/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#bdd1c1] underline underline-offset-4">perfil profesional en LinkedIn</a>.</p>
        </div>

        <p className="mt-8 text-sm text-[#81938a]">Esta página no recoge datos mediante formularios. El contacto se realiza directamente desde tu aplicación de correo o WhatsApp.</p>
      </div>
    </main>
  );
}
