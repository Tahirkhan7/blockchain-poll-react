import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'b904-2402-8100-3118-18b-9cca-8829-4e35-a5d4.ngrok-free.app'
    ]
  }
});
