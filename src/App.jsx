import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Cadastrar from './pages/cadastrarProduto'
import Login from './pages/login'
import Erro from './pages/notFund'
import sobreNos from './pages/sobreNos'
import Info from './pages/sobreNos'
import Produtos from './pages/produtos'
import CadastrarProduto from './pages/cadastrarProduto'
import CadastrarUser from './pages/cadastrarUser'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route  path='/' element={<Home/>} />
      <Route  path='/sobreNos' element={<Info/>} />
      <Route  path='/cadastrarProduto' element={<Cadastrar/>} />
      <Route  path='/login' element={<Login/>} />
      <Route  path='*' element={<Erro/>} />
      <Route  path='/produtos' element={<Produtos/>} />
      <Route path='/CadastrarUser' element={<CadastrarUser />} />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
