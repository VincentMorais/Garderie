import React, { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt, FaDog, FaUser, FaPhone, FaEnvelope,
  FaCheckCircle, FaPaw, FaArrowRight, FaArrowLeft, FaInfoCircle
} from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { supabase } from '../lib/supabase';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const MAX_DOGS = 5;

const SERVICE_OPTIONS = [
  { value: 'journee',       label: 'Garde journalière',       price: '15€/jour' },
  { value: 'demi_journee',  label: 'Demi-journée (jusqu\'à 5h)', price: '12€' },
  { value: 'soiree',        label: 'Soirée',                  price: 'Sur devis' },
  { value: 'promenade',     label: 'Promenade',               price: '10€' },
  { value: 'nac',           label: 'NAC',                     price: '10€/jour' },
  { value: 'visite_chat',   label: 'Visite de chat à domicile', price: '12€' },
];

const toKey = (d: Date) => d.toISOString().split('T')[0];
const formatDate = (d: Date) =>
  d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

type Step = 0 | 1 | 2 | 3 | 'success';

interface FormData {
  serviceType: string;
  dogCount: number;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  specialNeeds: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  serviceType: '', dogCount: 1,
  dogName: '', dogBreed: '', dogAge: '', specialNeeds: '',
  firstName: '', lastName: '', email: '', phone: '', message: '',
};

const STEPS = ['Prestation', 'Votre animal', 'Vos infos'];

