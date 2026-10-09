export type Service = { title: string; text: string; icon: string; photo: string; photoAlt: string }

// Shared by the home page cards and (later) the Services page.
export const services: Service[] = [
  { title: 'Preventive Care', text: 'Check-ups, cleanings and advice that keep problems from starting.', icon: 'M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6zM9 12l2 2 4-4', photo: '/images/service-preventive.jpg', photoAlt: 'A dentist carrying out a routine check-up' },
  { title: 'Cosmetic Dentistry', text: 'Whitening, veneers and smile makeovers for a look you love.', icon: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1z', photo: '/images/service-cosmetic.jpg', photoAlt: 'White teeth beside a shade guide for whitening' },
  { title: 'Restorative Care', text: 'Fillings, crowns and bridges that bring back strength and comfort.', icon: 'M14 6l4 4-9 9H5v-4zM12 8l4 4', photo: '/images/service-restorative.jpg', photoAlt: 'Dental staff treating a patient in a bright clinic' },
  { title: 'Dental Implants', text: 'Natural-looking, long-lasting replacements for missing teeth.', icon: 'M8 3h8l-1 7H9zM12 10v11M9 14h6M9 18h6', photo: '/images/service-implants.jpg', photoAlt: 'A model of a dental implant' },
  { title: 'Orthodontics', text: 'Braces and clear aligners to straighten teeth at any age.', icon: 'M3 9h18v6H3zM8 9v6M12 9v6M16 9v6', photo: '/images/service-ortho.jpg', photoAlt: 'A model of teeth fitted with braces' },
  { title: 'Emergency Care', text: 'Same-day help for toothache, injury and sudden pain.', icon: 'M12 8v8M8 12h8M12 21s-8-5-8-11a4.500 4.500 0 018-2.800A4.500 4.500 0 0120 10c0 6-8 11-8 11z', photo: '/images/service-emergency.jpg', photoAlt: 'A patient holding their cheek with tooth pain' },
]
