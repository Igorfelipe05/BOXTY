import React, { useState } from 'react'
import Header from "../components/Header.jsx/Header"

function Produtos() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [productData, setProductData] = useState([]);
  const [stockFilter, setStockFilter] = useState("all"); 
  
  const categories = [
    { id: 1, name: "Móveis", items: ["Sofás", "Mesas", "Cadeiras", "Camas", "Estantes"] },
  ];





   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/produtos');
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setProductData(productDatabase[item] || []);
    console.log(`Carregando dados de ${item}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
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
    <div className="flex">
      <div className="bg-blue-100 p-4 w-64 h-screen shadow-lg">
        <Header/>
        <h1 className="text-blue-800 text-xl font-bold mb-6">Categorias de Estoque</h1>
        
        <div className="flex flex-col">
          <div className="flex border-b border-blue-300">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === index
                    ? "text-blue-800 border-b-2 border-blue-800"
                    : "text-blue-600 hover:text-blue-800"
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
                  <h3 className="text-blue-800 font-semibold mb-2">Filtrar por:</h3>
                  <div className="space-y-1">
                    {["all", "inStock", "outOfStock"].map((type) => (
                      <div
                        key={type}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          stockFilter === type ? "bg-blue-400 text-white" : "bg-blue-200 hover:bg-blue-300"
                        }`}
                        onClick={() => setStockFilter(type)}
                      >
                        {type === "all" ? "Todos" : type === "inStock" ? "Em Estoque" : "Sem Estoque"}
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-blue-800 font-semibold mb-2">Categorias:</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        selectedItem === item 
                          ? "bg-blue-400 text-white" 
                          : "bg-blue-200 hover:bg-blue-300"
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
                <span className="ml-2 text-lg font-normal text-blue-600">
                  ({stockFilter === "inStock" ? "Em Estoque" : "Sem Estoque"})
                </span>
              )}
            </h2>
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-3 px-4 border-b text-left">ID</th>
                      <th className="py-3 px-4 border-b text-left">Nº Pedido</th>
                      <th className="py-3 px-4 border-b text-left">Nome</th>
                      <th className="py-3 px-4 border-b text-left">Categoria</th>
                      <th className="py-3 px-4 border-b text-left">Preço (R$)</th>
                      <th className="py-3 px-4 border-b text-left">Estoque</th>
                      <th className="py-3 px-4 border-b text-left">Unidade</th>
                      <th className="py-3 px-4 border-b text-left">Código de Barras</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{product.id}</td>
                        <td className="py-2 px-4 border-b">{product.numeroPedido}</td>
                        <td className="py-2 px-4 border-b">{product.nome}</td>
                        <td className="py-2 px-4 border-b">{product.categoria}</td>
                        <td className="py-2 px-4 border-b">{product.preco.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            product.estoque > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.estoque}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b">{product.unidade}</td>
                        <td className="py-2 px-4 border-b">{product.codigoBarras}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Nenhum produto encontrado para esta categoria com o filtro selecionado.</p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Selecione uma categoria de produto para visualizar os itens</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Produtos;
