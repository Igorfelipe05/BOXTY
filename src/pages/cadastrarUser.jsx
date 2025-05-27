import React from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header.jsx/Header"; 
import { formatCPF, isValidCPFFormat } from "../utils/formatters";
import { useNavigate } from "react-router-dom";

function CadastrarUser() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();

 // ...existing code...
const onSubmit = async (data) => {
  try {
    const response = await fetch("http://localhost:5001/server/usuarios/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      // Redirecione ou limpe o formulário se quiser
      navigate("/login")
      reset();
    } else {
      alert(result.error || "Erro ao cadastrar usuário");
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor");
    console.error(error);
  }
};

  const cpf = watch("cpf");



  return (
    <div> 
         <Header />
    <div className="bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#1F2A37] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#1F2A37] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[#3B82F6]">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#E6EDF3] tracking-wide">
          CADASTRAR USUÁRIO
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-[#CBD5E1]">Nome Completo:</label>
          <input
            type="text"
            {...register("nome", { required: "Nome é obrigatório" })}
            className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            placeholder="Digite seu nome"
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}

          <label className="block mt-4 mb-2 text-[#CBD5E1]">E-mail:</label>
          <input
            type="email"
            {...register("email", { 
              required: "E-mail é obrigatório",
              pattern: { value: /\S+@\S+\.\S+/, message: "E-mail inválido" } 
            })}
            className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            placeholder="Digite seu e-mail"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}


          <label className="block mt-4 mb-2 text-[#CBD5E1]">Senha:</label>
          <input
            type="password"
            {...register("senha", { 
              required: "Senha é obrigatória",
              minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" } 
            })}
            className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            placeholder="Digite sua senha"
          />
          {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#052f6e] to-[#145ea8] hover:from-[#2196F3] hover:to-[#42A5F5] text-white py-2 rounded-lg mt-6 text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CadastrarUser;
