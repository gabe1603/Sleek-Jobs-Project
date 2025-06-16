export const User = {
  id: Number,
  nome: String,
  email: String,
  senha: String,
  tipo: String, // "empregador" ou "candidato"
  empresa: String, // apenas para empregador
  cargo: String,   // apenas para empregador
  empresas: Array, // IDs das empresas do empregador
}; 