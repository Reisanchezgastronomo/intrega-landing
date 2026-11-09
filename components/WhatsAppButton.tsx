const whatsappMessage = encodeURIComponent(
  "Hola, Rei. Revisé tu página de Dirección Ejecutiva y quisiera conversar sobre una prioridad operativa de mi empresa."
);
const whatsappUrl = "https://wa.me/573019900983?text=" + whatsappMessage;

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Rei Sánchez por WhatsApp"
      title="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#bdd1c1]/50 bg-[#bdd1c1] text-sm font-bold text-[#102017] shadow-lg shadow-black/20 transition-colors hover:bg-white md:bottom-7 md:right-7"
    >
      WA
    </a>
  );
}
