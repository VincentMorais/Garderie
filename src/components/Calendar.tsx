import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaDog, 
  FaComments, 
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './Calendar.css';

const BookingCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | [Date, Date] | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    breed: '',
    dogName: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    comments: ''
  });

  const handleDateChange: CalendarProps['onChange'] = (selectedDate) => {
    if (!selectedDate) return;

    setDate(selectedDate as Date | [Date, Date]);
    setFormVisible(true);
    setSubmitStatus('idle');

    if (Array.isArray(selectedDate) && selectedDate.length === 2) {
      setFormData({
        ...formData,
        startDate: selectedDate[0]?.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }) || '',
        endDate: selectedDate[1]?.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }) || ''
      });
    } else if (selectedDate instanceof Date) {
      setFormData({
        ...formData,
        startDate: selectedDate.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        endDate: ''
      });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      startDate: formData.startDate,
      endDate: formData.endDate,
      breed: formData.breed,
      dogName: formData.dogName,
      ownerName: formData.ownerName,
      ownerEmail: formData.ownerEmail,
      ownerPhone: formData.ownerPhone,
      comments: formData.comments,
    };

    try {
      await emailjs.send(
        'service_pxe0mxi', 
        'template_eq0ut96', 
        templateParams, 
        'e4M_zkmVPcOxkYUxj'
      );
      
      setSubmitStatus('success');
      setTimeout(() => {
        setFormVisible(false);
        setSubmitStatus('idle');
        setFormData({
          startDate: '',
          endDate: '',
          breed: '',
          dogName: '',
          ownerName: '',
          ownerEmail: '',
          ownerPhone: '',
          comments: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormVisible(false);
    setDate(null);
    setSubmitStatus('idle');
    setFormData({
      startDate: '',
      endDate: '',
      breed: '',
      dogName: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      comments: ''
    });
  };

  return (
    <div className="booking-calendar">
      <div className="calendar-header">
        <div className="calendar-icon">
          <FaCalendarAlt />
        </div>
        <h2>Choisissez vos dates</h2>
        <p>Sélectionnez une date ou une période pour votre réservation</p>
      </div>

      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={date}
          selectRange
          className="calendar-component"
          minDate={new Date()}
          maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 an
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              const today = new Date();
              if (date.toDateString() === today.toDateString()) {
                return 'today';
              }
            }
            return null;
          }}
        />
      </div>
      
      <AnimatePresence mode="wait">
        {formVisible && (
          <motion.form 
            onSubmit={handleSubmit} 
            className="reservation-form"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="form-header">
              <h3>Formulaire de réservation</h3>
              <button 
                type="button" 
                className="close-button"
                onClick={resetForm}
              >
                <FaTimesCircle />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  <FaCalendarAlt className="input-icon" />
                  Date de début
                </label>
                <input 
                  type="text" 
                  name="startDate" 
                  value={formData.startDate} 
                  readOnly 
                  className="date-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaCalendarAlt className="input-icon" />
                  Date de fin
                </label>
                <input 
                  type="text" 
                  name="endDate" 
                  value={formData.endDate} 
                  readOnly 
                  className="date-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaDog className="input-icon" />
                  Prénom du chien *
                </label>
                <input 
                  type="text" 
                  name="dogName" 
                  value={formData.dogName} 
                  onChange={handleFormChange} 
                  required 
                  placeholder="Ex: Max"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaDog className="input-icon" />
                  Race du chien *
                </label>
                <input 
                  type="text" 
                  name="breed" 
                  value={formData.breed} 
                  onChange={handleFormChange} 
                  required 
                  placeholder="Ex: Golden Retriever"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaComments className="input-icon" />
                  Votre nom *
                </label>
                <input 
                  type="text" 
                  name="ownerName" 
                  value={formData.ownerName} 
                  onChange={handleFormChange} 
                  required 
                  placeholder="Votre nom complet"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaComments className="input-icon" />
                  Votre email *
                </label>
                <input 
                  type="email" 
                  name="ownerEmail" 
                  value={formData.ownerEmail} 
                  onChange={handleFormChange} 
                  required 
                  placeholder="votre@email.com"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaComments className="input-icon" />
                  Votre téléphone
                </label>
                <input 
                  type="tel" 
                  name="ownerPhone" 
                  value={formData.ownerPhone} 
                  onChange={handleFormChange} 
                  placeholder="01 23 45 67 89"
                />
              </div>

              <div className="form-group full-width">
                <label>
                  <FaComments className="input-icon" />
                  Commentaires ou demandes spéciales
                </label>
                <textarea 
                  name="comments" 
                  value={formData.comments} 
                  onChange={handleFormChange} 
                  placeholder="Informations importantes sur votre chien, comportement, régime alimentaire..."
                  rows={4}
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Envoyer la réservation
                  </>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' && (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaCheckCircle className="success-icon" />
                  <span>Réservation envoyée avec succès !</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimesCircle className="error-icon" />
                  <span>Erreur lors de l'envoi. Veuillez réessayer.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingCalendar;
