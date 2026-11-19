import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Everything is prerendered at build time ("outputMode": "static" in angular.json),
 * so the hosting only serves static files — no Node.js needed on the server.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'pl', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
