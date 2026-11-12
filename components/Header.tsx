import Link from "next/link";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b1115]/95 backdrop-blur-md">
      <nav aria-label="Navegación principal" className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-white" aria-label="Rei Sánchez, inicio">
          <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#bdd1c1]/70 text-sm font-bold tracking-tight text-[#bdd1c1]">RS</span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold leading-tight tracking-wide">REI SÁNCHEZ</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#a9b8b0]">Dirección ejecutiva</span>
          </span>
        </Link>
        <div className="hidden items-center gap-5 text-sm text-[#bcc9c1] md:flex">
          <Link href="/#prioridades" className="hover:text-white">Qué transformamos</Link>
          <Link href="/#modalidades" className="hover:text-white">Modalidades</Link>
          <Link href="/#destinos-gastronomicos" className="hover:text-white">Destinos gastronómicos</Link>
          <Link href="/#trayectoria" className="hover:text-white">Trayectoria</Link>
        </div>
        <Link href="/contacto" className="shrink-0 rounded-full border border-[#bdd1c1]/65 px-4 py-2.5 text-sm font-semibold text-[#bdd1c1] transition-colors hover:bg-[#bdd1c1] hover:text-[#102017]">
          Contacto
        </Link>
      </nav>
    </header>
  );
}
