export const seed = {
  events: [
    { id: 'e1', title: 'Moonlight Community Ski', date: '2026-03-07', time: '19:00', location: 'Main Loop', category: 'Social', description: 'Headlamps, hot chocolate, and guided skiing under the full moon.' },
    { id: 'e2', title: 'Jackrabbit Skills Day', date: '2026-03-08', time: '10:00', location: 'Beginner Meadow', category: 'Program', description: 'Technique games and hill confidence for ages 5-9.' },
    { id: 'e3', title: 'Classic Technique Clinic', date: '2026-03-14', time: '13:00', location: 'Stadium Start', category: 'Lesson', description: 'Adult and teen clinic focused on efficient glide and pole timing.' },
    { id: 'e4', title: 'Spring Loppet Fun Race', date: '2026-03-22', time: '10:30', location: 'Full System', category: 'Race', description: '5km/10km community race with soup lunch and awards.' }
  ],
  programs: [
    { id: 'p1', name: 'Jackrabbits', audience: 'Ages 5-9', level: 'Beginner', schedule: 'Saturdays 10:00-11:30', description: 'Play-based learning and confidence on snow.' },
    { id: 'p2', name: 'Track Attack', audience: 'Ages 9-13', level: 'Intermediate', schedule: 'Saturdays 10:00-12:00', description: 'Youth development for endurance, speed, and technique.' },
    { id: 'p3', name: 'Adult Learn to Ski', audience: '16+', level: 'All levels', schedule: 'Sundays 13:00-14:30', description: 'Friendly coaching in classic and skate with gear guidance.' }
  ],
  trails: [
    { id: 't1', date: '2026-02-26', time: '06:30', status: 'groomed', trails: 'All Loops', author: 'Mike Tarrant', conditions: '8cm fresh snow. Tracks reset and skate lane firm.', temp: '-8°C' },
    { id: 't2', date: '2026-02-25', time: '07:00', status: 'warning', trails: 'Riverside Descent', author: 'Mike Tarrant', conditions: 'Icy corners on north-facing hills. Use caution.', temp: '-3°C' },
    { id: 't3', date: '2026-02-23', time: '06:45', status: 'groomed', trails: 'All Loops', author: 'Dave Reid', conditions: '15cm snowfall packed beautifully. Fast classic track.', temp: '-12°C' }
  ],
  rentals: [
    { id: 'r1', name: 'Youth Classic Package', price: '$18 / day', includes: 'Skis, boots, poles', notes: 'Sizes for ages 5-14' },
    { id: 'r2', name: 'Adult Classic Package', price: '$25 / day', includes: 'Skis, boots, poles', notes: 'Waxless skis for local conditions' },
    { id: 'r3', name: 'Adult Skate Package', price: '$30 / day', includes: 'Skate skis, boots, poles', notes: 'Helmet optional add-on $5' }
  ],
  membership: {
    title: 'Membership & Join',
    intro: 'Become part of a warm, volunteer-powered Nordic community in St. Anthony.',
    benefits: ['Trail access and grooming updates', 'Program discounts', 'Club event registration priority', 'Support for youth and adaptive skiing'],
    instructions: 'Join by emailing membership@sansc.ca or visiting the lodge Saturday mornings. Family, individual, and student rates available.'
  },
  about: {
    mission: 'Since 1987, the St. Anthony Nordic Ski Club has connected people to winter through safe, welcoming skiing opportunities.',
    history: 'Built by volunteers across the Northern Peninsula, the club now stewards 15km of trails and year-round outdoor culture.',
    executives: [
      { id: 'x1', name: 'Sarah Mitchell', role: 'President' },
      { id: 'x2', name: 'James Rowe', role: 'Vice President' },
      { id: 'x3', name: 'Karen Pilgrim', role: 'Treasurer' }
    ],
    faqs: [
      { id: 'f1', q: 'Do I need to be a member to ski?', a: 'Day passes are available, but membership is best for regular skiing.' },
      { id: 'f2', q: 'Are trails lit?', a: 'Main Loop is lit until 9 PM in-season, conditions permitting.' },
      { id: 'f3', q: 'Do you have rentals?', a: 'Yes, classic and skate packages are available at the lodge.' }
    ]
  },
  social: [
    { id: 's1', text: 'Fresh corduroy on Main Loop this morning. Thanks grooming crew!', timestamp: '2026-02-26T09:10:00-03:30' },
    { id: 's2', text: 'Registration open for Spring Loppet Fun Race.', timestamp: '2026-02-25T17:25:00-03:30' },
    { id: 's3', text: 'Jackrabbit families: bring warm mitts and water this weekend.', timestamp: '2026-02-24T19:00:00-03:30' }
  ],
  activity: [
    { id: 'a1', athlete: 'Leah C', distanceKm: 12.4, durationMin: 68, elevationM: 154, date: '2026-02-26' },
    { id: 'a2', athlete: 'Tom B', distanceKm: 8.1, durationMin: 44, elevationM: 96, date: '2026-02-25' },
    { id: 'a3', athlete: 'Club Group Ski', distanceKm: 6.3, durationMin: 39, elevationM: 80, date: '2026-02-24' }
  ]
};
