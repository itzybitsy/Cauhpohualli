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
const backdropImage = '/background.png';

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
      <div className="fixed inset-0 bg-black/60 z-0" />
      <SunBackground />
      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* Header Section */}
        <header className="text-center mb-12 pt-8">
          <div className="inline-block mb-4">
            <img
              src="/Cauhpohualli_logo.png"
              alt="Cauhpohualli logo"
              className="w-36 h-36 mx-auto mb-4 object-contain drop-shadow-lg"
            />
          </div>
          
          <h1 className="mb-3 text-white font-bold text-4xl md:text-5xl tracking-wide" style={{ fontFamily: 'Times New Roman, serif' }}>
            Tonalamatl Calculator
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto mb-4 text-sm md:text-base">
            Discover your energy day in the ancient Aztec sacred calendar. The Tonalpohualli is a 260-day cycle combining 20 day signs with 13 sacred numbers.
          </p>
        </header>

        {/* Today's Sign Energy Section */}
        <Card className="mb-8 bg-white/40 backdrop-blur-md shadow-xl border border-white/50">
          <div className="p-6">
            <p className="text-center text-white/60 mb-1 text-xs uppercase tracking-widest font-semibold">At a Glance</p>
            <h2 className="text-center mb-4 text-white font-semibold text-xl" style={{ fontFamily: 'Times New Roman, serif' }}>
              Today's Sign Energy
            </h2>
            <p className="text-center text-white/80 mb-4">
              {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center divide-y md:divide-y-0 md:divide-x divide-white/30">
              {/* Day Sign */}
              <div className="text-center px-8 py-4">
                <p className="text-white/60 mb-2 text-xs uppercase tracking-widest font-semibold">Day Sign</p>
                <div className="flex justify-center mb-2">
                  <DaySignGlyph
                    index={todayDaySign.index}
                    nahuatl={todayDaySign.nahuatl}
                    size="md"
                  />
                </div>
                <p className="text-white">{todayDaySign.nahuatl}</p>
                <p className="text-white/70">{todayDaySign.english}</p>
              </div>

              {/* Sacred Number */}
              <div className="text-center px-8 py-4">
                <p className="text-white/60 mb-2 text-xs uppercase tracking-widest font-semibold">Sacred Number</p>
                <div className="flex justify-center mb-2">
                  <SacredNumberDots number={todaySacredNumber.number} size="md" />
                </div>
                <p className="text-white">{todaySacredNumber.number}</p>
              </div>

              {/* Complete Day Name */}
              <div className="text-center px-8 py-4">
                <p className="text-white mb-4 text-xs uppercase tracking-widest font-semibold">Complete Day</p>
                <p className="text-white">
                  {todaySacredNumber.number} {todayDaySign.nahuatl}
                </p>
                <p className="text-white/80 mt-2 italic text-sm">
                  {todayDaySign.meaning}
                </p>
                <p className="text-white/70 mt-3 text-sm max-w-xs text-center md:text-left">
                  {todayDaySign.characteristics}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Date Input Section */}
        <Card className="mb-12 bg-white/40 backdrop-blur-md shadow-xl border border-white/50">
          <div className="p-8">
            <p className="text-center text-white/60 mb-1 text-xs uppercase tracking-widest font-semibold">Find out more about your Aztec day sign</p>
            <h2 className="text-center mb-6 text-white font-semibold text-xl" style={{ fontFamily: 'Times New Roman, serif' }}>Enter Your Birth Date</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block mb-2 text-white/90">Day</label>
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
                <label className="block mb-2 text-white/90">Month</label>
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
                <label className="block mb-2 text-white/90">Year</label>
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
                    <p className="text-white/60 mb-2 text-xs uppercase tracking-widest font-semibold">Your Sacred Day Sign</p>
                    <h2 className="text-white mb-1 text-5xl font-bold tracking-wide" style={{ fontFamily: 'Times New Roman, serif' }}>
                      {result.daySign.nahuatl.toUpperCase()}
                    </h2>
                    <p className="text-white/70 text-sm italic mt-1">{result.daySign.english}</p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <DaySignGlyph 
                      index={result.daySign.index} 
                      nahuatl={result.daySign.nahuatl}
                      size="lg"
                    />
                  </div>

                  <div className="mt-6 mb-4">
                    <p className="text-white/60 mb-2 text-xs uppercase tracking-widest font-semibold">Sacred Number</p>
                    <div className="inline-block px-8 py-4 bg-amber-100/60 backdrop-blur-sm rounded-lg border border-amber-200/50">
                      <span className="text-black text-2xl font-bold">{result.sacredNumber.number}</span>
                    </div>
                  </div>

                  <SacredNumberDots number={result.sacredNumber.number} size="lg" />

                  <div className="mt-6 mb-6">
                    <p className="text-white mb-3 text-xs uppercase tracking-widest font-semibold">Complete Day Name</p>
                    <div className="inline-block px-8 py-4 bg-amber-100/60 backdrop-blur-sm rounded-lg border border-amber-200/50">
                      <span className="text-black text-xl font-semibold">
                        {result.sacredNumber.number} {result.daySign.nahuatl}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Nemontemi Banner */}
            {result.xiuhpohualli.monthName === 'Nemontemi' && (
              <Card className="bg-gradient-to-br from-slate-700/70 to-slate-900/70 backdrop-blur-md shadow-2xl border border-slate-400/40 overflow-hidden">
                <div className="relative p-6 md:p-8">
                  {/* subtle decorative ring */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-4 border-slate-400/20 pointer-events-none" />
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full border-4 border-slate-400/10 pointer-events-none" />

                  <div className="relative text-center">
                    <p className="text-slate-300/80 mb-1 text-xs uppercase tracking-widest font-semibold">
                      Xiuhpohualli · Day {result.xiuhpohualli.dayOfYear} of 365
                    </p>
                    <h3 className="text-white text-3xl font-bold mb-1 tracking-wide" style={{ fontFamily: 'Times New Roman, serif' }}>
                      Nemontemi
                    </h3>
                    <p className="text-slate-300/70 italic text-sm mb-5">
                      Day {result.xiuhpohualli.monthDay} of 5 · The Empty Days
                    </p>

                    <div className="flex justify-center gap-2 mb-6">
                      {[1, 2, 3, 4, 5].map((d) => (
                        <div
                          key={d}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                            d === result.xiuhpohualli.monthDay
                              ? 'bg-slate-300 border-slate-200 text-slate-900'
                              : 'bg-slate-600/40 border-slate-500/50 text-slate-400'
                          }`}
                        >
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-500/30 p-5 text-left max-w-xl mx-auto">
                      <p className="text-slate-200 leading-relaxed">
                        Nemontemi are the <strong className="text-white">5 empty days</strong> that close the 365-day
                        solar year — a sacred pause beyond the reach of ordinary time. They are set apart for
                        rest, reflection, and inner renewal, so that the world may breathe and gather strength
                        before the new cycle begins.
                      </p>
                      <p className="text-slate-300/80 mt-3 leading-relaxed">
                        To be born during the Nemontemi is to carry the energy of the threshold — the still
                        point between endings and beginnings. You arrived in a moment of quiet power, poised
                        at the edge of a new cycle, shaped by rest and rebirth.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

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
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Meaning & Symbolism</h3>
                    <p className="text-white/80">{result.daySign.meaning}</p>
                  </div>
                  <div>
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Characteristics</h3>
                    <p className="text-white/80">{result.daySign.characteristics}</p>
                  </div>
                  {result.daySign.direction && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50">
                        <p className="text-black/80 mb-1">Direction</p>
                        <p className="text-black">{result.daySign.direction}</p>
                      </div>
                      <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50">
                        <p className="text-black/80 mb-1">Element</p>
                        <p className="text-black">{result.daySign.element}</p>
                      </div>
                      <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50">
                        <p className="text-black/80 mb-1">Color</p>
                        <p className="text-black capitalize">{result.daySign.color}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="deity" className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Ruling Deity</h3>
                    <p className="text-white">{result.daySign.deity}</p>
                  </div>
                  <div>
                    <p className="text-white/80">{result.daySign.deityDescription}</p>
                  </div>
                  <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50 mt-4">
                    <p className="text-black/80">
                      The deity {result.daySign.deity} watches over those born under {result.daySign.nahuatl}, 
                      guiding them with divine energy and protection throughout their life journey.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="number" className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Sacred Number {result.sacredNumber.number}</h3>
                    <p className="text-white/80">{result.sacredNumber.meaning}</p>
                  </div>
                  <div>
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Numerical Energy</h3>
                    <p className="text-white/80">{result.sacredNumber.energy}</p>
                  </div>
                  <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50 mt-4">
                    <p className="text-black/80">
                      The sacred number {result.sacredNumber.number} modifies and enhances the qualities of {result.daySign.nahuatl}, 
                      creating a unique energetic signature for your birth day.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="trecena" className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Trecena (13-Day Period)</h3>
                    <p className="text-white/80">
                      Your day falls within the trecena beginning with <strong>{result.trecenaInfo.start}</strong>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Trecena Ruling Deity</h3>
                    <p className="text-white/80">{result.trecenaInfo.deity}</p>
                  </div>
                  <div>
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Period Energy</h3>
                    <p className="text-white/80">{result.trecenaInfo.energy}</p>
                  </div>
                  <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50 mt-4">
                    <p className="text-black/80">
                      The trecena is a 13-day period in the Tonalpohualli, each ruled by a specific deity. 
                      The energy of your trecena influences the overall character of your birth day.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="xiuhpohualli" className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Year Bearer</h3>
                    <p className="text-white/80">
                      <strong>{result.yearBearer.yearNumber} {getYearBearerName(result.yearBearer.yearSign)}</strong>
                    </p>
                    <p className="text-white/80 mt-2">
                      Year begins: {result.yearBearer.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {result.yearBearer.startHour === 0 ? 'midnight (12am)' : result.yearBearer.startHour === 6 ? '6am' : result.yearBearer.startHour === 12 ? 'noon (12pm)' : '6pm'} CST (Mexico City time)
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
                      <p className="text-center text-black">
                        Year Sign Glyph
                      </p>
                    </div>
                    
                    <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50">
                      <p className="text-black/80 mb-2">Calendar Round Position</p>
                      <p className="text-black">Year {result.yearBearer.yearInCycle} of 52</p>
                      <div className="mt-3 w-full bg-amber-200 rounded-full h-2.5">
                        <div 
                          className="bg-amber-600 h-2.5 rounded-full transition-all duration-500" 
                          style={{ width: `${(result.yearBearer.yearInCycle / 52) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white/60 mb-2 text-xs uppercase tracking-widest font-bold">Xiuhpohualli Date</h3>
                    <p className="text-white/80">
                      Day {result.xiuhpohualli.dayOfYear} of the year: {result.xiuhpohualli.monthName}, Day {result.xiuhpohualli.monthDay}
                    </p>
                  </div>

                  <div className="bg-amber-100/60 backdrop-blur-sm p-4 rounded-lg border border-amber-200/50 mt-4">
                    <p className="text-black/80">
                      The Xiuhpohualli is the 365-day solar calendar used alongside the Tonalpohualli. Each year is named 
                      for its year bearer—one of four day signs (Calli, Tochtli, Acatl, Tecpatl) combined with a number 1-13. 
                      The new year begins on March 12, and each year starts at a different quarter of the day (advancing 6 hours annually). 
                      The 52-year Calendar Round is completed when both calendars return to the same starting position.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Educational Section - moved to footer */}
            {/* Cultural Note - moved to footer */}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-12">
        <div className="container mx-auto px-4 pb-24 max-w-5xl space-y-8">
          <Card className="bg-white/40 backdrop-blur-md shadow-xl border border-white/50">
            <div className="p-6">
              <p className="text-center text-white/60 mb-1 text-xs uppercase tracking-widest font-semibold">Education</p>
              <h2 className="text-center mb-6 text-white font-semibold text-xl" style={{ fontFamily: 'Times New Roman, serif' }}>Learn About the Tonalpohualli</h2>
                
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-white hover:text-white/80">
                      What is the Tonalpohualli?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      The Tonalpohualli, meaning "count of days," is the sacred 260-day calendar used by the Aztecs 
                      and other Mesoamerican civilizations. It combines 20 day signs (tonalli) with 13 sacred numbers 
                      to create unique energy patterns. Each day carries specific spiritual significance and was used 
                      for divination, determining auspicious dates, and understanding personal destiny.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-white hover:text-white/80">
                      The 20 Day Signs
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      <div className="space-y-3">
                        <p>The 20 day signs represent animals, natural forces, and concepts. Each carries unique energy:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {daySignsData.map((sign) => (
                            <div key={sign.index} className="flex items-center gap-2 bg-amber-100/60 backdrop-blur-sm p-2 rounded border border-amber-200/50">
                              <DaySignGlyph index={sign.index} nahuatl={sign.nahuatl} size="sm" />
                              <div>
                                <p className="text-black">{sign.nahuatl} ({sign.english})</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-white hover:text-white/80">
                      The 13 Sacred Numbers
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      <div className="space-y-3">
                        <p>
                          The numbers 1 through 13 each carry spiritual significance. They represent levels of energy 
                          and consciousness, from the unity of 1 to the transcendence of 13. When combined with a day 
                          sign, they create one of 260 possible combinations.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {sacredNumbersData.map((num) => (
                            <div key={num.number} className="bg-amber-100/60 backdrop-blur-sm p-3 rounded border border-amber-200/50">
                              <p className="text-black mb-1">{num.number} - {num.meaning}</p>
                              <p className="text-black/80">{num.energy}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-white hover:text-white/80">
                      Historical Significance
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      The Tonalpohualli was central to Aztec religious and social life. Priests used it to determine 
                      favorable days for ceremonies, agriculture, warfare, and personal events. Children were often 
                      named after their birth day sign. The calendar was recorded in sacred books called tonalamatl, 
                      painted on bark paper or deerskin. This ancient system reflects sophisticated astronomical knowledge 
                      and deep spiritual understanding.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-white hover:text-white/80">
                      How the Calendar Works
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      The Tonalpohualli cycles continuously through all 260 combinations of the 20 day signs and 13 
                      numbers. After reaching 13-Xochitl (13 Flower), it returns to 1-Cipactli (1 Crocodile). This 
                      260-day cycle meshes with the 365-day solar calendar (Xiuhpohualli) to create the 52-year 
                      Calendar Round, a complete cycle requiring 18,980 days. Each person's birth day determines their 
                      personal tonalli—their day sign and number—which influences their character and destiny.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-white hover:text-white/80">
                      The Xiuhpohualli & Year Bearers
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
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
                          Each year's start time is determined by its year bearer sign — the four bearers each
                          correspond to one quarter of the day (all times in <strong>CST, Mexico City time</strong>):
                        </p>
                        <div className="grid grid-cols-2 gap-2 my-3">
                          <div className="bg-amber-100/60 backdrop-blur-sm p-3 rounded border border-amber-200/50">
                            <p className="text-black font-semibold">Tochtli (Rabbit)</p>
                            <p className="text-black/80">6am CST</p>
                          </div>
                          <div className="bg-amber-100/60 backdrop-blur-sm p-3 rounded border border-amber-200/50">
                            <p className="text-black font-semibold">Acatl (Reed)</p>
                            <p className="text-black/80">12pm — noon CST</p>
                          </div>
                          <div className="bg-amber-100/60 backdrop-blur-sm p-3 rounded border border-amber-200/50">
                            <p className="text-black font-semibold">Tecpatl (Flint)</p>
                            <p className="text-black/80">6pm CST</p>
                          </div>
                          <div className="bg-amber-100/60 backdrop-blur-sm p-3 rounded border border-amber-200/50">
                            <p className="text-black font-semibold">Calli (House)</p>
                            <p className="text-black/80">12am — midnight CST</p>
                          </div>
                        </div>
                        <p>
                          These four 6-hour quarters together account for the ~6-hour annual drift between the
                          Xiuhpohualli and the solar year — the same drift that the Gregorian calendar corrects
                          with a leap day every four years. After 52 years both the 260-day and 365-day calendars
                          return to the same position, completing the Calendar Round.
                        </p>
                        <div className="bg-amber-100/60 backdrop-blur-sm p-3 rounded border border-amber-200/50 mt-3">
                          <p className="text-black mb-2">Current Year (2025):</p>
                          <p className="text-black/90">
                            <strong>13 Calli (13 House)</strong> — begins March 12, 2025 at midnight (12am CST)
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-white hover:text-white/80">
                      The Nemontemi — The 5 Empty Days
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      <div className="space-y-3">
                        <p>
                          After the 18 regular months of the Xiuhpohualli come the <strong>Nemontemi</strong> — five
                          nameless, empty days that close the solar year. Falling at the very end of the 365-day cycle
                          (days 361–365), these days sit outside the normal flow of time and sacred energy.
                        </p>
                        <p>
                          The Aztecs regarded the Nemontemi as a liminal, unlucky period. Ordinary life came to a pause:
                          people avoided starting new endeavors, conflicts, or celebrations. Instead, communities turned
                          inward — fasting, resting, and performing quiet rituals of cleansing and renewal to prepare
                          themselves spiritually for the new year ahead.
                        </p>
                        <p>
                          Far from being a curse, the Nemontemi were seen as a necessary threshold — a sacred pause woven
                          into the fabric of time itself, allowing the world to breathe before the next great cycle began.
                        </p>
                        <div className="bg-amber-100/60 backdrop-blur-sm p-3 rounded border border-amber-200/50 mt-2">
                          <p className="text-black font-semibold mb-1">The 5 Nemontemi Days</p>
                          <p className="text-black/80">
                            Day 361 → Day 365 of the Xiuhpohualli year (following the month of Izcalli).
                            Each day is unnamed and carries no day sign patron — they belong to no trecena
                            and hold no place in the Tonalpohualli.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>

          <Card className="bg-white/40 backdrop-blur-md border-2 border-amber-300/50 shadow-xl">
            <div className="p-6 text-center">
              <p className="text-white/90">
                This calculator honors the sacred calendar system of the Aztec people. The Tonalpohualli represents
                centuries of astronomical observation, spiritual wisdom, and cultural heritage. We present it with
                deep respect for its historical and ongoing significance to indigenous peoples of Mexico.
              </p>
            </div>
          </Card>

          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <div className="p-5 text-center">
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-2">Source & Attribution</p>
              <p className="text-white/80 text-sm italic">
                Calendar data and correlations taken from:
              </p>
              <p className="text-white text-sm font-semibold mt-1">
                <span className="italic">Cauhpohualli: Cómputo del tiempo azteca y su correlación actual</span>
              </p>
              <p className="text-white/80 text-sm mt-0.5">
                by Arturo Meza Gutiérrez
              </p>
              <hr className="border-white/20 my-3" />
              <p className="text-white/80 text-sm italic">Audio:</p>
              <p className="text-white text-sm font-semibold mt-1">Gabriel Rivera</p>
            </div>
          </Card>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}