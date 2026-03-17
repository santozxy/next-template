import { Inter, Unbounded } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["400", "500", "600", "700", "800", "900"],
});