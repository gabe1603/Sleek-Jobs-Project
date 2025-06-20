import api from './api';

export async function getAllSkills() {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar skills:', error);
    throw error;
  }
} 