import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
// @ts-ignore
import handler from './api/submit-audit.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: 'local-api-handler',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/submit-audit')) {
              let bodyStr = '';
              req.on('data', (chunk) => {
                bodyStr += chunk;
              });
              req.on('end', async () => {
                try {
                  (req as any).body = bodyStr ? JSON.parse(bodyStr) : {};
                } catch {
                  (req as any).body = {};
                }

                const extendedRes = res as any;
                extendedRes.status = (code: number) => {
                  extendedRes.statusCode = code;
                  return extendedRes;
                };
                extendedRes.json = (data: any) => {
                  extendedRes.setHeader('Content-Type', 'application/json');
                  extendedRes.end(JSON.stringify(data));
                  return extendedRes;
                };

                try {
                  await handler(req, extendedRes);
                } catch (err) {
                  console.error('API middleware error:', err);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Internal server error' }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
