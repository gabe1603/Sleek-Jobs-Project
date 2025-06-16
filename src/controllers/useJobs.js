import { useState, useEffect } from "react";
import jobService from "../services/jobService";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedJobs = await jobService.getJobs(filters);
      setJobs(fetchedJobs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const job = await jobService.getJobById(id);
      setSelectedJob(job);
      return job;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData) => {
    setLoading(true);
    setError(null);
    try {
      const newJob = await jobService.createJob(jobData);
      setJobs(prevJobs => [...prevJobs, newJob]);
      return newJob;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, jobData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedJob = await jobService.updateJob(id, jobData);
      setJobs(prevJobs => 
        prevJobs.map(job => job.id === id ? updatedJob : job)
      );
      if (selectedJob?.id === id) {
        setSelectedJob(updatedJob);
      }
      return updatedJob;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await jobService.deleteJob(id);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      if (selectedJob?.id === id) {
        setSelectedJob(null);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSelectedJob = () => setSelectedJob(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    selectedJob,
    loading,
    error,
    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deleteJob,
    clearError,
    clearSelectedJob
  };
}; 