import { Menu, MenuProps } from 'antd';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';
import Overview from "../assets/category.svg";
import Learners from "../assets/people2.svg";
import Tutors from "../assets/profile-2user.svg";
import Management from "../assets/book.svg";
import Sponsorships from "../assets/discount-circle.svg";
import Withdrawal from "../assets/moneys.svg";
import Transactions from "../assets/wallet-3.svg";
import Settings from "../assets/setting-2.svg";


interface ComponentProps {
  onClose: () => void;
}

const Sidebar= ({ onClose }:ComponentProps) => {
  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: 'Overview',
      label: <NavLink to={routes.dashboard}>Overview</NavLink>,
      icon: <img src={Overview} alt="Overview" />,
    },
    {
      key: 'Learners',
      label: 'Learners',
      icon: <img src={Learners} alt="Learners" />,
     
    },
    {
      key: 'Tutors',
      label: 'Tutors',
      icon: <img src={Tutors} alt="Tutors" />,
    
    },
    {
      key: 'Spoil Management',
      label: 'Spoil Management',
      icon: <img src={Management} alt="Management" />,
  
    },
    {
      key: 'Sponsorships',
      label: 'Sponsorships',
      icon: <img src={Sponsorships} alt="Sponsorships" />,
 
    },
    {
      key: 'Withdrawal Requests',
      label: 'Withdrawal Requests',
      icon: <img src={Withdrawal} alt="Withdrawal" />,
  
    },
    {
      key: 'Transactions',
      label: 'Transactions',
      icon: <img src={Transactions} alt="Transactions" />,
  
    },
    {
      key: 'Settings',
      icon: <img src={Settings} alt="Settings" />,
      label: <NavLink to={routes.transactions.transactions}>Settings</NavLink>,
    },
    
        
      ]


  
//   const onClick: MenuProps['onClick'] = () => {
//     if (onClose) onClose();
//   };

  return (
    <section className={styles.sidebar}>
      <section className={styles.logo}>
        {/* <BlinkerIcon /> */}
        LOGO
      </section>

      <div className={styles.sidebarMenu}>
        <Menu
        //   onClick={onClick}
          style={{ height: '100vh' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['dashboard']}
          mode="inline"
          items={items}
        />
      </div>
    </section>
  );
};

export default Sidebar;
