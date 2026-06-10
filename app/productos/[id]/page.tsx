"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowLeft, Check, Mail, Star, Truck } from "lucide-react"
import { useParams } from "next/navigation"
import { Share2 } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function ProductDetailPage() {
  const params = useParams() as { id: string }
  const product = products.find((p) => p.id === params.id)
  const [currentImage, setCurrentImage] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isZoomOpen, setIsZoomOpen] = useState(false)


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
  function handleShare(product: typeof products[0]) {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Revisa este producto: ${product.name}`,
        url: typeof window !== "undefined" ? window.location.href : "",
      })
    } else {
      alert("La función de compartir no está disponible en este navegador.")
    }
  }
  

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
          <div
            className="overflow-hidden rounded-2xl border cursor-pointer"
            onClick={() => setIsZoomOpen(true)}
          >
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
              <span>Envío gratuito en pedidos superiores a $99.990 CLP</span>
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
          <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay: 0.5 }}
  className="flex justify-center"
>
  <button
    onClick={() => handleShare(product)}
    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
  >
    <Share2 className="h-4 w-4" />
    Compartir este producto
  </button>
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
      {isZoomOpen && (
  <div
    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
    onClick={() => setIsZoomOpen(false)}
  >
    <div className="relative w-full max-w-4xl h-[80vh]">
      <Image
        src={productImages[currentImage] || "/placeholder.svg"}
        alt={`${product.name} - Zoom`}
        fill
        className="object-contain rounded-lg"
      />
      <button
        onClick={() => setIsZoomOpen(false)}
        className="absolute top-4 right-4 text-white text-xl bg-black/50 px-2 rounded"
      >
        ✕
      </button>
    </div>
  </div>
)}

    </div>
  )
}

// Sample product data with unique images
const products = [
  {
    id: "tele",
    name: "Mueble TV Raíz Natural",
    category: "Sala",
    price: "189.990 CLP",
    description: "Sofá de 3 plazas con tapizado premium y estructura de madera maciza.",
    fullDescription:
      "Este elegante mueble de TV está fabricado en madera sólida con un acabado natural que resalta su veta y calidez. Cuenta con un diseño funcional y minimalista que incluye dos puertas laterales con espacio de almacenamiento interno, un cajón central amplio ideal para guardar accesorios, y una repisa abierta perfecta para decodificadores, consolas o libros. Su estilo atemporal lo hace ideal para salas modernas o rústicas, combinando estética y practicidad en un solo mueble.",
    features: [
      "Estructura de madera maciza de pino",
      "Tapizado en tela de alta resistencia al desgaste",
      "Cojines con relleno de espuma de alta densidad",
      "Patas de metal con acabado negro mate",
      "Diseño ergonómico para mayor comodidad",
    ],
    dimensions: ["Largo: 220 cm", "Ancho: 90 cm", "Alto: 85 cm", "Altura del asiento: 45 cm"],
    images: [
      "/tele1.png",
      "/tele2.jpeg",
      "/tele3.jpeg",
      "/tele4.jpeg",
    ],
  },
  {
    id: "cocina1",
    name: "Cocina Raíz Noble",
    category: "Comedor",
    price: "249.990 CLP",
    description: "Silla elegante con asiento de cuero y estructura metálica.",
    fullDescription:
      "Este práctico y resistente mueble de cocina está fabricado en madera natural y cuenta con un diseño funcional que incluye un lavaplatos doble de acero inoxidable, tres cajones laterales para utensilios y dos puertas con amplio espacio interior para almacenamiento. Ideal para optimizar el orden en cocinas pequeñas o medianas, su estructura robusta y acabado cálido lo convierten en una opción duradera y decorativa para cualquier hogar.",
    features: [
      "Asiento tapizado en cuero sintético",
      "Estructura metálica en acabado dorado",
      "Diseño minimalista y elegante",
      "Patas antideslizantes",
    ],
    dimensions: ["Largo: 45 cm", "Ancho: 45 cm", "Alto: 85 cm", "Altura del asiento: 48 cm"],
    images: [
      "/cocina1.png",
      "/cocina2.jpeg",
      "/cocina3.jpeg",
      "/cocina4.jpeg",
    ],
  },
  {
    id: "cocina2",
    name: "Cocina Natura Loft",
    category: "Comedor",
    price: "229.990 CLP",
    description: "Mesa de comedor estilo industrial con superficie de madera y patas metálicas.",
    fullDescription:
      "Este mueble de cocina combina funcionalidad y diseño natural en un solo producto. Fabricado en madera maciza con un atractivo acabado rústico, cuenta con un lavaplatos doble de acero inoxidable, tres cajones deslizables ideales para utensilios o implementos pequeños, y una puerta lateral con espacio interior para almacenamiento. Es una solución práctica y estética para cocinas que buscan orden, durabilidad y calidez visual.",
    features: [
      "Superficie de madera maciza de roble",
      "Patas metálicas con acabado envejecido",
      "Diseño robusto y duradero",
      "Ideal para comedor o estudio",
    ],
    dimensions: ["Largo: 180 cm", "Ancho: 90 cm", "Alto: 75 cm"],
    images: [
      "/cocina2.1.png",
      "/cocina2.2.jpeg",
      "/cocina2.3.jpeg",
      "/cocina2.4.jpeg",
    ],
  },
  {
    id: "comoda",
    name: "Cómoda Luna Clara",
    category: "Dormitorio",
    price: "119.990 CLP",
    description: "Lámpara de mesa de diseño minimalista con base de concreto.",
    fullDescription:
      "Organiza tus espacios con estilo y funcionalidad gracias a esta elegante cómoda de 4 cajones. Su diseño combina un cuerpo en tono blanco con frentes de cajón en melamina tipo madera clara, logrando un acabado moderno y cálido que se adapta a cualquier ambiente. Cada cajón cuenta con tiradores metálicos curvos de fácil agarre y correderas suaves que aseguran una apertura cómoda y silenciosa. Perfecta para guardar ropa, accesorios o artículos personales, esta cómoda destaca por su firmeza, buena capacidad de almacenamiento y estética sencilla pero refinada. Ideal para dormitorios, salas o cualquier rincón que necesite orden y diseño.",
    features: [
      "Base de concreto resistente",
      "Pantalla de tela con acabado suave",
      "Luz cálida y suave para ambientes acogedores",
      "Ideal para mesas de noche o escritorios",
    ],
    dimensions: ["Diámetro de la base: 20 cm", "Altura total: 45 cm", "Longitud del cable: 150 cm"],
    images: [
      "/comoda1.png",
      "/comoda2.jpeg",
      "/comoda3.jpeg",
      "/comoda4.jpeg",
    ],
  },
  {
    id: "velador",
    name: "Velador Luna Nórdica",
    category: "Dormitorio",
    price: "49.990 CLP",
    description: "Estante flotante con estantes de vidrio y estructura metálica.",
    fullDescription:
      "Este velador de diseño contemporáneo es la solución perfecta para mantener el orden en tu dormitorio sin sacrificar estilo. Con una estructura robusta en color blanco y detalles en tono madera clara con bordes oscuros, ofrece un atractivo contraste visual. Cuenta con un cajón amplio con tirador negro, ideal para guardar objetos personales, y una repisa inferior abierta que permite almacenar libros, accesorios o elementos decorativos. Su tamaño compacto lo hace ideal para espacios reducidos, pero su diseño moderno y funcionalidad lo convierten en un mueble versátil que encaja en cualquier ambiente. Fabricado en melamina de alta calidad, es fácil de limpiar y resistente al uso diario.",
    features: [
      "Estantes de vidrio templado",
      "Estructura metálica con acabado mate",
      "Fácil instalación en pared",
      "Ideal para espacios modernos y minimalistas",
    ],
    dimensions: ["Largo: 120 cm", "Ancho: 30 cm", "Alto: 30 cm"],
    images: [
      "/velador2.jpeg",
      "/velador3.jpeg",
      "/velador4.jpeg",
      "/estante4.jpg",
    ],
  },
  {
    id: "camarote",
    name: "Camarote Raíz Doble",
    category: "Dormitorio",
    price: "219.990 CLP",
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
      "/camarote1.png",
      "/camarote2.jpeg",
      "/camarote3.jpeg",
      "/camarote4.jpeg",
    ],
  },

  {
    id: "cocina3",
    name: "Mueble Cocina Nogal",
    category: "Comedor",
    price: "269.990 CLP",
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
      "/Mcocina.jpeg",
      "/Mcocina2.jpeg",
      "/Mcocina3.jpeg",
      "/Mcocina4.jpeg",
    ],
  },


  {
    id: "cocina4",
    name: "Mueble Modular Gris Claro",
    category: "Comedor",
    price: "159.990 CLP",
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
      "/modular1.jpeg",
      "/modular2.jpeg",
      "/modular3.jpeg",
      "/modular4.jpeg",
    ],
  },

  {
    id: "9",
    name: "Mueble Cocina Nogal",
    category: "Comedor",
    price: "289.990 CLP",
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
      "/9.jpeg",
      "/9.1.jpeg",
      "/9.2.jpeg",
      "/9.3.jpeg",
    ],
  },

  {
    id: "10",
    name: "Closet Raíz Elegante",
    category: "Dormitorio",
    price: "199.990 CLP",
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
      "/10.1.jpeg",
      "/10.2.jpeg",
      "/10.3.jpeg",
      "/10.4.jpeg",
    ],
  },

  {
    id: "11",
    name: "Closet Roble",
    category: "Dormitorio",
    price: "179.990 CLP",
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
      "/11.1.jpeg",
      "/11.2.jpeg",
      "/11.3.jpeg",
      "/11.4.jpeg",
    ],
  },

  {
    id: "12",
    name: "Mueble Lavaplatos Veta Clara",
    category: "Dormitorio",
    price: "149.990 CLP",
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
      "/12.1.jpeg",
      "/12.2.jpeg",
      "/12.3.jpeg",
      "/12.4.jpeg",
    ],
  },
  
]

