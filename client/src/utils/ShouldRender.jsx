import EmployeeHeader from '../components/shared/EmployeeHeader';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';

const eCommersRoutesWithHeaderAndFooter = [
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
const routesWithOutHeader = ['login', 'register', ''];

export const shouldRenderECommersHeader = (location) => {
  let flag;
  const routesWithHeader = eCommersRoutesWithHeaderAndFooter;
  const firstPath = location?.pathname.split('/')[1];
  flag = routesWithHeader.includes(firstPath);
  return flag ? <Header /> : null;
};

export const shouldRenderECommersFooter = (location) => {
  let flag;
  const routesWithHeader = eCommersRoutesWithHeaderAndFooter;
  const firstPath = location?.pathname.split('/')[1];
  flag = routesWithHeader.includes(firstPath);
  return flag ? <Footer /> : null;
};

export const shouldRenderEmployeeHeader = (location, socket, setSocket) => {
  let flag;
  const routes = [...eCommersRoutesWithHeaderAndFooter, ...routesWithOutHeader];
  const firstPath = location?.pathname.split('/')[1];
  flag = !routes.includes(firstPath);
  console.log(socket?.id);
  return flag ? <EmployeeHeader soket={socket} setSocket={setSocket} /> : null;
};
