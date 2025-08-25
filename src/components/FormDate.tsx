// src/components/AppointmentForm.tsx
import React, { useState } from 'react';

const FormDate: React.FC = () => {
  const [formData, setFormData] = useState({
    startDate: '',  // Récupérer de Calendar
    endDate: '',    // Récupérer de Calendar
    breed: '',
    dogName: '',
    comments: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi d'email avec les données formData
    alert("Formulaire envoyé !");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date de début :</label>
      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

      <label>Date de fin :</label>
      <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

      <label>Race du chien :</label>
      <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />

      <label>Prénom du chien :</label>
      <input type="text" name="dogName" value={formData.dogName} onChange={handleChange} required />

      <label>Commentaires :</label>
      <textarea name="comments" value={formData.comments} onChange={handleChange} />

      <button type="submit">Envoyer la demande</button>
    </form>
  );
};

export default FormDate;
