import PropTypes from 'prop-types';

export const Job = {
  id: PropTypes.number.isRequired,
  titulo: PropTypes.string.isRequired,
  empresa: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  local: PropTypes.string.isRequired,
  imagem: PropTypes.string,
  salario: PropTypes.string,
  closeDate: PropTypes.string,
  contato: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string),
  resumo: PropTypes.string,
  responsabilidades: PropTypes.arrayOf(PropTypes.string),
  requisitos: PropTypes.arrayOf(PropTypes.string),
  contrato: PropTypes.string,
  jornada: PropTypes.string,
  senioridade: PropTypes.string,
  descricao: PropTypes.string,
  dataPublicacao: PropTypes.string,
  status: PropTypes.oneOf(['ativo', 'inativo', 'fechado']).isRequired
};

export const JobShape = PropTypes.shape(Job);

export const validateJob = (job) => {
  const errors = {};
  
  if (!job.titulo) errors.titulo = 'Título é obrigatório';
  if (!job.empresa) errors.empresa = 'Empresa é obrigatória';
  if (!job.area) errors.area = 'Área é obrigatória';
  if (!job.local) errors.local = 'Local é obrigatório';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 