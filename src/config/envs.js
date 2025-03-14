const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_RASTERS_URL = import.meta.env.VITE_RASTERS_URL;
const VITE_MAPS_KEY = import.meta.env.VITE_MAPS_KEY;

export const API_URL = VITE_API_URL || 'http://localhost:8081';
export const RASTERS_URL = VITE_RASTERS_URL || 'http://localhost:8083';
export const MAPS_KEY = VITE_MAPS_KEY || '';
