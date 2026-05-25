// Aztec Calendar Calculation Utilities
// Using the GMT+2 correlation (Gregorian-Mayan-Tonalpohualli)
// Base date: August 11, 3114 BCE (Julian) = September 6, -3113 (Gregorian proleptic)
// For simplicity, we'll use a known modern correlation point:
// January 1, 2000 CE = 9 Ehecatl (day sign 2, number 9)

const KNOWN_DATE = new Date(2000, 0, 1); // January 1, 2000
const KNOWN_DAY_SIGN = 2; // Ehecatl (index 2, but 0-based means position 1)
const KNOWN_SACRED_NUMBER = 9;

// Xiuhpohualli (365-day solar calendar) reference
// Year 2025 = 13 Calli, begins March 12, 2025 at midnight (12am CST, Mexico City time)
const KNOWN_YEAR_DATE = new Date(2025, 2, 12); // March 12, 2025
const KNOWN_YEAR_BEARER = 3; // Calli (House) - day sign index 3
const KNOWN_YEAR_NUMBER = 13;
const KNOWN_YEAR_HOUR = 0; // midnight — Calli years always begin at midnight (12am CST)

// Start hour is determined by year bearer sign, not a sequential cycle.
// Together the four 6-hour quarters account for the ~6h annual drift (≈ Gregorian leap year).
// All times are CST (Mexico City local time).
const YEAR_BEARER_HOURS: { [sign: number]: number } = {
  8:  6,  // Tochtli (Rabbit) → 6am
  13: 12, // Acatl   (Reed)   → noon (12pm)
  18: 18, // Tecpatl (Flint)  → 6pm
  3:  0,  // Calli   (House)  → midnight (12am)
};

export interface TonalliResult {
  daySign: number; // 1-20
  sacredNumber: number; // 1-13
  dayName: string;
  gregorianDate: Date;
  daysElapsed: number;
}

export interface YearBearerResult {
  yearSign: number; // 1-20 (will be one of: Calli-3, Tochtli-8, Acatl-13, Tecpatl-18)
  yearNumber: number; // 1-13
  yearName: string;
  startDate: Date;
  startHour: number; // 0, 6, 12, or 18
  yearInCycle: number; // 1-52 (position in Calendar Round)
}

/**
 * Calculate the number of days between two dates
 */
function daysBetween(date1: Date, date2: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / msPerDay);
}

/**
 * Calculate the Tonalpohualli date for a given Gregorian date
 */
export function calculateTonalli(gregorianDate: Date): TonalliResult {
  // Calculate days elapsed from known date
  const daysElapsed = daysBetween(KNOWN_DATE, gregorianDate);
  
  // Calculate day sign (cycles through 1-20)
  // We need to adjust because our known date is at position 2
  let daySignRaw = ((KNOWN_DAY_SIGN - 1 + daysElapsed) % 20);
  if (daySignRaw < 0) daySignRaw += 20;
  const daySign = daySignRaw + 1; // Convert to 1-based
  
  // Calculate sacred number (cycles through 1-13)
  let sacredNumberRaw = ((KNOWN_SACRED_NUMBER - 1 + daysElapsed) % 13);
  if (sacredNumberRaw < 0) sacredNumberRaw += 13;
  const sacredNumber = sacredNumberRaw + 1; // Convert to 1-based
  
  return {
    daySign,
    sacredNumber,
    dayName: `${sacredNumber}-${daySign}`,
    gregorianDate,
    daysElapsed
  };
}

/**
 * Get the trecena (13-day period) information for a given tonalli
 */
export function getTrecenaIndex(daySign: number, sacredNumber: number): number {
  // A trecena starts when sacredNumber is 1
  // The trecena is identified by which day sign starts it
  // There are 20 trecenas in the 260-day cycle
  
  // Calculate which trecena we're in
  // Each trecena starts with number 1
  // The day signs cycle: 1, 8, 15, 2, 9, 16, 3, 10, 17, 4, 11, 18, 5, 12, 19, 6, 13, 20, 7, 14
  
  const trecenaStarts = [1, 8, 15, 2, 9, 16, 3, 10, 17, 4, 11, 18, 5, 12, 19, 6, 13, 20, 7, 14];
  
  // Calculate position in cycle (0-259)
  const position = ((daySign - 1) + (sacredNumber - 1) * 20) % 260;
  
  // Find which trecena this falls into
  const trecenaIndex = Math.floor(position / 13);
  
  return trecenaIndex;
}

/**
 * Get the position within the current trecena (1-13)
 */
export function getTrecenaPosition(sacredNumber: number): number {
  return sacredNumber;
}

/**
 * Calculate today's tonalli
 */
export function calculateTodaysTonalli(): TonalliResult {
  return calculateTonalli(new Date());
}

/**
 * Validate a date is within reasonable bounds
 */
export function isValidDateRange(date: Date): boolean {
  const year = date.getFullYear();
  return year >= 1900 && year <= 2100;
}

/**
 * Calculate the Xiuhpohualli year bearer for a given date
 * Year bearers cycle through: Calli (3), Tochtli (8), Acatl (13), Tecpatl (18)
 * Each year advances 5 positions in day signs and 1 position in numbers
 * New year begins on March 12 each year
 */
