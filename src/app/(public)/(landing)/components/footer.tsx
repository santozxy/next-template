import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border border-t py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-foreground text-xl font-bold">Next</span>
            <span className="text-muted-foreground text-xl font-bold">
              Template
            </span>
          </div>

          <p className="text-muted-foreground text-sm">
            Open source. MIT License.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/syslae-solutions/next-template"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
