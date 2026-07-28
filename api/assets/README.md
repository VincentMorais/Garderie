# Fichiers joints aux emails

Déposer ici **`RIB.pdf`** : il est automatiquement joint à l'email de
confirmation envoyé au client après une demande de réservation
(`api/send-reservation.ts`).

Ce dossier est volontairement **hors de `public/`** pour que le RIB ne soit
pas téléchargeable depuis le site. Il est embarqué dans la fonction serverless
grâce à `includeFiles` dans `vercel.json`.

Si le fichier est absent, l'email part quand même — sans pièce jointe, mais
l'IBAN reste affiché en clair dans le corps du message.
