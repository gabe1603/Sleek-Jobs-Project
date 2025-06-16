import { useState, useEffect } from "react";
import companyService from "../services/companyService";

export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanies = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedCompanies = await companyService.getCompanies(filters);
      setCompanies(fetchedCompanies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const company = await companyService.getCompanyById(id);
      setLoading(false);
      return company;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // Opcional: buscar todas as empresas na montagem inicial
  useEffect(() => {
    fetchCompanies();
  }, []);

  return { companies, loading, error, fetchCompanies, getCompanyById };
}; 