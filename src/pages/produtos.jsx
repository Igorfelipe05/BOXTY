import React, { useState } from 'react';
import Header from "../components/Header.jsx/Header";

function Produtos() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [productData, setProductData] = useState([]);
  const [stockFilter, setStockFilter] = useState("all");

  const categories = [
    { id: 1, name: "Móveis", items: ["Sofás", "Mesas", "Cadeiras", "Camas", "Estantes"] },
  ];

  const productDatabase = {
    "Sofás": [
      { id: 1, numeroPedido: "M001", nome: "Sofá 3 Lugares", categoria: "Sofás", preco: 1200.00, estoque: 5, unidade: "unidade", codigoBarras: "7890000000001"},
      { id: 2, numeroPedido: "M002", nome: "Sofá Retrátil", categoria: "Sofás", preco: 1800.00, estoque: 2, unidade: "unidade", codigoBarras: "7890000000002",  }
    ],
    "Mesas": [
      { id: 1, numeroPedido: "M010", nome: "Mesa de Jantar", categoria: "Mesas", preco: 900.00, estoque: 3, unidade: "unidade", codigoBarras: "7890000000010",  },
      { id: 2, numeroPedido: "M011", nome: "Mesa de Centro", categoria: "Mesas", preco: 400.00, estoque: 4, unidade: "unidade", codigoBarras: "7890000000011",  }
    ],
    "Cadeiras": [
      { id: 1, numeroPedido: "M020", nome: "Cadeira de Escritório", categoria: "Cadeiras", preco: 350.00, estoque: 10, unidade: "unidade", codigoBarras: "7890000000020",  },
      { id: 2, numeroPedido: "M021", nome: "Cadeira de Madeira", categoria: "Cadeiras", preco: 200.00, estoque: 0, unidade: "unidade", codigoBarras: "7890000000021",  }
    ],
    "Camas": [
      { id: 1, numeroPedido: "M030", nome: "Cama de Casal", categoria: "Camas", preco: 1500.00, estoque: 1, unidade: "unidade", codigoBarras: "7890000000030",  },
      { id: 2, numeroPedido: "M031", nome: "Cama Solteiro", categoria: "Camas", preco: 1000.00, estoque: 3, unidade: "unidade", codigoBarras: "7890000000031",  }
    ],
    "Estantes": [
      { id: 1, numeroPedido: "M040", nome: "Estante de Livros", categoria: "Estantes", preco: 600.00, estoque: 2, unidade: "unidade", codigoBarras: "7890000000040",  },
      { id: 2, numeroPedido: "M041", nome: "Estante Modular", categoria: "Estantes", preco: 850.00, estoque: 0, unidade: "unidade", codigoBarras: "7890000000041",  }
    ]
  };


  const handleItemClick = (item) => {
    setSelectedItem(item);
    setProductData(productDatabase[item] || []);
    console.log(`Carregando dados de ${item}`);
  };

  const getFilteredProducts = () => {
    if (!productData.length) return [];
    switch (stockFilter) {
      case "inStock":
        return productData.filter(product => product.estoque > 0);
      case "outOfStock":
        return productData.filter(product => product.estoque === 0);
      default:
        return productData;
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="flex bg-[#0D1117] min-h-screen text-[#E6EDF3]">
      <div className="bg-[#161B22] p-4 w-64 h-screen shadow-lg">
        <Header />
        <h1 className="text-[#E6EDF3] text-xl font-bold mb-6">Categorias de Estoque</h1>

        <div className="flex flex-col">
          <div className="flex border-b border-[#2C3E50]">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === index
                    ? "text-[#3B82F6] border-b-2 border-[#3B82F6]"
                    : "text-[#8B949E] hover:text-[#60A5FA]"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`${activeTab === index ? "block" : "hidden"}`}
              >
                <div className="mb-4">
                  <h3 className="text-[#E6EDF3] font-semibold mb-2">Filtrar por:</h3>
                  <div className="space-y-1">
                    {["all", "inStock", "outOfStock"].map((type) => (
                      <div
                        key={type}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          stockFilter === type
                            ? "bg-[#3B82F6] text-white"
                            : "bg-[#1F2A37] hover:bg-[#60A5FA]"
                        }`}
                        onClick={() => setStockFilter(type)}
                      >
                        {type === "all"
                          ? "Todos"
                          : type === "inStock"
                          ? "Em Estoque"
                          : "Sem Estoque"}
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-[#E6EDF3] font-semibold mb-2">Categorias:</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        selectedItem === item
                          ? "bg-[#3B82F6] text-white"
                          : "bg-[#1F2A37] hover:bg-[#60A5FA]"
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {selectedItem ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Produtos: {selectedItem}
              {stockFilter !== "all" && (
                <span className="ml-2 text-lg font-normal text-[#60A5FA]">
                  ({stockFilter === "inStock" ? "Em Estoque" : "Sem Estoque"})
                </span>
              )}
            </h2>
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-[#1F2A37] border border-[#2C3E50] shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-[#161B22]">
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">ID</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Nº Pedido</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Nome</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Categoria</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Preço (R$)</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Estoque</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Unidade</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Código de Barras</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-[#2C3E50]">
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.id}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.numeroPedido}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.nome}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.categoria}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.preco.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            product.estoque > 0 ? 'bg-[#10B981] text-white' : 'bg-[#EF4444] text-white'
                          }`}>
                            {product.estoque}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.unidade}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.codigoBarras}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-[#8B949E]">Nenhum produto encontrado para esta categoria com o filtro selecionado.</p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#8B949E] text-lg">Selecione uma categoria de produto para visualizar os itens</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Produtos;
