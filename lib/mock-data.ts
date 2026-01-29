export interface Product {
  id: string
  title: string
  titleKa: string
  titleRu: string
  description: string
  descriptionKa: string
  descriptionRu: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: Category
  platform: Platform[]
  tags: Tag[]
  rating: number
  reviewCount: number
  inStock: boolean
  releaseDate: string
  developer: string
  publisher: string
}

export type Category = 'action' | 'adventure' | 'rpg' | 'strategy' | 'sports' | 'simulation'
export type Platform = 'PS4' | 'PS5' | 'Xbox'
export type Tag = 'newRelease' | 'bestseller' | 'featured' | 'discount' | 'trending'

export const products: Product[] = [
  {
    id: '1',
    title: 'Cyber Nexus 2077',
    titleKa: 'კიბერ ნექსუსი 2077',
    titleRu: 'Кибер Нексус 2077',
    description: 'Explore a vast open-world cyberpunk city filled with danger and adventure. Immerse yourself in a dystopian future where technology and humanity collide.',
    descriptionKa: 'გამოიკვლიეთ უზარმაზარი ღია სამყაროს კიბერპანკის ქალაქი, სავსე საფრთხით და თავგადასავლებით. ჩაეფლოთ დისტოპიურ მომავალში, სადაც ტექნოლოგია და კაცობრიობა ერთმანეთს ხვდება.',
    descriptionRu: 'Исследуйте огромный открытый мир киберпанк города, полный опасностей и приключений. Погрузитесь в антиутопическое будущее, где технологии и человечество сталкиваются.',
    price: 159.99,
    originalPrice: 199.99,
    image: '/games/cyber-nexus.jpg',
    images: ['/games/cyber-nexus.jpg', '/games/cyber-nexus.jpg', '/games/cyber-nexus.jpg'],
    category: 'rpg',
    platform: ['PS5', 'Xbox'],
    tags: ['bestseller', 'discount', 'trending'],
    rating: 4.8,
    reviewCount: 2453,
    inStock: true,
    releaseDate: '2025-11-15',
    developer: 'Neon Studios',
    publisher: 'Digital Dreams',
  },
  {
    id: '2',
    title: 'Shadow Warriors: Legends',
    titleKa: 'ჩრდილოვანი მეომრები: ლეგენდები',
    titleRu: 'Воины Тени: Легенды',
    description: 'Master the art of stealth and combat in feudal Japan. Become the ultimate ninja warrior and uncover ancient secrets.',
    descriptionKa: 'დაეუფლეთ ფარული მოქმედების და ბრძოლის ხელოვნებას ფეოდალურ იაპონიაში. გახდით საბოლოო ნინჯა მეომარი და აღმოაჩინეთ უძველესი საიდუმლოებები.',
    descriptionRu: 'Овладейте искусством скрытности и боя в феодальной Японии. Станьте непревзойденным воином-ниндзя и раскройте древние тайны.',
    price: 139.99,
    image: '/games/shadow-warriors.jpg',
    images: ['/games/shadow-warriors.jpg', '/games/shadow-warriors.jpg', '/games/shadow-warriors.jpg'],
    category: 'action',
    platform: ['PS4', 'PS5', 'Xbox'],
    tags: ['newRelease', 'featured', 'trending'],
    rating: 4.9,
    reviewCount: 1876,
    inStock: true,
    releaseDate: '2026-01-10',
    developer: 'Ronin Games',
    publisher: 'Eastern Wind',
  },
  {
    id: '3',
    title: 'Starfield Odyssey',
    titleKa: 'ვარსკვლავური ოდისეა',
    titleRu: 'Звездная Одиссея',
    description: 'Embark on an epic journey across the galaxy in this space exploration RPG. Discover new worlds and alien civilizations.',
    descriptionKa: 'დაიწყეთ ეპიკური მოგზაურობა გალაქტიკაში ამ კოსმოსური კვლევის RPG-ში. აღმოაჩინეთ ახალი სამყაროები და უცხოპლანეტელთა ცივილიზაციები.',
    descriptionRu: 'Отправьтесь в эпическое путешествие по галактике в этой космической RPG. Откройте новые миры и инопланетные цивилизации.',
    price: 179.99,
    image: '/games/starfield-odyssey.jpg',
    images: ['/games/starfield-odyssey.jpg', '/games/starfield-odyssey.jpg', '/games/starfield-odyssey.jpg'],
    category: 'rpg',
    platform: ['PS5', 'Xbox'],
    tags: ['newRelease', 'trending'],
    rating: 4.7,
    reviewCount: 3241,
    inStock: true,
    releaseDate: '2025-12-01',
    developer: 'Cosmos Interactive',
    publisher: 'Galaxy Games',
  },
  {
    id: '4',
    title: 'Racing Thunder GT',
    titleKa: 'რბოლის მეხი GT',
    titleRu: 'Гром Гонок GT',
    description: 'Experience the thrill of high-speed racing with realistic physics and stunning graphics.',
    descriptionKa: 'განიცადეთ მაღალსიჩქარიანი რბოლის აზარტი რეალისტური ფიზიკით და განსაცვიფრებელი გრაფიკით.',
    descriptionRu: 'Испытайте острые ощущения от скоростных гонок с реалистичной физикой и потрясающей графикой.',
    price: 99.99,
    originalPrice: 129.99,
    image: '/games/racing-thunder.jpg',
    images: ['/games/racing-thunder.jpg', '/games/racing-thunder.jpg', '/games/racing-thunder.jpg'],
    category: 'sports',
    platform: ['PS4', 'PS5', 'Xbox'],
    tags: ['discount', 'bestseller'],
    rating: 4.5,
    reviewCount: 1543,
    inStock: true,
    releaseDate: '2025-09-20',
    developer: 'Speed Demons',
    publisher: 'Turbo Games',
  },
  {
    id: '5',
    title: 'Empire Builders IV',
    titleKa: 'იმპერიის მშენებლები IV',
    titleRu: 'Строители Империи IV',
    description: 'Build and manage your own civilization from ancient times to the modern era. Lead your people to glory.',
    descriptionKa: 'ააშენეთ და მართეთ საკუთარი ცივილიზაცია უძველესი დროიდან თანამედროვე ეპოქამდე. მიუძღვით თქვენს ხალხს დიდებისკენ.',
    descriptionRu: 'Стройте и управляйте своей цивилизацией от древних времен до современной эпохи. Ведите свой народ к славе.',
    price: 119.99,
    image: '/games/empire-builders.jpg',
    images: ['/games/empire-builders.jpg', '/games/empire-builders.jpg', '/games/empire-builders.jpg'],
    category: 'strategy',
    platform: ['PS5', 'Xbox'],
    tags: ['featured'],
    rating: 4.6,
    reviewCount: 2187,
    inStock: true,
    releaseDate: '2025-10-15',
    developer: 'Strategic Minds',
    publisher: 'Grand Strategy',
  },
  {
    id: '6',
    title: 'Dragon Quest: Eternal',
    titleKa: 'დრაკონის ძიება: მარადიული',
    titleRu: 'Поиск Дракона: Вечный',
    description: 'A classic JRPG adventure with stunning visuals and epic storytelling. Save the kingdom from darkness.',
    descriptionKa: 'კლასიკური JRPG თავგადასავალი განსაცვიფრებელი ვიზუალით და ეპიკური მოთხრობით. გადაარჩინეთ სამეფო სიბნელისგან.',
    descriptionRu: 'Классическое JRPG приключение с потрясающей графикой и эпичным сюжетом. Спасите королевство от тьмы.',
    price: 149.99,
    image: '/games/dragon-quest.jpg',
    images: ['/games/dragon-quest.jpg', '/games/dragon-quest.jpg', '/games/dragon-quest.jpg'],
    category: 'rpg',
    platform: ['PS4', 'PS5'],
    tags: ['bestseller', 'trending'],
    rating: 4.9,
    reviewCount: 4532,
    inStock: true,
    releaseDate: '2025-08-01',
    developer: 'Fantasy Works',
    publisher: 'Legend Games',
  },
  {
    id: '7',
    title: 'Survival Island',
    titleKa: 'გადარჩენის კუნძული',
    titleRu: 'Остров Выживания',
    description: 'Survive on a mysterious island with crafting, building, and exploration. Uncover the island\'s dark secrets.',
    descriptionKa: 'გადარჩით იდუმალ კუნძულზე ხელობით, მშენებლობით და კვლევით. აღმოაჩინეთ კუნძულის ბნელი საიდუმლოებები.',
    descriptionRu: 'Выживайте на загадочном острове, создавая, строя и исследуя. Раскройте темные секреты острова.',
    price: 79.99,
    image: '/games/survival-island.jpg',
    images: ['/games/survival-island.jpg', '/games/survival-island.jpg', '/games/survival-island.jpg'],
    category: 'adventure',
    platform: ['PS4', 'PS5', 'Xbox'],
    tags: ['featured'],
    rating: 4.4,
    reviewCount: 987,
    inStock: true,
    releaseDate: '2025-07-10',
    developer: 'Wilderness Studios',
    publisher: 'Outdoor Games',
  },
  {
    id: '8',
    title: 'Football Champions 2026',
    titleKa: 'ფეხბურთის ჩემპიონები 2026',
    titleRu: 'Чемпионы Футбола 2026',
    description: 'The most realistic football simulation with updated teams and leagues. Experience the beautiful game.',
    descriptionKa: 'ყველაზე რეალისტური ფეხბურთის სიმულატორი განახლებული გუნდებითა და ლიგებით. განიცადეთ ლამაზი თამაში.',
    descriptionRu: 'Самый реалистичный футбольный симулятор с обновленными командами и лигами. Ощутите красивую игру.',
    price: 169.99,
    originalPrice: 199.99,
    image: '/games/football-champions.jpg',
    images: ['/games/football-champions.jpg', '/games/football-champions.jpg', '/games/football-champions.jpg'],
    category: 'sports',
    platform: ['PS4', 'PS5', 'Xbox'],
    tags: ['newRelease', 'discount'],
    rating: 4.3,
    reviewCount: 2876,
    inStock: true,
    releaseDate: '2026-01-20',
    developer: 'Sports Interactive',
    publisher: 'Athletic Games',
  },
  {
    id: '9',
    title: 'City Life Simulator',
    titleKa: 'ქალაქის ცხოვრების სიმულატორი',
    titleRu: 'Симулятор Городской Жизни',
    description: 'Build and manage your dream city with detailed simulation mechanics. Create the perfect urban utopia.',
    descriptionKa: 'ააშენეთ და მართეთ თქვენი ოცნების ქალაქი დეტალური სიმულაციის მექანიზმებით. შექმენით სრულყოფილი ურბანული უტოპია.',
    descriptionRu: 'Стройте и управляйте городом своей мечты с детальной механикой симуляции. Создайте идеальную городскую утопию.',
    price: 89.99,
    image: '/games/city-life.jpg',
    images: ['/games/city-life.jpg', '/games/city-life.jpg', '/games/city-life.jpg'],
    category: 'simulation',
    platform: ['PS5', 'Xbox'],
    tags: ['featured'],
    rating: 4.7,
    reviewCount: 1654,
    inStock: true,
    releaseDate: '2025-06-15',
    developer: 'Urban Dreams',
    publisher: 'Sim World',
  },
  {
    id: '10',
    title: 'Dungeon Crawler X',
    titleKa: 'მიწისქვეშეთის მკვლევარი X',
    titleRu: 'Исследователь Подземелий X',
    description: 'Explore procedurally generated dungeons in this roguelike action game. Every run is unique.',
    descriptionKa: 'გამოიკვლიეთ პროცედურულად გენერირებული მიწისქვეშეთები ამ როგლაიკ ექშენ თამაშში. ყოველი გასვლა უნიკალურია.',
    descriptionRu: 'Исследуйте процедурно генерируемые подземелья в этом roguelike экшене. Каждое прохождение уникально.',
    price: 59.99,
    originalPrice: 79.99,
    image: '/games/dungeon-crawler.jpg',
    images: ['/games/dungeon-crawler.jpg', '/games/dungeon-crawler.jpg', '/games/dungeon-crawler.jpg'],
    category: 'action',
    platform: ['PS4', 'Xbox'],
    tags: ['discount'],
    rating: 4.6,
    reviewCount: 876,
    inStock: false,
    releaseDate: '2025-05-01',
    developer: 'Indie Rogues',
    publisher: 'Pixel Games',
  },
]

