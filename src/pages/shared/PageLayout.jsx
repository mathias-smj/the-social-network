import SideBar from '../../components/Navbar/SideBar.jsx';

// Composant que j'a créer pour afficher la sidebar sur tout les composants enfant
export const PageLayout = ({ children }) => {
  return (
    <div className={'flex flex-row flex-nowrap'}>
      <SideBar />
      {children}
    </div>
  );
};