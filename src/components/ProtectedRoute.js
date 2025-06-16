import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../controllers/useAuth';

const ProtectedRoute = ({ children, allowedUserTypes }) => {
  const { isAuth, userType, loading } = useAuth();

  if (loading) {
    // Opcional: Mostrar um spinner de carregamento enquanto o estado de autenticação é inicializado
    return <div>Carregando autenticação...</div>; 
  }

  if (!isAuth) {
    // Não autenticado, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  if (allowedUserTypes && !allowedUserTypes.includes(userType)) {
    // Autenticado, mas não tem o tipo de usuário permitido, redireciona para home ou uma página de erro
    // Você pode personalizar este redirecionamento conforme sua necessidade
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 