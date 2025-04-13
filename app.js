const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const express = require('express');

const app = express();

// Mensaje para indicar que el servidor está iniciando
console.log("Iniciando el servidor...");

// Definición del flujo principal
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*');

// Función principal
const main = async () => {
    console.log("Ejecutando la función principal...");

    // Inicialización de la base de datos
    console.log("Inicializando la base de datos...");
    const adapterDB = new MockAdapter();

    // Creación del flujo
    console.log("Creando el flujo principal...");
    const adapterFlow = createFlow([flowPrincipal]);

    // Inicialización del proveedor de WhatsApp
    console.log("Inicializando el proveedor de WhatsApp...");
    const adapterProvider = createProvider(BaileysProvider);

    // Creación del bot
    console.log("Creando el bot...");
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    // Inicialización del portal QR
    console.log("Inicializando el portal QR...");
    QRPortalWeb();

    console.log("El bot se está ejecutando correctamente.");
};

// Llamada a la función principal
main().catch((error) => {
    console.error("Error al ejecutar la función principal:", error);
});

// Configuración del puerto para Render
const PORT = process.env.PORT || 3000; // Usa el puerto proporcionado por Render o el 3000 como predeterminado

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