export const giftCards = [
  { id: 'gc1', value: 50, image: '/gift-cards/50.jpg' },
  { id: 'gc2', value: 100, image: '/gift-cards/100.jpg' },
  { id: 'gc3', value: 200, image: '/gift-cards/200.jpg' },
]

export const categories = [
  { id: 'action', nameKa: 'ექშენი', nameEn: 'Action', nameRu: 'Экшен' },
  { id: 'adventure', nameKa: 'სათავგადასავლო', nameEn: 'Adventure', nameRu: 'Приключения' },
  { id: 'rpg', nameKa: 'RPG', nameEn: 'RPG', nameRu: 'RPG' },
  { id: 'strategy', nameKa: 'სტრატეგია', nameEn: 'Strategy', nameRu: 'Стратегия' },
  { id: 'sports', nameKa: 'სპორტი', nameEn: 'Sports', nameRu: 'Спорт' },
  { id: 'simulation', nameKa: 'სიმულატორი', nameEn: 'Simulation', nameRu: 'Симулятор' },
] as const

export const platforms: Platform[] = ['PS4', 'PS5', 'Xbox']

export function formatPrice(price: number): string {
  return `${price.toFixed(2)} ₾`
}

export function getProductTitle(product: Product, language: 'ka' | 'en' | 'ru'): string {
  switch (language) {
    case 'ka':
      return product.titleKa
    case 'ru':
      return product.titleRu
    default:
      return product.title
  }
}

export function getProductDescription(product: Product, language: 'ka' | 'en' | 'ru'): string {
  switch (language) {
    case 'ka':
      return product.descriptionKa
    case 'ru':
      return product.descriptionRu
    default:
      return product.description
  }
}

export function getCategoryName(categoryId: string, language: 'ka' | 'en' | 'ru'): string {
  const category = categories.find(c => c.id === categoryId)
  if (!category) return categoryId
  switch (language) {
    case 'ka':
      return category.nameKa
    case 'ru':
      return category.nameRu
    default:
      return category.nameEn
  }
}
