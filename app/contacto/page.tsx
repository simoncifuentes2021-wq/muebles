"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    producto: "",
    mensaje: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const formInView = useInView(formRef, { once: true })
  const headerInView = useInView(headerRef, { once: true })
  const cardsInView = useInView(cardsRef, { once: true })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (data.success) {
        toast({ title: "Formulario enviado", description: "Nos pondremos en contacto contigo pronto." });
  
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          producto: "",
          mensaje: "",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({ title: "Error", description: "No se pudo enviar el formulario", variant: "destructive" });
    }
  
    setIsSubmitting(false);
  };
  

  return (
    <div className="container py-12 md:py-16">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-4 text-center max-w-3xl mx-auto"
      >
        <div className="flex justify-center mb-2">
          <div className="h-1 w-16 bg-primary rounded-full" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">Contáctanos</h1>
        <p className="text-lg text-muted-foreground">
          ¿Tienes alguna pregunta sobre nuestros productos? Estamos aquí para ayudarte. Completa el formulario y nos
          pondremos en contacto contigo lo antes posible.
        </p>
      </motion.div>

      <motion.div
        ref={cardsRef}
        initial={{ opacity: 0, y: 40 }}
        animate={cardsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
      >
        {contactCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{card.content}</p>
                <p className="text-sm text-muted-foreground mt-1">{card.detail}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={formInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 max-w-3xl mx-auto"
      >
        <Card className="border border-border/40 shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80" />
          <CardHeader className="md:text-center">
            <CardTitle className="text-2xl">Solicita Información sobre Nuestros Productos</CardTitle>
            <CardDescription>
              Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre completo"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="rounded-lg"
                  />
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-lg"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    placeholder="Tu número de teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="rounded-lg"
                  />
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label htmlFor="asunto">Asunto</Label>
                  <Select value={formData.asunto} onValueChange={(value) => handleSelectChange("asunto", value)}>
                    <SelectTrigger id="asunto" className="rounded-lg">
                      <SelectValue placeholder="Selecciona un asunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="producto">Información sobre producto</SelectItem>
                      <SelectItem value="presupuesto">Solicitud de presupuesto</SelectItem>
                      <SelectItem value="medidas">Consulta sobre medidas</SelectItem>
                      <SelectItem value="materiales">Información sobre materiales</SelectItem>
                      <SelectItem value="visita">Agendar visita a showroom</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Label htmlFor="producto">Producto de interés (opcional)</Label>
                <Select value={formData.producto} onValueChange={(value) => handleSelectChange("producto", value)}>
                  <SelectTrigger id="producto" className="rounded-lg">
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sofa-moderno">Sofá Moderno</SelectItem>
                    <SelectItem value="mesa-comedor">Mesa de Comedor</SelectItem>
                    <SelectItem value="silla-ergonomica">Silla Ergonómica</SelectItem>
                    <SelectItem value="cama-king">Cama King Size</SelectItem>
                    <SelectItem value="estanteria-modular">Estantería Modular</SelectItem>
                    <SelectItem value="sillon-reclinable">Sillón Reclinable</SelectItem>
                    <SelectItem value="otro">Otro (especificar en el mensaje)</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  className="rounded-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button type="submit" className="w-full rounded-full py-6" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Enviar mensaje
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

const contactCards = [
  {
    title: "Teléfono",
    description: "Llámanos directamente",
    content: "+123 456 7890",
    detail: "Lunes a Viernes: 9am - 6pm",
    icon: Phone,
  },
  {
    title: "Email",
    description: "Escríbenos un correo",
    content: "info@muebleselegantes.com",
    detail: "Respondemos en 24-48 horas",
    icon: Mail,
  },
  {
    title: "Dirección",
    description: "Visita nuestra tienda",
    content: "Av. Principal 123, Ciudad",
    detail: "Lunes a Sábado: 10am - 8pm",
    icon: MapPin,
  },
]

