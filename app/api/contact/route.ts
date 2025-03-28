import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Crea un transporter de Nodemailer usando las credenciales de tu servicio de correo
const transporter = nodemailer.createTransport({
  service: "gmail", // o el servicio que uses
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS, // Contraseña de tu cuenta o contraseña de aplicación
  },
});

export async function POST(req: Request) {
  try {
    const { nombre, email, telefono, asunto, producto, mensaje } = await req.json();

    // Configura los detalles del correo
    const mailOptions = {
      from: process.env.EMAIL_USER, // Tu correo
      to: "simoncifuentes.fernandez@gmail.com", // Correo destino (puede ser un correo fijo o el mismo que el usuario)
      subject: `Nuevo mensaje de ${nombre} - ${asunto}`,
      text: `
        Nombre: ${nombre}
        Correo: ${email}
        Teléfono: ${telefono}
        Asunto: ${asunto}
        Producto: ${producto}
        Mensaje: ${mensaje}
      `,
    };

    // Envía el correo
    await transporter.sendMail(mailOptions);

    // Si el correo se envía exitosamente, responde con éxito
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    // Si ocurre un error, responde con un error
    return NextResponse.json({ success: false, message: "Hubo un problema al enviar el correo." });
  }
}
