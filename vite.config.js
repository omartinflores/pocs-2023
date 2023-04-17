import { resolve } from 'path'
import multiInput from 'rollup-plugin-multi-input';

export default {
    root: '',
    build: {
        outDir: 'min',
        minify: false,
        rollupOptions: {
            input: [
                // js y css individuales
                resolve(__dirname, 'css/**/*.sass'), // every sass file inside public/web/css/ (public website only)
                resolve(__dirname, 'js/**/*.js'), // every sass file inside public/web/js/ (public website only)
            ],
            output: {
                entryFileNames: `[name].min.js`,
                assetFileNames: `[name].min.[ext]`,
            },
            plugins: [ multiInput({ relative: '' }) ],
        }
    }

}
