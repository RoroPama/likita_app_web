/**
 * Calcule le temps écoulé depuis une date donnée
 * @param date - Date de la publication (string, Date, ou timestamp)
 * @returns String formaté du temps écoulé
 */
export const getTimeAgo = (date: string | Date | number): string => {
  try {
    const publishDate = new Date(date);
    const now = new Date();

    if (isNaN(publishDate.getTime())) {
      return "Date invalide";
    }

    const diffInMs = now.getTime() - publishDate.getTime();

    if (diffInMs < 0) {
      return "Dans le futur";
    }

    const diffInSeconds = Math.floor(diffInMs / 1000);

    if (diffInSeconds < 60) {
      return diffInSeconds <= 5 ? "À l'instant" : `Il y a ${diffInSeconds}s`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return diffInMinutes === 1 ? "Il y a 1min" : `Il y a ${diffInMinutes}min`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return diffInHours === 1 ? "Il y a 1h" : `Il y a ${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return diffInDays === 1 ? "Il y a 1 jour" : `Il y a ${diffInDays} jours`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return diffInWeeks === 1
        ? "Il y a 1 semaine"
        : `Il y a ${diffInWeeks} semaines`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return diffInMonths === 1
        ? "Il y a 1 mois"
        : `Il y a ${diffInMonths} mois`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return diffInYears === 1 ? "Il y a 1 an" : `Il y a ${diffInYears} ans`;
  } catch {
    return "Erreur de calcul";
  }
};

export const AbregUserName = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};
