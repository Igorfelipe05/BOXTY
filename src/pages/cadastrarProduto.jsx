import React from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header.jsx/Header";

function CadastroProduto() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


const onSubmit = async (data) => {
  try {   
    const novoData = {
  ...data,
  id_usuario: 1,
};

      const response = await fetch("http://localhost:5001/server/produtos/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoData),
      });
      if (response.ok) {
        console.log("Produto cadastrado com sucesso!");
        alert("Produto cadastrado com sucesso!");
        reset();
      } else {
        console.error("Erro ao cadastrar produto:", response.statusText);
      }
    
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    
  }
   
  
  };

  const categorias = [
  { id: '1', nome: 'sofas' },
  { id: '2', nome: 'mesas' },
  { id: '3', nome: 'Roupas' },
  { id: '4', nome: 'Alimentos' },
];

  return (
    <div>
      <Header />
    <div className="bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#1F2A37] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#1F2A37] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[#3B82F6]">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#E6EDF3] tracking-wide">
          Cadastro de Produto
        </h1>
        

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-[#CBD5E1]">Nome do Produto:</label>
          <input
            type="text"
            {...register("nome", { required: "Nome do produto é obrigatório" })}
            className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            placeholder="Digite o nome"
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}

          <label className="block mt-4 mb-2 text-[#CBD5E1]">Código de Barras:</label>
          <input
            type="text"
            inputMode="numeric"
            {...register("codigo_barras", {
              required: "Código de Barras é obrigatório",
              pattern: { value: /^\d+$/, message: "Apenas números são permitidos" },
            })}
            className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            placeholder="Digite o código de barras"
          />
          {errors.codigo_barras && <p className="text-red-500 text-sm">{errors.codigo_barras.message}</p>}

          <label className="block mt-4 mb-2 text-[#CBD5E1]">Quantidade em Estoque:</label>
          <input
            type="number"
            {...register("quantidade", {
              required: "Quantidade é obrigatória",
              min: { value: 1, message: "A quantidade deve ser maior que zero" },
            })}
            className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            placeholder="Digite a quantidade"
          />
          {errors.quantidade && <p className="text-red-500 text-sm">{errors.quantidade.message}</p>}

          <label className="block mt-4 mb-2 text-[#CBD5E1]">Preço Unitário:</label>
          <input
            type="number"
            step="0.01"
            {...register("preco", {
              required: "Preço é obrigatório",
              min: { value: 0.01, message: "O preço deve ser maior que zero" },
            })}
            className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            placeholder="Digite o preço unitário"
          />
          {errors.preco && <p className="text-red-500 text-sm">{errors.preco.message}</p>}

          <label className="block mt-4 mb-2 text-[#CBD5E1]">Fornecedor:</label>
          <input
            type="text"
            {...register("fornecedor", { required: "Fornecedor é obrigatório" })}
            className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            placeholder="Digite o nome do fornecedor"
          />
          {errors.fornecedor && <p className="text-red-500 text-sm">{errors.fornecedor.message}</p>}
          <div className="flex flex-col gap-1">
        <label htmlFor="categoria" className="text-sm font-medium text-gray-700">
          Categoria
        </label>

        <select
          id="categoria"
          {...register('categoria', { required: 'Selecione uma categoria' })}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.nome}>
              {cat.nome}
            </option>
          ))}
        </select>

        {errors.categoria && (
          <span className="text-sm text-red-500">{errors.categoria.message}</span>
        )}
      </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#052f6e] to-[#145ea8] hover:from-[#2196F3] hover:to-[#42A5F5] text-white py-2 rounded-lg mt-6 text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cadastrar Produto
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CadastroProduto;
