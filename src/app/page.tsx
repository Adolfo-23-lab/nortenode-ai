import HomeBody from "@/components/home/HomeBody";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg-v2)]">
      <HomeBody />
      <Footer />
    </main>
  );
}
