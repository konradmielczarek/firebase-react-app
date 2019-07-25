import Cookie from 'js-cookie';

export const isAuthenticated = () => {
  return !!Cookie.get('access_token') || !!sessionStorage.getItem('access_token');
}