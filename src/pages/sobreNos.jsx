import React from 'react';
import Header from '../components/Header.jsx/Header';

function Info() {
  return (
    <div>      <Header />

    <div className="bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#1F2A37] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#1F2A37] p-8 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-[#E6EDF3] mb-6">Sobre Nós</h1>
        
        <p className="text-lg text-[#CBD5E1] mb-4">
          Fundada em 2025, a <strong className="text-[#3B82F6]">Boxty</strong> nasceu com a missão de transformar a forma como empresas lidam com seus estoques. 
          Unindo tecnologia, inteligência de dados e uma equipe especializada, oferecemos soluções completas e personalizadas para 
          o gerenciamento eficiente de estoques em diversos segmentos do mercado.
        </p>
        <p className="text-lg text-[#CBD5E1] mb-4">
          Na <strong className="text-[#3B82F6]">Boxty</strong>, acreditamos que um estoque bem gerido é a chave para reduzir custos, evitar desperdícios 
          e potencializar os resultados do seu negócio. Por isso, desenvolvemos ferramentas modernas que permitem controle 
          em tempo real, previsões precisas e integração com outros sistemas de gestão.
        </p>
        <p className="text-lg text-[#CBD5E1] mb-4">
          Nosso compromisso é com a eficiência, a inovação e o crescimento sustentável dos nossos clientes. Mais do que 
          oferecer um serviço, queremos ser parceiros estratégicos na evolução da sua operação logística.
        </p>
        <p className="text-xl font-semibold text-[#3B82F6] mt-6 text-center">
          Boxty — Controle inteligente, crescimento constante.
        </p>
      </div>
    </div>
    </div>
  );
}

export default Info;
