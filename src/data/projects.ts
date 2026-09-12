import cv1 from "@/assets/cv1.png.asset.json";
import cv2 from "@/assets/cv2.png.asset.json";
import cv3 from "@/assets/cv3.png.asset.json";
import immo1 from "@/assets/immo1.png.asset.json";
import immo2 from "@/assets/immo2.png.asset.json";
import immo4 from "@/assets/immo4.png.asset.json";
import cal1 from "@/assets/cal1.png.asset.json";
import cal2 from "@/assets/cal2.png.asset.json";

export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  role: string;
  demoUrl?: string;
  githubUrl?: string;
  gallery: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    title: "CV Builder",
    category: "Application web",
    description: "Une application permettant de créer et personnaliser facilement un CV professionnel à partir d’une interface moderne.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    features: ["Création de CV", "Personnalisation", "Modèles", "Aperçu", "Export PDF", "Interface responsive"],
    role: "Conception de l’interface et développement de l’application.",
    gallery: [
      { src: cv1.url, alt: "Page d’accueil de CV Builder" },
      { src: cv2.url, alt: "Éditeur et aperçu de CV Builder" },
      { src: cv3.url, alt: "Espace de compte de CV Builder" },
    ],
  },
  {
    title: "ImmoMarket",
    category: "Application immobilière",
    description: "Une expérience numérique pensée autour de la découverte et de la présentation de biens immobiliers.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    features: ["Consultation de biens", "Fiches immobilières", "Recherche", "Présentation des propriétés", "Interface responsive"],
    role: "Conception et développement d’une expérience immobilière de démonstration.",
    gallery: [
      { src: immo1.url, alt: "Accueil et recherche de biens sur ImmoMarket" },
      { src: immo2.url, alt: "Catalogue de propriétés ImmoMarket" },
      { src: immo4.url, alt: "Détails et contact d’un bien ImmoMarket" },
    ],
  },
  {
    title: "Calculatrice Mathématique",
    category: "Application web",
    description: "Une application de calcul avancé permettant d’explorer différentes opérations mathématiques à travers une interface moderne.",
    technologies: ["React", "TypeScript", "Calcul symbolique"],
    features: ["Calculs avancés", "Équations", "Dérivées", "Limites", "Intégrales et primitives", "Factorisation", "Développement"],
    role: "Combinaison de l’interface utilisateur, de la logique applicative et des calculs mathématiques.",
    gallery: [
      { src: cal1.url, alt: "Saisie d’une expression dans la Calculatrice Mathématique" },
      { src: cal2.url, alt: "Résultat détaillé dans la Calculatrice Mathématique" },
    ],
  },
];