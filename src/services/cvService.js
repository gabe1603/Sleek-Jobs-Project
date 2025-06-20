import api from './api';

export async function getCV(userId) {
  try {
    const response = await api.get(`/cv/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar CV:', error);
    throw error;
  }
}

export async function upsertCV(cvData) {
  try {
    const response = await api.post('/cv', cvData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar/atualizar CV:', error);
    throw error;
  }
} 