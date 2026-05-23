import React, { useState } from 'react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { DaySignGlyph } from './components/DaySignGlyph';
import { SacredNumberDots } from './components/SacredNumberDots';
import { SunBackground } from './components/SunBackground';
import { MusicPlayer } from './components/MusicPlayer';
import { daySignsData, sacredNumbersData, trecenas } from './data/tonalpohualli';
import { calculateTonalli, getTrecenaIndex, calculateYearBearer, getYearBearerName, calculateXiuhpohualli } from './utils/calendar-calculations';
import backdropImage from 'figma:asset/8930464629a42240efdd75ff18113e7b768ca274.png';

export default function App() {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [result, setResult] = useState<{
    daySign: typeof daySignsData[0];
    sacredNumber: typeof sacredNumbersData[0];
    trecenaInfo: typeof trecenas[0];
    date: Date;
    yearBearer: ReturnType<typeof calculateYearBearer>;
    xiuhpohualli: ReturnType<typeof calculateXiuhpohualli>;
  } | null>(null);

  // Calculate today's Tonalpohualli energy
  const today = new Date();
  const todayTonalli = calculateTonalli(today);
  const todayDaySign = daySignsData[todayTonalli.daySign - 1];
  const todaySacredNumber = sacredNumbersData[todayTonalli.sacredNumber - 1];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 126 }, (_, i) => 2025 - i);

  const handleCalculate = () => {
    if (!day || !month || !year) {
      return;
    }

    const monthIndex = months.indexOf(month);
    const birthDate = new Date(parseInt(year), monthIndex, parseInt(day));
    
    const tonalli = calculateTonalli(birthDate);
    const daySignData = daySignsData[tonalli.daySign - 1];
    const sacredNumberData = sacredNumbersData[tonalli.sacredNumber - 1];
    const trecenaIdx = getTrecenaIndex(tonalli.daySign, tonalli.sacredNumber);
    const trecenaInfo = trecenas[trecenaIdx];
    const yearBearer = calculateYearBearer(birthDate);
    const xiuhpohualli = calculateXiuhpohualli(birthDate);

    setResult({
      daySign: daySignData,
      sacredNumber: sacredNumberData,
      trecenaInfo,
      date: birthDate,
      yearBearer,
      xiuhpohualli
    });

    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background image with overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backdropImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-amber-50/80 via-orange-50/85 to-red-50/80 z-0" />
      <SunBackground />
      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* Header Section */}
        <header className="text-center mb-12 pt-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 100 100" className="w-12 h-12 text-amber-100">
                <circle cx="50" cy="50" r="35" fill="currentColor" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M50,15 L50,25 M50,75 L50,85 M15,50 L25,50 M75,50 L85,50" stroke="currentColor" strokeWidth="3" />
                <path d="M28,28 L35,35 M72,28 L65,35 M72,72 L65,65 M28,72 L35,65" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
          
          <h1 className="mb-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-red-800 to-amber-800 font-bold" style={{ fontFamily: 'Times New Roman, serif', fontSize: '24px' }}>
            Tonalamatl Calculator
          </h1>
          <p className="text-amber-900/70 max-w-2xl mx-auto mb-4">
            Discover your energy day in the ancient Aztec sacred calendar. The Tonalpohualli is a 260-day cycle combining 20 day signs with 13 sacred numbers.
          </p>
        </header>

        {/* Today's Sign Energy Section */}
        <Card className="mb-8 bg-white/40 backdrop-blur-md shadow-xl border border-white/50">
          <div className="p-6">
            <h2 className="text-center mb-4 text-amber-900" style={{ fontFamily: 'Times New Roman, serif', fontSize: '24px' }}>
              Today's Sign Energy
            </h2>
            <p className="text-center text-amber-800/70 mb-4">
              {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Day Sign */}
              <div className="text-center bg-white/15 backdrop-blur-md p-6 rounded-lg border border-white/50 shadow-lg">
                <p className="text-amber-800/70 mb-2 font-bold">Day Sign</p>
                <div className="flex justify-center mb-2">
                  <DaySignGlyph 
                    index={todayDaySign.index} 
                    nahuatl={todayDaySign.nahuatl}
                    size="md"
                  />
                </div>
                <p className="text-amber-900">{todayDaySign.nahuatl}</p>
                <p className="text-amber-800/70">{todayDaySign.english}</p>
              </div>

              {/* Sacred Number and Complete Day */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Sacred Number */}
                <div className="text-center bg-white/15 backdrop-blur-md p-6 rounded-lg border border-white/50 shadow-lg">
                  <p className="text-amber-800/70 mb-2 font-bold">Sacred Number</p>
                  <div className="flex justify-center mb-2">
                    <SacredNumberDots number={todaySacredNumber.number} size="md" />
                  </div>
                  <p className="text-amber-900">{todaySacredNumber.number}</p>
                </div>

                {/* Complete Day Name */}
                <div className="text-center bg-white/15 backdrop-blur-md p-6 rounded-lg border border-white/50 shadow-lg">
                  <p className="text-amber-800/70 mb-4 font-bold">Complete Day</p>
                  <div>
                    <p className="text-amber-900">
                      {todaySacredNumber.number} {todayDaySign.nahuatl}
                    </p>
                    <p className="text-amber-700 mt-2 italic text-sm">
                      {todayDaySign.meaning}
                    </p>
                    <p className="text-amber-800/70 mt-3 text-sm max-w-xs text-left">
                      {todayDaySign.characteristics}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Date Input Section */}
        <Card className="mb-12 bg-white/40 backdrop-blur-md shadow-xl border border-white/50">
          <div className="p-8">
            <h2 className="text-center mb-6 text-amber-900 font-bold" style={{ fontFamily: 'Times New Roman, serif', fontSize: '24px' }}>Enter Your Birth Date</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block mb-2 text-amber-800">Day</label>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger className="bg-amber-50">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(d => (
                      <SelectItem key={d} value={d.toString()}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2 text-amber-800">Month</label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger className="bg-amber-50">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2 text-amber-800">Year</label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="bg-amber-50">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(y => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleCalculate}
              disabled={!day || !month || !year}
              className="w-full bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 shadow-lg"
            >
              Discover Your Tonalli
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {result && (
          <div id="results" className="space-y-8 animate-in fade-in duration-700">
            {/* Primary Energy Day Display */}
            <Card className="bg-white/40 backdrop-blur-md shadow-2xl border border-white/50 overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-red-600/10" />
                <div className="relative p-8 text-center">
                  <div className="mb-6">
                    <p className="text-amber-800/70 mb-2" style={{ fontFamily: 'Times New Roman, serif', fontSize: '24px' }}>Your Sacred Day Sign</p>
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-900 to-red-900 mb-1">
                      {result.daySign.nahuatl.toUpperCase()}
                    </h2>
                    <p className="text-amber-800">{result.daySign.english}</p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <DaySignGlyph 
                      index={result.daySign.index} 
                      nahuatl={result.daySign.nahuatl}
                      size="lg"
                    />
                  </div>

                  <div className="mt-6 mb-4">
                    <p className="text-amber-900 font-bold mb-2">Sacred Number</p>
                    <div className="inline-block px-8 py-4 bg-amber-100/60 backdrop-blur-sm rounded-lg border border-amber-200/50">
                      <span className="text-amber-900">{result.sacredNumber.number}</span>
                    </div>
                  </div>

                  <SacredNumberDots number={result.sacredNumber.number} size="lg" />

                  <div className="mt-6 mb-6">
                    <p className="text-amber-900 font-bold mb-3">Complete Day Name</p>
                    <div className="inline-block px-8 py-4 bg-amber-100/60 backdrop-blur-sm rounded-lg border border-amber-200/50">
                      <span className="text-amber-900">
                        {result.sacredNumber.number} {result.daySign.nahuatl}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Detailed Information Tabs */}
            <Card className="bg-white/40 backdrop-blur-md shadow-xl border border-white/50">
              <Tabs defaultValue="meaning" className="p-6">
                <div className="overflow-x-auto -mx-6 px-6 pb-2">
                  <TabsList className="inline-flex w-auto min-w-full md:grid md:w-full md:grid-cols-5 gap-2 bg-white/50 backdrop-blur-sm">
                    <TabsTrigger value="meaning" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white whitespace-nowrap">
                      Day Sign
                    </TabsTrigger>
                    <TabsTrigger value="deity" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white whitespace-nowrap">
                      Deity
                    </TabsTrigger>
                    <TabsTrigger value="number" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white whitespace-nowrap">
                      Number
                    </TabsTrigger>
                    <TabsTrigger value="trecena" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white whitespace-nowrap">
                      Trecena
                    </TabsTrigger>
                    <TabsTrigger value="xiuhpohualli" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white whitespace-nowrap">
                      Year Bearer
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="meaning" className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-amber-900 mb-2">Meaning & Symbolism</h3>
                    <p className="text-amber-800/80">{result.daySign.meaning}</p>
                  </div>
                  <div>
                    <h3 className="text-amber-900 mb-2">Characteristics</h3>
                    <p className="text-amber-800/80">{result.daySign.characteristics}</p>
                  </div>
                  {result.daySign.direction && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50">
                        <p className="text-amber-700 mb-1">Direction</p>
                        <p className="text-amber-900">{result.daySign.direction}</p>
                      </div>
                      <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50">
                        <p className="text-amber-700 mb-1">Element</p>
                        <p className="text-amber-900">{result.daySign.element}</p>
                      </div>
                      <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50">
                        <p className="text-amber-700 mb-1">Color</p>
                        <p className="text-amber-900 capitalize">{result.daySign.color}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="deity" className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-amber-900 mb-2">Ruling Deity</h3>
                    <p className="text-amber-900">{result.daySign.deity}</p>
                  </div>
                  <div>
                    <p className="text-amber-800/80">{result.daySign.deityDescription}</p>
                  </div>
                  <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50 mt-4">
                    <p className="text-amber-800/80">
                      The deity {result.daySign.deity} watches over those born under {result.daySign.nahuatl}, 
                      guiding them with divine energy and protection throughout their life journey.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="number" className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-amber-900 mb-2">Sacred Number {result.sacredNumber.number}</h3>
                    <p className="text-amber-800/80">{result.sacredNumber.meaning}</p>
                  </div>
                  <div>
                    <h3 className="text-amber-900 mb-2">Numerical Energy</h3>
                    <p className="text-amber-800/80">{result.sacredNumber.energy}</p>
                  </div>
                  <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50 mt-4">
                    <p className="text-amber-800/80">
                      The sacred number {result.sacredNumber.number} modifies and enhances the qualities of {result.daySign.nahuatl}, 
                      creating a unique energetic signature for your birth day.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="trecena" className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-amber-900 mb-2">Trecena (13-Day Period)</h3>
                    <p className="text-amber-800/80">
                      Your day falls within the trecena beginning with <strong>{result.trecenaInfo.start}</strong>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-amber-900 mb-2">Trecena Ruling Deity</h3>
                    <p className="text-amber-800/80">{result.trecenaInfo.deity}</p>
                  </div>
                  <div>
                    <h3 className="text-amber-900 mb-2">Period Energy</h3>
                    <p className="text-amber-800/80">{result.trecenaInfo.energy}</p>
                  </div>
                  <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50 mt-4">
                    <p className="text-amber-800/80">
                      The trecena is a 13-day period in the Tonalpohualli, each ruled by a specific deity. 
                      The energy of your trecena influences the overall character of your birth day.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="xiuhpohualli" className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-amber-900 mb-2">Year Bearer</h3>
                    <p className="text-amber-800/80">
                      <strong>{result.yearBearer.yearNumber} {getYearBearerName(result.yearBearer.yearSign)}</strong>
                    </p>
                    <p className="text-amber-700 mt-2">
                      Year begins: {result.yearBearer.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {result.yearBearer.startHour === 0 ? 'midnight' : result.yearBearer.startHour === 6 ? '6am' : result.yearBearer.startHour === 12 ? 'noon' : '6pm'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50">
                      <div className="flex items-center justify-center mb-3">
                        <DaySignGlyph 
                          index={result.yearBearer.yearSign} 
                          nahuatl={getYearBearerName(result.yearBearer.yearSign).split(' ')[0]}
                          size="md"
                        />
                      </div>
                      <p className="text-center text-amber-900">
                        Year Sign Glyph
                      </p>
                    </div>
                    
                    <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50">
                      <p className="text-amber-700 mb-2">Calendar Round Position</p>
                      <p className="text-amber-900">Year {result.yearBearer.yearInCycle} of 52</p>
                      <div className="mt-3 w-full bg-amber-200 rounded-full h-2.5">
                        <div 
                          className="bg-amber-600 h-2.5 rounded-full transition-all duration-500" 
                          style={{ width: `${(result.yearBearer.yearInCycle / 52) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-amber-900 mb-2">Xiuhpohualli Date</h3>
                    <p className="text-amber-800/80">
                      Day {result.xiuhpohualli.dayOfYear} of the year: {result.xiuhpohualli.monthName}, Day {result.xiuhpohualli.monthDay}
                    </p>
                  </div>

                  <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50 mt-4">
                    <p className="text-amber-800/80">
                      The Xiuhpohualli is the 365-day solar calendar used alongside the Tonalpohualli. Each year is named 
                      for its year bearer—one of four day signs (Calli, Tochtli, Acatl, Tecpatl) combined with a number 1-13. 
                      The new year begins on March 12, and each year starts at a different quarter of the day (advancing 6 hours annually). 
                      The 52-year Calendar Round is completed when both calendars return to the same starting position.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Educational Section */}
            <Card className="bg-white/40 backdrop-blur-md shadow-xl border border-white/50">
              <div className="p-6">
                <h2 className="text-center mb-6 text-amber-900" style={{ fontFamily: 'Times New Roman, serif', fontSize: '24px' }}>Learn About the Tonalpohualli</h2>
                
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-amber-900 hover:text-amber-700">
                      What is the Tonalpohualli?
                    </AccordionTrigger>
                    <AccordionContent className="text-amber-800/80">
                      The Tonalpohualli, meaning "count of days," is the sacred 260-day calendar used by the Aztecs 
                      and other Mesoamerican civilizations. It combines 20 day signs (tonalli) with 13 sacred numbers 
                      to create unique energy patterns. Each day carries specific spiritual significance and was used 
                      for divination, determining auspicious dates, and understanding personal destiny.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-amber-900 hover:text-amber-700">
                      The 20 Day Signs
                    </AccordionTrigger>
                    <AccordionContent className="text-amber-800/80">
                      <div className="space-y-3">
                        <p>The 20 day signs represent animals, natural forces, and concepts. Each carries unique energy:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {daySignsData.map((sign) => (
                            <div key={sign.index} className="flex items-center gap-2 bg-amber-100/60 backdrop-blur-sm p-2 rounded border border-amber-200/50">
                              <DaySignGlyph index={sign.index} nahuatl={sign.nahuatl} size="sm" />
                              <div>
                                <p className="text-amber-900">{sign.nahuatl} ({sign.english})</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-amber-900 hover:text-amber-700">
                      The 13 Sacred Numbers
                    </AccordionTrigger>
                    <AccordionContent className="text-amber-800/80">
                      <div className="space-y-3">
                        <p>
                          The numbers 1 through 13 each carry spiritual significance. They represent levels of energy 
                          and consciousness, from the unity of 1 to the transcendence of 13. When combined with a day 
                          sign, they create one of 260 possible combinations.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {sacredNumbersData.map((num) => (
                            <div key={num.number} className="bg-amber-100/60 backdrop-blur-sm p-3 rounded border border-amber-200/50">
                              <p className="text-amber-900 mb-1">{num.number} - {num.meaning}</p>
                              <p className="text-amber-700">{num.energy}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-amber-900 hover:text-amber-700">
                      Historical Significance
                    </AccordionTrigger>
                    <AccordionContent className="text-amber-800/80">
                      The Tonalpohualli was central to Aztec religious and social life. Priests used it to determine 
                      favorable days for ceremonies, agriculture, warfare, and personal events. Children were often 
                      named after their birth day sign. The calendar was recorded in sacred books called tonalamatl, 
                      painted on bark paper or deerskin. This ancient system reflects sophisticated astronomical knowledge 
                      and deep spiritual understanding.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-amber-900 hover:text-amber-700">
                      How the Calendar Works
                    </AccordionTrigger>
                    <AccordionContent className="text-amber-800/80">
                      The Tonalpohualli cycles continuously through all 260 combinations of the 20 day signs and 13 
                      numbers. After reaching 13-Xochitl (13 Flower), it returns to 1-Cipactli (1 Crocodile). This 
                      260-day cycle meshes with the 365-day solar calendar (Xiuhpohualli) to create the 52-year 
                      Calendar Round, a complete cycle requiring 18,980 days. Each person's birth day determines their 
                      personal tonalli—their day sign and number—which influences their character and destiny.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-amber-900 hover:text-amber-700">
                      The Xiuhpohualli & Year Bearers
                    </AccordionTrigger>
                    <AccordionContent className="text-amber-800/80">
                      <div className="space-y-3">
                        <p>
                          The Xiuhpohualli is the 365-day solar calendar consisting of 18 months of 20 days each, plus 
                          5 unlucky days called Nemontemi. Each year is named for its "year bearer"—a specific day sign 
                          combined with a sacred number.
                        </p>
                        <p>
                          Only four day signs can be year bearers: <strong>Calli (House), Tochtli (Rabbit), Acatl (Reed), 
                          and Tecpatl (Flint)</strong>. These cycle in order, each paired with numbers 1-13. The new year 
                          begins on <strong>March 12</strong> each year.
                        </p>
                        <p>
                          Each year starts at a different quarter of the day, advancing 6 hours annually in this sequence: 
                          6pm → midnight → 6am → noon → 6pm. After 52 years, both the 260-day and 365-day calendars return 
                          to their original positions, completing the Calendar Round.
                        </p>
                        <div className="bg-amber-100/60 backdrop-blur-sm p-3 rounded border border-amber-200/50 mt-3">
                          <p className="text-amber-900 mb-2">Current Year (2025):</p>
                          <p className="text-amber-800">
                            <strong>13 Calli (13 House)</strong> — begins March 12, 2025 at 6pm
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>

            {/* Cultural Note */}
            <Card className="bg-white/40 backdrop-blur-md border-2 border-amber-300/50 shadow-xl">
              <div className="p-6 text-center">
                <p className="text-amber-800/80">
                  This calculator honors the sacred calendar system of the Aztec people. The Tonalpohualli represents 
                  centuries of astronomical observation, spiritual wisdom, and cultural heritage. We present it with 
                  deep respect for its historical and ongoing significance to indigenous peoples of Mexico.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
      
      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}