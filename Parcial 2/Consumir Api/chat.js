import fetch from 'node-fetch';

// Tu clave de API
const apiKey = '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';

// La URL de la API
const url = 'https://api.openai.com/v1/completions';

// Configuración de la solicitud
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo", // Asegúrate de reemplazar esto con el modelo específico que deseas usar
        prompt: "dame 3 peliculas para ver", // Tu prompt para el modelo
        max_tokens: 50 // Ajusta esto según la longitud de respuesta que necesites
    })
};

// Función asíncrona para enviar la solicitud y procesar la respuesta
async function queryChatGPT() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Ejecuta la función
queryChatGPT();