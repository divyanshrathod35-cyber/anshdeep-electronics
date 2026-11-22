export type Category = 'All' | 'Cooling' | 'Televisions' | 'Mobiles' | 'Home appliances' | 'Kitchen & water' | 'Audio & computing';
export type Artwork = 'ac' | 'tv' | 'phone' | 'fridge' | 'washer' | 'purifier' | 'speaker' | 'laptop';

export interface Interest {
  id: string;
  category: Exclude<Category, 'All'>;
  title: string;
  eyebrow: string;
  description: string;
  brands: string[];
  compareOn: string[];
  artwork: Artwork;
  number: string;
}
export const categories: Category[] = [
  'All', 'Cooling', 'Televisions', 'Mobiles', 'Home appliances', 'Kitchen & water', 'Audio & computing',
];

export const interests: Interest[] = [
  { id: 'inverter-ac', category: 'Cooling', title: 'Inverter air conditioners', eyebrow: '01 / COMFORT', description: 'Find the right tonnage for your room, exposure and daily use.', brands: ['Daikin', 'LG', 'Voltas'], compareOn: ['Tonnage', 'BEE rating', 'Installation scope'], artwork: 'ac', number: '01' },
  { id: 'smart-tv', category: 'Televisions', title: '4K & smart televisions', eyebrow: '02 / ENTERTAINMENT', description: 'Compare screen sizes, panel types and viewing distance.', brands: ['Sony', 'Samsung', 'LG'], compareOn: ['Screen size', 'Panel technology', 'Connectivity'], artwork: 'tv', number: '02' },
  { id: 'smartphone', category: 'Mobiles', title: 'Flagship smartphones', eyebrow: '03 / CONNECTED', description: 'Get clear advice on cameras, battery life and storage.', brands: ['Samsung', 'Apple', 'OnePlus'], compareOn: ['Camera', 'Battery', 'Storage'], artwork: 'phone', number: '03' },
  { id: 'fridge', category: 'Home appliances', title: 'Refrigerators', eyebrow: '04 / EVERYDAY', description: 'Choose the right capacity, configuration and efficiency.', brands: ['LG', 'Samsung', 'Whirlpool'], compareOn: ['Capacity', 'Compressor', 'Energy use'], artwork: 'fridge', number: '04' },
  { id: 'washer', category: 'Home appliances', title: 'Washing machines', eyebrow: '05 / EVERYDAY', description: 'Make sense of front-load, top-load and family capacity.', brands: ['IFB', 'LG', 'Samsung'], compareOn: ['Load capacity', 'Programs', 'Water use'], artwork: 'washer', number: '05' },
  { id: 'water', category: 'Kitchen & water', title: 'Water purifiers', eyebrow: '06 / ESSENTIALS', description: 'Discuss water-source compatibility, filters and service.', brands: ['Livpure', 'Kent', 'Aquaguard'], compareOn: ['Water source', 'Filter type', 'Service plan'], artwork: 'purifier', number: '06' },
  { id: 'audio', category: 'Audio & computing', title: 'Home audio', eyebrow: '07 / EXPERIENCE', description: 'From cinematic soundbars to room-filling listening.', brands: ['Sony', 'Samsung', 'LG'], compareOn: ['Connectivity', 'Room fit', 'Channels'], artwork: 'speaker', number: '07' },
  { id: 'laptop', category: 'Audio & computing', title: 'Laptops & accessories', eyebrow: '08 / PRODUCTIVITY', description: 'Focus on workloads, display quality and portability.', brands: ['Ask showroom'], compareOn: ['Processor', 'Memory', 'Display'], artwork: 'laptop', number: '08' },
];

export function filterInterests(items: Interest[], category: Category, query: string): Interest[] {
  const normalized = query.trim().toLocaleLowerCase('en-IN');
  return items.filter(item => {
    const matchCategory = category === 'All' || category === item.category;
    const haystack = [item.title, item.category, item.description, ...item.brands].join(' ').toLocaleLowerCase('en-IN');
    return matchCategory && (!normalized || haystack.includes(normalized));
  });
}
