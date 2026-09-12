import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, Check,
  ChevronRight, Code2, ExternalLink, GraduationCap, Layers3, MapPin,
  Menu, MonitorSmartphone, Palette, Send, ShieldCheck, Sparkles, X,
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
  ["Accueil", "accueil"], ["À propos", "a-propos"], ["Compétences", "competences"],
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

function SectionHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <header className="mb-10 max-w-2xl"><p className="mb-3 font-mono text-xs font-semibold uppercase text-primary">{eyebrow}</p><h2 className="text-3xl font-semibold text-foreground md:text-5xl">{title}</h2>{intro && <p className="mt-4 leading-7 text-muted-foreground">{intro}</p>}</header>;
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
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-3 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`Détails de ${project.title}`} onMouseDown={onClose}>
    <div className="max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-lg border border-border bg-card shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur"><div><p className="text-xs font-semibold uppercase text-primary">{project.category}</p><h2 className="text-xl font-semibold">{project.title}</h2></div><Button variant="ghost" size="icon" onClick={onClose} aria-label="Fermer"><X className="size-5" /></Button></div>
      <div className="grid lg:grid-cols-[1.35fr_.65fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <div className="relative overflow-hidden rounded-md border border-border bg-background"><img src={project.gallery[image]?.src} alt={project.gallery[image]?.alt ?? project.title} className="aspect-[16/9] w-full object-cover" />
            {project.gallery.length > 1 && <><Button variant="outline" size="icon" className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/85" onClick={() => move(-1)} aria-label="Image précédente"><ArrowLeft className="size-4" /></Button><Button variant="outline" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/85" onClick={() => move(1)} aria-label="Image suivante"><ArrowRight className="size-4" /></Button></>}
          </div><div className="mt-3 flex gap-2">{project.gallery.map((item, index) => <button key={item.src} aria-label={`Afficher l’image ${index + 1}`} onClick={() => setImage(index)} className={`h-1.5 flex-1 rounded-full ${index === image ? "bg-primary" : "bg-muted"}`} />)}</div>
        </div>
        <div className="space-y-7 p-6"><div><h3 className="mb-2 text-lg font-semibold">Présentation</h3><p className="text-sm leading-7 text-muted-foreground">{project.description}</p></div><div><h3 className="mb-2 text-lg font-semibold">La solution</h3><p className="text-sm leading-7 text-muted-foreground">{project.role}</p></div><div><h3 className="mb-3 text-lg font-semibold">Fonctionnalités</h3><ul className="space-y-2">{project.features.map((f) => <li key={f} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{f}</li>)}</ul></div><div className="flex flex-wrap gap-2">{project.technologies.map((t) => <span key={t} className="rounded-sm border border-border bg-muted px-2.5 py-1 text-xs text-secondary-foreground">{t}</span>)}</div><div className="grid grid-cols-2 gap-3"><Button disabled>Voir le projet</Button><Button variant="outline" disabled>Voir le code</Button></div><p className="text-center text-xs text-muted-foreground">Liens bientôt disponibles</p></div>
      </div>
    </div>
  </div>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); };
  return <div className="min-h-screen bg-background text-foreground">
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl"><div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 lg:px-8"><a href="#accueil" className="flex items-center gap-3 font-display font-semibold"><span className="grid size-9 place-items-center rounded-md border border-primary/40 bg-primary/10 text-sm text-primary">GJ</span><span className="hidden sm:inline">Guehi Jean Azaria</span></a><nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">{nav.map(([label, id]) => <a key={id} href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}</nav><div className="flex items-center gap-2"><Button asChild size="sm" className="hidden sm:inline-flex"><a href={MSNBA_URL} target="_blank" rel="noreferrer">Découvrir MSNBA <ArrowUpRight className="size-4" /></a></Button><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button></div></div>{menuOpen && <nav className="border-t border-border bg-background p-5 lg:hidden">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 text-sm">{label}</a>)}<Button asChild className="mt-4 w-full"><a href={MSNBA_URL} target="_blank" rel="noreferrer">Découvrir MSNBA</a></Button></nav>}</header>

    <main>
      <section id="accueil" className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-border pt-24"><div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:52px_52px]" /><div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8"><div className="reveal"><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" /> Abidjan, Côte d’Ivoire</div><p className="mb-4 font-mono text-xs font-semibold uppercase text-primary">Développeur web & créateur numérique</p><h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">Guehi Jean <span className="text-primary">Azaria.</span></h1><p className="mt-7 max-w-2xl text-xl leading-8 text-secondary-foreground md:text-2xl">Je transforme des idées en expériences numériques.</p><p className="mt-5 max-w-xl leading-7 text-muted-foreground">Passionné par l’informatique et la création numérique, je conçois des sites web, applications web et solutions digitales modernes tout en développant continuellement mes compétences.</p><div className="mt-9 flex flex-wrap gap-3"><Button asChild><a href="#projets">Voir mes projets <ChevronRight className="size-4" /></a></Button><Button asChild variant="outline"><a href="#contact">Me contacter</a></Button><Button asChild variant="ghost"><a href={MSNBA_URL} target="_blank" rel="noreferrer">Découvrir MSNBA <ArrowUpRight className="size-4" /></a></Button></div></div><div className="relative hidden lg:block"><div className="rounded-lg border border-border bg-card p-5 shadow-2xl"><div className="mb-5 flex items-center justify-between border-b border-border pb-4"><div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-destructive" /><span className="size-2.5 rounded-full bg-primary/60" /><span className="size-2.5 rounded-full bg-primary" /></div><span className="font-mono text-xs text-muted-foreground">azaria.profile</span></div><div className="space-y-5 font-mono text-sm"><p><span className="text-primary">const</span> profil = &#123;</p><p className="pl-6 text-muted-foreground">métier: <span className="text-foreground">“Développeur web”</span>,</p><p className="pl-6 text-muted-foreground">approche: <span className="text-foreground">“Curieux et ouvert”</span>,</p><p className="pl-6 text-muted-foreground">mission: <span className="text-foreground">“Créer des solutions utiles”</span></p><p>&#125;;</p></div><div className="mt-12 grid grid-cols-3 gap-3">{[Code2, BrainCircuit, Palette].map((Icon, i) => <div key={i} className="grid aspect-square place-items-center rounded-md border border-border bg-muted"><Icon className="size-7 text-primary" /></div>)}</div></div></div></div></section>

      <section id="a-propos" className="border-b border-border py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeader eyebrow="01 — À propos" title="À propos de moi" /><div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr]"><div className="space-y-5 text-lg leading-8 text-muted-foreground"><p>Je suis Guehi Jean Azaria, informaticien passionné par la création de solutions numériques.</p><p>Mon parcours m’a amené à explorer plusieurs domaines de l’informatique, notamment le développement web, les applications, la cybersécurité, la création vidéo et les outils d’intelligence artificielle.</p><p>Curieux et ouvert à la découverte, j’aime apprendre de nouvelles technologies et surtout les mettre en pratique à travers des projets concrets.</p><p>Mon objectif est de continuer à progresser, construire des solutions utiles et développer une expertise polyvalente dans le numérique.</p></div><aside className="self-start rounded-lg border border-primary/30 bg-primary/5 p-7"><Sparkles className="size-6 text-primary" /><p className="mt-8 text-xs font-semibold uppercase text-primary">Ma philosophie</p><p className="mt-3 font-display text-2xl font-semibold leading-9">Apprendre.<br />Expérimenter.<br />Construire.<br />Évoluer.</p></aside></div><div className="mt-20 grid gap-6 border-t border-border pt-12 md:grid-cols-2"><div><span className="font-mono text-sm text-primary">2020</span><h3 className="mt-2 text-xl font-semibold">Baccalauréat série D</h3></div><div><span className="font-mono text-sm text-primary">Formation principale</span><h3 className="mt-2 text-xl font-semibold">Licence en informatique MIAGE</h3></div></div></div></section>

      <section id="competences" className="border-b border-border bg-card/35 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeader eyebrow="02 — Expertise" title="Mes compétences" intro="Une pratique polyvalente, de la conception d’interfaces à la sécurité et à la création numérique." /><div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{skills.map(({ title, icon: Icon, items }) => <article key={title} className="bg-background p-7 transition-colors hover:bg-card"><Icon className="size-6 text-primary" /><h3 className="mt-5 text-lg font-semibold">{title}</h3><div className="mt-5 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-sm bg-muted px-2.5 py-1.5 text-xs text-muted-foreground">{item}</span>)}</div></article>)}</div></div></section>

      <section id="projets" className="border-b border-border py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeader eyebrow="03 — Réalisations" title="Mes projets" intro="Des idées transformées en expériences numériques. Des réalisations personnelles et projets de démonstration." /><div className="grid gap-7 lg:grid-cols-3">{projects.map((project) => <article key={project.title} className="group overflow-hidden rounded-lg border border-border bg-card"><button className="block w-full overflow-hidden text-left" onClick={() => setSelected(project)} aria-label={`Voir les détails de ${project.title}`}><img src={project.gallery[0]?.src} alt={project.gallery[0]?.alt ?? project.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></button><div className="p-6"><p className="text-xs font-semibold uppercase text-primary">{project.category}</p><h3 className="mt-2 text-2xl font-semibold">{project.title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((t) => <span key={t} className="text-xs text-secondary-foreground">{t}</span>)}</div><div className="mt-6 grid grid-cols-2 gap-3"><Button disabled size="sm">Voir le projet</Button><Button variant="outline" size="sm" onClick={() => setSelected(project)}>Détails</Button></div><p className="mt-3 text-center text-[11px] text-muted-foreground">Lien du projet à venir</p></div></article>)}</div></div></section>

      <section id="formations" className="border-b border-border bg-card/35 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeader eyebrow="04 — Parcours" title="Formations & certifications" /><div className="grid gap-4 md:grid-cols-2">{formations.map(([title, org]) => <article key={title} className="flex gap-4 rounded-md border border-border bg-background p-5"><div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/10"><GraduationCap className="size-5 text-primary" /></div><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{org}</p></div></article>)}</div></div></section>

      <section className="border-b border-border py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><BookOpen className="size-7 text-primary" /><h2 className="mt-6 text-4xl font-semibold">Je continue d’apprendre.</h2><p className="mt-5 leading-7 text-muted-foreground">Le numérique évolue constamment. J’aime donc explorer de nouvelles technologies, expérimenter et transformer mes apprentissages en projets concrets.</p></div><div className="grid grid-cols-2 gap-3">{["Développement web", "Applications", "Cybersécurité", "Intelligence artificielle", "Création numérique"].map((x, i) => <div key={x} className={`flex min-h-28 items-end rounded-md border border-border bg-card p-5 font-display font-semibold ${i === 4 ? "col-span-2" : ""}`}><span className="mr-3 font-mono text-xs text-primary">0{i + 1}</span>{x}</div>)}</div></div></section>

      <section className="border-b border-border py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid overflow-hidden rounded-lg border border-primary/30 bg-card lg:grid-cols-2"><div className="p-8 md:p-12"><p className="text-xs font-semibold uppercase text-primary">Mon activité professionnelle</p><h2 className="mt-5 text-4xl font-semibold">Un projet en tête ?</h2><p className="mt-5 max-w-lg leading-7 text-muted-foreground">Si vous recherchez un site web, une application ou une solution numérique pour votre activité, découvrez mon espace professionnel.</p><Button asChild className="mt-8"><a href={MSNBA_URL} target="_blank" rel="noreferrer">Découvrir MSNBA <ArrowUpRight className="size-4" /></a></Button></div><a href={MSNBA_URL} target="_blank" rel="noreferrer" className="group relative min-h-72 overflow-hidden border-t border-border lg:border-l lg:border-t-0"><img src={msnba.url} alt="Aperçu du site professionnel MSNBA" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-left transition-transform duration-500 group-hover:scale-[1.02]" /><div className="absolute inset-0 bg-background/20" /></a></div></div></section>

      <section id="contact" className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeader eyebrow="05 — Échangeons" title="Me contacter" /><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><h3 className="text-2xl font-semibold">Guehi Jean Azaria</h3><p className="mt-3 flex items-center gap-2 text-muted-foreground"><MapPin className="size-4 text-primary" /> Abidjan, Côte d’Ivoire</p><div className="mt-10 space-y-3">{["Email", "WhatsApp", "GitHub", "LinkedIn"].map((x) => <div key={x} className="flex items-center justify-between border-b border-border py-3"><span className="text-sm">{x}</span><span className="text-xs text-muted-foreground">À renseigner</span></div>)}</div></div><form onSubmit={submit} className="grid gap-5 rounded-lg border border-border bg-card p-6 md:grid-cols-2 md:p-8">{[["Nom", "text"], ["Email", "email"], ["Sujet", "text"]].map(([label, type], i) => <label key={label} className={i === 2 ? "md:col-span-2" : ""}><span className="mb-2 block text-sm font-medium">{label}</span><input type={type} required className="h-12 w-full rounded-md border border-input bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>)}<label className="md:col-span-2"><span className="mb-2 block text-sm font-medium">Message</span><textarea required rows={5} className="w-full resize-none rounded-md border border-input bg-background p-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label><div className="flex flex-wrap items-center gap-4 md:col-span-2"><Button type="submit">Envoyer <Send className="size-4" /></Button><p className="text-xs text-muted-foreground">{submitted ? "Message prêt. L’envoi sera activé prochainement." : "L’envoi du formulaire n’est pas encore activé."}</p></div></form></div></div></section>
    </main>

    <footer className="border-t border-border bg-card py-12"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-10 md:grid-cols-3"><div><p className="font-display text-xl font-semibold">Guehi Jean Azaria</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Développeur web & créateur de solutions numériques<br />Abidjan, Côte d’Ivoire</p></div><nav aria-label="Navigation de pied de page" className="grid grid-cols-2 gap-2 text-sm">{nav.map(([label, id]) => <a key={id} href={`#${id}`} className="text-muted-foreground hover:text-foreground">{label}</a>)}</nav><div className="md:text-right"><p className="text-xs uppercase text-muted-foreground">Mon activité professionnelle</p><a href={MSNBA_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-semibold text-primary">MSNBA <ExternalLink className="size-4" /></a></div></div><div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Guehi Jean Azaria. Tous droits réservés.</div></div></footer>
    {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
  </div>;
}