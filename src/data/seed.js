export const seedData = {
  events: [
    { id: 'ev-1', title: 'Moonlight Community Ski', date: '2026-03-07', time: '19:00', location: 'Main Loop', category: 'Social', description: 'Guided evening ski with hot chocolate at the lodge.' },
    { id: 'ev-2', title: 'Jackrabbit Session 6', date: '2026-03-08', time: '10:00', location: 'Beginner Meadow', category: 'Program', description: 'Youth session focused on downhill confidence and games.' },
    { id: 'ev-3', title: 'Classic Technique Workshop', date: '2026-03-14', time: '13:00', location: 'Stadium Area', category: 'Lesson', description: 'Coach-led clinic for diagonal stride and poling timing.' },
    { id: 'ev-4', title: 'Spring Loppet Fun Race', date: '2026-03-22', time: '10:30', location: 'Full Trail System', category: 'Race', description: '5km and 10km options with post-race soup and prizes.' }
  ],
  trailReports: [
    { id: 'tr-1', date: '2026-02-26', time: '06:30', status: 'groomed', trails: 'All Loops', author: 'Mike Tarrant', conditions: 'Fresh groom after 8 cm snowfall. Excellent skate lane and deep classic track.', temp: '-8°C' },
    { id: 'tr-2', date: '2026-02-25', time: '07:00', status: 'warning', trails: 'Riverside Descent', author: 'Mike Tarrant', conditions: 'Icy sections on shaded downhill corners. Use caution.', temp: '-3°C' },
    { id: 'tr-3', date: '2026-02-23', time: '06:45', status: 'groomed', trails: 'All Loops', author: 'Dave Reid', conditions: 'Packed after 15 cm new snow. Fast and smooth conditions.', temp: '-12°C' }
  ],
  programs: [
    { id: 'pg-1', name: 'Jackrabbits', audience: 'Ages 5-9', level: 'Beginner', schedule: 'Saturdays 10:00-11:30', description: 'Play-based Nordic skills and confidence on snow.' },
    { id: 'pg-2', name: 'Track Attack', audience: 'Ages 9-13', level: 'Intermediate', schedule: 'Saturdays 10:00-12:00', description: 'Youth training in endurance, racing, and technique.' },
    { id: 'pg-3', name: 'Adult Learn to Ski', audience: 'Ages 16+', level: 'All levels', schedule: 'Sundays 13:00-14:30', description: 'Friendly instruction in classic and skate skiing.' }
  ],
  rentals: [
    { id: 'rt-1', name: 'Youth Classic Package', price: '$18/day', includes: 'Skis, boots, poles', notes: 'Ages 5-14, limited skate sizes.' },
    { id: 'rt-2', name: 'Adult Classic Package', price: '$25/day', includes: 'Skis, boots, poles', notes: 'Waxless bases tuned for local snow.' },
    { id: 'rt-3', name: 'Adult Skate Package', price: '$30/day', includes: 'Skate skis, boots, poles', notes: 'Helmet add-on available for $5.' }
  ],
  membership: {
    title: 'Membership / Join',
    intro: 'Join a warm volunteer-run club that keeps Nordic skiing thriving in St. Anthony.',
    benefits: ['Groomed trail access', 'Program discounts', 'Event registration priority', 'Support for youth and adaptive ski programming'],
    joinInstructions: 'Email membership@sansc.ca or visit the lodge on Saturday mornings to register.'
  },
  about: {
    mission: 'Since 1987, we have helped Northern Peninsula residents connect with winter through safe, welcoming Nordic skiing.',
    history: 'Our volunteers maintain 15 km of classic and skate trails and deliver programs for all ages.',
    executives: [
      { id: 'ex-1', name: 'Sarah Mitchell', role: 'President' },
      { id: 'ex-2', name: 'James Rowe', role: 'Vice President' },
      { id: 'ex-3', name: 'Karen Pilgrim', role: 'Treasurer' }
    ],
    faqs: [
      { id: 'faq-1', q: 'Do I need to be a member to ski?', a: 'Day passes are available, but membership is best for regular skiing.' },
      { id: 'faq-2', q: 'Are trails lit for evening use?', a: 'The Main Loop is lit until 9 PM when conditions allow.' },
      { id: 'faq-3', q: 'Can I rent equipment?', a: 'Yes, both classic and skate packages are available.' }
    ]
  },
  socialPosts: [
    { id: 'sp-1', content: 'Fresh corduroy this morning. Thank you grooming crew!', createdAt: '2026-02-26T09:10:00-03:30' },
    { id: 'sp-2', content: 'Spring Loppet registration is now open.', createdAt: '2026-02-25T17:25:00-03:30' },
    { id: 'sp-3', content: 'Jackrabbit families: bring warm mitts and water.', createdAt: '2026-02-24T19:00:00-03:30' }
  ],
  activities: [
    { id: 'ac-1', athlete: 'Leah C', distanceKm: 12.4, durationMin: 68, elevationM: 154, date: '2026-02-26' },
    { id: 'ac-2', athlete: 'Tom B', distanceKm: 8.1, durationMin: 44, elevationM: 96, date: '2026-02-25' },
    { id: 'ac-3', athlete: 'Club Group Ski', distanceKm: 6.3, durationMin: 39, elevationM: 80, date: '2026-02-24' }
  ]
};
