import SideBar from '../../components/Navbar/SideBar.jsx';

export const PageLayout = ({ children }) => {
  return (
    <div className={'flex flex-row flex-nowrap'}>
      <SideBar />
      {children}
    </div>
  );
};