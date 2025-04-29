import React, { useState } from 'react';
import Header from '../components/Header.jsx/Header';
import logo from '/public/logo.svg'
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

function Home() {
  const navigate = useNavigate();
  const [showAboutUs, setShowAboutUs] = useState(false);

  const toggleAboutUs = () => {
    setShowAboutUs(!showAboutUs);
  };

  return (
    <div className="bg-blue-950 min-h-screen flex flex-col justify-center items-center relative">
      <button 
        className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={toggleAboutUs}
      >
        Sobre Nós
      </button>

      {showAboutUs && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-4/5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900">Sobre Nós</h2>
              <button className='text-gray-500' onClick={toggleAboutUs}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              A Boxty é uma empresa inovadora especializada em gerenciamento de estoque. 
              Nossa missão é criar um sistema que transforma a maneira como as empresas lidam com o estoque.
            </p>
            <p className="text-gray-700 mb-4">
              Fundada em 2025, estamos comprometidos em fornecer soluções de gerenciamento de estoque de alta qualidade.
            </p>
            <p className="text-gray-700 mb-4">
              Nosso objetivo é simplificar o gerenciamento de estoque, permitindo que as empresas otimizem suas operações e aumentem a eficiência.
            </p>
            <div className='flex justify-between'>
              <button 
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => navigate('/sobreNos')}
              >
                mais informações
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className='text-gray-500 text-6xl font-extrabold z-10 mb-4'>BOXTY</h1>

      <div className="flex justify-center items-center pointer-events-none">
        <img src={logo} alt="Logo" className="w-280 h-180 opacity-20" />     
      </div>

      <button 
        className="fixed bottom-6 px-10 py-4 text-2xl font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white z-10"
        onClick={() => navigate('/login')}
      >
        Entrar
      </button>
    </div>
  );
}

export default Home;
