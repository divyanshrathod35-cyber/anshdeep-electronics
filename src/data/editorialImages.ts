import type { Artwork } from './catalog';

/**
 * Editorial imagery from individual Pexels free-photo listings.
 * These are NOT showroom photographs, verified products, or evidence of inventory.
 * Pexels license: https://www.pexels.com/license/
 *
 * Photographer/source attribution is retained here even though the base Pexels
 * licence does not require a public credit. Do not imply brand endorsement.
 */
type EditorialPhoto = {
  id: number;
  description: string;
  page: string;
  photographer: string;
  position: string;
};

export const photos: Record<Artwork, EditorialPhoto> = {
  ac: {
    id: 16914846,
    description: 'Wall-mounted air conditioning equipment against a building exterior',
    page: 'https://www.pexels.com/photo/air-conditioner-at-the-buildings-corner-16914846/',
    photographer: 'Mak_ jp',
    position: 'center 43%',
  },
  tv: {
    id: 7587865,
    description: 'A modern room featuring a wall-mounted flat-screen television',
    page: 'https://www.pexels.com/photo/a-spacious-living-room-with-couch-and-flat-screen-television-on-the-wall-7587865/',
    photographer: 'Max Vakhtbovych',
    position: 'center 47%',
  },
  phone: {
    id: 9403822,
    description: 'A modern smartphone against a minimal background',
    page: 'https://www.pexels.com/photo/close-up-shot-of-a-smartphone-9403822/',
    photographer: 'Atharva Whaval',
    position: 'center 42%',
  },
  fridge: {
    id: 8805274,
    description: 'Open refrigerator in a contemporary kitchen',
    page: 'https://www.pexels.com/photo/a-woman-opening-a-fridge-8805274/',
    photographer: 'Mike Jones',
    position: 'center 46%',
  },
  washer: {
    id: 8142971,
    description: 'Front-loading washing machine in a light modern bathroom',
    page: 'https://www.pexels.com/photo/washing-machine-in-a-comfort-room-8142971/',
    photographer: 'Max Vakhtbovych',
    position: 'center 53%',
  },
  purifier: {
    id: 8054764,
    description: 'Household using a drinking-water filter jug',
    page: 'https://www.pexels.com/photo/mother-and-daughter-pouring-water-from-filter-jug-8054764/',
    photographer: 'Annushka Ahuja',
    position: 'center 45%',
  },
  speaker: {
    id: 15670390,
    description: 'Close-up loudspeaker on a wooden surface',
    page: 'https://www.pexels.com/photo/a-speaker-on-a-wooden-surface-15670390/',
    photographer: 'Norman Balian',
    position: 'center 50%',
  },
  laptop: {
    id: 25636747,
    description: 'A modern laptop on a minimalist wooden desk',
    page: 'https://www.pexels.com/photo/laptop-on-a-wooden-desk-25636747/',
    photographer: 'Jakub Zerdzicki',
    position: 'center 55%',
  },
};

export function editorialUrl(id: number, width: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${Math.round(width * 0.72)}&fit=crop`;
}
