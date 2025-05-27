import React, { useState, useEffect } from 'react';
import Header from "../components/Header.jsx/Header";

function Produtos() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [productData, setProductData] = useState([]);
  const [stockFilter, setStockFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const categorias = [
  { id: '1', nome: 'sofas' },
  { id: '2', nome: 'mesas' },
  { id: '3', nome: 'Roupas' },
  { id: '4', nome: 'Alimentos' },
];
  console.log(productData);

   useEffect(() => {
  const fetchProducts = async () => {
    try {
      // Se quiser filtrar por usuário, adicione o id_usuario na URL
      const response = await fetch("http://localhost:5001/produtos");
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
    setProductData(productData.filter(product => product.categoria === item) || []);
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

  // Função para editar quantidade do produto
  const handleEditQuantity = (product) => {
    setEditingProduct(product);
    setEditQuantity(product.estoque.toString());
  };

  // Função para salvar a nova quantidade
  const handleSaveQuantity = () => {
    const newQuantity = parseInt(editQuantity);
    if (isNaN(newQuantity) || newQuantity < 0) {
      alert('Por favor, insira uma quantidade válida (número maior ou igual a 0)');
      return;
    }

    setProductData(prevData => 
      prevData.map(product => 
        product.id === editingProduct.id 
          ? { ...product, estoque: newQuantity }
          : product
      )
    );

    setEditingProduct(null);
    setEditQuantity('');
    console.log(`Quantidade do produto ${editingProduct.nome} atualizada para ${newQuantity}`);
  };

  // Função para cancelar edição
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditQuantity('');
  };

  // Função para confirmar exclusão
  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Função para executar exclusão
  const confirmDelete = () => {
    setProductData(prevData => 
      prevData.filter(product => product.id !== productToDelete.id)
    );
    setShowDeleteModal(false);
    setProductToDelete(null);
    console.log(`Produto ${productToDelete.nome} excluído`);
  };

  // Função para cancelar exclusão
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const filteredProducts = getFilteredProducts();
  console.log("xereca rosa",filteredProducts);

  return (
    <div className="flex bg-[#0D1117] min-h-screen text-[#E6EDF3]">
      <div className="bg-[#161B22] p-4 w-64 h-screen shadow-lg">
        <Header />
        <h1 className="text-[#E6EDF3] text-xl font-bold mb-6">Categorias de Estoque</h1>

        <div className="flex flex-col">
          <div className="flex border-b border-[#2C3E50]">
            {productData.map((category, index) => (
              
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
            {productData.map((category, index) => (
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
                  {categorias.map((item, itemIndex) => (
                    <li
                      key={item.id}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        selectedItem === item.nome
                          ? "bg-[#3B82F6] text-white"
                          : "bg-[#1F2A37] hover:bg-[#60A5FA]"
                      }`}
                      onClick={() => handleitem.nomeClick(item.nome)}
                    >
                      {item.nome}
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
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">quantidade</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Unidade</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Código de Barras</th>
                      <th className="py-3 px-4 border-b border-[#2C3E50] text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-[#2C3E50]">
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.id}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.codigo_barras}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.nome}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.categoria}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.preco.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">
                          {editingProduct && editingProduct.id === product.id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(e.target.value)}
                                className="w-16 px-2 py-1 bg-[#0D1117] border border-[#2C3E50] rounded text-[#E6EDF3] text-xs"
                                min="0"
                              />
                              <button
                                onClick={handleSaveQuantity}
                                className="px-2 py-1 bg-[#10B981] text-white rounded text-xs hover:bg-[#059669]"
                              >
                                ✓
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-2 py-1 bg-[#EF4444] text-white rounded text-xs hover:bg-[#DC2626]"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.estoque > 0 ? 'bg-[#10B981] text-white' : 'bg-[#EF4444] text-white'
                            }`}>
                              {product.estoque}
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.unidade}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">{product.codigoBarras}</td>
                        <td className="py-2 px-4 border-b border-[#2C3E50]">
                          <button
                            onClick={() => handleEditQuantity(product)}
                            className="px-2 py-1 bg-[#10B981] text-white rounded text-xs hover:bg-[#059669]"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product)}
                            className="px-2 py-1 bg-[#EF4444] text-white rounded text-xs hover:bg-[#DC2626]"
                          >
                            Excluir
                          </button>
                        </td>
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
