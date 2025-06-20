import api from './api';

export async function getUserApplications(userId) {
  try {
    const response = await api.get(`/users/${userId}/applications`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar aplicações do usuário:', error);
    throw error;
  }
} 