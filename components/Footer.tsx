import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080e11] px-5 py-12 text-[#b7c4bd] sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="text-base font-semibold tracking-wide text-white">Rei Sánchez | Dirección Ejecutiva</Link>
          <p className="mt-2 text-sm">Dirección Ejecutiva · Transformación · Autonomía</p>
          <p className="mt-1 text-sm text-[#d7b98c]">Simplificar para transformar.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm">
          <Link href="/#modalidades" className="hover:text-white">Modalidades</Link>
          <Link href="/#trayectoria" className="hover:text-white">Trayectoria</Link>
          <Link href="/contacto" className="hover:text-white">Contacto</Link>
          <a href="https://www.linkedin.com/in/reisanchez-fyb-operations/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
        </div>
      </div>
      <div className="mx-auto mt-9 max-w-6xl border-t border-white/10 pt-6 text-xs text-[#82958c]">
        © {new Date().getFullYear()} Rei Sánchez. Colombia y Venezuela. Dirección de operaciones gastronómicas y de alimentación.
      </div>
    </footer>
  );
}
