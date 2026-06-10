"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Mail } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductosPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const headerInView = useInView(headerRef, { once: true })
  const productsInView = useInView(productsRef, { once: false, amount: 0.1 })
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )


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
        {paginatedProducts.map((product, index) => (


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
      <div className="mt-10 flex justify-center gap-4">
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        variant="outline"
        className="rounded-full"
      >
        Anterior
      </Button>
      <span className="text-sm text-muted-foreground pt-2">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        variant="outline"
        className="rounded-full"
      >
        Siguiente
      </Button>
    </div>

    </div>
  )
}

// Sample product data
const products = [
  {
    id: "tele",
    name: "Mueble TV Raíz Natural",
    category: "Sala",
    price: "189.990 CLP",
    description: "Mueble de TV de madera con cajón y dos puertas. ",
    image: "/tele1.png?height=400&width=400",
  },
  {
    id: "cocina1",
    name: "Cocina Raíz Noble",
    category: "Comedor",
    price: "249.990 CLP",
    description: "Mueble de cocina de madera con lavaplatos doble, tres cajones y puertas inferiores.",
    image: "/cocina1.png?height=400&width=400",
  },
  {
    id: "cocina2",
    name: "Cocina Natura Loft",
    category: "Comedor",
    price: "229.990 CLP",
    description: "Mueble de cocina con lavaplatos doble, tres cajones y una puerta lateral.",
    image: "/cocina2.1.png?height=400&width=400",
  },
  {
    id: "comoda",
    name: "Cómoda Luna Clara",
    category: "Dormitorio",
    price: "119.990 CLP",
    description: "Cómoda de 4 cajones con diseño moderno y acabado en tono madera clara, ideal para dormitorios o espacios de almacenamiento.",
    image: "/comoda1.png?height=400&width=400",
  },
  {
    id: "velador",
    name: "Velador Luna Nórdica",
    category: "Dormitorio",
    price: "49.990 CLP",
    description: "Velador moderno con un cajón y espacio abierto, ideal para complementar tu dormitorio con estilo y funcionalidad.",
    image: "/velador2.jpeg?height=400&width=400",
  },
  {
    id: "camarote",
    name: "Camarote Raíz Doble",
    category: "Dormitorio",
    price: "219.990 CLP",
    description: "Sillón reclinable con mecanismo suave y tapizado de alta resistencia.",
    image: "/camarote1.png?height=400&width=400",
  },

  {
    id: "cocina3",
    name: "Mueble Cocina Nogal",
    category: "Comerdor",
    price: "269.990 CLP",
    description: "Sillón reclinable con mecanismo suave y tapizado de alta resistencia.",
    image: "/Mcocina.jpeg?height=400&width=400",
  },
  
  {
    id: "cocina4",
    name: "Mueble Modular Gris Claro",
    category: "Comerdor",
    price: "159.990 CLP",
    description: "Sillón reclinable con mecanismo suave y tapizado de alta resistencia.",
    image: "/modular1.jpeg?height=400&width=400",
  },
  
  {
    id: "9",
    name: "Mueble Cocina Nogal",
    category: "Comerdor",
    price: "289.990 CLP",
    description: "Sillón reclinable con mecanismo suave y tapizado de alta resistencia.",
    image: "/9.jpeg?height=400&width=400",
  },
  

  {
    id: "10",
    name: "Closet Raíz Elegante",
    category: "Dormitorio",
    price: "199.990 CLP",
    description: "Sillón reclinable con mecanismo suave y tapizado de alta resistencia.",
    image: "/10.1.jpeg?height=400&width=400",
  },

  {
    id: "11",
    name: "Closet Roble",
    category: "Dormitorio",
    price: "179.990 CLP",
    description: "Sillón reclinable con mecanismo suave y tapizado de alta resistencia.",
    image: "/11.1.jpeg?height=400&width=400",
  },

  {
    id: "12",
    name: "Mueble Lavaplatos Veta Clara",
    category: "Dormitorio",
    price: "149.990 CLP",
    description: "Sillón reclinable con mecanismo suave y tapizado de alta resistencia.",
    image: "/12.1.jpeg?height=400&width=400",
  },
  
]

