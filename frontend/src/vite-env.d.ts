/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LOG_LEVEL: 'debug' | 'info' | 'warning' | 'error';
    readonly VITE_BACKEND_URL: string;
}