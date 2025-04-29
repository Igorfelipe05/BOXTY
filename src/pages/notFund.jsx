import React from "react";
import { Link } from "react-router-dom";

function Erro() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <h1 className="text-9xl font-extrabold  text-blue-600 ">404</h1>
      <p className="text-2xl text-gray-800 mt-4">Oops! Página não encontrada.</p>
      <p className="text-md text-gray-600 mt-2 text-center max-w-md">
        A página que você está tentando acessar não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}

export default Erro;
