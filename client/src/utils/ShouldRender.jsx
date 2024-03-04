const customerRoutesWithHeader = [
  'home',
  'about',
  'contact-us',
  'services',
  'store',
  'product',
  'bag',
  'profile',
  'favourites',
  'checkout',
  'history',
];

export const shouldRenderHeaderAndFooter = (location) => {
  const routesWithHeader = customerRoutesWithHeader;
  const firstPath = location?.pathname.split('/')[1];
  return routesWithHeader.includes(firstPath);
};