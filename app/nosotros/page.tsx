import Image from "next/image"
import { Award, Clock, Heart, Users } from "lucide-react"

import { Separator } from "@/components/ui/separator"

export default function NosotrosPage() {
  return (
    <div className="container py-10">
      {/* Hero Section */}
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold">Sobre Nosotros</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Somos una empresa dedicada a la creación de muebles de alta calidad que combinan diseño, funcionalidad y
          durabilidad.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
          <p className="text-muted-foreground mb-4">
            Fundada en 2010, Muebles Elegantes nació con la visión de transformar espacios a través del diseño y la
            calidad. Lo que comenzó como un pequeño taller familiar se ha convertido en una empresa reconocida en el
            sector del mobiliario.
          </p>
          <p className="text-muted-foreground">
            A lo largo de estos años, hemos mantenido nuestro compromiso con la excelencia, seleccionando cuidadosamente
            cada material y supervisando cada detalle del proceso de fabricación. Nuestra pasión por el diseño y la
            artesanía nos ha permitido crear piezas únicas que perduran en el tiempo.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=800&width=600" alt="Nuestro taller" fill className="object-cover" />
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-10">Nuestros Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col items-center text-center p-6 rounded-lg border">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-20" />

      {/* Team Section */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-10">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="relative h-64 w-64 rounded-full overflow-hidden mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary mb-2">{member.position}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const values = [
  {
    title: "Calidad",
    description: "Utilizamos los mejores materiales y técnicas para crear muebles duraderos y hermosos.",
    icon: Award,
  },
  {
    title: "Pasión",
    description: "Amamos lo que hacemos y eso se refleja en cada pieza que creamos.",
    icon: Heart,
  },
  {
    title: "Compromiso",
    description: "Nos comprometemos a cumplir con los plazos y superar las expectativas de nuestros clientes.",
    icon: Clock,
  },
  {
    title: "Trabajo en Equipo",
    description: "Creemos en el poder de la colaboración para lograr resultados excepcionales.",
    icon: Users,
  },
]

const team = [
  {
    name: "Carlos Rodríguez",
    position: "Fundador y Director",
    bio: "Con más de 20 años de experiencia en diseño de muebles, Carlos fundó la empresa con la visión de crear piezas únicas y funcionales.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Ana Martínez",
    position: "Diseñadora Jefe",
    bio: "Ana combina su formación en diseño industrial con su pasión por la estética para crear muebles que son tanto hermosos como prácticos.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Miguel Sánchez",
    position: "Maestro Carpintero",
    bio: "Miguel aporta décadas de experiencia en carpintería tradicional, asegurando que cada pieza cumpla con los más altos estándares de calidad.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

