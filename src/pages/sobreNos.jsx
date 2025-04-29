import React from 'react';
import Header from '../components/Header.jsx/Header';

function Info() {
  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Sobre Nós</h1>
        <p className="text-lg text-gray-700 mb-4">
          Fundada em 2025, a <strong>Boxty</strong> nasceu com a missão de transformar a forma como empresas lidam com seus estoques. 
          Unindo tecnologia, inteligência de dados e uma equipe especializada, oferecemos soluções completas e personalizadas para 
          o gerenciamento eficiente de estoques em diversos segmentos do mercado.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Na <strong>Boxty</strong>, acreditamos que um estoque bem gerido é a chave para reduzir custos, evitar desperdícios 
          e potencializar os resultados do seu negócio. Por isso, desenvolvemos ferramentas modernas que permitem controle 
          em tempo real, previsões precisas e integração com outros sistemas de gestão.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Nosso compromisso é com a eficiência, a inovação e o crescimento sustentável dos nossos clientes. Mais do que 
          oferecer um serviço, queremos ser parceiros estratégicos na evolução da sua operação logística.
        </p>
        <p className="text-xl font-semibold text-blue-700 mt-6 text-center">
          Boxty — Controle inteligente, crescimento constante.
        </p>
      </div>
    </div>
  );
}

export default Info;
