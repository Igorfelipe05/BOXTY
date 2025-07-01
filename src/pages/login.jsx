import React from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header.jsx/Header";
import { formatCPF, isValidCPFFormat } from "../utils/formatters";
import logo from "/public/logo.svg";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5001/server/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token); // Armazena o token no localStorage
        alert("Login realizado com sucesso!");
        navigate("/cadastrarProduto")
      } else {
        const error = await response.json();
        alert(`Erro: ${error.error}`);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#1F2A37] min-h-screen flex flex-col items-center justify-center">
        <div className="bg-[#1F2A37] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[#3B82F6]">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="h-20 opacity-80 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]"
            />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6 text-[#E6EDF3] tracking-wide">
            ACESSAR SISTEMA
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mt-2 mb-1 text-[#CBD5E1]">Nome:</label>
            <input
              type="text"
              {...register("nome", {
                required: "Nome é obrigatório",
              })}
              className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              placeholder="Digite seu nome"
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}

            <label className="block mt-4 mb-1 text-[#CBD5E1]">Senha:</label>
            <input
              type="password"
              {...register("senha", {
                required: "Senha é obrigatória",
                minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
              })}
              className="w-full p-2 mb-2 rounded-lg bg-[#0D1117] border border-[#3B82F6] text-[#E6EDF3] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              placeholder="Digite sua senha"
            />
            {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#052f6e] to-[#145ea8] hover:from-[#2196F3] hover:to-[#42A5F5] text-white py-2 rounded-lg mt-6 text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Entrar
            </button>

            <div className="mt-4 text-center">
              <a href="/cadastrarUser" className="text-[#3B82F6] hover:underline">
                Não tem uma conta? Cadastre-se
              </a>
            </div>
            <div className="mt-2 text-center">
              <a href="/forgot-password" className="text-[#3B82F6] hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;