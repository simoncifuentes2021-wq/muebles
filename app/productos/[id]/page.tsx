"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowLeft, Check, Mail, Star, Truck } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function ProductDetailPage() {
  const params = useParams() as { id: string }
  const product = products.find((p) => p.id === params.id)
  const [currentImage, setCurrentImage] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const headerInView = typeof window !== "undefined" ? useInView(headerRef, { once: true }) : false
  const contentInView = typeof window !== "undefined" ? useInView(contentRef, { once: true }) : false

  if (!product) {
    notFound()
  }

  // Usar las imágenes únicas del producto
  const productImages = product.images || [
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
    "/placeholder.svg?height=800&width=800",
  ]

  return (
    <div className="container py-10 lg:py-16">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/productos" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a productos
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Images */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="overflow-hidden rounded-2xl border">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square"
              >
                <Image
                  src={productImages[currentImage] || "/placeholder.svg"}
                  alt={`${product.name} - Vista ${currentImage + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`overflow-hidden rounded-xl border cursor-pointer ${
                  currentImage === i ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setCurrentImage(i)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} - Miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold"
            >
              {product.name}
            </motion.h1>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">(24 reseñas)</span>
            </div>
          </div>

          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl font-bold"
            >
              ${product.price}
            </motion.p>
            <p className="text-sm text-muted-foreground">Impuestos incluidos</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="rounded-full bg-green-100 p-1">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span>En stock - Listo para enviar</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="rounded-full bg-primary/10 p-1">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <span>Envío gratuito en pedidos superiores a $999</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-4"
          >
            <Link href="/contacto" className="w-full">
              <Button size="lg" className="w-full gap-2 rounded-full">
                <Mail className="h-5 w-5" />
                Solicitar información
              </Button>
            </Link>
          </motion.div>

          <Separator />

          <Tabs defaultValue="descripcion">
            <TabsList className="w-full">
              <TabsTrigger value="descripcion" className="flex-1 rounded-full">
                Descripción
              </TabsTrigger>
              <TabsTrigger value="caracteristicas" className="flex-1 rounded-full">
                Características
              </TabsTrigger>
              <TabsTrigger value="dimensiones" className="flex-1 rounded-full">
                Dimensiones
              </TabsTrigger>
            </TabsList>
            <TabsContent value="descripcion" className="mt-6 text-muted-foreground">
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {product.fullDescription}
              </motion.p>
            </TabsContent>
            <TabsContent value="caracteristicas" className="mt-6">
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="dimensiones" className="mt-6">
              <div className="space-y-2 text-muted-foreground">
                {product.dimensions.map((dimension, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {dimension}
                  </motion.p>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

// Sample product data with unique images
const products = [
  {
    id: "sofa-moderno",
    name: "Sofá Moderno",
    category: "Sala",
    price: "1,299",
    description: "Sofá de 3 plazas con tapizado premium y estructura de madera maciza.",
    fullDescription:
      "Este sofá moderno combina estilo y comodidad en un diseño contemporáneo que se adapta a cualquier decoración. Fabricado con materiales de alta calidad, cuenta con una estructura de madera maciza que garantiza durabilidad y estabilidad. El tapizado premium está disponible en varios colores para adaptarse a tu estilo personal.",
    features: [
      "Estructura de madera maciza de pino",
      "Tapizado en tela de alta resistencia al desgaste",
      "Cojines con relleno de espuma de alta densidad",
      "Patas de metal con acabado negro mate",
      "Diseño ergonómico para mayor comodidad",
    ],
    dimensions: ["Largo: 220 cm", "Ancho: 90 cm", "Alto: 85 cm", "Altura del asiento: 45 cm"],
    images: [
      "/sofa1.jpg",
      "/sofa2.jpg",
      "/sofa3.jpg",
      "/sofa4.jpg",
    ],
  },
  {
    id: "mesa-comedor",
    name: "mesa comedor",
    category: "Comedor",
    price: "399",
    description: "Silla elegante con asiento de cuero y estructura metálica.",
    fullDescription:
      "Con un diseño minimalista y elegante, esta silla es perfecta para tu comedor o estudio. El asiento está tapizado en cuero sintético de alta calidad y su estructura metálica es resistente y estilizada.",
    features: [
      "Asiento tapizado en cuero sintético",
      "Estructura metálica en acabado dorado",
      "Diseño minimalista y elegante",
      "Patas antideslizantes",
    ],
    dimensions: ["Largo: 45 cm", "Ancho: 45 cm", "Alto: 85 cm", "Altura del asiento: 48 cm"],
    images: [
      "/silla1.jpg",
      "/silla2.jpg",
      "/silla3.jpg",
      "/silla4.jpg",
    ],
  },
  {
    id: "silla-ergonomica",
    name: "Silla Ergonomica",
    category: "Comedor",
    price: "899",
    description: "Mesa de comedor estilo industrial con superficie de madera y patas metálicas.",
    fullDescription:
      "Esta mesa de comedor de estilo industrial es perfecta para un ambiente moderno y sofisticado. Su superficie de madera maciza está combinada con patas metálicas de acabado envejecido, lo que le da un toque rústico y elegante al mismo tiempo.",
    features: [
      "Superficie de madera maciza de roble",
      "Patas metálicas con acabado envejecido",
      "Diseño robusto y duradero",
      "Ideal para comedor o estudio",
    ],
    dimensions: ["Largo: 180 cm", "Ancho: 90 cm", "Alto: 75 cm"],
    images: [
      "/mesa1.jpg",
      "/mesa2.jpg",
      "/mesa3.jpg",
      "/mesa4.jpg",
    ],
  },
  {
    id: "cama-king",
    name: "Cama King",
    category: "Decoración",
    price: "1990",
    description: "Lámpara de mesa de diseño minimalista con base de concreto.",
    fullDescription:
      "La lámpara minimalista aporta un toque moderno a cualquier espacio con su diseño simple y elegante. La base de concreto proporciona estabilidad y el estilo limpio se adapta a cualquier ambiente.",
    features: [
      "Base de concreto resistente",
      "Pantalla de tela con acabado suave",
      "Luz cálida y suave para ambientes acogedores",
      "Ideal para mesas de noche o escritorios",
    ],
    dimensions: ["Diámetro de la base: 20 cm", "Altura total: 45 cm", "Longitud del cable: 150 cm"],
    images: [
      "/lampara1.jpg",
      "/lampara2.jpg",
      "/lampara3.jpg",
      "/lampara4.jpg",
    ],
  },
  {
    id: "estante-moderno",
    name: "Estante Moderno",
    category: "Decoración",
    price: "499",
    description: "Estante flotante con estantes de vidrio y estructura metálica.",
    fullDescription:
      "Este estante flotante ofrece una estética moderna y funcional, con estantes de vidrio transparentes y una estructura metálica resistente que puede soportar una variedad de objetos decorativos o libros.",
    features: [
      "Estantes de vidrio templado",
      "Estructura metálica con acabado mate",
      "Fácil instalación en pared",
      "Ideal para espacios modernos y minimalistas",
    ],
    dimensions: ["Largo: 120 cm", "Ancho: 30 cm", "Alto: 30 cm"],
    images: [
      "/estante1.jpg",
      "/estante2.jpg",
      "/estante3.jpg",
      "/estante4.jpg",
    ],
  },
  {
    id: "silla-ergonomica",
    name: "Silla Ergonómica",
    category: "Oficina",
    price: "799",
    description: "Silla ergonómica con respaldo reclinable y soporte lumbar ajustable.",
    fullDescription:
      "Esta silla ergonómica es perfecta para largas horas de trabajo, con un diseño que proporciona un soporte adecuado para la espalda y el cuello. El respaldo es reclinable y el asiento ajustable en altura.",
    features: [
      "Respaldo reclinable para mayor comodidad",
      "Soporte lumbar ajustable",
      "Reposabrazos acolchonados",
      "Base giratoria y con ruedas",
    ],
    dimensions: ["Largo: 60 cm", "Ancho: 60 cm", "Alto: 120 cm", "Altura del asiento: 45-55 cm"],
    images: [
      "/sillaergonomica1.jpg",
      "/sillaergonomica2.jpg",
      "/sillaergonomica3.jpg",
      "/sillaergonomica4.jpg",
    ],
  },
]

