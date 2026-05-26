import React from 'react';

interface DaySignGlyphProps {
  index: number;
  nahuatl: string;
  size?: 'sm' | 'md' | 'lg';
}

const daySignImages: Record<number, { src: string; alt: string }> = {
  1:  { src: '/day-signs/cipactli.svg',     alt: 'Cipactli - Crocodile' },
  2:  { src: '/day-signs/ehecatl.svg',      alt: 'Ehecatl - Wind' },
  3:  { src: '/day-signs/calli.svg',        alt: 'Calli - House' },
  4:  { src: '/day-signs/cuetzpallin.svg',  alt: 'Cuetzpallin - Lizard' },
  5:  { src: '/day-signs/coatl.svg',        alt: 'Coatl - Serpent' },
  6:  { src: '/day-signs/miquiztli.svg',    alt: 'Miquiztli - Death' },
  7:  { src: '/day-signs/mazatl.svg',       alt: 'Mazatl - Deer' },
  8:  { src: '/day-signs/tochtli.svg',      alt: 'Tochtli - Rabbit' },
  9:  { src: '/day-signs/atl.svg',          alt: 'Atl - Water' },
  10: { src: '/day-signs/izquintli.svg',     alt: 'Itzcuintli - Dog' },
  11: { src: '/day-signs/ozomatli.svg',     alt: 'Ozomatli - Monkey' },
  12: { src: '/day-signs/malinalli.svg',    alt: 'Malinalli - Grass' },
  13: { src: '/day-signs/acatl.svg',        alt: 'Acatl - Reed' },
  14: { src: '/day-signs/ocelotl.svg',      alt: 'Ocelotl - Jaguar' },
  15: { src: '/day-signs/cuauhtli.svg',     alt: 'Cuauhtli - Eagle' },
  16: { src: '/day-signs/cozcacuauhtli.svg',alt: 'Cozcacuauhtli - Vulture' },
  17: { src: '/day-signs/ollin.svg',        alt: 'Ollin - Movement' },
  18: { src: '/day-signs/tecpatl.svg',      alt: 'Tecpatl - Flint' },
  19: { src: '/day-signs/quiahuitl.svg',    alt: 'Quiahuitl - Rain' },
  20: { src: '/day-signs/xochitl.svg',      alt: 'Xochitl - Flower' },
};

export function DaySignGlyph({ index, nahuatl, size = 'md' }: DaySignGlyphProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  const glyph = daySignImages[index];
  const className = "w-full h-full object-contain";

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center text-amber-700`}>
      {glyph ? (
        <img src={glyph.src} alt={glyph.alt} className={className} />
      ) : (
        <svg viewBox="0 0 100 100" className={className} fill="currentColor">
          <circle cx="50" cy="50" r="30" />
        </svg>
      )}
    </div>
  );
}
