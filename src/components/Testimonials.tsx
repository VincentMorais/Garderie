// src/components/Testimonials.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaGoogle, FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa';
import './Testimonials.css';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  visited: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jean Maisonobe",
    rating: 5,
    date: "il y a 5 mois",
    comment: "Bonjour à tous, Après avoir récupérer un malinois battu à la SPA ma famille et moi sommes partis…",
    visited: "Visité en février"
  },
  {
    id: 2,
    name: "Jo Scardo",
    rating: 5,
    date: "il y a 2 mois",
    comment: "Très bonne expérience ! Ma chienne a été choyé et s'est tout de suite senti à l'aise. Emilie est sérieuse, attentionné et fiable. Je recommande sans hésiter !",
    visited: "Visité en juin"
  },
  {
    id: 3,
    name: "Sarah Ash",
    rating: 5,
    date: "il y a 2 mois",
    comment: "Émilie a été exceptionnel avec mes filles. 2 bully pocket qui ont du mal à trouver une bonne dog sitter. Photo vidéo tous les jours. Super attentionné vraiment je recommande et la reprendrais encore et encore pour mes filles. Merci encore pour mes bébés !!",
    visited: "Visité en juin"
  },
  {
    id: 4,
    name: "Nathanaelle Eliscar",
    rating: 5,
    date: "il y a 2 mois",
    comment: "Émilie s'est occupé de mon chien à deux reprises et il a vraiment passé un bon moment. Elle est super réactive, patiente et disponible. Je recommande fortement ses services et ferai appel très souvent !",
    visited: "Visité en mai"
  },
  {
    id: 5,
    name: "Madu Felicia",
    rating: 5,
    date: "il y a 3 mois",
    comment: "Une vrai pépite Elle envoie des petits photos et vidéos magnifiques pendant l séjour de mon…",
    visited: "Visité en mai"
  },
  {
    id: 6,
    name: "M. Chevet",
    rating: 5,
    date: "il y a 5 mois",
    comment: "Mochi a passé presque deux semaines chez Émilie et j'ai eu des nouvelles tous les jours. Je l'ai retrouvé en bonne santé, calme et câline. Merci !",
    visited: "Visité en mars"
  },
  {
    id: 7,
    name: "Anne CHHIM",
    rating: 5,
    date: "il y a 5 mois",
    comment: "Emilie, c'est très bien occupée de notre Brooklyn. Très professionnelle, arrangeante et réactive, Emilie nous a donné des nouvelles tout au long du séjour. Nous avons toute confiance et recommandons a 100%.",
    visited: "Visité en mars"
  },
  {
    id: 8,
    name: "Tiziana La Bella",
    rating: 5,
    date: "il y a 7 mois",
    comment: "Émilie s'est occupée de notre chienne, Berger Australien, pendant 13 jours pendant les vacances de Noël. Pour elle, c'était comme une colonie de vacances : elle…",
    visited: "Visité en janvier"
  },
  {
    id: 9,
    name: "Claude LEOPOLD",
    rating: 5,
    date: "il y a 10 mois",
    comment: "J'ai fait appel à Emilie qui a gardé mon bouledogue français pendant deux semaines. Grâce à elle, j'ai pu partir rassurée, tranquillisée. C'est une vraie…",
    visited: "Visité en octobre 2024"
  },
  {
    id: 10,
    name: "Alexandre BEMPOSTA",
    rating: 5,
    date: "il y a un an",
    comment: "Je recommande à 100% ! Ça fait plusieurs fois que nous laissons à Emilie la garde de Lily notre Golden…",
    visited: "Visité en novembre 2023"
  },
  {
    id: 11,
    name: "Caroline A.",
    rating: 5,
    date: "il y a un an",
    comment: "Je suis super contente d'avoir trouvé Émilie, j'ai une petite chienne qui de base avait peur des autres chiens mais depuis qu'elle va chez Émilie elle n'a plus…",
    visited: "Visité en octobre 2023"
  },
  {
    id: 12,
    name: "Grégory LOUIS",
    rating: 4,
    date: "il y a 4 mois",
    comment: "Ça fait déjà deux fois que ma chienne est gardée là-bas et tout se passe bien. Je reçois régulièrement des vidéos de ma chienne pendant sa garde.",
    visited: "Visité en avril"
  },
  {
    id: 13,
    name: "Diego Martinez",
    rating: 5,
    date: "il y a un an",
    comment: "Émilie a gardé mon chien pendant presque 4 semaines. Elle s'en est très bien occupé. L'endroit de garder est idéal puisqu'il y a un très grand jardin à côté où…",
    visited: "Visité en août 2024"
  },
  {
    id: 14,
    name: "R K",
    rating: 5,
    date: "il y a 7 mois",
    comment: "Je recommande vivement Émilie, très professionnelle, agréable et réactive. Elle m'a envoyé des nouvelles et photos de façon quotidienne. Notre petit chien a été chouchouté pendant son séjour. Un grand merci à Emilie et Maxence",
    visited: "Visité en décembre 2024"
  },
  {
    id: 15,
    name: "Jeanfrancois Wegeler",
    rating: 5,
    date: "il y a 10 mois",
    comment: "Super, elle a gardé mes chiens dont un a eu un problème de santé. Elle s'en est occupée la emmener au vétérinaire. Elle envoie des vidéos des chiens garder toute la journée.tres pro Franchement au top!",
    visited: "Visité en septembre 2024"
  },
  {
    id: 16,
    name: "Laura Miravet",
    rating: 5,
    date: "il y a un an",
    comment: "Je suis très contente, merci beaucoup d'avoir accueilli Brooklyn et de l'avoir traitée tellement bien ! Je recommande 100%.",
    visited: "Visité en décembre 2023"
  },
  {
    id: 17,
    name: "Alicia Ulry",
    rating: 5,
    date: "il y a un an",
    comment: "J'ai laissé mon Jack Russell avec Emilie pendant quelques jours et tous s'est très bien passé. J'ai reçu des photos et vidéos tous les jours. Émilie s'adapte à…",
    visited: "Visité en mai 2024"
  },
  {
    id: 18,
    name: "Catherine Tournier",
    rating: 5,
    date: "il y a 11 mois",
    comment: "Emilie est très gentille et a une passion pour les animaux. Elle s'est toujours très bien occupée de mon Lipton même avec ses traitements de médicaments. Quand…",
    visited: "Visité en septembre 2024"
  },
  {
    id: 19,
    name: "Deborah LEGER",
    rating: 5,
    date: "il y a un an",
    comment: "Émilie est très gentille et s'est super bien occupée de ma petite Nova qui s'est sentie très bien avec elle. Elle les aime tous beaucoup et ça se voit, elle est…",
    visited: "Visité en avril 2024"
  },
  {
    id: 20,
    name: "Chloé Rouganne",
    rating: 5,
    date: "il y a un an",
    comment: "Nous avons laissé Sophie avec Emilie pendant une semaine. Tout s'est très bien passé: des nouvelles tous les jours avec photos et videos: promenades, siestes…",
    visited: "Visité en avril 2024"
  },
  {
    id: 21,
    name: "Cheyenne ENES",
    rating: 5,
    date: "il y a un an",
    comment: "Merci Émilie de vous être si bien occupée de Cheyenne pendant ces deux semaines.",
    visited: "Visité en juillet 2024"
  },
  {
    id: 22,
    name: "Mohamed SARRE",
    rating: 5,
    date: "il y a un an",
    comment: "J'ai eu la chance de rencontrer Émilie qui a pris grand soin de mes lapins Kami et Tigrou et me les garde régulièrement. Elle est gentille et consciencieuse, envoie régulièrement des photos / vidéos en guise de nouvelles. Je la recommande.",
    visited: "Visité en avril 2024"
  },
  {
    id: 23,
    name: "Michel Mélanie",
    rating: 5,
    date: "il y a 9 mois",
    comment: "Émilie est une personne de confiance, professionnelle et très arrangeante. Je ferais de nouveau appel à elle en cas de besoin et je la recommande vivement.",
    visited: "Visité en novembre 2024"
  },
  {
    id: 24,
    name: "Anouchik Sarkissian",
    rating: 5,
    date: "il y a un an",
    comment: "Émilie s'est très bien occupée de Caramel ! Elle adore les chiens et cela se sent.",
    visited: "Visité en décembre 2023"
  },
  {
    id: 25,
    name: "Agnès ARREOU",
    rating: 5,
    date: "il y a un an",
    comment: "Merci Emilie de vous être si bien occupée de Chapitre ! J ai pu apprécier votre implication et votre professionnalisme. Je recommande Emilie avec laquelle j étais en parfaite confiance pour lui confier mes clés et mon chat. Un grand merci !",
    visited: "Visité en avril 2024"
  },
  {
    id: 26,
    name: "Olivier Galland",
    rating: 5,
    date: "il y a un an",
    comment: "Quelle professionnelle formidable. Avec Émilie on se sent en toute confiance. On a retrouvé Marius au…",
    visited: "Visité en mars 2024"
  },
  {
    id: 27,
    name: "Chrystelle Galley",
    rating: 5,
    date: "il y a un an",
    comment: "Toujours un plaisir pour mon beagle d'être gardé par Émilie et beaucoup de tranquillité pour nous.",
    visited: "Visité en décembre 2023"
  },
  {
    id: 28,
    name: "Claire Demolliens",
    rating: 5,
    date: "il y a un an",
    comment: "Très bonne expérience avec ma petite chienne . Je recommande vivement ! À bientôt et merci pour tout 🤗",
    visited: "Visité en décembre 2023"
  },
  {
    id: 29,
    name: "Aglaé P",
    rating: 5,
    date: "il y a un an",
    comment: "Émilie s'occupe très bien de mon lapin, donne toujours des nouvelles et est très disponible ! Merci beaucoup, Émilie !",
    visited: "Visité en novembre 2023"
  },
  {
    id: 30,
    name: "Xinmeng Li",
    rating: 5,
    date: "il y a un an",
    comment: "Très bien! Mon bébé a passé un bon moment pendant mon absence. Je recommande!",
    visited: "Visité en novembre 2023"
  },
  {
    id: 31,
    name: "Morgane Chanat",
    rating: 5,
    date: "il y a un an",
    comment: "Humaine avant tout, ça fait plaisir de voir des gens professionnels mais également humains dans ce métier !! Je la recommande fortement !!",
    visited: "Visité en novembre 2023"
  },
  {
    id: 32,
    name: "Guise Ptit",
    rating: 5,
    date: "il y a un an",
    comment: "Merci Émilie de vous ete bien occupée de Stella…",
    visited: "Visité en août 2024"
  },
  {
    id: 33,
    name: "Dimitri Ambrosi",
    rating: 5,
    date: "il y a un an",
    comment: "Service super, des retours en vidéo tout les jours et mon chien super heureux.",
    visited: "Visité en février 2024"
  },
  {
    id: 34,
    name: "Christian Alam",
    rating: 5,
    date: "il y a un an",
    comment: "Meilleure pet sitter en France ! Je recommande fortement.",
    visited: "Visité en novembre 2023"
  },
  {
    id: 35,
    name: "Spasic Paola Melita",
    rating: 5,
    date: "il y a un an",
    comment: "Excellente pédagogue pour chiens, présente, aimante et professionnelle",
    visited: "Visité en novembre 2023"
  },
  {
    id: 36,
    name: "Nithujana Kanesu",
    rating: 5,
    date: "il y a un an",
    comment: "Une équipe au top 👌🏾 je vous recommande à 100%.",
    visited: "Visité en novembre 2023"
  }
];

