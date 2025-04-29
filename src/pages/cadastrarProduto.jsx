import React from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header.jsx/Header";

function CadastroProduto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Produto cadastrado:", data);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">Cadastro de Produto</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nome do Produto */}
          <label className="block mb-2 text-gray-600">Nome do Produto:</label>
          <input
            type="text"
            {...register("nome", { required: "Nome do produto é obrigatório" })}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Digite o nome"
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}

          {/* Código de Barras */}
          <label className="block mt-2 mb-2 text-gray-600">Código de Barras:</label>
          <input
            type="text"
            inputMode="numeric"
            {...register("codigoBarras", { 
              required: "Código de Barras é obrigatório",
              pattern: { value: /^\d+$/, message: "Apenas números são permitidos" }
            })}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Digite o código de barras"
          />
          {errors.codigoBarras && <p className="text-red-500 text-sm">{errors.codigoBarras.message}</p>}

          {/* Categoria */}
          <label className="block mt-2 mb-2 text-gray-600">Categoria:</label>
          <select
            {...register("categoria", { required: "Categoria é obrigatória" })}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          >
            <option value="">Selecione a categoria</option>
            <option value="eletronico">Eletrônico</option>
            <option value="vestuario">Vestuário</option>
            <option value="alimento">Alimento</option>
            <option value="outro">Outro</option>
          </select>
          {errors.categoria && <p className="text-red-500 text-sm">{errors.categoria.message}</p>}

          {/* Quantidade em Estoque */}
          <label className="block mt-2 mb-2 text-gray-600">Quantidade em Estoque:</label>
          <input
            type="number"
            {...register("quantidade", { 
              required: "Quantidade é obrigatória",
              min: { value: 1, message: "A quantidade deve ser maior que zero" }
            })}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Digite a quantidade"
          />
          {errors.quantidade && <p className="text-red-500 text-sm">{errors.quantidade.message}</p>}

          {/* Preço Unitário */}
          <label className="block mt-2 mb-2 text-gray-600">Preço Unitário:</label>
          <input
            type="number"
            step="0.01"
            {...register("preco", { 
              required: "Preço é obrigatório",
              min: { value: 0.01, message: "O preço deve ser maior que zero" }
            })}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Digite o preço unitário"
          />
          {errors.preco && <p className="text-red-500 text-sm">{errors.preco.message}</p>}

          {/* Fornecedor */}
          <label className="block mt-2 mb-2 text-gray-600">Fornecedor:</label>
          <input
            type="text"
            {...register("fornecedor", { required: "Fornecedor é obrigatório" })}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Digite o nome do fornecedor"
          />
          {errors.fornecedor && <p className="text-red-500 text-sm">{errors.fornecedor.message}</p>}

          {/* Botão de Cadastro */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
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
