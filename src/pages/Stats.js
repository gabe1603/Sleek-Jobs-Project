import React, { useState, useMemo } from 'react';
import { Container, Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/StatsCard';
import { jobs } from '../mock/jobs';

const COLORS = ['#A5B4FC', '#C7D2FE', '#FBCFE8', '#FDE68A', '#B9FBC0', '#F1F5F9', '#C4B5FD', '#A7F3D0'];
const BG_GRADIENT = 'linear-gradient(120deg, #f8fafc 60%, #e0e7ef 100%)';

export default function Stats() {
  const [period, setPeriod] = useState('all');

  const filteredJobs = useMemo(() => {
    const now = new Date();
    switch (period) {
      case 'month':
        return jobs.filter(j => new Date(j.closeDate) > now && new Date(j.closeDate) <= new Date(now.setMonth(now.getMonth() + 1)));
      case 'quarter':
        return jobs.filter(j => new Date(j.closeDate) > now && new Date(j.closeDate) <= new Date(now.setMonth(now.getMonth() + 3)));
      case 'year':
        return jobs.filter(j => new Date(j.closeDate) > now && new Date(j.closeDate) <= new Date(now.setFullYear(now.getFullYear() + 1)));
      default:
        return jobs;
    }
  }, [period]);

  const openJobs = filteredJobs.filter(j => new Date(j.closeDate) > new Date()).length;
  const closedJobs = filteredJobs.filter(j => new Date(j.closeDate) <= new Date()).length;
  const totalJobs = filteredJobs.length;
  const uniqueCompanies = new Set(filteredJobs.map(j => j.empresa)).size;
  const avgSalary = filteredJobs.reduce((acc, job) => {
    const salary = job.salario.split(' - ')[0].replace('AU$ ', '').replace(',', '');
    return acc + parseFloat(salary);
  }, 0) / (openJobs || 1);

  const pieData = [
    { name: 'Abertas', value: openJobs },
    { name: 'Fechadas', value: closedJobs }
  ];

  const areaData = filteredJobs.reduce((acc, job) => {
    acc[job.area] = (acc[job.area] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(areaData).map(([area, count]) => ({ area, count }));

  const topAreas = Object.entries(areaData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([area, count]) => ({ area, count }));

  const minChartWidth = Math.max(420, barData.length * 120);

  return (
    <Box sx={{ minHeight: '60vh', background: BG_GRADIENT, py: 4 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#222', mb: 2 }}>
          Statistics
        </Typography>
        <FormControl sx={{ mb: 2, minWidth: 180 }} size="small">
          <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="month">This month</MenuItem>
            <MenuItem value="quarter">Last 3 months</MenuItem>
            <MenuItem value="year">Current year</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6} sm={4} md={2.4} lg={2} xl={2}>
            <StatsCard title="Open Jobs" value={openJobs} color="#F1F5F9" />
          </Grid>
          <Grid item xs={6} sm={4} md={2.4} lg={2} xl={2}>
            <StatsCard title="Closed Jobs" value={closedJobs} color="#E0E7EF" />
          </Grid>
          <Grid item xs={6} sm={4} md={2.4} lg={2} xl={2}>
            <StatsCard title="Total Jobs" value={totalJobs} color="#E0E7EF" />
          </Grid>
          <Grid item xs={6} sm={4} md={2.4} lg={2} xl={2}>
            <StatsCard title="Hiring Organisations" value={uniqueCompanies} color="#F5F3FF" />
          </Grid>
          <Grid item xs={12} sm={4} md={2.4} lg={2} xl={2}>
            <StatsCard title="Average Salary" value={`AU$ ${avgSalary.toFixed(2)}`} color="#E0E7EF" />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={7}>
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{
                  height: 370,
                  minWidth: 420,
                  width: '100%',
                  bgcolor: '#fff',
                  borderRadius: 3,
                  p: 2,
                  boxShadow: '0 2px 8px 0 rgba(60,60,100,0.04)',
                  border: '1px solid #e0e0e0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    sx={{ color: '#444', fontWeight: 600 }}
                  >
                    Job Proportion
                  </Typography>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label fill="#A5B4FC">
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e0e0e0', color: '#333' }} />
                      <Legend iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" align="center" gutterBottom sx={{ color: '#444', fontWeight: 600 }}>Top 5 Areas</Typography>
              <Grid container spacing={2}>
                {topAreas.map((item, index) => (
                  <Grid item xs={6} sm={4} md={2.4} lg={2} xl={2} key={index}>
                    <StatsCard title={item.area} value={item.count} color={COLORS[index % COLORS.length]} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={5}>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    height: 370,
                    width: '100%',
                    minWidth: minChartWidth,
                    bgcolor: '#fff',
                    borderRadius: 3,
                    p: 2,
                    boxShadow: '0 2px 8px 0 rgba(60,60,100,0.04)',
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    overflowX: 'auto'
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    sx={{ color: '#444', fontWeight: 600 }}
                  >
                    Jobs by Area
                  </Typography>
                  <ResponsiveContainer width="100%" height={260} minWidth={minChartWidth}>
                    <BarChart data={barData} margin={{ left: 10, right: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="area" stroke="#888" tick={{ fontSize: 13 }} />
                      <YAxis stroke="#888" tick={{ fontSize: 13 }} />
                      <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e0e0e0', color: '#333' }} />
                      <Legend iconType="circle" />
                      <Bar dataKey="count" fill="#A5B4FC" radius={[6, 6, 0, 0]} barSize={48} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
