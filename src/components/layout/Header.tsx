import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, MapIcon, BarChartIcon, MenuIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [{
    name: 'Dashboard',
    href: '/',
    icon: HomeIcon
  }, {
    name: 'Squad Builder',
    href: '/squad-builder',
    icon: UsersIcon
  }, {
    name: 'Mission Planner',
    href: '/mission-planner',
    icon: MapIcon
  }];
  const isActive = (path: string) => location.pathname === path;
  return <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/Long_War_2_Mod_XCOM_2.jpg" alt="Long War 2" className="h-8 w-auto rounded mr-2" />
              <span className="text-xl font-bold text-blue-400">
                LW2 Squad Planner
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(item.href) ? 'bg-gray-900 text-blue-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Link>)}
          </nav>
          <div className="md:hidden">
            <button type="button" className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {isMenuOpen && <div className="md:hidden pb-3">
            <div className="space-y-1 px-2 pt-2">
              {navigation.map(item => <Link key={item.name} to={item.href} className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${isActive(item.href) ? 'bg-gray-900 text-blue-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => setIsMenuOpen(false)}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>)}
            </div>
          </div>}
      </div>
    </header>;
};
export default Header;