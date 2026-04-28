// In-memory data store for NJ AI Hub.
// Seed data lives in JS arrays — survives restarts in dev, resets on Vercel cold starts.

let _id = { news: 0, events: 0, team: 0, partners: 0, contacts: 0 };
const nextId = (k) => ++_id[k];

// Unsplash photos (free to hotlink, themed to each story)
const IMG = {
  ribbon:      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&auto=format&fit=crop',
  discovery:   'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80&auto=format&fit=crop',
  fund:        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop',
  accelerator: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop',
  director:    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop',
};

const news = [
  {
    id: nextId('news'),
    title: 'Founding partners unveil NJ AI Hub as center for innovation',
    summary: 'Governor Phil Murphy joined Princeton President Christopher L. Eisgruber and representatives from Microsoft, CoreWeave, and the NJEDA to officially open the NJ AI Hub.',
    body: 'New Jersey Governor Phil Murphy joined Princeton University President Christopher L. Eisgruber and representatives from Microsoft, CoreWeave, and the New Jersey Economic Development Authority (NJEDA) to officially open the NJ AI Hub, a state-of-the-art, flexible space designed to foster innovation in artificial intelligence. The new facility, located in space provided by the University on Alexander Road in West Windsor, attracted a standing-room-only crowd for the ribbon cutting.',
    date: '2025-03-28',
    source: 'Princeton University, Office of Communications',
    image: IMG.ribbon,
    url: 'https://www.princeton.edu/news/2025/03/28/founding-partners-unveil-nj-ai-hub-center-innovation',
  },
  {
    id: nextId('news'),
    title: 'Founding partner Microsoft to bring new Discovery AI technology to NJ AI Hub',
    summary: 'With the new platform, researchers can speed up scientific discovery using advanced AI and high-performance computing.',
    body: 'Microsoft will bring its Discovery AI platform to the NJ AI Hub, allowing researchers to analyze vast amounts of scientific data, simulate experiments, and discover new materials or solutions much faster than traditional methods.',
    date: '2025-04-15',
    source: 'NJ AI Hub',
    image: IMG.discovery,
  },
  {
    id: nextId('news'),
    title: 'NJEDA and CoreWeave announce $20M AI Hub Fund to support innovative startups',
    summary: 'The investment fund will help startups access capital, overcome challenges, and accelerate growth — strengthening New Jersey’s standing as a national leader in AI innovation.',
    body: 'The New Jersey Economic Development Authority and CoreWeave have together created a $20M AI Hub Fund to back early-stage AI companies operating in the state.',
    date: '2025-05-08',
    source: 'NJEDA',
    image: IMG.fund,
  },
  {
    id: nextId('news'),
    title: 'NJ AI Hub selects Plug and Play to operate its regional AI Accelerator',
    summary: 'The accelerator will connect New Jersey AI startups and higher-ed-affiliated entrepreneurs with mentors, investors, and partners.',
    body: 'Plug and Play will operate the NJ AI Hub’s regional AI Accelerator, leveraging its global network to attract world-class startups to New Jersey while elevating local talent.',
    date: '2025-06-20',
    source: 'NJ AI Hub',
    image: IMG.accelerator,
  },
  {
    id: nextId('news'),
    title: 'Liat Krawczyk named inaugural executive director of the NJ AI Hub',
    summary: 'Princeton is one of four founding partners of the Hub, along with the NJEDA, Microsoft, and CoreWeave.',
    body: 'Liat Krawczyk will lead the NJ AI Hub as its first executive director, overseeing programs in research, commercialization, accelerator operations, and workforce development.',
    date: '2025-02-12',
    source: 'NJ AI Hub',
    image: IMG.director,
  },
];

