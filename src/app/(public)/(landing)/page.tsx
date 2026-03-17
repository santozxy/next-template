import { Hero } from "./components/hero"
import { Features } from "./components/features"
import { Started } from "./components/started"
import { Footer } from "./components/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Started />
      <Footer />
    </main>
  )
}
