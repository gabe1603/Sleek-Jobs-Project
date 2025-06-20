import { useState, useMemo, useEffect } from 'react';
import jobService from '../services/jobService';

export function useStatsController() {
  const [period, setPeriod] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    jobService.getJobs().then(jobsData => {
      if (mounted) {
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) {
        setJobs([]);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    const now = new Date();
    switch (period) {
      case 'month':
        return jobs.filter(j => {
          const close = new Date(j.closeDate);
          return close > now && close <= new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        });
      case 'quarter':
        return jobs.filter(j => {
          const close = new Date(j.closeDate);
          return close > now && close <= new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
        });
      case 'year':
        return jobs.filter(j => {
          const close = new Date(j.closeDate);
          return close > now && close <= new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
        });
      default:
        return jobs;
    }
  }, [period, jobs]);

  const openJobs = filteredJobs.filter(j => new Date(j.closeDate) > new Date()).length;
  const closedJobs = filteredJobs.filter(j => new Date(j.closeDate) <= new Date()).length;
  const totalJobs = filteredJobs.length;
  const uniqueCompanies = new Set(filteredJobs.map(j => j.company?.name || 'undefined')).size;
  const minSalaries = filteredJobs.map(job => job.salaryMin).filter(v => typeof v === 'number');
  const maxSalaries = filteredJobs.map(job => job.salaryMax).filter(v => typeof v === 'number');
  const media_minimo = minSalaries.length ? minSalaries.reduce((a, b) => a + b, 0) / minSalaries.length : 0;
  const media_maximo = maxSalaries.length ? maxSalaries.reduce((a, b) => a + b, 0) / maxSalaries.length : 0;
  const avgSalary = (media_minimo + media_maximo) / 2;

  const pieData = [
    { name: 'Abertas', value: openJobs },
    { name: 'Fechadas', value: closedJobs }
  ];

  const areaData = filteredJobs.reduce((acc, job) => {
    const area = job.area || 'undefined';
    acc[area] = (acc[area] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(areaData).map(([area, count]) => ({ area, count }));

  const topAreas = Object.entries(areaData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([area, count]) => ({ area, count }));

  const minChartWidth = Math.max(420, barData.length * 120);

  return {
    period,
    setPeriod,
    openJobs,
    closedJobs,
    totalJobs,
    uniqueCompanies,
    avgSalary,
    pieData,
    barData,
    topAreas,
    minChartWidth,
    loading
  };
} 