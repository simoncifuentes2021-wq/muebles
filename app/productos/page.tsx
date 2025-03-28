"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductosPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  const headerInView = useInView(headerRef, { once: true })
  const productsInView = useInView(productsRef, { once: false, amount: 0.1 })

  return (
    <div className="container py-12 md:py-16">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center mb-12 md:mb-20"
      >
        <div className="flex justify-center mb-4">
          <div className="h-1 w-16 bg-primary rounded-full" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Productos</h1>
        <p className="text-lg text-muted-foreground">
          Descubre nuestra colección exclusiva de muebles de alta calidad, diseñados para aportar elegancia y confort a
          cada espacio de tu hogar.
        </p>
      </motion.div>

      <motion.div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
            whileHover={{ y: -10 }}
            className="flex flex-col h-full"
          >
            <Card className="overflow-hidden border-none h-full bg-background shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 z-10 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100" />
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </motion.div>
                <div className="absolute right-4 top-4 z-20">
                  <div className="rounded-full bg-white/90 py-1.5 px-3 text-xs font-medium text-black">
                    {product.category}
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4 flex flex-col flex-grow">
                <div>
                  <h2 className="text-2xl font-semibold">{product.name}</h2>
                  <p className="text-xl font-light text-muted-foreground mt-1">${product.price}</p>
                </div>
                <p className="text-muted-foreground flex-grow">{product.description}</p>
                <div className="flex flex-col gap-3 pt-4">
                  <Link href={`/productos/${product.id}`}>
                    <Button className="w-full rounded-full">Ver Detalles</Button>
                  </Link>
                  <Link href="/contacto">
                    <Button variant="outline" className="w-full rounded-full gap-2">
                      <Mail className="h-4 w-4" />
                      Solicitar Información
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Sample product data
const products = [
  {
    id: "sofa-moderno",
    name: "Sofá Moderno",
    category: "Sala",
    price: "1,299",
    description: "Sofá de 3 plazas con tapizado premium y estructura de madera maciza.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "mesa-comedor",
    name: "Mesa de Comedor",
    category: "Comedor",
    price: "899",
    description: "Mesa de comedor extensible para 6-8 personas con acabado en roble natural.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "silla-ergonomica",
    name: "Silla Ergonómica",
    category: "Oficina",
    price: "299",
    description: "Silla de oficina con soporte lumbar y ajustes de altura e inclinación.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "cama-king",
    name: "Cama King Size",
    category: "Dormitorio",
    price: "1,499",
    description: "Cama king size con cabecero tapizado y base de madera resistente.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "estanteria-modular",
    name: "Estantería Modular",
    category: "Sala",
    price: "599",
    description: "Estantería modular personalizable con múltiples configuraciones posibles.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "sillon-reclinable",
    name: "Sillón Reclinable",
    category: "Sala",
    price: "799",
    description: "Sillón reclinable con mecanismo suave y tapizado de alta resistencia.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

