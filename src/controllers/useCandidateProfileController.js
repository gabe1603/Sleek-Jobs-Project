import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export function useCandidateProfileController() {
  const { userId } = useAuth();
  const [applications, setApplications] = useState([]);
  const [cv, setCV] = useState(null);
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const token = localStorage.getItem('jwt');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [apps, cvRes, skillsRes, userRes] = await Promise.all([
          api.get(`/applications/user/${userId}`, { headers }),
          api.get(`/cv/${userId}`, { headers }),
          api.get(`/skills/user/${userId}`, { headers }),
          api.get(`/users/${userId}`, { headers }),
        ]);
        setApplications(apps.data);
        setCV({
          summary: cvRes.data.content || cvRes.data.summary || '',
          experience: cvRes.data.experience || [],
          education: cvRes.data.education || [],
          languages: cvRes.data.languages || [],
        });
        setUser({
          ...userRes.data,
          name: userRes.data.name || userRes.data.nome || '',
          email: userRes.data.email || '',
          avatar: userRes.data.avatar || undefined,
        });
        setSkills(skillsRes.data);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchAll();
  }, [userId]);

  return { applications, cv, skills, user, loading };
} 