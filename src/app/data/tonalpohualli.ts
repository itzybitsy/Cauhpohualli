export interface DaySign {
  index: number;
  nahuatl: string;
  english: string;
  meaning: string;
  characteristics: string;
  deity: string;
  deityDescription: string;
  element?: string;
  direction?: string;
  color?: string;
}

export const daySignsData: DaySign[] = [
  {
    index: 1,
    nahuatl: "Cipactli",
    english: "Crocodile",
    meaning: "Creation, primal energy, origin",
    characteristics: "Those born under Cipactli are natural leaders with strong creative energy. They possess primal strength and the ability to manifest their desires into reality. They are providers and protectors.",
    deity: "Tonacatecuhtli",
    deityDescription: "Lord of Sustenance, god of creation and fertility",
    element: "Earth",
    direction: "East",
    color: "red"
  },
  {
    index: 2,
    nahuatl: "Ehecatl",
    english: "Wind",
    meaning: "Communication, change, breath of life",
    characteristics: "Ehecatl individuals are communicators and agents of change. They bring fresh perspectives and new ideas. They are dynamic, charismatic, and excel at connecting people and concepts.",
    deity: "Quetzalcoatl",
    deityDescription: "The Feathered Serpent, god of wind and wisdom",
    element: "Air",
    direction: "North",
    color: "black"
  },
  {
    index: 3,
    nahuatl: "Calli",
    english: "House",
    meaning: "Foundation, security, introspection",
    characteristics: "Calli natives value stability and home. They are introspective, building strong foundations in all aspects of life. They protect and nurture their community and family.",
    deity: "Tepeyollotl",
    deityDescription: "Heart of the Mountain, god of caves and echoes",
    element: "Earth",
    direction: "West",
    color: "white"
  },
  {
    index: 4,
    nahuatl: "Cuetzpallin",
    english: "Lizard",
    meaning: "Agility, dreams, subconscious",
    characteristics: "Cuetzpallin people are adaptable and in tune with their dreams and intuition. They navigate life with agility and are connected to the subconscious realm and hidden knowledge.",
    deity: "Huehuecoyotl",
    deityDescription: "Old Coyote, god of dance and mischief",
    element: "Fire",
    direction: "South",
    color: "blue"
  },
  {
    index: 5,
    nahuatl: "Coatl",
    english: "Serpent",
    meaning: "Wisdom, transformation, sexuality",
    characteristics: "Coatl individuals possess deep wisdom and transformative power. They experience profound life changes and are connected to both earthly and spiritual realms. They are passionate and sensual.",
    deity: "Chalchiuhtlicue",
    deityDescription: "She of the Jade Skirt, goddess of waters",
    element: "Water",
    direction: "East",
    color: "red"
  },
  {
    index: 6,
    nahuatl: "Miquiztli",
    english: "Death",
    meaning: "Transformation, endings, renewal",
    characteristics: "Miquiztli natives understand the cycles of life and death. They excel at transformation and letting go. They are not afraid of endings and see them as gateways to new beginnings.",
    deity: "Tecciztecatl",
    deityDescription: "He of the Sea Snail, moon god",
    element: "Air",
    direction: "North",
    color: "black"
  },
  {
    index: 7,
    nahuatl: "Mazatl",
    english: "Deer",
    meaning: "Gentleness, grace, magic",
    characteristics: "Mazatl people are gentle souls with natural grace. They are magical beings who navigate the world with kindness. They are timid yet possess inner strength and connection to nature's mysteries.",
    deity: "Tlaloc",
    deityDescription: "God of rain and fertility",
    element: "Water",
    direction: "West",
    color: "white"
  },
  {
    index: 8,
    nahuatl: "Tochtli",
    english: "Rabbit",
    meaning: "Fertility, abundance, fear",
    characteristics: "Tochtli individuals are fertile in ideas and creativity. They attract abundance but must overcome fear and anxiety. They are social and enjoy celebration but need balance.",
    deity: "Mayahuel",
    deityDescription: "Goddess of maguey and pulque",
    element: "Earth",
    direction: "South",
    color: "blue"
  },
  {
    index: 9,
    nahuatl: "Atl",
    english: "Water",
    meaning: "Emotion, purification, flow",
    characteristics: "Atl natives are deeply emotional and intuitive. They understand the flow of life and adapt like water. They purify and cleanse, both themselves and situations around them.",
    deity: "Xiuhtecuhtli",
    deityDescription: "Turquoise Lord, god of fire and time",
    element: "Fire",
    direction: "East",
    color: "red"
  },
  {
    index: 10,
    nahuatl: "Itzcuintli",
    english: "Dog",
    meaning: "Loyalty, guidance, companionship",
    characteristics: "Itzcuintli people are loyal guides and faithful companions. They protect and guide souls, both in this life and beyond. They are trustworthy friends and devoted partners.",
    deity: "Mictlantecuhtli",
    deityDescription: "Lord of the Dead, ruler of the underworld",
    element: "Earth",
    direction: "North",
    color: "black"
  },
  {
    index: 11,
    nahuatl: "Ozomatli",
    english: "Monkey",
    meaning: "Play, art, celebration",
    characteristics: "Ozomatli individuals are playful artists and natural entertainers. They bring joy and laughter. They excel in creative arts and remind others not to take life too seriously.",
    deity: "Xochipilli",
    deityDescription: "Prince of Flowers, god of art and dance",
    element: "Air",
    direction: "West",
    color: "white"
  },
  {
    index: 12,
    nahuatl: "Malinalli",
    english: "Grass",
    meaning: "Connection, flexibility, resilience",
    characteristics: "Malinalli natives are resilient and flexible like grass. They connect people and ideas, weaving relationships. They bend but don't break and find strength in adaptability.",
    deity: "Patecatl",
    deityDescription: "God of healing and medicine",
    element: "Water",
    direction: "South",
    color: "blue"
  },
  {
    index: 13,
    nahuatl: "Acatl",
    english: "Reed",
    meaning: "Authority, direction, communication",
    characteristics: "Acatl people are natural leaders and authority figures. They provide direction and structure. They are strong communicators who carry wisdom and guide others on their path.",
    deity: "Tezcatlipoca",
    deityDescription: "Smoking Mirror, god of destiny and sorcery",
    element: "Fire",
    direction: "East",
    color: "red"
  },
  {
    index: 14,
    nahuatl: "Ocelotl",
    english: "Jaguar",
    meaning: "Power, stealth, night",
    characteristics: "Ocelotl individuals possess great power and inner strength. They are warriors of the night, moving through darkness with confidence. They are brave, fierce, and protective.",
    deity: "Tlazolteotl",
    deityDescription: "Goddess of purification and midwifery",
    element: "Earth",
    direction: "North",
    color: "black"
  },
  {
    index: 15,
    nahuatl: "Cuauhtli",
    english: "Eagle",
    meaning: "Vision, freedom, spirit",
    characteristics: "Cuauhtli natives soar to great heights with clear vision. They see the bigger picture and possess spiritual insight. They are free spirits who inspire others to reach their potential.",
    deity: "Xipe Totec",
    deityDescription: "Our Lord the Flayed One, god of renewal",
    element: "Air",
    direction: "West",
    color: "white"
  },
  {
    index: 16,
    nahuatl: "Cozcacuauhtli",
    english: "Vulture",
    meaning: "Purification, wisdom, death",
    characteristics: "Cozcacuauhtli people are wise purifiers who transform death into life. They see value in what others discard and possess ancient wisdom. They clean away the old to make room for the new.",
    deity: "Itzpapalotl",
    deityDescription: "Obsidian Butterfly, warrior goddess",
    element: "Water",
    direction: "South",
    color: "blue"
  },
  {
    index: 17,
    nahuatl: "Ollin",
    english: "Movement",
    meaning: "Change, dynamic energy, earthquake",
    characteristics: "Ollin individuals are agents of dynamic change and transformation. They embody movement and constant evolution. They shake things up and bring necessary change, even through upheaval.",
    deity: "Xolotl",
    deityDescription: "God of lightning, twins, and the evening star",
    element: "Fire",
    direction: "East",
    color: "red"
  },
  {
    index: 18,
    nahuatl: "Tecpatl",
    english: "Flint",
    meaning: "Cutting, sacrifice, truth",
    characteristics: "Tecpatl natives cut through illusion to reveal truth. They are sharp and direct, willing to make sacrifices for higher purpose. They are surgeons of the spirit, removing what no longer serves.",
    deity: "Chalchiuhtotolin",
    deityDescription: "Jade Turkey, god of disease and plague",
    element: "Earth",
    direction: "North",
    color: "black"
  },
  {
    index: 19,
    nahuatl: "Quiahuitl",
    english: "Rain",
    meaning: "Cleansing, blessing, emotion",
    characteristics: "Quiahuitl people bring blessings and cleansing like rain. They nourish growth and wash away negativity. They are emotional and connected to the cycles of nature and abundance.",
    deity: "Tonatiuh",
    deityDescription: "The Sun, god of the current age",
    element: "Air",
    direction: "West",
    color: "white"
  },
  {
    index: 20,
    nahuatl: "Xochitl",
    english: "Flower",
    meaning: "Beauty, art, pleasure",
    characteristics: "Xochitl individuals appreciate beauty and create art. They bring pleasure and joy to life. They are creative souls who remind us to enjoy life's sweetness and celebrate beauty in all forms.",
    deity: "Xochiquetzal",
    deityDescription: "Precious Flower, goddess of love and beauty",
    element: "Water",
    direction: "South",
    color: "blue"
  }
];

