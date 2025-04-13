const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Mensaje inicial para indicar que el servidor está iniciando
console.log("🚀 Iniciando el servidor...");

// Definición del flujo principal
console.log("🛠️ Definiendo el flujo principal...");
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*');

// Función principal
const main = async () => {
    console.log("🔧 Ejecutando la función principal...");

    // Inicialización de la base de datos
    console.log("📦 Inicializando la base de datos...");
    const adapterDB = new MockAdapter();
    console.log("✅ Base de datos inicializada correctamente.");

    // Creación del flujo
    console.log("🔗 Creando el flujo principal...");
    const adapterFlow = createFlow([flowPrincipal]);
    console.log("✅ Flujo principal creado correctamente.");

    // Inicialización del proveedor de WhatsApp
    console.log("📱 Inicializando el proveedor de WhatsApp...");
    const adapterProvider = createProvider(BaileysProvider);
    console.log("✅ Proveedor de WhatsApp inicializado correctamente.");

    // Creación del bot
    console.log("🤖 Creando el bot...");
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });
    console.log("✅ Bot creado correctamente.");

    // Inicialización del portal QR
    console.log("📸 Inicializando el portal QR...");
    let lastQRUpdate = Date.now(); // Marca de tiempo de la última actualización del QR

    QRPortalWeb({
        port: 10001,
        onQRCodeUpdated: () => {
            const now = Date.now();
            const timeSinceLastUpdate = (now - lastQRUpdate) / 1000; // Tiempo en segundos
            console.log(`🔄 Código QR actualizado. Tiempo desde la última actualización: ${timeSinceLastUpdate.toFixed(2)} segundos`);
            lastQRUpdate = now;
        },
    });
    console.log("✅ Portal QR inicializado correctamente en el puerto 10001.");

    console.log("🎉 El bot se está ejecutando correctamente. Esperando interacción...");
};

// Llamada a la función principal
main().catch((error) => {
    console.error("❌ Error al ejecutar la función principal:", error);
});
