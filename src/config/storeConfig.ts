/**
 * Public business details sourced from the Daikin, IFB and Livpure dealer directories.
 * Sales promises, stock, current pricing and WhatsApp Business activation are NOT verified.
 */
export const store = {
  name: 'Anshdeep Electronics',
  city: 'Rajnandgaon',
  tagline: 'Considered tech. Local expertise.',
  phone: '+919977108780',
  phoneLabel: '99771 08780',
  email: 'anshdeep.electronics@rediffmail.com',
  whatsappNumber: (import.meta.env.VITE_STORE_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  branches: [
    {
      id: 'vip',
      label: 'VIP Road showroom',
      address: 'Beside Khan Nursing Home, VIP Road, Basantpur, Rajnandgaon, Chhattisgarh 491441',
      shortAddress: 'VIP Road, Basantpur',
      lat: 21.086655,
      lng: 81.020668,
    },
    {
      id: 'ge',
      label: 'GE Road location',
      address: 'Opposite New Bus Stand, GE Road, Rajnandgaon, Chhattisgarh 491441',
      shortAddress: 'GE Road, New Bus Stand',
      lat: 21.09631,
      lng: 81.028364,
    },
  ],
  references: {
    daikin: 'https://daikinindia.com/node?page=4',
    ifb: 'https://www.ifbappliances.com/storelocator/chattisgarh/rajnandgaon/anshdeep-electronics',
    livpure: 'https://store.livpure.com/location/chhattisgarh/rajnandgaon',
  },
} as const;

export function mapUrl(address: string): string {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address);
}
