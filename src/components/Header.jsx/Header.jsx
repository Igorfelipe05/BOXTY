import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon } from "@heroicons/react/24/outline";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hiddenMenuRoutes = ["/cadastrarUser"];
  const isMenuLimited = hiddenMenuRoutes.includes(location.pathname);
  const hiddenHeaderRoutes = ["/login"]; 
  const isHeaderHidden = hiddenHeaderRoutes.includes(location.pathname);

  if (isHeaderHidden) return null;

  return (
    <div className='bg-[#161B22] py-2 flex items-center justify-between px-4 relative shadow-md'>
      <div className='flex items-center'>
        <Bars3Icon
          className='h-9 w-9 text-[#E6EDF3] mr-2 cursor-pointer'
          onClick={toggleMenu}
        />

        {showMenu && (
          <div className='absolute top-12 left-0 bg-[#1F2A37] shadow-lg rounded-md py-2 z-10 w-48'>
            <ul>
              <li className='hover:bg-[#2C3E50] px-4 py-2'>
                <Link to="/" onClick={toggleMenu} className='text-[#E6EDF3] hover:text-[#60A5FA]'>Home</Link>
              </li>

              {!isMenuLimited && (
                <>
                  <li className='hover:bg-[#2C3E50] px-4 py-2'>
                    <Link to="/sobreNos" onClick={toggleMenu} className='text-[#E6EDF3] hover:text-[#60A5FA]'>Sobre nós</Link>
                  </li>
                  <li className='hover:bg-[#2C3E50] px-4 py-2'>
                    <Link to="/cadastrarProduto" onClick={toggleMenu} className='text-[#E6EDF3] hover:text-[#60A5FA]'>Cadastrar Produto</Link>
                  </li>
                  <li className='hover:bg-[#2C3E50] px-4 py-2'>
                    <Link to="/produtos" onClick={toggleMenu} className='text-[#E6EDF3] hover:text-[#60A5FA]'>Produtos</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
      <h1 className='text-center text-2xl font-bold text-[#3B82F6] flex-1'>BOXTY</h1>
    </div>
  );
}

export default Header;
