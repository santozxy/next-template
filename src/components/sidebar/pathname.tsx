"use client";
import { usePathname } from "next/navigation";
import { identifierLinks } from "./helpers";

export function Pathname() {
  const pathname = usePathname();
  const identifierLinksKeys = Object.keys(identifierLinks);

  // Se existe uma correspondência exata
  if (identifierLinks[pathname]) {
    return <span>{identifierLinks[pathname]}</span>;
  }

  // Caso tenha ID (rota dinâmica, tipo /events/123/edit)
  for (const key of identifierLinksKeys) {
    // Substitui [id] por um padrão de número ou string alfanumérica
    const pattern = key.replace("[id]", "[^/]+");
    const regex = new RegExp(`^${pattern}$`);

    if (regex.test(pathname)) {
      return <span>{identifierLinks[key]}</span>;
    }
  }

  return <span />; // não encontrou nada
}
