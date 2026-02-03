// Native fetch is used

const MODEL_ID = "sentence-transformers/all-MiniLM-L6-v2";
const TOKEN = process.argv[2];

if (!TOKEN) {
    console.error("❌ Por favor ejecuta el script con tu token: node test-hf.js hf_tu_token_aqui");
    process.exit(1);
}

console.log(`🔍 Probando conexión para el modelo: ${MODEL_ID}`);
console.log(`🔑 Token: ${TOKEN.substring(0, 4)}...***`);

const tests = [
    {
        name: "Endpoint: /models/ (Standard)",
        url: `https://api-inference.huggingface.co/models/${MODEL_ID}`,
        body: { inputs: "test sentence" }
    },
    {
        name: "Endpoint: /models/ (Array Input)",
        url: `https://api-inference.huggingface.co/models/${MODEL_ID}`,
        body: { inputs: ["test sentence"] }
    },
    {
        name: "Endpoint: /pipeline/feature-extraction/ (Explicit)",
        url: `https://api-inference.huggingface.co/pipeline/feature-extraction/${MODEL_ID}`,
        body: { inputs: "test sentence", options: { wait_for_model: true } }
    },
    {
        name: "Router Endpoint: /hf-inference/models/",
        url: `https://router.huggingface.co/hf-inference/models/${MODEL_ID}`,
        body: { inputs: ["test sentence"] }
    }
];

async function runTests() {
    for (const test of tests) {
        console.log(`\n----------------------------------------`);
        console.log(`🧪 Probando: ${test.name}`);
        console.log(`🌐 URL: ${test.url}`);

        try {
            const response = await fetch(test.url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(test.body)
            });

            const status = response.status;
            let data;
            try {
                data = await response.json();
            } catch (e) {
                data = "Non-JSON response";
            }

            if (response.ok) {
                console.log(`✅ ÉXITO (Status ${status})`);
                const isVector = Array.isArray(data) && (typeof data[0] === 'number' || Array.isArray(data[0]));
                console.log(`📊 Tipo de respuesta: ${Array.isArray(data) ? 'Array' : typeof data}`);
                console.log(`📐 Es vector válido: ${isVector ? 'SÍ' : 'NO'}`);
                if (!isVector) console.log("⚠️ Respuesta:", JSON.stringify(data).substring(0, 100) + "...");
            } else {
                console.log(`❌ FALLÓ (Status ${status})`);
                console.log(`⚠️ Error:`, JSON.stringify(data));
            }

        } catch (error) {
            console.log(`❌ ERROR DE RED: ${error.message}`);
        }
    }
    console.log(`\n----------------------------------------`);
}

runTests();
