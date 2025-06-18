import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatsCard = ({ title, value, color }) => {
  return (
    <Card sx={{
      bgcolor: color || '#f5f6fa',
      color: '#222',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 8px 0 rgba(60,60,100,0.06)',
      borderRadius: 3,
      height: '100%',
      minHeight: 70,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      px: 2,
      py: 1.5
    }}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Typography variant="h4" component="span" sx={{ fontWeight: 700, mr: 1 }}>
            {value}
          </Typography>
          <Typography variant="body1" component="span" sx={{ color: '#444', fontWeight: 500, fontSize: 18 }}>
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
