import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { RouteParams, ROUTES } from '../types/routes';

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const params = useParams<RouteParams>();
  const location = useLocation();

  const navigateToHome = () => navigate(ROUTES.HOME);
  
  const navigateToCategories = () => navigate(ROUTES.CATEGORIES);
  
  const navigateToCategory = (categoryId: string) => 
    navigate(ROUTES.CATEGORY_DETAIL.replace(':id', categoryId));
  
  const navigateToComercio = (comercioId: string) => 
    navigate(ROUTES.COMERCIO_DETAIL.replace(':id', comercioId));

  const navigateToSearch = (query?: string) => {
    const searchPath = query ? `${ROUTES.SEARCH}?q=${encodeURIComponent(query)}` : ROUTES.SEARCH;
    navigate(searchPath);
  };

  const goBack = () => navigate(-1);

  const isCurrentRoute = (path: string): boolean => {
    return location.pathname === path;
  };

  const getCurrentCategoryId = (): string | undefined => {
    return params.id;
  };

  const getCurrentComercioId = (): string | undefined => {
    return params.id;
  };

  return {
    navigate,
    navigateToHome,
    navigateToCategories,
    navigateToCategory,
    navigateToComercio,
    navigateToSearch,
    goBack,
    isCurrentRoute,
    getCurrentCategoryId,
    getCurrentComercioId,
    currentPath: location.pathname,
    params,
    location
  };
};