const events = [
  {
    id: nextId('events'),
    title: 'NJ AI Summit',
    description: 'A statewide gathering of 500+ leaders from academia, government, and industry exploring the future of AI in New Jersey.',
    date: '2026-05-14',
    time: '09:00',
    location: 'Alexander Road, West Windsor',
    address: '1 Palmer Square, Princeton, NJ 08540',
    type: 'Summit',
    lat: 40.3260,
    lng: -74.6273,
  },
  {
    id: nextId('events'),
    title: 'AI Accelerator Demo Day',
    description: 'Founders from the inaugural cohort of the NJ AI Accelerator pitch to investors, partners, and the public.',
    date: '2026-06-18',
    time: '17:30',
    location: 'NJ AI Hub, West Windsor',
    address: 'Alexander Road, West Windsor, NJ',
    type: 'Demo Day',
    lat: 40.3260,
    lng: -74.6273,
  },
  {
    id: nextId('events'),
    title: 'Workforce & Education Convening',
    description: 'NJ universities, community colleges, and vocational schools meet to align on AI workforce training pathways.',
    date: '2026-07-09',
    time: '10:00',
    location: 'NJ AI Hub, West Windsor',
    address: 'Alexander Road, West Windsor, NJ',
    type: 'Convening',
    lat: 40.3260,
    lng: -74.6273,
  },
  {
    id: nextId('events'),
    title: 'Discovery AI Research Workshop',
    description: 'Hands-on workshop with Microsoft Discovery AI for NJ-based researchers and grad students.',
    date: '2026-09-22',
    time: '13:00',
    location: 'NJ AI Hub, West Windsor',
    address: 'Alexander Road, West Windsor, NJ',
    type: 'Workshop',
    lat: 40.3260,
    lng: -74.6273,
  },
];

const team = [
  {
    id: nextId('team'),
    name: 'Liat Krawczyk',
    role: 'Executive Director',
    bio: "Previously served as Senior Advisor for Workforce Strategy and Head of Child Care at the U.S. Department of Commerce's CHIPS Program Office, supporting a $300M workforce effort aligned with $37B in semiconductor investments. Before that, Vice President of Innovation Industries at the NYC Economic Development Corporation, where she led workforce strategy across emerging tech, the green economy, and life sciences. Founded the NYCEDC Childcare Innovation Lab and co-led Cyber NYC, a $100M public-private initiative. Over a decade of experience across government, startups, and nonprofits at the intersection of technology, workforce, the care economy, and industrial policy.",
    image: '/images/team-liat.jpg',
  },
  {
    id: nextId('team'),
    name: 'Jeffrey Oakman',
    role: 'Director of Policy and Operations',
    bio: "Has been working on building the NJ AI Hub since September 2024, serving first under the Provost's Office at Princeton and now at the Hub itself as Director of Policy and Operations. Focuses on establishing the Hub as the center of gravity for AI innovation in the state and growing its role in promoting responsible and ethical use of AI. Supports program development in workforce development and training, AI research and development, and startup innovation. Previously worked in Governor Murphy's office for five years as a Senior Policy Advisor with a portfolio including economic development and planning, housing, workforce development, and innovation policy. Career in government, nonprofit, and private sectors focused on creative financing for economic and community development.",
    image: '/images/team-oakman.jpg',
  },
  {
    id: nextId('team'),
    name: 'Craig Arnold',
    role: 'Vice Dean for Innovation',
    bio: 'Princeton University. Connects Hub activities to research commercialization and faculty entrepreneurship.',
    image: '/images/team-arnold.jpg',
  },
  {
    id: nextId('team'),
    name: 'Corey Sanders',
    role: 'CoreWeave SVP of Strategy',
    bio: "Visiting lecturer in Princeton's Department of Computer Science. NJ native, Class of 2004.",
    image: '/images/team-sanders.jpg',
  },
  {
    id: nextId('team'),
    name: 'Jordan Nottke',
    role: 'Operations Manager and Executive Assistant',
    bio: 'Oversees operations, programming, and growth of an AI ecosystem for founders, researchers, and industry partners. Brings over 15 years of experience launching and scaling multi-unit hospitality and coworking operations. Has led the development and operation of more than a dozen coworking spaces across major U.S. markets, overseeing site selection, buildout, and supporting infrastructure. Prior to joining the Hub, held leadership roles with companies including Zuul and Kitchen United, early leaders in the ghost kitchen space. Earlier in his career was part of the founding team at Honey Butter Fried Chicken in Chicago. Founded Properly Seasoned Hospitality, advising New Jersey-based startups and nonprofits on concept development, team and workforce growth, and the foundations required to scale.',
    image: '/images/team-nottke.jpg',
  },
  {
    id: nextId('team'),
    name: 'Dr. Marie Pryor',
    role: 'Microsoft TechSpark Lead',
    bio: "Leads Microsoft's TechSpark initiative at the NJ AI Hub and works to accelerate innovation and economic opportunity across New Jersey. Leads strategic future of work initiatives that advance AI innovation and skilling, while fostering economic growth and opportunity. Efforts focus on increasing access to digital skills and employment opportunities, particularly through public-private partnerships that scale workforce programs. Seasoned leader in workforce innovation and technology strategy with a career deeply anchored in New Jersey. Previous work spans corporate, public sector, and nonprofit domains. Has worked extensively to leverage Federal WIOA funding to expand nonprofit workforce programs, helping underserved populations gain access to training and meaningful employment.",
    image: '/images/team-pryor.jpg',
  },
  {
    id: nextId('team'),
    name: 'Jonathan Mercantini, PhD',
    role: 'NJ AI Hub Fellow, Kean University',
    bio: 'Fellow at the NJ AI Hub representing Kean University. Collaborating with colleagues across the state on AI teaching, learning, scholarship, and ethical applications. Has taught in Kean University's Department of History since 2007. Elected vice chair of the NJ Council for the Humanities (NJCH) Board of Trustees in 2025.',
    image: '/images/team-mercantini.jpg',
  },
];

