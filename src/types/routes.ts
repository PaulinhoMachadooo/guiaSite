export interface RouteParams {
  id?: string;
  category?: string;
}

export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
}

export const ROUTES = {
  HOME: '/',
  CATEGORIES: '/categorias',
  CATEGORY_DETAIL: '/categoria/:id',
  COMERCIO_DETAIL: '/comercio/:id',
  SEARCH: '/busca',
  ABOUT: '/sobre',
  CONTACT: '/contato'
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];