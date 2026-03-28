import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, Reservation } from '../lib/supabase';
import './AdminDashboard.css';

const SERVICE_LABELS: Record<string, string> = {
  journee: 'Garde journalière',
  demi_journee: 'Demi-journée',
  soiree: 'Soirée',
  promenade: 'Promenade',
  nac: 'NAC',
  visite_chat: 'Visite de chat',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
};

type FilterType = 'all' | 'pending' | 'confirmed' | 'cancelled';

const AdminDashboard: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [actionLoading, setActionLoading] = useState<{ id: string; status: string } | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchReservations = useCallback(async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setReservations(data as Reservation[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setAuthChecked(true);
        fetchReservations();
      }
    });
  }, [navigate, fetchReservations]);

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6fa' }}>
        <p style={{ color: '#888', fontSize: '1rem' }}>Vérification...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const updateStatus = async (id: string, status: string) => {
    setActionLoading({ id, status });
    setActionError(null);
    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id);

    if (error) {
      setActionError('Erreur lors de la mise à jour. Veuillez réessayer.');
    } else {
      setReservations(prev =>
        prev.map(r => r.id === id ? { ...r, status } : r)
      );
    }
    setActionLoading(null);
  };

  const filtered = reservations.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const counts = {
    all: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatCreatedAt = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <span className="admin-header-logo">🐾</span>
          <div>
            <h1>Administration</h1>
            <p>Le Monde Des Chiens Et Des Nacs</p>
          </div>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </header>

      <div className="admin-content">
        <div className="admin-stats">
          <div className="stat-card">
            <span className="stat-number">{counts.all}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-number">{counts.pending}</span>
            <span className="stat-label">En attente</span>
          </div>
          <div className="stat-card confirmed">
            <span className="stat-number">{counts.confirmed}</span>
            <span className="stat-label">Confirmées</span>
          </div>
          <div className="stat-card cancelled">
            <span className="stat-number">{counts.cancelled}</span>
            <span className="stat-label">Annulées</span>
          </div>
        </div>

        <div className="admin-filters">
          {(['all', 'pending', 'confirmed', 'cancelled'] as FilterType[]).map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''} ${f}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Toutes' : STATUS_LABELS[f]}
              <span className="filter-count">{counts[f]}</span>
            </button>
          ))}
        </div>

        {actionError && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 16px', borderRadius: 8, marginBottom: 12 }}>
            {actionError}
          </div>
        )}

        {loading ? (
          <div className="admin-loading">Chargement des réservations...</div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">Aucune réservation {filter !== 'all' ? STATUS_LABELS[filter].toLowerCase() : ''}</div>
        ) : (
          <div className="reservations-list">
            {filtered.map(r => (
              <div key={r.id} className={`reservation-card status-${r.status}`}>
                <div className="res-header">
                  <div className="res-client">
                    <h3>{r.first_name} {r.last_name}</h3>
                    <span className={`status-badge ${r.status}`}>
                      {STATUS_LABELS[r.status || 'pending']}
                    </span>
                  </div>
                  <span className="res-date-created">{formatCreatedAt(r.created_at)}</span>
                </div>

                <div className="res-body">
                  <div className="res-section">
                    <h4>Contact</h4>
                    <a href={`tel:${r.phone.replace(/\s/g, '')}`} className="res-contact-link phone">
                      📞 {r.phone}
                    </a>
                    <a href={`mailto:${r.email}`} className="res-contact-link email">
                      ✉️ {r.email}
                    </a>
                  </div>

                  <div className="res-section">
                    <h4>Réservation</h4>
                    <p><strong>Service :</strong> {SERVICE_LABELS[r.service_type] || r.service_type}</p>
                    <p><strong>Dates :</strong> {formatDate(r.start_date)} → {formatDate(r.end_date)}</p>
                  </div>

                  <div className="res-section">
                    <h4>Animal</h4>
                    <p><strong>Nom :</strong> {r.dog_name}</p>
                    {r.dog_breed && <p><strong>Race :</strong> {r.dog_breed}</p>}
                    {r.dog_age && <p><strong>Âge :</strong> {r.dog_age}</p>}
                    <p><strong>Nb :</strong> {r.dog_count} chien{r.dog_count > 1 ? 's' : ''}</p>
                    {r.special_needs && <p><strong>Besoins spéciaux :</strong> {r.special_needs}</p>}
                  </div>

                  {r.message && (
                    <div className="res-section res-message">
                      <h4>Message</h4>
                      <p>{r.message}</p>
                    </div>
                  )}
                </div>

                {r.status === 'pending' && (
                  <div className="res-actions">
                    <button
                      className="action-btn confirm"
                      disabled={actionLoading?.id === r.id && actionLoading?.status === 'confirmed'}
                      onClick={() => updateStatus(r.id!, 'confirmed')}
                    >
                      {actionLoading?.id === r.id && actionLoading?.status === 'confirmed' ? '...' : '✓ Accepter'}
                    </button>
                    <button
                      className="action-btn decline"
                      disabled={actionLoading?.id === r.id && actionLoading?.status === 'cancelled'}
                      onClick={() => updateStatus(r.id!, 'cancelled')}
                    >
                      {actionLoading?.id === r.id && actionLoading?.status === 'cancelled' ? '...' : '✗ Refuser'}
                    </button>
                  </div>
                )}

                {r.status === 'confirmed' && (
                  <div className="res-actions">
                    <button
                      className="action-btn decline"
                      disabled={actionLoading?.id === r.id && actionLoading?.status === 'cancelled'}
                      onClick={() => updateStatus(r.id!, 'cancelled')}
                    >
                      {actionLoading?.id === r.id && actionLoading?.status === 'cancelled' ? '...' : '✗ Annuler'}
                    </button>
                  </div>
                )}

                {r.status === 'cancelled' && (
                  <div className="res-actions">
                    <button
                      className="action-btn confirm"
                      disabled={actionLoading?.id === r.id && actionLoading?.status === 'confirmed'}
                      onClick={() => updateStatus(r.id!, 'confirmed')}
                    >
                      {actionLoading?.id === r.id && actionLoading?.status === 'confirmed' ? '...' : '✓ Rétablir'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