const partners = [
  { id: nextId('partners'), name: 'Princeton University', role: 'Founding partner — Princeton',         logo: '/images/partner-princeton.png', url: 'https://www.princeton.edu',  lat: 40.3431, lng: -74.6551 },
  { id: nextId('partners'), name: 'NJEDA',                role: 'Founding partner — Trenton',           logo: '/images/partner-njeda.png',     url: 'https://www.njeda.gov',      lat: 40.2206, lng: -74.7597 },
  { id: nextId('partners'), name: 'Microsoft',            role: 'Founding partner',                     logo: '/images/partner-microsoft.png', url: 'https://www.microsoft.com',  lat: null,    lng: null },
  { id: nextId('partners'), name: 'CoreWeave',            role: 'Founding partner — Livingston HQ',     logo: '/images/partner-coreweave.png', url: 'https://www.coreweave.com',  lat: 40.7917, lng: -74.3147 },
  { id: nextId('partners'), name: 'Rutgers University',   role: 'Higher-ed partner — New Brunswick',    logo: '/images/partner-rutgers.png',   url: 'https://www.rutgers.edu',    lat: 40.5008, lng: -74.4474 },
  { id: nextId('partners'), name: 'NJIT',                 role: 'Higher-ed partner — Newark',           logo: '/images/partner-njit.png',      url: 'https://www.njit.edu',       lat: 40.7421, lng: -74.1782 },
];

const contacts = [];

const today = () => new Date().toISOString().split('T')[0];
const sortByDateDesc = (arr) => [...arr].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
const sortByDateAsc  = (arr) => [...arr].sort((a, b) => (a.date || '').localeCompare(b.date || ''));

module.exports = {
  news: {
    all: () => sortByDateDesc(news),
    get: (id) => news.find((n) => n.id === Number(id)) || null,
    insert: (data) => {
      const item = { id: nextId('news'), date: today(), ...data };
      news.push(item);
      return item;
    },
  },
  events: {
    all: () => sortByDateAsc(events),
    upcoming: () => sortByDateAsc(events).filter((e) => (e.date || '') >= today()),
    get: (id) => events.find((e) => e.id === Number(id)) || null,
    insert: (data) => {
      const item = { id: nextId('events'), ...data };
      events.push(item);
      return item;
    },
  },
  team: {
    all: () => team,
    get: (id) => team.find((m) => m.id === Number(id)) || null,
  },
  partners: {
    all: () => partners,
  },
  contacts: {
    all: () => contacts,
    insert: (data) => {
      const item = { id: nextId('contacts'), created_at: new Date().toISOString(), ...data };
      contacts.push(item);
      return item;
    },
  },
};
