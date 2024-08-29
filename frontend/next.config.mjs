/** @type {import('next').NextConfig} */
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const nextConfig = {
    sassOptions:{
        includePaths:[path.join(dirname(__filename),'styles')]
    }
};

export default nextConfig;
