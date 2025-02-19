import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		// outDir: '../Mondaze - backend/public',
		outDir: '../Mondaze---backend/public',
		emptyOutDir: true,
	},
})