export interface SacredNumber {
  number: number;
  meaning: string;
  energy: string;
}

export const sacredNumbersData: SacredNumber[] = [
  {
    number: 1,
    meaning: "Unity, beginning, creation",
    energy: "The energy of unity and new beginnings. This number represents the seed of potential and the start of all cycles."
  },
  {
    number: 2,
    meaning: "Duality, balance, choice",
    energy: "The energy of polarity and partnership. This number brings awareness of opposites and the need for balance."
  },
  {
    number: 3,
    meaning: "Movement, rhythm, expression",
    energy: "The energy of motion and creativity. This number activates communication and self-expression."
  },
  {
    number: 4,
    meaning: "Stability, measure, foundation",
    energy: "The energy of form and structure. This number establishes foundations and creates stability."
  },
  {
    number: 5,
    meaning: "Center, empowerment, core",
    energy: "The energy of the center and personal power. This number represents the heart and core essence."
  },
  {
    number: 6,
    meaning: "Flow, rhythm, balance",
    energy: "The energy of flow and organic rhythm. This number brings harmony and natural balance."
  },
  {
    number: 7,
    meaning: "Reflection, mysticism, attunement",
    energy: "The energy of mystical insight and reflection. This number opens doors to spiritual understanding."
  },
  {
    number: 8,
    meaning: "Integrity, wholeness, justice",
    energy: "The energy of justice and wholeness. This number seeks integrity and balanced justice."
  },
  {
    number: 9,
    meaning: "Completion, patience, culmination",
    energy: "The energy of patience and completion. This number represents the fullness before a new cycle."
  },
  {
    number: 10,
    meaning: "Manifestation, production, realization",
    energy: "The energy of manifestation and bringing things into being. This number makes ideas real."
  },
  {
    number: 11,
    meaning: "Resolution, dissonance, change",
    energy: "The energy of resolution and breakthrough. This number dissolves barriers and initiates change."
  },
  {
    number: 12,
    meaning: "Complex stability, understanding, cooperation",
    energy: "The energy of understanding and cooperation. This number builds complex structures through teamwork."
  },
  {
    number: 13,
    meaning: "Transformation, ascension, transcendence",
    energy: "The energy of transformation and transcendence. This number represents the highest point before renewal."
  }
];

