import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, Check,
  ChevronRight, Code2, ExternalLink, GraduationCap, Layers3, MapPin,
  Menu, MonitorSmartphone, Palette, Send, ShieldCheck, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/data/projects";
import msnba from "@/assets/MSNBA.png.asset.json";

const MSNBA_URL = "https://msnba-web.ai.studio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guehi Jean Azaria — Développeur web à Abidjan" },
      { name: "description", content: "Portfolio de Guehi Jean Azaria, informaticien et développeur web à Abidjan. Découvrez ses projets, compétences, formations et réalisations dans le numérique." },
      { property: "og:title", content: "Guehi Jean Azaria — Développeur web à Abidjan" },
      { property: "og:description", content: "Projets, compétences et parcours d’un développeur web et créateur de solutions numériques à Abidjan." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const nav = [
  ["À propos", "a-propos"], ["Compétences", "competences"],
  ["Projets", "projets"], ["Formations", "formations"], ["Contact", "contact"],
];

const skills = [
  { title: "Développement web", icon: Code2, items: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Node.js", "Sites vitrines", "Applications web"] },
  { title: "Applications & données", icon: Layers3, items: ["Applications web", "Applications mobiles", "Supabase", "Authentification", "Bases de données", "API", "Intégration de services"] },
  { title: "Cybersécurité", icon: ShieldCheck, items: ["Fondamentaux", "Analyse des risques", "Pentesting", "Kali Linux", "Outils de sécurité", "Sécurité des systèmes"] },
  { title: "Création numérique", icon: Palette, items: ["Photoshop", "Premiere Pro", "After Effects", "CapCut", "Canva", "Montage vidéo", "Infographie"] },
  { title: "Productivité", icon: MonitorSmartphone, items: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"] },
  { title: "Intelligence artificielle", icon: BrainCircuit, items: ["Outils d’IA", "IA appliquée au développement", "IA pour la création numérique", "Conception et expérimentation accélérées"] },
];

const formations = [
  ["Licence en informatique MIAGE", "Formation principale"],
  ["Baccalauréat série D", "Obtenu en 2020"],
  ["Google Cybersecurity Certificate", "Google"],
  ["Fondamentaux Google", "Google"],
  ["Gestion des risques", "Formation complémentaire"],
  ["Création d’outils de défense en cybersécurité", "Formation complémentaire"],
  ["Formation en pentesting", "Formation complémentaire"],
  ["Formation en vidéographie", "Formation complémentaire"],
];

function SectionHeader({ number, title, intro }: { number: string; title: string; intro?: string }) {
  return (
    <header className="mb-14 border-b border-border pb-8">
      <div className="grid gap-4 md:grid-cols-[8rem_1fr] md:items-end">
        <p className="font-mono text-xs tracking-[0.25em] text-primary">{number}</p>
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
          {intro && <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{intro}</p>}
        </div>
      </div>
    </header>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const [image, setImage] = useState(0);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [onClose]);
  const move = (step: number) => setImage((image + step + project.gallery.length) % project.gallery.length);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-3 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Détails de ${project.title}`} onMouseDown={onClose}>
    <div className="max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-lg border border-border bg-card shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur"><div><p className="font-mono text-xs uppercase tracking-widest text-primary">{project.category}</p><h2 className="text-xl font-semibold">{project.title}</h2></div><Button variant="ghost" size="icon" onClick={onClose} aria-label="Fermer"><X className="size-5" /></Button></div>
      <div className="grid lg:grid-cols-[1.35fr_.65fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <div className="relative overflow-hidden rounded-md border border-border bg-background"><img src={project.gallery[image]?.src} alt={project.gallery[image]?.alt ?? project.title} className="aspect-[16/9] w-full object-cover" />
            {project.gallery.length > 1 && <><Button variant="outline" size="icon" className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/85" onClick={() => move(-1)} aria-label="Image précédente"><ArrowLeft className="size-4" /></Button><Button variant="outline" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/85" onClick={() => move(1)} aria-label="Image suivante"><ArrowRight className="size-4" /></Button></>}
          </div><div className="mt-3 flex gap-2">{project.gallery.map((item, index) => <button key={item.src} aria-label={`Afficher l’image ${index + 1}`} onClick={() => setImage(index)} className={`h-1.5 flex-1 rounded-full transition-colors ${index === image ? "bg-primary" : "bg-muted"}`} />)}</div>
        </div>
        <div className="space-y-7 p-6"><div><h3 className="mb-2 text-lg font-semibold">Présentation</h3><p className="text-sm leading-7 text-muted-foreground">{project.description}</p></div><div><h3 className="mb-2 text-lg font-semibold">La solution</h3><p className="text-sm leading-7 text-muted-foreground">{project.role}</p></div><div><h3 className="mb-3 text-lg font-semibold">Fonctionnalités</h3><ul className="space-y-2">{project.features.map((f) => <li key={f} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{f}</li>)}</ul></div><div className="flex flex-wrap gap-2">{project.technologies.map((t) => <span key={t} className="rounded-sm border border-border bg-muted px-2.5 py-1 text-xs text-secondary-foreground">{t}</span>)}</div><div className="grid grid-cols-2 gap-3"><Button disabled>Voir le projet</Button><Button variant="outline" disabled>Voir le code</Button></div><p className="text-center text-xs text-muted-foreground">Liens bientôt disponibles</p></div>
      </div>
    </div>
  </div>;
}

function ProjectEntry({ project, index, featured, onOpen }: { project: Project; index: number; featured?: boolean; onOpen: () => void }) {
  return (
    <article className={`group ${featured ? "grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-center" : ""}`}>
      <button onClick={onOpen} aria-label={`Voir les détails de ${project.title}`} className="block w-full overflow-hidden rounded-lg border border-border bg-card text-left">
        <img src={project.gallery[0]?.src} alt={project.gallery[0]?.alt ?? project.title} loading="lazy" className={`w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] ${featured ? "aspect-[16/10]" : "aspect-[16/11]"}`} />
      </button>
      <div className={featured ? "" : "pt-6"}>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">{project.category}</p>
        </div>
        <h3 className={`mt-3 font-display font-semibold tracking-tight ${featured ? "text-4xl md:text-5xl" : "text-2xl"}`}>{project.title}</h3>
        <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-secondary-foreground">{project.technologies.map((t) => <span key={t}>{t}</span>)}</div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={onOpen}>Voir le projet <ChevronRight className="size-4" /></Button>
          <span className="text-xs text-muted-foreground">Lien public à venir</span>
        </div>
      </div>
    </article>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); };
  const [featured, ...others] = projects;

  return <div className="min-h-screen bg-background text-foreground">
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#accueil" className="font-display text-lg font-semibold tracking-tight">GJA<span className="text-primary">.</span></a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">{nav.map(([label, id]) => <a key={id} href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}</nav>
        <div className="flex items-center gap-3">
          <a href={MSNBA_URL} target="_blank" rel="noreferrer" className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary sm:inline-flex">MSNBA <ArrowUpRight className="size-3.5" /></a>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <nav className="border-t border-border bg-background p-5 lg:hidden">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 text-sm">{label}</a>)}<a href={MSNBA_URL} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-primary">MSNBA <ArrowUpRight className="size-4" /></a></nav>}
    </header>

    <main>
      <section id="accueil" className="border-b border-border pt-16">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center md:py-36 lg:px-8">
          <div className="reveal">
            <p className="font-mono text-xs tracking-[0.3em] text-primary">PORTFOLIO — GUEHI JEAN AZARIA</p>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.03] tracking-tight md:text-7xl">Guehi Jean Azaria</h1>
            <p className="mt-6 text-lg text-secondary-foreground md:text-xl">Développeur web &amp; créateur de solutions numériques</p>
            <p className="mx-auto mt-8 max-w-xl font-display text-2xl leading-9 md:text-3xl">Je transforme des idées en expériences numériques.</p>
            <p className="mx-auto mt-6 max-w-xl leading-7 text-muted-foreground">Passionné par l’informatique et la création numérique, je conçois des sites web, applications web et solutions digitales modernes tout en développant continuellement mes compétences.</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild><a href="#projets">Voir mes projets</a></Button>
              <Button asChild variant="outline"><a href="#contact">Me contacter</a></Button>
            </div>
            <a href={MSNBA_URL} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">Découvrir MSNBA →</a>
            <p className="mt-10 inline-flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="size-3.5 text-primary" /> Abidjan, Côte d’Ivoire</p>
          </div>
        </div>
      </section>

      <section id="a-propos" className="border-b border-border py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeader number="01" title="À propos" />
          <div className="grid gap-12 md:grid-cols-[8rem_1fr]">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Parcours</p>
            <div>
              <div className="space-y-5 text-lg leading-8 text-muted-foreground">
                <p className="text-foreground">Je suis Guehi Jean Azaria, informaticien passionné par la création de solutions numériques.</p>
                <p>Mon parcours m’a amené à explorer plusieurs domaines de l’informatique, notamment le développement web, les applications, la cybersécurité, la création vidéo et les outils d’intelligence artificielle.</p>
                <p>Curieux et ouvert à la découverte, j’aime apprendre de nouvelles technologies et surtout les mettre en pratique à travers des projets concrets.</p>
                <p>Mon objectif est de continuer à progresser, construire des solutions utiles et développer une expertise polyvalente dans le numérique.</p>
              </div>
              <p className="mt-12 border-l-2 border-primary pl-6 font-display text-2xl leading-10">Apprendre. Expérimenter. Construire. Évoluer.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="competences" className="border-b border-border py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeader number="02" title="Ce que je sais faire" intro="Une pratique polyvalente, de la conception d’interfaces à la sécurité et à la création numérique." />
          <div className="divide-y divide-border">
            {skills.map(({ title, icon: Icon, items }) => (
              <article key={title} className="grid gap-4 py-8 md:grid-cols-[8rem_1fr]">
                <div className="flex items-center gap-3"><Icon className="size-4 text-primary" /><span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{title.split(" ")[0]}</span></div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{title}</h3>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">{items.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projets" className="border-b border-border py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeader number="03" title="Projets sélectionnés" intro="Des idées transformées en expériences numériques. Cliquez sur un projet pour parcourir ses captures." />
          {featured && <div className="mb-20"><ProjectEntry project={featured} index={0} featured onOpen={() => setSelected(featured)} /></div>}
          <div className="grid gap-14 border-t border-border pt-14 md:grid-cols-2">
            {others.map((project, index) => <ProjectEntry key={project.title} project={project} index={index + 1} onOpen={() => setSelected(project)} />)}
          </div>
        </div>
      </section>

      <section id="formations" className="border-b border-border py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeader number="04" title="Parcours & formations" />
          <div className="divide-y divide-border border-y border-border">
            {formations.map(([title, org]) => (
              <article key={title} className="flex flex-wrap items-center justify-between gap-3 py-5">
                <div className="flex items-center gap-3"><GraduationCap className="size-4 text-primary" /><h3 className="font-medium">{title}</h3></div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{org}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeader number="05" title="Ce que j’explore actuellement" />
          <div className="grid gap-12 md:grid-cols-[8rem_1fr]">
            <BookOpen className="size-6 text-primary" />
            <div>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">Le numérique évolue constamment. J’aime donc explorer de nouvelles technologies, expérimenter et transformer mes apprentissages en projets concrets.</p>
              <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {["Développement web", "Applications", "Cybersécurité", "Intelligence artificielle", "Création numérique"].map((x, i) => (
                  <li key={x} className="flex items-baseline gap-4 border-b border-border pb-3 font-display text-lg"><span className="font-mono text-xs text-primary">0{i + 1}</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/40 py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Mon activité professionnelle</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">MSNBA</h2>
              <p className="mt-5 max-w-lg leading-7 text-muted-foreground">Création de sites web et applications pour entreprises, entrepreneurs et professionnels.</p>
              <Button asChild variant="outline" className="mt-8"><a href={MSNBA_URL} target="_blank" rel="noreferrer">Visiter MSNBA <ArrowUpRight className="size-4" /></a></Button>
            </div>
            <a href={MSNBA_URL} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-lg border border-border bg-card">
              <img src={msnba.url} alt="Aperçu du site professionnel MSNBA" loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]" />
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeader number="06" title="Contact" />
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <h3 className="font-display text-2xl font-semibold">Guehi Jean Azaria</h3>
              <p className="mt-3 flex items-center gap-2 text-muted-foreground"><MapPin className="size-4 text-primary" /> Abidjan, Côte d’Ivoire</p>
              <div className="mt-10 space-y-3">{["Email", "WhatsApp", "GitHub", "LinkedIn"].map((x) => <div key={x} className="flex items-center justify-between border-b border-border py-3"><span className="text-sm">{x}</span><span className="text-xs text-muted-foreground">À renseigner</span></div>)}</div>
            </div>
            <form onSubmit={submit} className="grid gap-5 rounded-lg border border-border bg-card p-6 md:grid-cols-2 md:p-8">{[["Nom", "text"], ["Email", "email"], ["Sujet", "text"]].map(([label, type], i) => <label key={label} className={i === 2 ? "md:col-span-2" : ""}><span className="mb-2 block text-sm font-medium">{label}</span><input type={type} required className="h-12 w-full rounded-md border border-input bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>)}<label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Message</span><textarea required rows={5} className="w-full resize-none rounded-md border border-input bg-background p-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label><div className="flex flex-wrap items-center gap-4 md:col-span-2"><Button type="submit">Envoyer <Send className="size-4" /></Button><p className="text-xs text-muted-foreground">{submitted ? "Message prêt. L’envoi sera activé prochainement." : "L’envoi du formulaire n’est pas encore activé."}</p></div></form>
          </div>
        </div>
      </section>
    </main>

    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div><p className="font-display text-xl font-semibold">Guehi Jean Azaria</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Développeur web &amp; créateur de solutions numériques<br />Abidjan, Côte d’Ivoire</p></div>
          <nav aria-label="Navigation de pied de page" className="grid grid-cols-2 gap-2 text-sm">{nav.map(([label, id]) => <a key={id} href={`#${id}`} className="text-muted-foreground hover:text-foreground">{label}</a>)}</nav>
          <div className="md:text-right"><p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Mon activité professionnelle</p><a href={MSNBA_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-semibold text-primary">MSNBA <ExternalLink className="size-4" /></a></div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Guehi Jean Azaria. Tous droits réservés.</div>
      </div>
    </footer>
    {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
  </div>;
}
