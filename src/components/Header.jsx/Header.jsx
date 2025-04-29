import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon } from "@heroicons/react/24/outline";

function Header() {
    
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className='bg-gradient-to-r from-blue-300 to-blue-200 py-2 flex items-center justify-between px-4 relative'>
      <div  className='flex items-center'>
        <Bars3Icon 
          className='h-9 w-9 text-blue-600 mr-2 cursor-pointer' 
          onClick={toggleMenu}
        />
        
        {showMenu && (
          <div className='absolute top-12 left-0 bg-white shadow-md rounded-md py-2 z-10'>
            <ul>
              <li className='hover:bg-gray-100 px-4 py-2'>
                <Link to="/" onClick={toggleMenu}>Home</Link>
              </li>
              <li className='hover:bg-gray-100 px-4 py-2'>
                <Link to="/login" onClick={toggleMenu}>login</Link>
              </li>
              <li className='hover:bg-gray-100 px-4 py-2'>
                <Link to="/sobreNos" onClick={toggleMenu}>Sobre nós</Link>
              </li>
              <li className='hover:bg-gray-100 px-4 py-2'>
                <Link to="/cadastrarProduto" onClick={toggleMenu}>cadastrar Produto</Link>
              </li>
              <li className='hover:bg-gray-100 px-4 py-2'>
                <Link to="/produtos" onClick={toggleMenu}>Produtos</Link>
              </li>
              <li>
                <Link to="/cadastrarUser" onClick={toggleMenu}>Cadastrar Usuário</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <h1 className='text-center text-2xl font-bold  text-blue-600  flex-1'>BOXTY</h1>
    </div>
  )
}

export default Header;