export function calculateYearBearer(gregorianDate: Date): YearBearerResult {
  // Determine which Xiuhpohualli year this date falls in
  const currentYearStart = new Date(gregorianDate.getFullYear(), 2, 12); // March 12
  const nextYearStart = new Date(gregorianDate.getFullYear() + 1, 2, 12);
  
  // If before March 12, we're in the previous Xiuhpohualli year
  let relevantYearStart: Date;
  if (gregorianDate < currentYearStart) {
    relevantYearStart = new Date(gregorianDate.getFullYear() - 1, 2, 12);
  } else {
    relevantYearStart = currentYearStart;
  }
  
  // Calculate years elapsed from known year (2025 = 13 Calli)
  const yearsElapsed = relevantYearStart.getFullYear() - KNOWN_YEAR_DATE.getFullYear();
  
  // Year bearers advance 5 positions each year, cycling through indices: 3, 8, 13, 18 (Calli, Tochtli, Acatl, Tecpatl)
  // But we need to track which of the 4 year bearers we're on
  const yearBearerCycle = [3, 8, 13, 18]; // Calli, Tochtli, Acatl, Tecpatl
  const knownYearBearerIndex = yearBearerCycle.indexOf(KNOWN_YEAR_BEARER); // 0 for Calli
  
  // Each year advances to the next year bearer (wraps after 4)
  let yearBearerIndex = (knownYearBearerIndex + yearsElapsed) % 4;
  if (yearBearerIndex < 0) yearBearerIndex += 4;
  const yearSign = yearBearerCycle[yearBearerIndex];
  
  // Sacred number cycles 1-13
  let yearNumber = ((KNOWN_YEAR_NUMBER - 1 + yearsElapsed) % 13);
  if (yearNumber < 0) yearNumber += 13;
  yearNumber = yearNumber + 1; // Convert to 1-based
  
  // Start hour is fixed per year bearer sign (CST, Mexico City time):
  //   Tochtli → 6am | Acatl → midnight | Tecpatl → 6pm | Calli → noon
  const startHour = YEAR_BEARER_HOURS[yearSign] ?? 0;
  
  // Calculate position in 52-year Calendar Round
  // The Calendar Round completes when both the 365-day and 260-day calendars return to the same position
  const yearInCycle = ((yearsElapsed % 52) + 1);
  
  return {
    yearSign,
    yearNumber,
    yearName: `${yearNumber}-${yearSign}`,
    startDate: relevantYearStart,
    startHour,
    yearInCycle: yearInCycle > 0 ? yearInCycle : yearInCycle + 52
  };
}

/**
 * Get the year bearer day sign names
 */
export function getYearBearerName(yearSign: number): string {
  const yearBearerNames: { [key: number]: { nahuatl: string; english: string } } = {
    3: { nahuatl: 'Calli', english: 'House' },
    8: { nahuatl: 'Tochtli', english: 'Rabbit' },
    13: { nahuatl: 'Acatl', english: 'Reed' },
    18: { nahuatl: 'Tecpatl', english: 'Flint' }
  };
  
  const bearer = yearBearerNames[yearSign];
  return bearer ? `${bearer.nahuatl} (${bearer.english})` : '';
}

/**
 * Check whether a given year is a Gregorian leap year
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Calculate position in Xiuhpohualli (day of year in 365-day calendar)
 */
export function calculateXiuhpohualli(gregorianDate: Date): {
  dayOfYear: number;
  monthName: string;
  monthDay: number;
} {
  const yearBearer = calculateYearBearer(gregorianDate);
  const yearStart = yearBearer.startDate;

  // Calculate days since year start
  let dayOfYear = daysBetween(yearStart, gregorianDate) + 1;

  // The Xiuhpohualli is always exactly 365 days — it has no leap year.
  // yearStart is always March 12, so any Feb 29 that falls inside this year
  // period belongs to yearStart.getFullYear() + 1.
  // If that year is a leap year and Feb 29 has already passed by gregorianDate,
  // subtract 1 so the Aztec day count stays within 1–365.
  const nextCalYear = yearStart.getFullYear() + 1;
  if (isLeapYear(nextCalYear)) {
    const feb29 = new Date(nextCalYear, 1, 29); // Feb 29 of the following calendar year
    if (feb29 <= gregorianDate) {
      dayOfYear -= 1;
    }
  }

  // Safety clamp — should never be needed, but guards against edge cases
  dayOfYear = Math.max(1, Math.min(365, dayOfYear));
  
  // Xiuhpohualli has 18 months of 20 days + 5 unlucky days (Nemontemi)
  const xiuhpohualli_months = [
    'Atlcahualo', 'Tlacaxipehualiztli', 'Tozoztontli', 'Hueytozoztli',
    'Toxcatl', 'Etzalcualiztli', 'Tecuilhuitontli', 'Hueytecuilhuitl',
    'Tlaxochimaco', 'Xocotlhuetzi', 'Ochpaniztli', 'Teotleco',
    'Tepeilhuitl', 'Quecholli', 'Panquetzaliztli', 'Atemoztli',
    'Tititl', 'Izcalli', 'Nemontemi'
  ];
  
  let monthIndex: number;
  let monthDay: number;
  
  if (dayOfYear <= 360) {
    // Regular 18 months of 20 days
    monthIndex = Math.floor((dayOfYear - 1) / 20);
    monthDay = ((dayOfYear - 1) % 20) + 1;
  } else {
    // Nemontemi (unlucky 5 days)
    monthIndex = 18;
    monthDay = dayOfYear - 360;
  }
  
  return {
    dayOfYear,
    monthName: xiuhpohualli_months[monthIndex] || 'Unknown',
    monthDay
  };
}
