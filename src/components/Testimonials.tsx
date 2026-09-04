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
    name: "Metho 91",
    rating: 5,
    date: "il y a 2 mois",
    comment: "Une pension exceptionnelle que je recommande les yeux fermés ! Ma chienne y est toujours merveilleusement bien gardée et choyée. Ma chienne a vécu des traumatismes et ils prennent le temps de gérer tout ça…",
    visited: "Visité en juin"
  },
  {
    id: 2,
    name: "Jean Maisonobe",
    rating: 5,
    date: "il y a un an",
    comment: "Bonjour à tous, Après avoir récupérer un malinois battu à la SPA ma famille et moi sommes partis en vacances. Quel bonheur ce fut de trouver Emilie. En effet elle a gardé notre petit Canou et en a pris le plus grand soin (photos à l'appuie). Enfin une vrai professionnelle merci car c'est toujours dur et anxiogène de laisser son animal à quelqu'un, mais dans ce cas, aucun risque, je vous recommande vivement ces services. Un grand merci à vous et votre compagnon pour le soin apporter à mon chien.",
    visited: "Visité en février 2025"
  },
  {
    id: 3,
    name: "Marie-josée Plante",
    rating: 5,
    date: "il y a 5 mois",
    comment: "Mes chiens Lily et Sirius se sont fait garder ici durant notre séjour à l'étranger. Émilie a été très attentionnée de nos deux chiens, a su faire preuve de beaucoup de patience avec eux sachant que mes deux chiens sont des pestes par moments…",
    visited: "Visité en mars"
  },
  {
    id: 4,
    name: "Laurence Solin",
    rating: 5,
    date: "il y a 9 mois",
    comment: "Absente une très longue journée j'ai pu confier mes deux chiennes à Émilie pour qu'elles les sorte au moins une fois de chez moi. Au final elles ont été sorties trois fois, on eu à manger et même la minette qui n'aime pas les inconnus à…",
    visited: "Visité en novembre 2025"
  },
  {
    id: 5,
    name: "Nicolas PLISSONNIER",
    rating: 5,
    date: "il y a 3 mois",
    comment: "J'ai laissé mon berger australien de 14 ans chez Emilie pour une nuit et tout s'est très bien passé. Emilie est à l'écoute et s'occupe très bien de nos animaux.",
    visited: "Visité en mai"
  },
  {
    id: 6,
    name: "Dan Le foll",
    rating: 5,
    date: "il y a 5 mois",
    comment: "Une première avec Émilie pour rendre visite à mon domicile et s'occuper de mes deux filles Staff... durant 5 jours cela c'est très bien passé...",
    visited: "Visité en mars"
  },
  {
    id: 7,
    name: "Caroline A.",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Je suis super contente d'avoir trouvé Émilie, j'ai une petite chienne qui de base avait peur des autres chiens mais depuis qu'elle va chez Émilie elle n'a plus peur. Il y a toujours d'autres chiens avec qui elle peut jouer, c'est comme une…",
    visited: "Visité en octobre 2023"
  },
  {
    id: 8,
    name: "Alexandre BEMPOSTA",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Je recommande à 100% ! Ça fait plusieurs fois que nous laissons à Emilie la garde de Lily notre Golden retriever de 3 ans, et ça se passe à merveille…",
    visited: "Visité en novembre 2023"
  },
  {
    id: 9,
    name: "Annick Mayenne",
    rating: 5,
    date: "il y a 7 mois",
    comment: "Je fais garder ma chienne depuis 2 ans par Emilie et je suis ravie. Elle est adorable, disponible et je donne ma chienne en toute confiance. Un grand merci !!",
    visited: "Visité en décembre 2025"
  },
  {
    id: 10,
    name: "Elisabetta Scarcelli",
    rating: 5,
    date: "il y a 3 mois",
    comment: "Très gentille et disponible, Emilie s'occupe de notre chien avec le plus grand soin et attention. Très recommandée.",
    visited: "Visité en mai"
  },
  {
    id: 11,
    name: "Caroline MELARA",
    rating: 5,
    date: "il y a 8 mois",
    comment: "Merci à Émilie pour la garde de notre loulou. Urhük s'est vite adapté grâce à toute l'attention qui lui a été offerte. Malgré sa sensibilité, Emilie l'a fait se sentir comme à la maison. Merci pour lui, et nous laisserons sans problème notre chien pour une prochaine garde.",
    visited: "Visité en décembre 2025"
  },
  {
    id: 12,
    name: "Madu Felicia",
    rating: 5,
    date: "il y a un an",
    comment: "Une vrai pépite Elle envoie des petits photos et vidéos magnifiques pendant l séjour de mon…",
    visited: "Visité en mai 2025"
  },
  {
    id: 13,
    name: "Laura Miravet",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Je suis très contente, merci beaucoup d'avoir accueilli Brooklyn et de l'avoir traitée tellement bien ! Je recommande 100%. J'ai reçu des vidéos et des photos tous les jours : communication et gentillesse au top. On reviendra :)",
    visited: "Visité en décembre 2023"
  },
  {
    id: 14,
    name: "Claude LEOPOLD",
    rating: 5,
    date: "il y a un an",
    comment: "J'ai fait appel à Emilie qui a gardé mon bouledogue français pendant deux semaines. Grâce à elle, j'ai pu partir rassurée, tranquillisée. C'est une vraie professionnelle et je savais que mon chien était en sécurité avec elle. Je la recommande et n'hésiterai pas à faire à nouveau appel à ses services. Merci.",
    visited: "Visité en octobre 2024"
  },
  {
    id: 15,
    name: "Diego Martinez",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Émilie a gardé mon chien pendant presque 4 semaines. Elle s'en est très bien occupé. L'endroit de garder est idéal puisqu'il y a un très grand jardin à côté où elle peut laisser les chiens se promener. Elle m'a envoyé des photos et des vidéos de mon chien chaque jour. Je recommande fortement.",
    visited: "Visité en août 2024"
  },
  {
    id: 16,
    name: "francis samuel",
    rating: 5,
    date: "il y a 3 mois",
    comment: "Très bon accueil de notre chien. Des promenades avec des copains, des câlins. Top pour lui.",
    visited: "Visité en mai"
  },
  {
    id: 17,
    name: "R K",
    rating: 5,
    date: "il y a un an",
    comment: "Je recommande vivement Émilie, très professionnelle, agréable et réactive. Elle m'a envoyé des nouvelles et photos de façon quotidienne. Notre petit chien a été chouchouté pendant son séjour. Un grand merci à Emilie et Maxence",
    visited: "Visité en décembre 2024"
  },
  {
    id: 18,
    name: "Jo Scardo",
    rating: 5,
    date: "il y a un an",
    comment: "Très bonne expérience ! Ma chienne a été choyé et s'est tout de suite senti à l'aise. Emilie est sérieuse, attentionné et fiable. Je recommande sans hésiter !",
    visited: "Visité en juin 2025"
  },
  {
    id: 19,
    name: "Emy",
    rating: 5,
    date: "il y a 7 mois",
    comment: "Je suis très contente, Fifou a passé une très bonne soirée et j'espère qu'il passera plein d'autres soirées chez vous 😀😀😀 Émilie est à l'écoute et a su s'occuper de Fifou parfaitement malgré son gros gabarit et son côté peut-être un peu impressionnant, tout s'est très bien passé, merci beaucoup, à très vite…",
    visited: "Visité en janvier"
  },
  {
    id: 20,
    name: "Sarah Ash",
    rating: 5,
    date: "il y a un an",
    comment: "Émilie a été exceptionnel avec mes filles. 2 bully pocket qui ont du mal à trouver une bonne dog sitter. Photo vidéo tous les jours. Super attentionné vraiment je recommande et la reprendrais encore et encore pour mes filles. Merci encore pour mes bébés !!",
    visited: "Visité en juin 2025"
  },
  {
    id: 21,
    name: "Tiziana La Bella",
    rating: 5,
    date: "il y a un an",
    comment: "Émilie s'est occupée de notre chienne, Berger Australien, pendant 13 jours pendant les vacances de Noël. Pour elle, c'était comme une colonie de vacances : elle s'est fait de nouveaux amis, elle a joué et a été choyée. Nous sommes toujours…",
    visited: "Visité en janvier 2025"
  },
  {
    id: 22,
    name: "colin Nguyen",
    rating: 5,
    date: "il y a 7 mois",
    comment: "Émilie s'est très bien occupé de ma malinois Roswell, la semaine s'est très bien déroulée, photos et vidéos quasiment tous les jours. Je recommande 😁",
    visited: "Visité en décembre 2025"
  },
  {
    id: 23,
    name: "Alicia Ulry",
    rating: 5,
    date: "il y a 2 ans",
    comment: "J'ai laissé mon Jack Russell avec Emilie pendant quelques jours et tout s'est très bien passé. J'ai reçu des photos et vidéos tous les jours. Émilie s'adapte à chacun de ses nouveaux résidents et cela fait toute la différence. Je recommande et laisserai Naya à nouveau avec Emilie sans hésitation ! Merci beaucoup",
    visited: "Visité en mai 2024"
  },
  {
    id: 24,
    name: "Nathanaelle Eliscar",
    rating: 5,
    date: "il y a un an",
    comment: "Émilie s'est occupé de mon chien à deux reprises et il a vraiment passé un bon moment. Elle est super réactive, patiente et disponible. Je recommande fortement ses services et ferai appel très souvent !",
    visited: "Visité en mai 2025"
  },
  {
    id: 25,
    name: "Chloé Rouganne",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Nous avons laissé Sophie avec Emilie pendant une semaine. Tout s'est très bien passé : des nouvelles tous les jours avec photos et vidéos : promenades, siestes et chiens chouchoutés ! Emilie est passionnée et saisit très rapidement les…",
    visited: "Visité en avril 2024"
  },
  {
    id: 26,
    name: "Catherine Tournier",
    rating: 5,
    date: "il y a un an",
    comment: "Emilie est très gentille et a une passion pour les animaux. Elle s'est toujours très bien occupée de mon Lipton même avec ses traitements de médicaments. Quand il s'est blessé une fois elle m'a prévenue tout de suite. Elle envoie des photos…",
    visited: "Visité en septembre 2024"
  },
  {
    id: 27,
    name: "Jeanfrancois Wegeler",
    rating: 5,
    date: "il y a un an",
    comment: "Super, elle a gardé mes chiens dont un a eu un problème de santé. Elle s'en est occupée, l'a emmené au vétérinaire. Elle envoie des vidéos des chiens gardés toute la journée. Très pro, franchement au top !",
    visited: "Visité en septembre 2024"
  },
  {
    id: 28,
    name: "lau lau",
    rating: 5,
    date: "il y a 3 semaines",
    comment: "Bonjour Émilie, Suite à votre commentaire en réponse à mon premier message, nous souhaitons…",
    visited: "Visité en juillet"
  },
  {
    id: 29,
    name: "Mohamed SARRE",
    rating: 5,
    date: "il y a 2 ans",
    comment: "J'ai eu la chance de rencontrer Émilie qui a pris grand soin de mes lapins Kami et Tigrou et me les garde régulièrement. Elle est gentille et consciencieuse, envoie régulièrement des photos / vidéos en guise de nouvelles. Je la recommande.",
    visited: "Visité en avril 2024"
  },
  {
    id: 30,
    name: "Anne CHHIM",
    rating: 5,
    date: "il y a un an",
    comment: "Emilie, c'est très bien occupée de notre Brooklyn. Très professionnelle, arrangeante et réactive, Emilie nous a donné des nouvelles tout au long du séjour. Nous avons toute confiance et recommandons a 100%. Encore merci.",
    visited: "Visité en mars 2025"
  },
  {
    id: 31,
    name: "Deborah LEGER",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Émilie est très gentille et s'est super bien occupée de ma petite Nova qui s'est sentie très bien avec elle. Elle les aime tous beaucoup et ça se voit, elle est très investie, les chiens sont souvent dehors en plus donc c'est top et elle envoie beaucoup de nouvelles. Merci encore !",
    visited: "Visité en avril 2024"
  },
  {
    id: 32,
    name: "Anouchik Sarkissian",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Émilie s'est très bien occupée de Caramel ! Elle adore les chiens et cela se sent. C'est une personne professionnelle et qui sait comment se comporter avec les…",
    visited: "Visité en décembre 2023"
  },
  {
    id: 33,
    name: "M. Chevet",
    rating: 5,
    date: "il y a un an",
    comment: "Mochi a passé presque deux semaines chez Émilie et j'ai eu des nouvelles tous les jours. Je l'ai retrouvé en bonne santé, calme et câline. Merci !",
    visited: "Visité en mars 2025"
  },
  {
    id: 34,
    name: "Cheyenne ENES",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Merci Émilie de vous être si bien occupée de Cheyenne pendant ces deux semaines. J'ai eu des nouvelles tous les jours (messages, photos et vidéos), et j'ai pu…",
    visited: "Visité en juillet 2024"
  },
  {
    id: 35,
    name: "Agnès ARREOU",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Merci Emilie de vous être si bien occupée de Chapitre ! J'ai pu apprécier votre implication et votre professionnalisme. Je recommande Emilie avec laquelle j'étais en parfaite confiance pour lui confier mes clés et mon chat. Un grand merci !",
    visited: "Visité en avril 2024"
  },
  {
    id: 36,
    name: "Michel Mélanie",
    rating: 5,
    date: "il y a un an",
    comment: "Émilie est une personne de confiance, professionnelle et très arrangeante. Je ferais de nouveau appel à elle en cas de besoin et je la recommande vivement.",
    visited: "Visité en novembre 2024"
  },
  {
    id: 37,
    name: "Grégory LOUIS",
    rating: 4,
    date: "il y a un an",
    comment: "Ça fait déjà deux fois que ma chienne est gardée là-bas et tout se passe bien. Je reçois régulièrement des vidéos de ma chienne pendant sa garde.",
    visited: "Visité en avril 2025"
  },
  {
    id: 38,
    name: "Olivier Galland",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Quelle professionnelle formidable. Avec Émilie on se sent en toute confiance. On a retrouvé Marius après une semaine dans une forme extraordinaire. Encore merci Émilie.",
    visited: "Visité en mars 2024"
  },
  {
    id: 39,
    name: "Chrystelle Galley",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Toujours un plaisir pour mon beagle d'être gardé par Émilie et beaucoup de tranquillité pour nous. Émilie adore les animaux et ça se sent. N'hésitez pas, elle est adorable.",
    visited: "Visité en décembre 2023"
  },
  {
    id: 40,
    name: "Ma Rine",
    rating: 5,
    date: "il y a 10 mois",
    comment: "Emilie donne tous les jours des nouvelles. Elle a gardé Bobby plusieurs fois sans soucis.",
    visited: "Visité en octobre 2025"
  },
  {
    id: 41,
    name: "Claire Demolliens",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Très bonne expérience avec ma petite chienne. Je recommande vivement ! À bientôt et merci pour tout 🤗",
    visited: "Visité en décembre 2023"
  },
  {
    id: 42,
    name: "Aglaé P",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Émilie s'occupe très bien de mon lapin, donne toujours des nouvelles et est très disponible ! Merci beaucoup, Émilie !",
    visited: "Visité en novembre 2023"
  },
  {
    id: 43,
    name: "Xinmeng Li",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Très bien ! Mon bébé a passé un bon moment pendant mon absence. Je recommande !",
    visited: "Visité en novembre 2023"
  },
  {
    id: 44,
    name: "Morgane Chanat",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Humaine avant tout, ça fait plaisir de voir des gens professionnels mais également humains dans ce métier !! Je la recommande fortement !!",
    visited: "Visité en novembre 2023"
  },
  {
    id: 45,
    name: "Dimitri Ambrosi",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Service super, des retours en vidéo tous les jours et mon chien super heureux.",
    visited: "Visité en février 2024"
  },
  {
    id: 46,
    name: "Christian Alam",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Meilleure pet sitter en France ! Je recommande fortement.",
    visited: "Visité en novembre 2023"
  },
  {
    id: 47,
    name: "Guise Ptit",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Merci Émilie de vous être si bien occupée de Stella. Je recommande vivement, les yeux fermés.",
    visited: "Visité en août 2024"
  },
  {
    id: 48,
    name: "Spasic Paola Melita",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Excellente pédagogue pour chiens, présente, aimante et professionnelle.",
    visited: "Visité en novembre 2023"
  },
  {
    id: 49,
    name: "Nithujana Kanesu",
    rating: 5,
    date: "il y a 2 ans",
    comment: "Une équipe au top 👌🏾 je vous recommande à 100%.",
    visited: "Visité en novembre 2023"
  },
  {
    id: 50,
    name: "Redha Afafsa",
    rating: 2,
    date: "il y a un an",
    comment: "Il n'y a aucun espace de vie dans l'appartement pour les chiens. Le balai n'est pas une méthode d'apprentissage ni les cages, crier constamment sur eux n'est pas la bonne méthode. Garder 6 chiens dans 1 petite pièce, c'est un peu juste.",
    visited: "Visité en avril 2025"
  },
  {
    id: 51,
    name: "Leslie Peace",
    rating: 1,
    date: "il y a 2 ans",
    comment: "Je compte porter plainte pour mauvais traitement ! Mon chien s'est blessé deux fois suite à deux gardes chez elle ! Une fois opération et la deuxième il revient avec une blessure dans l'œil ! 1000€ de frais engagés ! Elle m'a bloqué pour ne pas assumer ses responsabilités.",
    visited: "Visité en septembre 2024"
  }
];

const INITIAL_COUNT = 3;

const avgRating = "4.8";

const Testimonials: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? testimonials : testimonials.slice(0, INITIAL_COUNT);

  return (
    <section className="testimonials-section">
      <div className="container">

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
          <a
            href="https://www.google.com/maps?cid=291069812912529692"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-google-cta"
          >
            <FaGoogle /> Tous les avis Google <FaExternalLinkAlt />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
