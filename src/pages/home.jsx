import React, { useState } from 'react';
import Header from '../components/Header.jsx/Header';
import logo from '/public/logo.svg';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

function Home() {
  const navigate = useNavigate();
  const [showAboutUs, setShowAboutUs] = useState(false);

  const toggleAboutUs = () => {
    setShowAboutUs(!showAboutUs);
  };

  return (
    <div className="bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#1F2A37] min-h-screen flex flex-col justify-center items-center relative overflow-hidden transition-all duration-500 ease-in-out">

      {showAboutUs && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30 transition-opacity duration-500">
          <div className="bg-[#1F2A37] p-8 rounded-xl shadow-2xl max-w-2xl w-11/12 border border-[#3B82F6] animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-[#E6EDF3]">Sobre Nós</h2>
              <button className="text-gray-400 hover:text-[#60A5FA]" onClick={toggleAboutUs}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-[#CBD5E1] mb-3">
              A <span className="text-[#3B82F6] font-semibold">Boxty</span> é uma empresa inovadora especializada em gerenciamento de estoque.
              Nossa missão é transformar a maneira como as empresas lidam com seus estoques.
            </p>
            <p className="text-[#CBD5E1] mb-3">
              Fundada em 2025, estamos comprometidos em fornecer soluções de alta qualidade, combinando tecnologia e eficiência.
            </p>
            <p className="text-[#CBD5E1] mb-6">
              Nosso objetivo é simplificar processos e otimizar operações para aumentar a produtividade.
            </p>
            <div className='flex justify-end'>
              <button
                className='bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:from-[#60A5FA] hover:to-[#3B82F6] text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg'
                onClick={() => navigate('/sobreNos')}
              >
                Mais informações
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className='text-[#E6EDF3] text-7xl font-extrabold tracking-widest mb-4 animate-fadeIn z-10 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]'>
        BO<span className="text-[#3B82F6]">X</span>TY
      </h1>

      <div className="flex justify-center items-center pointer-events-none z-0">
        <img
          src={logo}
          alt="Logo"
          className="w-72 h-auto opacity-60 animate-pulse-slow transition-all duration-700"
        />
      </div>

      <button
        className="fixed bottom-8 px-16 py-2 text-lg font-medium rounded-lg bg-gradient-to-r from-[#052f6e] to-[#145ea8] hover:from-[#2196F3] hover:to-[#42A5F5] text-white shadow-lg z-10 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => navigate('/login')}
      >
        Entrar
    </button>


    </div>
  );
}

export default Home;
