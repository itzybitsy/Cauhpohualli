import React from 'react';
import calliImage from 'figma:asset/9693347614e4653a8de079daa0b49107a337f253.png';
import malinalliImage from 'figma:asset/29236ccac6519a7921ae802bdf991a4ed0de9570.png';
import acatlImage from 'figma:asset/7b2504f08f13b7c9a049b5b99409056db2c2288e.png';
import coatlImage from 'figma:asset/6d3adcf9d2b3f14916fdb9da6b1f4306d6346af4.png';
import cuauhtliImage from 'figma:asset/0a39ade5648ad43e1a7a5647237ea679aad109e0.png';
import cozcacuauhtliImage from 'figma:asset/b08628ab7bf4f8c2d7a6b6d613d4f6e66f956b32.png';
import cipactliImage from 'figma:asset/4e6379b1bb8528052b377dc743647e9f0520ed26.png';
import ehecatlImage from 'figma:asset/1f53f6a8ccdf76943d4594fc9469766532620ba5.png';
import itzcuintliImage from 'figma:asset/7d114074db7352eb2e312bc4ad677293e137d675.png';
import ocelotlImage from 'figma:asset/2c2e3fe377ec824c1da2661b910e0a366e4e92ec.png';
import quiahuitlImage from 'figma:asset/20402696b2270fe27a732eacfd5c1fadf062a80b.png';
import mazatlImage from 'figma:asset/16961b72dfdce05c0598c19c98133f7f8ef37d4f.png';
import miquiztliImage from 'figma:asset/1aff21192dae6bad931f6ffaaaa8a84ecfd556be.png';
import ozomatliImage from 'figma:asset/4cea41e62be914d77ce03d2cbfd4327033e2da69.png';
import ollinImage from 'figma:asset/b43b63f03aff41671d22e9a556567bd02fbb1a4d.png';
import tochtliImage from 'figma:asset/46e6d014af618da30285366ad3680774e790c159.png';
import tecpatlImage from 'figma:asset/f56503b79a4c190b3e3985caf005bba9c22e0338.png';
import xochitlImage from 'figma:asset/68a5bf22f120a24f3ef57b6fe7c6ac52ae8f9dcd.png';
import cuetzpallinImage from 'figma:asset/491f899ea5f3fc199070627d309e33fdb4671100.png';
import atlImage from 'figma:asset/e8977194c7e38e753c1660ed4deb3d56e6274d4f.png';

interface DaySignGlyphProps {
  index: number;
  nahuatl: string;
  size?: 'sm' | 'md' | 'lg';
}

export function DaySignGlyph({ index, nahuatl, size = 'md' }: DaySignGlyphProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  // Simplified symbolic representations of the 20 day signs
  const renderGlyph = () => {
    const className = "w-full h-full object-contain";
    
    switch (index) {
      case 1: // Cipactli - Crocodile
        return (
          <img src={cipactliImage} alt="Cipactli - Crocodile" className={className} />
        );
      case 2: // Ehecatl - Wind
        return (
          <img src={ehecatlImage} alt="Ehecatl - Wind" className={className} />
        );
      case 3: // Calli - House
        return (
          <img src={calliImage} alt="Calli - House" className={className} />
        );
      case 4: // Cuetzpallin - Lizard
        return (
          <img src={cuetzpallinImage} alt="Cuetzpallin - Lizard" className={className} />
        );
      case 5: // Coatl - Serpent
        return (
          <img src={coatlImage} alt="Coatl - Serpent" className={className} />
        );
      case 6: // Miquiztli - Death/Skull
        return (
          <img src={miquiztliImage} alt="Miquiztli - Death" className={className} />
        );
      case 7: // Mazatl - Deer
        return (
          <img src={mazatlImage} alt="Mazatl - Deer" className={className} />
        );
      case 8: // Tochtli - Rabbit
        return (
          <img src={tochtliImage} alt="Tochtli - Rabbit" className={className} />
        );
      case 9: // Atl - Water
        return (
          <img src={atlImage} alt="Atl - Water" className={className} />
        );
      case 10: // Itzcuintli - Dog
        return (
          <img src={itzcuintliImage} alt="Itzcuintli - Dog" className={className} />
        );
      case 11: // Ozomatli - Monkey
        return (
          <img src={ozomatliImage} alt="Ozomatli - Monkey" className={className} />
        );
      case 12: // Malinalli - Grass
        return (
          <img src={malinalliImage} alt="Malinalli - Grass" className={className} />
        );
      case 13: // Acatl - Reed
        return (
          <img src={acatlImage} alt="Acatl - Reed" className={className} />
        );
      case 14: // Ocelotl - Jaguar
        return (
          <img src={ocelotlImage} alt="Ocelotl - Jaguar" className={className} />
        );
      case 15: // Cuauhtli - Eagle
        return (
          <img src={cuauhtliImage} alt="Cuauhtli - Eagle" className={className} />
        );
      case 16: // Cozcacuauhtli - Vulture
        return (
          <img src={cozcacuauhtliImage} alt="Cozcacuauhtli - Vulture" className={className} />
        );
      case 17: // Ollin - Movement
        return (
          <img src={ollinImage} alt="Ollin - Movement" className={className} />
        );
      case 18: // Tecpatl - Flint
        return (
          <img src={tecpatlImage} alt="Tecpatl - Flint" className={className} />
        );
      case 19: // Quiahuitl - Rain
        return (
          <img src={quiahuitlImage} alt="Quiahuitl - Rain" className={className} />
        );
      case 20: // Xochitl - Flower
        return (
          <img src={xochitlImage} alt="Xochitl - Flower" className={className} />
        );
      default:
        return (
          <svg viewBox="0 0 100 100" className={className} fill="currentColor">
            <circle cx="50" cy="50" r="30" />
          </svg>
        );
    }
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center text-amber-700`}>
      {renderGlyph()}
    </div>
  );
}