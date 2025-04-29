import React from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header.jsx/Header";
import { formatCPF, isValidCPFFormat } from "../utils/formatters";
import logo from "/public/logo.svg";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
   // pelo amor chamar api aqui
  };

  const cpf = watch("cpf");
  
  const handleCPFChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatCPF(value);
    setValue("cpf", formattedValue);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="h-16" />
          </div>
          <h1 className="text-3xl font-semibold text-center mb-4 text-gray-700">ACESSAR SISTEMA</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mt-2 mb-2 text-gray-600">CPF:</label>
            <input
              type="text"
              maxLength={14}
              {...register("cpf", { 
                required: "CPF é obrigatório",
                validate: {
                  format: value => isValidCPFFormat(value) || "CPF deve estar no formato XXX.XXX.XXX-XX"
                }
              })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              placeholder="000.000.000-00"
              onChange={handleCPFChange}
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}

            <label className="block mt-2 mb-2 text-gray-600">Senha:</label>
            <input
              type="password"
              {...register("senha", { 
                required: "Senha é obrigatória",
                minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" } 
              })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              placeholder="Digite sua senha"
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.senha.message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
            >
              Entrar
            </button>
            
            <div className="mt-4 text-center">
              <a href="/cadastrarUser" className="text-blue-500 hover:underline">
                Não tem uma conta? Cadastre-se
              </a>
            </div>
            <div className="mt-2 text-center">
              <a href="/forgot-password" className="text-blue-500 hover:underline">
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