const BookingCalendar: React.FC = () => {
  const [occupancy, setOccupancy] = useState<Record<string, number>>({});
  const [loadingOccupancy, setLoadingOccupancy] = useState(true);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { loadOccupancy(); }, []);

  const loadOccupancy = async () => {
    setLoadingOccupancy(true);
    const today = toKey(new Date());
    const future = toKey(new Date(Date.now() + 180 * 24 * 60 * 60 * 1000));
    const { data } = await supabase
      .from('reservations')
      .select('start_date, end_date, dog_count')
      .neq('status', 'cancelled')
      .gte('end_date', today)
      .lte('start_date', future);
    const map: Record<string, number> = {};
    (data || []).forEach((r: any) => {
      let cur = new Date(r.start_date);
      const end = new Date(r.end_date);
      while (cur <= end) {
        const key = toKey(cur);
        map[key] = (map[key] || 0) + r.dog_count;
        cur.setDate(cur.getDate() + 1);
      }
    });
    setOccupancy(map);
    setLoadingOccupancy(false);
  };

  const getDayDogs = (date: Date) => occupancy[toKey(date)] || 0;

  const checkCapacity = (start: Date, end: Date, count: number): string | null => {
    let cur = new Date(start);
    while (cur <= end) {
      const remaining = MAX_DOGS - getDayDogs(cur);
      if (count > remaining) {
        return `Le ${formatDate(cur)} : seulement ${remaining} place${remaining > 1 ? 's' : ''} disponible${remaining > 1 ? 's' : ''}.`;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return null;
  };

  const updateForm = (field: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleDateChange = (value: any) => {
    setError(null);
    if (Array.isArray(value) && value[0] && value[1]) {
      setSelectedRange([value[0] as Date, value[1] as Date]);
      setStep(1);
    } else if (value instanceof Date) {
      setSelectedRange([value, value]);
      setStep(1);
    }
  };

  const validateStep = (): boolean => {
    if (step === 1) {
      if (!form.serviceType) { setError('Veuillez choisir un type de prestation.'); return false; }
      if (selectedRange) {
        const err = checkCapacity(selectedRange[0], selectedRange[1], form.dogCount);
        if (err) { setError(err); return false; }
      }
    }
    if (step === 2) {
      if (!form.dogName.trim()) { setError('Le prénom du chien est requis.'); return false; }
      if (!form.dogBreed.trim()) { setError('La race est requise.'); return false; }
    }
    if (step === 3) {
      if (!form.firstName.trim() || !form.lastName.trim()) { setError('Prénom et nom requis.'); return false; }
      if (!form.email.trim()) { setError('Email requis.'); return false; }
      if (!form.phone.trim()) { setError('Téléphone requis.'); return false; }
    }
    return true;
  };

  const goNext = () => {
    if (validateStep()) { setError(null); setStep(s => (s as number) + 1 as Step); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep() || !selectedRange) return;
    setSubmitting(true);
    setError(null);

    const [start, end] = selectedRange;
    const capErr = checkCapacity(start, end, form.dogCount);
    if (capErr) { setError(capErr); setSubmitting(false); return; }

    const { error: dbErr } = await supabase.from('reservations').insert([{
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      service_type: form.serviceType,
      start_date: toKey(start),
      end_date: toKey(end),
      dog_count: form.dogCount,
      dog_name: form.dogName,
      dog_breed: form.dogBreed || null,
      dog_age: form.dogAge || null,
      message: form.message || null,
      special_needs: form.specialNeeds || null,
      status: 'pending',
    }]);

    if (dbErr) { setError('Erreur lors de la réservation. Veuillez réessayer.'); setSubmitting(false); return; }

    try {
      const serviceLabel = SERVICE_OPTIONS.find(s => s.value === form.serviceType)?.label || form.serviceType;
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        {
          ownerName: `${form.firstName} ${form.lastName}`,
          ownerEmail: form.email,
          ownerPhone: form.phone,
          dogName: form.dogName,
          dogBreed: form.dogBreed,
          dogCount: String(form.dogCount),
          serviceType: serviceLabel,
          startDate: formatDate(start),
          endDate: toKey(start) === toKey(end) ? formatDate(start) : formatDate(end),
          message: form.message || 'Aucun',
          specialNeeds: form.specialNeeds || 'Aucun',
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
      );
    } catch { /* email failure non critique */ }

    await loadOccupancy();
    setStep('success');
    setSubmitting(false);
  };

  const reset = () => { setSelectedRange(null); setStep(0); setForm(EMPTY_FORM); setError(null); };

  const StepIndicator = ({ current }: { current: number }) => (
    <div className="step-indicator">
      {STEPS.map((label, i) => (
        <React.Fragment key={i}>
          <div className={`step-dot ${i < current ? 'done' : i === current ? 'active' : ''}`}>
            <span className="step-circle">{i < current ? '✓' : i + 1}</span>
            <span className="step-label">{label}</span>
          </div>
          {i < STEPS.length - 1 && <div className={`step-line ${i < current ? 'done' : ''}`} />}
        </React.Fragment>
      ))}
    </div>
  );

  if (step === 0) {
    return (
      <div className="booking-calendar">
        <div className="cal-intro">
          <FaCalendarAlt className="cal-intro-icon" />
          <div>
            <h3>Choisissez vos dates</h3>
            <p>Sélectionnez une date ou une période. Cliquez deux fois pour une journée unique.</p>
          </div>
        </div>

        <div className="calendar-wrapper">
          {loadingOccupancy && <div className="cal-loading"><div className="spinner-sm" /> Chargement...</div>}
          <ReactCalendar
            onChange={handleDateChange}
            value={selectedRange}
            selectRange
            minDate={new Date()}
            maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
            locale="fr-FR"
            tileClassName={({ date, view }) => {
              if (view !== 'month') return null;
              const d = getDayDogs(date);
              if (d >= 5) return 'day-full';
              if (d >= 3) return 'day-limited';
              if (d > 0) return 'day-available';
              return null;
            }}
            tileDisabled={({ date, view }) =>
              view === 'month' && getDayDogs(date) >= MAX_DOGS
            }
          />
        </div>

        <div className="cal-legend">
          <span className="legend-item"><span className="dot dot-free" />Libre</span>
          <span className="legend-item"><span className="dot dot-available" />Quelques places</span>
          <span className="legend-item"><span className="dot dot-limited" />Limité</span>
          <span className="legend-item"><span className="dot dot-full" />Complet</span>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <motion.div className="booking-form-wrapper"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <StepIndicator current={0} />

        <div className="booking-step">
          <div className="step-dates-recap">
            <FaCalendarAlt />
            {selectedRange && toKey(selectedRange[0]) === toKey(selectedRange[1])
              ? formatDate(selectedRange[0])
              : selectedRange && `${formatDate(selectedRange[0])} → ${formatDate(selectedRange[1])}`
            }
            <button className="btn-change-dates" onClick={reset}>Modifier</button>
          </div>

          <div className="form-fields">
            <div className="form-group">
              <label>Type de prestation *</label>
              <div className="service-grid">
                {SERVICE_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    type="button"
                    className={`service-option ${form.serviceType === o.value ? 'selected' : ''}`}
                    onClick={() => updateForm('serviceType', o.value)}
                  >
                    <span className="service-name">{o.label}</span>
                    <span className="service-price">{o.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Nombre de chiens *</label>
              <div className="counter">
                <button type="button" onClick={() => updateForm('dogCount', Math.max(1, form.dogCount - 1))} disabled={form.dogCount <= 1}>−</button>
                <span className="counter-value">{form.dogCount}</span>
                <button type="button" onClick={() => updateForm('dogCount', Math.min(5, form.dogCount + 1))} disabled={form.dogCount >= 5}>+</button>
              </div>
              {selectedRange && (
                <p className="field-hint">
                  <FaInfoCircle />
                  {MAX_DOGS - getDayDogs(selectedRange[0])} place(s) disponible(s) ce jour
                </p>
              )}
            </div>

            {error && <div className="form-error">{error}</div>}

            <div className="step-actions">
              <button type="button" className="btn-back" onClick={reset}><FaArrowLeft /> Retour</button>
              <button type="button" className="btn-next" onClick={goNext}>Suivant <FaArrowRight /></button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (step === 2) {
    return (
      <motion.div className="booking-form-wrapper"
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <StepIndicator current={1} />

        <div className="booking-step">
          <div className="form-fields">
            <div className="form-row">
              <div className="form-group">
                <label><FaDog /> Prénom du chien *</label>
                <input type="text" value={form.dogName} onChange={e => updateForm('dogName', e.target.value)} placeholder="Ex : Max" />
              </div>
              <div className="form-group">
                <label>Race *</label>
                <input type="text" value={form.dogBreed} onChange={e => updateForm('dogBreed', e.target.value)} placeholder="Ex : Golden Retriever" />
              </div>
            </div>

            <div className="form-group half">
              <label>Âge</label>
              <input type="text" value={form.dogAge} onChange={e => updateForm('dogAge', e.target.value)} placeholder="Ex : 3 ans" />
            </div>

            <div className="form-group">
              <label>Besoins particuliers, comportement, santé</label>
              <textarea value={form.specialNeeds} onChange={e => updateForm('specialNeeds', e.target.value)} rows={3} placeholder="Médicaments, allergies, peur des autres chiens, comportement particulier..." />
            </div>

            {error && <div className="form-error">{error}</div>}

            <div className="step-actions">
              <button type="button" className="btn-back" onClick={() => setStep(1)}><FaArrowLeft /> Retour</button>
              <button type="button" className="btn-next" onClick={goNext}>Suivant <FaArrowRight /></button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (step === 3) {
    return (
      <motion.form className="booking-form-wrapper" onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <StepIndicator current={2} />

        <div className="booking-step">
          <div className="form-fields">
            <div className="form-row">
              <div className="form-group">
                <label><FaUser /> Prénom *</label>
                <input type="text" value={form.firstName} onChange={e => updateForm('firstName', e.target.value)} placeholder="Prénom" />
              </div>
              <div className="form-group">
                <label>Nom *</label>
                <input type="text" value={form.lastName} onChange={e => updateForm('lastName', e.target.value)} placeholder="Nom" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaEnvelope /> Email *</label>
                <input type="email" value={form.email} onChange={e => updateForm('email', e.target.value)} placeholder="votre@email.com" />
              </div>
              <div className="form-group">
                <label><FaPhone /> Téléphone *</label>
                <input type="tel" value={form.phone} onChange={e => updateForm('phone', e.target.value)} placeholder="06 12 34 56 78" />
              </div>
            </div>

            <div className="form-group">
              <label>Message complémentaire</label>
              <textarea value={form.message} onChange={e => updateForm('message', e.target.value)} rows={3} placeholder="Questions, informations utiles..." />
            </div>

            <p className="form-notice">
              <FaInfoCircle /> Votre réservation sera enregistrée et confirmée par Émilie sous 24h.
            </p>

            {error && <div className="form-error">{error}</div>}

            <div className="step-actions">
              <button type="button" className="btn-back" onClick={() => setStep(2)} disabled={submitting}><FaArrowLeft /> Retour</button>
              <button type="submit" className="btn-submit" disabled={submitting}>
                {submitting
                  ? <><div className="spinner" /> Envoi en cours...</>
                  : <><FaPaw /> Envoyer la demande</>
                }
              </button>
            </div>
          </div>
        </div>
      </motion.form>
    );
  }

  return (
    <motion.div className="booking-success"
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <div className="success-icon-wrap"><FaCheckCircle /></div>
      <h3>Demande envoyée !</h3>
      <p>Votre demande a bien été enregistrée.<br />Émilie vous contactera sous 24h pour confirmer.</p>

      {selectedRange && (
        <div className="success-recap">
          <div className="recap-row">
            <span>Dates</span>
            <strong>
              {toKey(selectedRange[0]) === toKey(selectedRange[1])
                ? formatDate(selectedRange[0])
                : `${formatDate(selectedRange[0])} → ${formatDate(selectedRange[1])}`
              }
            </strong>
          </div>
          <div className="recap-row">
            <span>Animal</span>
            <strong>{form.dogName} — {form.dogBreed}</strong>
          </div>
          <div className="recap-row">
            <span>Prestation</span>
            <strong>{SERVICE_OPTIONS.find(s => s.value === form.serviceType)?.label}</strong>
          </div>
          <div className="recap-row">
            <span>Contact</span>
            <strong>{form.email}</strong>
          </div>
        </div>
      )}

      <button className="btn-next" onClick={reset}>Faire une nouvelle réservation</button>
    </motion.div>
  );
};

export default BookingCalendar;
