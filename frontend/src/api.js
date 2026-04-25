// During local testing, this uses localhost.
// During deployment, set VITE_API_URL in Vercel/Netlify environment variables.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/items';
