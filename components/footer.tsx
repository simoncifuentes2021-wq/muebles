"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const footerInView = useInView(footerRef, { once: true, amount: 0.1 })

  return (
    <motion.footer ref={footerRef} className="w-full border-t bg-muted/30">
      <div className="container flex flex-col gap-12 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <Link href="/" className="font-bold text-xl flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 mr-2 text-primary"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Muebles Elegantes
            </Link>
            <p className="text-sm text-muted-foreground">
              Transformando espacios con diseño y calidad desde 2010. Nuestro compromiso es ofrecerte muebles que
              mejoren tu calidad de vida.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +123 456 7890
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              info@muebleselegantes.com
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Av. Principal 123, Ciudad
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg font-medium">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link href="/productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Productos
              </Link>
              <Link href="/nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Nosotros
              </Link>
              <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contacto
              </Link>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg font-medium">Categorías</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/productos?categoria=sala"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sala
              </Link>
              <Link
                href="/productos?categoria=comedor"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Comedor
              </Link>
              <Link
                href="/productos?categoria=dormitorio"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dormitorio
              </Link>
              <Link
                href="/productos?categoria=oficina"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Oficina
              </Link>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg font-medium">Suscríbete</h3>
            <p className="text-sm text-muted-foreground">Recibe novedades y ofertas especiales en tu correo.</p>
            <div className="flex gap-2 mt-2">
              <Input type="email" placeholder="Tu email" className="rounded-full border-muted-foreground/20" />
              <Button size="sm" className="rounded-full">
                Enviar
              </Button>
            </div>
            <div className="flex gap-4 mt-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-border/50 pt-6 text-center text-sm text-muted-foreground"
        >
          © {new Date().getFullYear()} Muebles Elegantes. Todos los derechos reservados.
        </motion.div>
      </div>
    </motion.footer>
  )
}

