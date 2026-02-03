export default async function handler(req, res) {
    const MODEL_ID = "BAAI/bge-small-en-v1.5";
    const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;
    const token = req.headers.authorization;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const hfResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await hfResponse.json();
        return res.status(hfResponse.status).json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
