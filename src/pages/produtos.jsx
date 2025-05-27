import React, { useState, useEffect, useCallback } from 'react';
import Header from "../components/Header.jsx/Header";

function Produtos() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [productData, setProductData] = useState([]);
  const [stockFilter, setStockFilter] = useState("all");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');

  const categorias = [
    { id: '1', nome: 'sofas' },
    { id: '2', nome: 'mesas' },
    { id: '3', nome: 'Guarda Roupas' },
    { id: '4', nome: 'comoda' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/server/produtos/produtos");
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const lowStockProducts = productData.filter(p => p.quantidade > 0 && p.quantidade < 5);
    if (lowStockProducts.length > 0) {
      const nomes = lowStockProducts.map(p => p.nome).join(', ');
      alert(`Atenção! Estoque baixo dos produtos: ${nomes}`);
    }
  }, [productData]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/server/produtos/produtos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProductData(prev => prev.filter(product => product.id !== id));
        alert('Produto excluído com sucesso!');
      } else {
        alert('Erro ao excluir produto');
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditQuantity(product.quantidade.toString());
  };

  const handleUpdate = async () => {
    const product = productData.find(p => p.id === editingProductId);
    if (!product) return;

    const updatedProduct = {
      ...product,
      quantidade: Number(editQuantity)
    };

    try {
      const response = await fetch(`http://localhost:5001/server/produtos/produtos/${editingProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const newProductData = productData.map(p =>
          p.id === editingProductId ? updatedProduct : p
        );
        setProductData(newProductData);

        alert('Produto editado com sucesso!');

        setEditingProductId(null);
        setEditQuantity('');
      } else {
        alert('Erro ao atualizar produto');
      }
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
  };

  const filteredProducts = useCallback(() => {
    let filtered = productData;
    if (selectedItem) {
      filtered = filtered.filter(p => p.categoria === selectedItem);
    }
    if (stockFilter === "inStock") {
      return filtered.filter(p => p.quantidade > 0);
    }
    if (stockFilter === "outOfStock") {
      return filtered.filter(p => p.quantidade === 0);
    }
    return filtered;
  }, [productData, selectedItem, stockFilter]);

  return (
    <div className="flex bg-[#0D1117] min-h-screen text-[#E6EDF3]">
      <div className="bg-[#161B22] w-80 h-screen shadow-xl border-r border-[#2C3E50]">
        <div className="p-6">
          <Header />
          <div className="mt-8">
            <h1 className="text-[#E6EDF3] text-2xl font-bold mb-8 text-center">
              Categorias de Estoque
            </h1>

            <div className="space-y-2">
              {categorias.map((category, index) => (
                <button
                  key={category.id}
                  className={`w-full py-4 px-6 text-left font-medium rounded-lg transition-all duration-200 ${
                    activeTab === index
                      ? "bg-[#3B82F6] text-white shadow-lg transform scale-105"
                      : "text-[#8B949E] hover:text-[#60A5FA] hover:bg-[#1F2A37] hover:transform hover:scale-102"
                  }`}
                  onClick={() => {
                    setActiveTab(index);
                    setSelectedItem(category.nome);
                  }}
                >
                  <span className="capitalize text-lg">{category.nome}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        {selectedItem ? (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Produtos: <span className="text-[#3B82F6] capitalize">{selectedItem}</span>
                {stockFilter !== "all" && (
                  <span className="block text-xl font-normal text-[#60A5FA] mt-2">
                    ({stockFilter === "inStock" ? "Em quantidade" : "Sem quantidade"})
                  </span>
                )}
              </h2>

              <div className="flex justify-center gap-4 mb-6">
                {[
                  { key: "all", label: "Todos" },
                  { key: "inStock", label: "Em quantidade" },
                  { key: "outOfStock", label: "Sem quantidade" }
                ].map(filter => (
                  <button
                    key={filter.key}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      stockFilter === filter.key
                        ? "bg-[#3B82F6] text-white shadow-lg transform scale-105"
                        : "bg-[#1F2A37] text-[#8B949E] hover:bg-[#60A5FA] hover:text-white hover:transform hover:scale-102"
                    }`}
                    onClick={() => setStockFilter(filter.key)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#1F2A37] rounded-xl shadow-2xl overflow-hidden border border-[#2C3E50]">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#161B22]">
                    <th className="py-4 px-6 text-center font-semibold text-[#E6EDF3] border-b border-[#2C3E50]">ID</th>
                    <th className="py-4 px-6 text-center font-semibold text-[#E6EDF3] border-b border-[#2C3E50]">Nome</th>
                    <th className="py-4 px-6 text-center font-semibold text-[#E6EDF3] border-b border-[#2C3E50]">Categoria</th>
                    <th className="py-4 px-6 text-center font-semibold text-[#E6EDF3] border-b border-[#2C3E50]">Preço</th>
                    <th className="py-4 px-6 text-center font-semibold text-[#E6EDF3] border-b border-[#2C3E50]">Quantidade</th>
                    <th className="py-4 px-6 text-center font-semibold text-[#E6EDF3] border-b border-[#2C3E50]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts().map((product, index) => (
                    <tr 
                      key={product.id} 
                      className={`hover:bg-[#2C3E50] transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-[#1F2A37]' : 'bg-[#1A1F2E]'
                      }`}
                    >
                      <td className="py-4 px-6 text-center border-b border-[#2C3E50]/50">{product.id}</td>
                      <td className="py-4 px-6 text-center border-b border-[#2C3E50]/50 font-medium">{product.nome}</td>
                      <td className="py-4 px-6 text-center border-b border-[#2C3E50]/50 capitalize">{product.categoria}</td>
                      <td className="py-4 px-6 text-center border-b border-[#2C3E50]/50 font-semibold text-green-400">
                        R$ {product.preco}
                      </td>
                      <td className="py-4 px-6 text-center border-b border-[#2C3E50]/50">
                        {editingProductId === product.id ? (
                          <input
                            type="number"
                            value={editQuantity}
                            onChange={e => setEditQuantity(e.target.value)}
                            className="w-20 px-3 py-2 bg-[#0D1117] border border-[#3B82F6] rounded-lg text-center text-[#E6EDF3] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                          />
                        ) : (
                          <span className={`font-semibold ${
                            product.quantidade === 0 ? 'text-red-400' : 
                            product.quantidade < 5 ? 'text-red-400' : 
                            'text-green-400'
                          }`}>
                            {product.quantidade}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center border-b border-[#2C3E50]/50">
                        {editingProductId === product.id ? (
                          <div className="flex justify-center gap-2">
                            <button 
                              onClick={handleUpdate} 
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                              Salvar
                            </button>
                            <button 
                              onClick={() => setEditingProductId(null)} 
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center gap-2">
                            <button 
                              onClick={() => handleEdit(product)} 
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                              Editar
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id)} 
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                              Excluir
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts().length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-[#8B949E] text-lg">Nenhum produto encontrado nesta categoria</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-6">
                <svg className="mx-auto h-24 w-24 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#E6EDF3] mb-2">Selecione uma categoria</h3>
              <p className="text-lg text-[#8B949E]">Escolha uma categoria no menu lateral para visualizar os produtos</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Produtos;