export const trecenas = [
  { start: "1 Cipactli", deity: "Tonacatecuhtli & Tonacacihuatl", energy: "Creation and abundance" },
  { start: "1 Ocelotl", deity: "Quetzalcoatl", energy: "Power and wisdom" },
  { start: "1 Mazatl", deity: "Tepeyollotl", energy: "Natural magic and grace" },
  { start: "1 Xochitl", deity: "Huehuecoyotl", energy: "Beauty and pleasure" },
  { start: "1 Acatl", deity: "Chalchiuhtlicue", energy: "Authority and flow" },
  { start: "1 Miquiztli", deity: "Tecciztecatl", energy: "Transformation and renewal" },
  { start: "1 Quiahuitl", deity: "Tlaloc", energy: "Blessing and nourishment" },
  { start: "1 Malinalli", deity: "Mayahuel", energy: "Connection and abundance" },
  { start: "1 Coatl", deity: "Xiuhtecuhtli", energy: "Wisdom and time" },
  { start: "1 Tecpatl", deity: "Mictlantecuhtli & Mictecacihuatl", energy: "Truth and sacrifice" },
  { start: "1 Ozomatli", deity: "Xochipilli", energy: "Joy and artistry" },
  { start: "1 Cuetzpallin", deity: "Itzpapalotl", energy: "Agility and dreams" },
  { start: "1 Ollin", deity: "Tlazolteotl", energy: "Movement and change" },
  { start: "1 Itzcuintli", deity: "Xipe Totec", energy: "Loyalty and guidance" },
  { start: "1 Calli", deity: "Itzli-Tezcatlipoca", energy: "Foundation and introspection" },
  { start: "1 Cozcacuauhtli", deity: "Xolotl", energy: "Purification and wisdom" },
  { start: "1 Atl", deity: "Chalchiuhtotolin", energy: "Emotion and flow" },
  { start: "1 Ehecatl", deity: "Chantico", energy: "Wind and communication" },
  { start: "1 Cuauhtli", deity: "Xochiquetzal", energy: "Vision and freedom" },
  { start: "1 Tochtli", deity: "Xiuhtecuhtli", energy: "Fertility and abundance" }
];
