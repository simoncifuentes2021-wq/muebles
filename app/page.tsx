"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"
import { SVGProps } from "react"; // Asegúrate de importar el tipo

import { Button } from "@/components/ui/button"

export default function Home() {
  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const whyUsRef = useRef<HTMLDivElement>(null)

  const featuredInView = useInView(featuredRef, { once: false, amount: 0.2 })
  const whyUsInView = useInView(whyUsRef, { once: false, amount: 0.2 })

  const heroImageY = useTransform(scrollY, [0, 500], [0, 100])
  const heroTextY = useTransform(scrollY, [0, 500], [0, -50])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32 xl:py-48">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/50">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 mix-blend-overlay" />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ y: heroTextY }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="space-y-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1.5 bg-primary"
                />
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                >
                  Elegancia y Confort para tu Hogar
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                >
                  Descubre nuestra colección de muebles de alta calidad diseñados para transformar tu espacio.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Link href="/productos" passHref>
                  <Button size="lg" className="gap-1 rounded-full px-8">
                    Ver Catálogo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contacto" passHref>
                  <Button size="lg" variant="outline" className="rounded-full px-8">
                    Contáctanos
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div style={{ y: heroImageY }} className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl"
              >
                <Image
                  src="/1.webp?height=1000&width=1200"
                  alt="Muebles elegantes para sala de estar"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={featuredRef} className="w-full py-24 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="h-1 w-16 bg-primary rounded-full" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Productos Destacados</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explora nuestra selección de muebles más populares. Contáctanos para obtener más información.
              </p>
            </div>
          </motion.div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              >
                <Link
                  href={`/productos/${product.id}`}
                  className="group relative block overflow-hidden rounded-2xl bg-background"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
                        Ver detalles
                      </span>
                    </div>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold">{product.name}</h3>
                    <p className="mt-2 text-xl font-light text-muted-foreground">${product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center mt-8"
          >
            <Link href="/productos" passHref>
              <Button size="lg" variant="outline" className="rounded-full px-8 gap-2">
                Ver todos los productos
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyUsRef} className="w-full py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="h-1 w-16 bg-primary rounded-full" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Por qué elegirnos?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nos destacamos por la calidad, diseño y servicio personalizado.
              </p>
            </div>
          </motion.div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-3 lg:gap-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center space-y-4 rounded-2xl border border-border/40 bg-background/60 p-8 shadow-sm backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="text-center text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="w-full py-24 md:py-32 bg-muted/20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-4xl rounded-3xl bg-background p-8 md:p-12 shadow-lg"
          >
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <blockquote className="max-w-2xl text-xl md:text-2xl font-medium italic text-muted-foreground">
                "Estos muebles han transformado completamente mi hogar. La calidad es excepcional y el servicio al
                cliente fue impecable. No podría estar más satisfecho con mi compra."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Foto de cliente"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold">Ana García</p>
                  <p className="text-sm text-muted-foreground">Cliente desde 2022</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const featuredProducts = [
  {
    id: "sofa-moderno",
    name: "Sofá Moderno",
    price: "1,299",
    image: "/sillon_elegante.jpg?height=400&width=400",
  },
  {
    id: "mesa-comedor",
    name: "Mesa de Comedor",
    price: "899",
    image: "/mesa_comedor.webp?height=400&width=400",
  },
  {
    id: "silla-ergonomica",
    name: "Silla Ergonómica",
    price: "299",
    image: "/silla_ergonomica.jpg?height=400&width=400",
  },
]

const features = [
  {
    title: "Calidad Premium",
    description:
      "Todos nuestros muebles están fabricados con materiales de la más alta calidad para garantizar durabilidad y elegancia.",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Diseño Exclusivo",
    description:
      "Diseños únicos y contemporáneos que combinan estética y funcionalidad para transformar tu hogar.",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Atención Personalizada",
    description:
      "Nuestro equipo está comprometido a brindarte una experiencia excepcional y asesoramiento experto.",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];