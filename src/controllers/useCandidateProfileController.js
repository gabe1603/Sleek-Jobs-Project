import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import jobService from '../services/jobService';

export function useCandidateProfileController() {
  const { userId } = useAuth();
  const [applications, setApplications] = useState([]);
  const [cv, setCV] = useState(null);
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState({ name: '', email: '' });
  const [editProfileLoading, setEditProfileLoading] = useState(false);
  const [editProfileError, setEditProfileError] = useState('');
  const [editProfileSuccess, setEditProfileSuccess] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const [avatarSuccess, setAvatarSuccess] = useState('');

  const handleEditProfile = async () => {
    setEditProfileLoading(true);
    setEditProfileError('');
    setEditProfileSuccess('');
    try {
      const updated = await jobService.updateUserProfile(userId, {
        name: editProfile.name,
        email: editProfile.email
      });
      setUser(prev => ({ ...prev, ...updated }));
      setEditProfileSuccess('Profile updated successfully!');
      setTimeout(() => setEditProfileSuccess(''), 1200);
    } catch (err) {
      setEditProfileError(typeof err === 'string' ? err : 'Error updating profile');
    } finally {
      setEditProfileLoading(false);
    }
  };

  const handleUploadAvatar = async (file) => {
    setAvatarLoading(true);
    setAvatarError('');
    setAvatarSuccess('');
    try {
      const updated = await jobService.uploadUserAvatar(userId, file);
      setUser(prev => ({ ...prev, avatar: updated.avatar || updated.url || updated.path }));
      setAvatarSuccess('Avatar updated successfully!');
    } catch (err) {
      setAvatarError(typeof err === 'string' ? err : 'Error uploading avatar');
    } finally {
      setAvatarLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setEditProfile({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

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

  return { applications, cv, skills, user, loading, editProfile, setEditProfile, editProfileLoading, editProfileError, editProfileSuccess, handleEditProfile, avatarLoading, avatarError, avatarSuccess, handleUploadAvatar };
} 