const INITIAL_COUNT = 3;

const avgRating = (
  testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
).toFixed(1);

const Testimonials: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? testimonials : testimonials.slice(0, INITIAL_COUNT);

  return (
    <section className="testimonials-section">
      <div className="container">

        {/* Résumé compact */}
        <motion.div
          className="reviews-summary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="reviews-score-block">
            <span className="reviews-score-number">{avgRating}</span>
            <div className="reviews-score-right">
              <div className="reviews-stars">
                {[1, 2, 3, 4, 5].map(i => <FaStar key={i} className="star" />)}
              </div>
              <span className="reviews-count">{testimonials.length} avis Google</span>
            </div>
          </div>
          <div className="reviews-google-logo">
            <FaGoogle />
            <span>Google</span>
          </div>
        </motion.div>

        {/* Grille */}
        <div className="testimonials-grid">
          <AnimatePresence initial={false}>
            {visible.map((testimonial, index) => (
              <motion.div
                className="testimonial-card"
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: index < INITIAL_COUNT ? 0 : (index - INITIAL_COUNT) * 0.04 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="testimonial-header">
                  <div className="client-info">
                    <h4>{testimonial.name}</h4>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star" />
                      ))}
                    </div>
                  </div>
                  <span className="testimonial-date">{testimonial.date}</span>
                </div>

                <div className="testimonial-content">
                  <FaQuoteLeft className="quote-icon" />
                  <p>{testimonial.comment}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="reviews-actions">
          <button
            className="btn-expand"
            onClick={() => setExpanded(e => !e)}
          >
            {expanded ? (
              <><FaChevronUp /> Voir moins</>
            ) : (
              <><FaChevronDown /> Voir les {testimonials.length - INITIAL_COUNT} autres avis</>
            )}
          </button>
          <button
            className="btn-google-cta"
          >
            <FaGoogle /> Tous les avis Google <FaExternalLinkAlt />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
