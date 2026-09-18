import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Building2,
  Users,
  TrendingUp,
  AlertTriangle,
  Sliders,
  Leaf,
  Train,
  Zap,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Info,
  Sparkles,
  Layers,
  CheckCircle2,
  RotateCcw,
  Compass,
  FileText,
  ArrowRight,
  BarChart3,
  SlidersHorizontal,
  Award,
  User
} from 'lucide-react';

// --- DATA TYPES & CONSTANTS ---

interface CityData {
  id: string;
  name: string;
  country: string;
  population: string;
  popNumber: number;
  gdp: string;
  density: string;
  densityNum: number;
  slumPercent: number;
  aqi: number;
  hdi: number;
  image: string;
  tagline: string;
  description: string;
  keyChallenges: string[];
  keySolutions: string[];
}

const CITIES: CityData[] = [
  {
    id: 'tokyo',
    name: 'Tokio-Jokohama',
    country: 'Japonia',
    population: '37.4 mln',
    popNumber: 37.4,
    gdp: '$2 050 mld',
    density: '4 400 os./km²',
    densityNum: 4400,
    slumPercent: 0,
    aqi: 28,
    hdi: 0.925,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Największy zespół miejski świata i lider infrastruktury',
    description: 'Wzorzec zrównoważonej metropolii o potężnym systemie szynowym, borykający się z kryzysem demograficznym i ryzykiem sejsmicznym.',
    keyChallenges: [
      'Starzenie się społeczeństwa i ujemny przyrost naturalny',
      'Wysokie ryzyko sejsmiczne (Uwalisko Kanto)',
      'Ekstremalne zagęszczenie w węzłach przesiadkowych'
    ],
    keySolutions: [
      'Gęsta sieć pociągów wysokich prędkości (Shinkansen)',
      'Rygorystyczne normy budownictwa antysejsmicznego',
      'Podziemne zbiorniki retencyjne chroniące przed powodziami'
    ]
  },
  {
    id: 'delhi',
    name: 'Delhi',
    country: 'Indie',
    population: '32.9 mln',
    popNumber: 32.9,
    gdp: '$370 mld',
    density: '11 300 os./km²',
    densityNum: 11300,
    slumPercent: 35,
    aqi: 280,
    hdi: 0.640,
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Dynamicznie rosnąca metropolia Azji Południowej',
    description: 'Metropolia o wyjątkowym tempie wzrostu demograficznego, zmagająca się z katastrofalnym smogiem i wykluczeniem społecznym.',
    keyChallenges: [
      'Ekstremalny smog (PM2.5 wielokrotnie przekraczające normy WHO)',
      'Brak rozwiniętej sieci kanalizacyjnej i skażenie wód',
      'Niekontrolowany rozwój osiedli tymczasowych (slumsów)'
    ],
    keySolutions: [
      'Rozbudowa bezemisyjnej sieci Metra w Delhi',
      'Konwersja floty komunikacji miejskiej na paliwo CNG',
      'Programy rewitalizacji i doprowadzania bieżącej wody'
    ]
  },
  {
    id: 'shanghai',
    name: 'Szanghaj',
    country: 'Chiny',
    population: '29.2 mln',
    popNumber: 29.2,
    gdp: '$1 100 mld',
    density: '4 600 os./km²',
    densityNum: 4600,
    slumPercent: 5,
    aqi: 85,
    hdi: 0.850,
    image: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Globalny hub finansowy i portowy Azji Wschodniej',
    description: 'Centrum chińskiej gospodarki z zaawansowanym systemem zarządzania miejskiego opartym na cyfryzacji i sztucznej inteligencji.',
    keyChallenges: [
      'Osiadanie gruntu i zagrożenie podnoszącym się poziomem mórz',
      'Ogromna ilość wytwarzanych odpadów komunalnych',
      'Wysokie koszty nieruchomości wypierające młodszych mieszkańców'
    ],
    keySolutions: [
      'Systemy AI sterujące ruchem ulicznym (City Brain)',
      'Najdłuższa sieć metra na świecie (ponad 800 km linii)',
      'Rygorystyczny, obowiązkowy system segregacji odpadów'
    ]
  },
  {
    id: 'dhaka',
    name: 'Dhaka',
    country: 'Bangladesz',
    population: '23.2 mln',
    popNumber: 23.2,
    gdp: '$160 mld',
    density: '30 100 os./km²',
    densityNum: 30100,
    slumPercent: 42,
    aqi: 210,
    hdi: 0.602,
    image: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Najgęściej zaludnione megamiasto świata',
    description: 'Cel masowej migracji klimatycznej z obszarów wiejskich zalewanych przez podnoszący się poziom wód w delcie Gangesu.',
    keyChallenges: [
      'Skrajny paraliż komunikacyjny (niskie prędkości średnie)',
      'Ponad 40% mieszkańców bez stałego dostępu do wody pitnej',
      'Wysokie zagrożenie powodziowe w okresie monsunowym'
    ],
    keySolutions: [
      'Uruchomienie pierwszej linii kolei nadziemnej MRT',
      'Budowa wałów przeciwpowodziowych i kanałów retencyjnych',
      'Przenoszenie usług do podstref podmiejskich'
    ]
  },
  {
    id: 'saopaulo',
    name: 'São Paulo',
    country: 'Brazylia',
    population: '22.6 mln',
    popNumber: 22.6,
    gdp: '$480 mld',
    density: '8 000 os./km²',
    densityNum: 8000,
    slumPercent: 22,
    aqi: 62,
    hdi: 0.814,
    image: 'https://images.unsplash.com/photo-1578002171601-902a5a7645a4?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Gospodarcza stolica Ameryki Południowej',
    description: 'Metropolia o znacznych kontrastach społeczno-przestrzennych, gdzie nowo powstające wieżowce sąsiadują z favelami.',
    keyChallenges: [
      'Rozrost nieformalnych dzielnic mieszkaniowych (Faveli)',
      'Okresowe niedobory wody pitnej i kryzysy suszy',
      'Wysoki poziom segregacji przestrzennej mieszkańców'
    ],
    keySolutions: [
      'Programy uzbrajania faveli w infrastrukturę techniczną',
      'Budowa podziemnych zbiorników retencyjnych na deszczówkę',
      'Wspieranie komunikacji zbiorowej opartej na bioetanolu'
    ]
  },
  {
    id: 'cairo',
    name: 'Kair',
    country: 'Egipt',
    population: '22.1 mln',
    popNumber: 22.1,
    gdp: '$210 mld',
    density: '19 300 os./km²',
    densityNum: 19300,
    slumPercent: 38,
    aqi: 165,
    hdi: 0.731,
    image: 'https://images.unsplash.com/photo-1572252821143-0259b39d73d6?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Największy zespół miejski Afryki Północnej',
    description: 'Historyczna metropolia nad Nilem zmagająca się z przeludnieniem, prowadząca projekt budowy Nowej Stolicy na pustyni.',
    keyChallenges: [
      'Przeludnienie starych dzielnic mieszkaniowych',
      'Wyzwania związane ze zbieraniem i recyklingiem odpadów',
      'Deficyt terenów zielonych w przeliczeniu na mieszkańca'
    ],
    keySolutions: [
      'Budowa Nowej Stolicy Administracyjnej (NAC)',
      'Rozbudowa systemu kolei jednoszynowej (Monorail)',
      'Formalizacja i modernizacja tradycyjnego recyklingu'
    ]
  }
];

interface ChallengeCard {
  id: string;
  title: string;
  subtitle: string;
  severity: number;
  category: string;
  causes: string[];
  effects: string[];
  summaryNote: string;
}

const CHALLENGES: ChallengeCard[] = [
  {
    id: 'slums',
    title: 'Slumsy i Dzielnice Nędzy',
    subtitle: 'Niekontrolowany napływ ludności i wykluczenie przestrzenne',
    severity: 94,
    category: 'Problemy Społeczno-Demograficzne',
    causes: [
      'Gwałtowny napływ ludności ze wsi do miast (eksplozja demograficzna)',
      'Niewystarczający zasób taniego mieszkalnictwa socjalnego',
      'Niski poziom dochodów i wysoki udział szarej strefy'
    ],
    effects: [
      'Powstawanie samowoli budowlanych na terenach niebezpiecznych',
      'Brak bieżącej wody, kanalizacji oraz elektryczności',
      'Wzrost przestępczości i trudności z utrzymaniem bezpieczeństwa'
    ],
    summaryNote: 'Terminologia regionalna osiedli nędzy: Favely (Brazylia), Bidonvilles (Północna Afryka/Indochiny), Townships (RPA).'
  },
  {
    id: 'smog',
    title: 'Smog i Paraliż Transportowy',
    subtitle: 'Przekroczenie przepustowości dróg i niska jakość powietrza',
    severity: 90,
    category: 'Ochrona Środowiska i Transport',
    causes: [
      'Wysoka liczba prywatnych pojazdów spalinowych',
      'Niewystarczający udział transportu szynowego w przewozach',
      'Emisje z przemysłu oraz domowych instalacji grzewczych'
    ],
    effects: [
      'Powstawanie smogu fotochemicznego oraz kwaśnego',
      'Straty czasowe i gospodarcze generowane przez korki',
      'Wzrost zachorowań na schorzenia układu oddechowego'
    ],
    summaryNote: 'Smog fotochemiczny występuje w ciepłych strefach klimatycznych przy dużym nasłonecznieniu i natężeniu ruchu kołowego.'
  },
  {
    id: 'water',
    title: 'Kryzys Wodny i Zagospodarowanie Ścieków',
    subtitle: 'Bariery zasobowe środowiska miejskiego',
    severity: 86,
    category: 'Gospodarka Wodna i Środowisko',
    causes: [
      'Pobór wód podziemnych przewyższający ich naturalne odnawianie',
      'Niewydolność miejskich oczyszczalni ścieków',
      'Wysokie straty wody w przestarzałych sieciach wodociągowych'
    ],
    effects: [
      'Zjawisko całkowitego wyczerpania zapasów wody ("Dzień Zero")',
      'Skażenie wód powierzchniowych i podziemnych',
      'Osiadanie terenu pod ciężarem metropolii'
    ],
    summaryNote: 'Nadmierna eksploatacja wód podziemnych powoduje osiadanie gruntów w wielu megamiastach, np. w Dżakarcie czy Meksyku.'
  },
  {
    id: 'heat',
    title: 'Miejska Wyspa Ciepła (UHI)',
    subtitle: 'Zaburzenia mikroklimatu obszarów silnie zurbanizowanych',
    severity: 82,
    category: 'Klimat Miejski',
    causes: [
      'Zastąpienie powierzchni przepuszczalnych asfaltem i betonem',
      'Sztuczna emisja ciepła z pojazdów, przemysłu i klimatyzacji',
      'Zaburzenie naturalnej cyrkulacji powietrza przez wysoką zabudowę'
    ],
    effects: [
      'Wyższa temperatura w centrum miasta o 3-8°C w porównaniu z obrzeżami',
      'Brak infiltracji deszczówki prowadzący do powodzi błyskawicznych',
      'Zwiększone zapotrzebowanie na energię do chłodzenia budynków'
    ],
    summaryNote: 'Przeciwdziałanie UHI polega na wprowadzaniu terenów zieleni, zielonych dachów oraz nawierzchni przepuszczalnych.'
  }
];

// Historical Urban Growth Data (Slide 1 Chart)
const URBAN_GROWTH_DATA = [
  { year: '1950', pop: 0.75, megacities: 2 },
  { year: '1970', pop: 1.35, megacities: 4 },
  { year: '1990', pop: 2.25, megacities: 10 },
  { year: '2010', pop: 3.55, megacities: 23 },
  { year: '2026', pop: 4.40, megacities: 45 },
  { year: '2050', pop: 6.68, megacities: 62 }
];

// Economic Tier Options for City Builder
const COUNTRY_TIERS = [
  { id: 'developed', label: 'Wysokorozwinięty (Japonia/USA - PKB $48 000/os.)', gdpPerCapita: 48000, baseSlum: 1 },
  { id: 'mid', label: 'Średniorozwinięty (Chiny/Brazylia - PKB $14 000/os.)', gdpPerCapita: 14000, baseSlum: 18 },
  { id: 'developing', label: 'Rozwijający się (Indie/Bangladesz - PKB $3 400/os.)', gdpPerCapita: 3400, baseSlum: 44 }
];

// --- MAIN COMPONENT ---

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const totalSlides = 7; // 7 dedicated slides

  // Modals & Drawers
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [showSummaryNotes, setShowSummaryNotes] = useState<boolean>(false);

  // Slide 1 Chart Hover State
  const [hoveredGrowthIndex, setHoveredGrowthIndex] = useState<number>(4);

  // Slide 3 Interactive State
  const [selectedCityId, setSelectedCityId] = useState<string>('tokyo');
  const [cityMetricTab, setCityMetricTab] = useState<'pop' | 'aqi' | 'hdi' | 'slum'>('pop');

  // Slide 4 Interactive State
  const [activeChallengeId, setActiveChallengeId] = useState<string>('slums');
  const [uhiDistance, setUhiDistance] = useState<number>(50);

  // Slide 5 Simulator State
  const [simGreen, setSimGreen] = useState<number>(45);
  const [simTransit, setSimTransit] = useState<number>(55);
  const [simHousing, setSimHousing] = useState<number>(40);
  const [simSmart, setSimSmart] = useState<number>(50);

  // SLAJD 6: KREATOR WŁASNEGO MIASTA OD 0 (DEDYOWANY SLAJD)
  const [builderName, setBuilderName] = useState<string>('Neo-Aglomeracja');
  const [builderCountryTier, setBuilderCountryTier] = useState<string>('mid');
  const [builderPop, setBuilderPop] = useState<number>(16.5); // mln
  const [builderArea, setBuilderArea] = useState<number>(1400); // km2
  const [builderProfile, setBuilderProfile] = useState<'global' | 'industry' | 'admin'>('global');
  const [builderZoning, setBuilderZoning] = useState<'low' | 'med' | 'high'>('high');
  const [builderTransit, setBuilderTransit] = useState<'road' | 'bus' | 'rail'>('rail');
  const [builderHousingInvest, setBuilderHousingInvest] = useState<number>(55); // %
  const [builderEco, setBuilderEco] = useState<number>(65); // %
  const [builderParks, setBuilderParks] = useState<number>(50); // %

  // Transition Direction
  const [direction, setDirection] = useState<number>(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        setShowDrawer(false);
        setShowSummaryNotes(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  // Calculations for Simulator (Slide 5)
  const calculateIndex = () => {
    const score = (simGreen * 0.3) + (simTransit * 0.25) + (simHousing * 0.25) + (simSmart * 0.2);
    return Math.round(score);
  };

  const getStatusText = (score: number) => {
    if (score < 45) {
      return {
        label: 'Kryzys Strukturalny i Środowiskowy',
        desc: 'Niska jakość życia, powszechny paraliż komunikacyjny oraz brak retencji wód i zieleni miejskiej.',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    } else if (score < 70) {
      return {
        label: 'Tradycyjne Miasto w Fazie Transformacji',
        desc: 'Podstawowa infrastruktura funkcjonuje, ale miasto wymaga dalszych inwestycji w transport zbiorowy.',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    } else if (score < 88) {
      return {
        label: 'Zrównoważony Zespół Miejski',
        desc: 'Wysoki udział transportu bezemisyjnego, rozwinięta sieć parków oraz sprawna retencja deszczówki.',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    } else {
      return {
        label: 'Modelowe Eko-Smart City',
        desc: 'Zeroemisyjność, zintegrowane zarządzanie IoT, zielone dachy oraz wysoki standard życia mieszkańców.',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
      };
    }
  };

  // ADVANCED CITY BUILDER CALCULATIONS (Slide 6)
  const calcAdvancedBuilderStats = () => {
    const country = COUNTRY_TIERS.find((t) => t.id === builderCountryTier) || COUNTRY_TIERS[1];
    
    // 1. Density
    const densityNum = Math.round((builderPop * 1000000) / builderArea);

    // 2. City GDP ($ mld)
    const gdpMultiplier = builderProfile === 'global' ? 1.45 : builderProfile === 'industry' ? 1.15 : 1.0;
    const totalGdpBillion = Math.round((builderPop * country.gdpPerCapita * gdpMultiplier) / 1000);

    // 3. Estimated Slum %
    const densityPenalty = densityNum > 11000 ? (densityNum - 11000) / 400 : 0;
    const housingMitigation = (builderHousingInvest / 100) * 0.75;
    let slumPercent = Math.max(0, Math.round((country.baseSlum + densityPenalty) * (1 - housingMitigation)));

    // 4. Air Quality Smog (AQI)
    const profileAqiBase = builderProfile === 'industry' ? 130 : builderProfile === 'global' ? 50 : 75;
    const transitBonus = builderTransit === 'rail' ? 45 : builderTransit === 'bus' ? 20 : 0;
    const countryAqiBase = country.id === 'developing' ? 90 : country.id === 'mid' ? 45 : 15;
    let aqi = Math.max(15, Math.round(profileAqiBase + countryAqiBase - (builderEco * 0.8) - transitBonus));

    // 5. CO2 Emission (t/capita)
    let co2 = Math.max(1.8, (country.gdpPerCapita / 4200) * (1.2 - builderEco * 0.006));

    // 6. Overall Sustainability Score
    let score = Math.round(
      (100 - slumPercent * 0.8) * 0.3 +
      (Math.max(0, 300 - aqi) / 3) * 0.25 +
      (builderParks * 0.2) +
      (builderTransit === 'rail' ? 25 : builderTransit === 'bus' ? 15 : 5) * 1.0
    );
    score = Math.min(100, Math.max(10, score));

    return {
      densityNum,
      totalGdpBillion,
      slumPercent,
      aqi,
      co2: co2.toFixed(1),
      score,
      countryName: country.label
    };
  };

  const advStats = calcAdvancedBuilderStats();

  const getResembledCity = () => {
    const { densityNum, aqi, slumPercent } = advStats;

    if (builderCountryTier === 'developed') {
      if (builderEco >= 70 && builderTransit === 'rail') {
        return {
          name: 'Singapur / Kopenhaga',
          reason: 'Wzorcowe Eko-Smart City z bezemisyjną siecią metra, bujną zielenią miejską i minimalną emisją CO₂.'
        };
      }
      if (densityNum > 8000 || builderZoning === 'high') {
        return {
          name: 'Tokio (Japonia) / Nowy Jork (USA)',
          reason: 'Wysokie PKB, gęsta zabudowa wieżowcowa i potężny system komunikacji szynowej przy zminimalizowanym braku mieszkań.'
        };
      }
      return {
        name: 'Londyn (Wielka Brytania) / Paryż (Francja)',
        reason: 'Dojrzała metropolia kraju wysokorozwiniętego o zrównoważonej strukturze usługowo-finansowej.'
      };
    }

    if (builderCountryTier === 'developing') {
      if (densityNum > 18000 || slumPercent > 35) {
        return {
          name: 'Dhaka (Bangladesz) / Mumbaj (Indie)',
        reason: 'Ekstremalnie wysoka gęstość zaludnienia, przeludnienie, wysoki udział osiedli tymczasowych (slumsów) oraz wyzwania sanitarne.'
        };
      }
      if (aqi > 150 || builderProfile === 'industry') {
        return {
          name: 'Delhi (Indie) / Karaczi (Pakistan)',
          reason: 'Gwałtowny wzrost ludności połączony z kryzysem jakości powietrza (smog) oraz wyzwaniami infrastrukturalnymi.'
        };
      }
      return {
        name: 'Kair (Egipt) / Lagos (Nigeria)',
        reason: 'Szybko rosnąca metropolia w kraju rozwijającym się, wymagająca masowych inwestycji w nowe dzielnice i transport.'
      };
    }

    // Średniorozwinięty (np. Chiny, Brazylia, Meksyk)
    if (builderProfile === 'global' || (builderZoning === 'high' && builderTransit === 'rail')) {
      return {
        name: 'Szanghaj (Chiny) / Shenzhen',
        reason: 'Nowoczesne centrum gospodarcze Azji z najdłuższą siecią metra, szybką urbanizacją pionową i dominacją globalnych usług.'
      };
    }
    if (slumPercent > 18) {
      return {
        name: 'São Paulo (Brazylia) / Meksyk (CDMX)',
        reason: 'Metropolia o znacznych kontrastach społeczno-przestrzennych, gdzie nowo powstające wieżowce sąsiadują z favelami.'
      };
    }
    return {
      name: 'Pekin (Chiny) / Dżakarta (Indonezja)',
      reason: 'Wielki zespół miejski w fazie intensywnej transformacji ekologicznej i rozbudowy komunikacji zbiorowej.'
    };
  };

  const resembledCity = getResembledCity();
  const currentIndex = calculateIndex();
  const currentStatus = getStatusText(currentIndex);
  const activeCity = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];
  const activeChallenge = CHALLENGES.find((ch) => ch.id === activeChallengeId) || CHALLENGES[0];

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.97
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.97
    })
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col justify-between select-none overflow-x-hidden">
      {/* TOP HEADER WITH AUTHOR SIGNATURE */}
      <header className="z-30 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Geografia Rozszerzona • Klasa 3</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-200 flex items-center gap-1">
                <User className="w-3 h-3 text-emerald-700" />
                <span>Autor: Filip Piechowski</span>
              </span>
            </div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 font-heading">
              Megamiasta i Wyzwania Współczesnej Urbanizacji
            </h1>
          </div>
        </div>

        {/* Header Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setDirection(currentSlide < 5 ? 1 : -1);
              setCurrentSlide(5); // Jump directly to City Creator Slide 6
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
              currentSlide === 5
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Kreator Miasta (Slajd 6)</span>
          </button>

          <button
            onClick={() => setShowSummaryNotes(!showSummaryNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              showSummaryNotes
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Notatki Prezentanta</span>
          </button>

          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Spis Slajdów</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all"
            title="Tryb Pełnoekranowy"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA WITH 7 DEDICATED SLIDES */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 max-w-7xl mx-auto w-full relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full"
          >
            {/* ============================================================ */}
            {/* SLIDE 1: TYTUŁOWY (WITH AUTHOR SIGNATURE & UN SPLASH STOCK PHOTO) */}
            {/* ============================================================ */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column Intro */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Prezentacja Szkolna • Klasa 3 Liceum / Technikum</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold shadow-xs">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Autor: Filip Piechowski</span>
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-heading text-slate-900">
                    Megamiasta <br />
                    <span className="text-emerald-600">i Wyzwania Urbanizacji</span>
                  </h1>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    Analiza przestrzenna, demograficzna i środowiskowa metropolii liczących powyżej 10 milionów mieszkańców. Studium wzrostu aglomeracji oraz wyzwań zrównoważonego rozwoju w XXI wieku.
                  </p>

                  {/* Stock Photo Asset Card */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                    <img
                      src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80"
                      alt="Tokyo Stock Photo"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 text-white">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">Stockowe Zdjęcie Metropolii</span>
                        <div className="text-sm font-bold font-heading">Tokio-Jokohama (37.4 mln mieszkańców)</div>
                        <p className="text-[11px] text-slate-300">Największa aglomeracja świata z zintegrowanym systemem transportu szynowego.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={nextSlide}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-xs hover:bg-emerald-700 transition-all cursor-pointer"
                    >
                      <span>Rozpocznij Prezentację</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-emerald-600" />
                      <span>Nawigacja strzałkami (← →)</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: INTERACTIVE GROWTH CHART */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="minimal-card p-6 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-emerald-600" />
                          <span>Wzrost Populacji Miejskiej Świata (1950 - 2050)</span>
                        </h3>
                        <p className="text-[11px] text-slate-500">Najedź na słupki, aby zobaczyć dane historyczne i prognozy ONZ</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        Dane ONZ
                      </span>
                    </div>

                    <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
                      {URBAN_GROWTH_DATA.map((item, idx) => {
                        const isHovered = hoveredGrowthIndex === idx;
                        const heightPercent = (item.pop / 7.0) * 100;
                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => setHoveredGrowthIndex(idx)}
                            className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                          >
                            <div className="w-full flex justify-center">
                              <div
                                className={`w-full max-w-[36px] rounded-t-lg transition-all duration-300 ${
                                  isHovered
                                    ? 'bg-emerald-600 shadow-md scale-105'
                                    : 'bg-emerald-100 hover:bg-emerald-200'
                                }`}
                                style={{ height: `${Math.max(15, heightPercent * 1.3)}px` }}
                              />
                            </div>
                            <span className={`text-[11px] font-mono font-bold transition-colors ${isHovered ? 'text-emerald-700' : 'text-slate-500'}`}>
                              {item.year}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Wybrany Rok: {URBAN_GROWTH_DATA[hoveredGrowthIndex].year}</div>
                        <div className="text-base font-bold text-slate-900 font-heading">
                          {URBAN_GROWTH_DATA[hoveredGrowthIndex].pop} mld ludności miejskiej
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Liczba Megamiast (&gt;10M)</div>
                        <div className="text-lg font-bold text-emerald-700 font-heading">
                          {URBAN_GROWTH_DATA[hoveredGrowthIndex].megacities} metropolii
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-slate-500">Kraje rozwijające się</div>
                        <div className="text-base font-bold text-emerald-700 font-heading">85% wzrostu</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-slate-500">Autor opracowania</div>
                        <div className="text-base font-bold text-slate-900 font-heading">Filip Piechowski</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* SLIDE 2: DEFINICJA & FORMY URBANIZACJI */}
            {/* ============================================================ */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Slajd 2 z 7 • Klasyfikacja i Pojęcia</div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900">
                    Definicja Megamiasta i Formy Zespołów Miejskich
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Kryteria klasyfikacji metropolii oraz zróżnicowanie morfologiczne aglomeracji na świecie.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1 */}
                  <div className="minimal-card p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 font-heading">1. Kryterium Demograficzne</h3>
                        <span className="text-xs text-emerald-700 font-semibold">Próg Populacyjny ≥ 10 mln Mieszkańców</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Zgodnie z definicją Organizacji Narodów Zjednoczonych (ONZ), megamiastem jest ciągły zespół miejski (aglomeracja) zamieszkany przez <strong>co najmniej 10 milionów osób</strong>.
                    </p>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Eksplozja demograficzna:</strong> Główna przyczyna wzrostu w krajach rozwijających się.</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Migracje ze wsi do miast:</strong> Dążenie do podniesienia standardu życia i pracy.</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="minimal-card p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 font-heading">2. Kryterium Funkcjonalne (Global City)</h3>
                        <span className="text-xs text-slate-500 font-semibold">Rola w Globalnej Sieci Gospodarczej</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Część megamiast pełni rolę miast globalnych (*World Cities*), stanowiąc węzły decyzyjne dla rynków finansowych, korporacji międzynarodowych oraz innowacji.
                    </p>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                        <span><strong>Centra finansowe:</strong> Siedziby giełd (NYSE, Nikkei, TSE) i banków centralnych.</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                        <span><strong>Węzły komunikacyjne:</strong> Największe porty lotnicze i przeładunkowe porty morskie.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formy Zespołów Miejskich */}
                <div className="minimal-card p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-600" />
                    <span>Formy Zespołów Miejskich (Wymagane na Egzaminie)</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-400 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 font-heading">Aglomeracja Monocentryczna</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">1 Dominujący Rdzeń</span>
                      </div>
                      <div className="h-16 w-full bg-white rounded-lg border border-slate-200 flex items-center justify-center relative overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-xs z-10">Rdzeń</div>
                        <div className="absolute w-4 h-4 rounded-full bg-slate-300 top-2 left-4" />
                        <div className="absolute w-4 h-4 rounded-full bg-slate-300 bottom-2 right-6" />
                        <div className="absolute w-4 h-4 rounded-full bg-slate-300 top-3 right-5" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Składa się z jednego głównego miasta centralnego oraz strefy podmiejskiej z mniejszymi miastami satelickimi.
                      </p>
                      <div className="text-[11px] text-slate-500 font-mono pt-1">
                        Przykłady: Warszawa, Paryż, Londyn.
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-400 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 font-heading">Konurbacja</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700">Miasta Równorzędne</span>
                      </div>
                      <div className="h-16 w-full bg-white rounded-lg border border-slate-200 flex items-center justify-around px-4 relative">
                        <div className="w-6 h-6 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center">M1</div>
                        <div className="w-6 h-6 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center">M2</div>
                        <div className="w-6 h-6 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center">M3</div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Zespół miejski powiązanych ze sobą miast o zbliżonej wielkości, bez jednego dominującego ośrodka centralnego.
                      </p>
                      <div className="text-[11px] text-slate-500 font-mono pt-1">
                        Przykłady: GOP (Katowice), Trójmiasto, Zagłębie Ruhry.
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-400 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 font-heading">Megalopolis</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">Pas Zurbanizowany</span>
                      </div>
                      <div className="h-16 w-full bg-white rounded-lg border border-slate-200 flex items-center justify-center px-4 relative">
                        <div className="w-full h-4 bg-emerald-200 rounded-full flex items-center justify-between px-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-700" />
                          <div className="w-3 h-3 rounded-full bg-emerald-700" />
                          <div className="w-3 h-3 rounded-full bg-emerald-700" />
                          <div className="w-3 h-3 rounded-full bg-emerald-700" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Wielki, ciągły pas osadniczy powstały ze zlania się kilku aglomeracji o populacji rzędu kilkudziesięciu milionów.
                      </p>
                      <div className="text-[11px] text-slate-500 font-mono pt-1">
                        Przykłady: BosWash (USA), Tokaido (Japonia).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* SLIDE 3: INTERAKTYWNY ANALIZATOR (UNSPLASH STOCK PHOTOS) */}
            {/* ============================================================ */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Slajd 3 z 7 • Studium Przypadków</div>
                    <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900">
                      Interaktywny Analizator Megamiast
                    </h2>
                    <p className="text-slate-600 text-sm mt-1">
                      Zestawienie wskaźników rozwoju dla 6 metropolii z rzetelnymi fotografiami stockowymi z Unsplash.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {CITIES.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => setSelectedCityId(city.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          selectedCityId === city.id
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-600 pl-2">Porównaj wskaźnik wszystkich miast:</span>
                  <div className="flex gap-1">
                    {(['pop', 'aqi', 'hdi', 'slum'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setCityMetricTab(tab)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          cityMetricTab === tab
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {tab === 'pop' && 'Populacja (mln)'}
                        {tab === 'aqi' && 'Smog (AQI)'}
                        {tab === 'hdi' && 'Indeks HDI'}
                        {tab === 'slum' && '% Slumsów'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="minimal-card p-4 rounded-xl border border-slate-200">
                  <div className="h-28 flex items-end gap-3 px-2">
                    {CITIES.map((c) => {
                      const isSelected = c.id === selectedCityId;
                      let val = c.popNumber;
                      let maxVal = 40;
                      if (cityMetricTab === 'aqi') { val = c.aqi; maxVal = 300; }
                      if (cityMetricTab === 'hdi') { val = c.hdi * 100; maxVal = 100; }
                      if (cityMetricTab === 'slum') { val = c.slumPercent; maxVal = 50; }

                      const pct = (val / maxVal) * 100;

                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedCityId(c.id)}
                          className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                        >
                          <span className={`text-[10px] font-bold font-mono ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`}>
                            {cityMetricTab === 'hdi' ? (c.hdi).toFixed(3) : val}
                          </span>
                          <div className="w-full flex justify-center">
                            <div
                              className={`w-full max-w-[32px] rounded-t transition-all duration-300 ${
                                isSelected ? 'bg-emerald-600 shadow-sm' : 'bg-slate-200 hover:bg-slate-300'
                              }`}
                              style={{ height: `${Math.max(12, pct * 0.7)}px` }}
                            />
                          </div>
                          <span className={`text-[10px] font-semibold truncate max-w-[60px] ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                            {c.name.split('-')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Active City Details with Stock Unsplash Photo */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="minimal-card p-6 rounded-2xl border border-slate-200 space-y-4">
                      {/* Unsplash Stock Photo Container */}
                      <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200">
                        <img
                          src={activeCity.image}
                          alt={activeCity.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-3 text-white">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">{activeCity.country}</span>
                            <div className="text-base font-bold font-heading">{activeCity.name}</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="text-slate-500">Populacja</div>
                          <div className="text-lg font-bold text-slate-900 font-heading mt-0.5">{activeCity.population}</div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="text-slate-500">Gęstość zaludnienia</div>
                          <div className="text-lg font-bold text-emerald-700 font-heading mt-0.5">{activeCity.density}</div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="text-slate-500">PKB Metropolii</div>
                          <div className="text-lg font-bold text-slate-900 font-heading mt-0.5">{activeCity.gdp}</div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="text-slate-500">Jakość Powietrza</div>
                          <div className="text-lg font-bold text-slate-900 font-heading mt-0.5">{activeCity.aqi} AQI</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div className="minimal-card p-6 rounded-2xl border border-slate-200 space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Info className="w-4 h-4 text-emerald-600" />
                        <span>Charakterystyka Rozwoju i Wyzwań</span>
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {activeCity.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span>Główne Wyzwania</span>
                          </h5>
                          <ul className="space-y-1.5 text-xs text-slate-600">
                            {activeCity.keyChallenges.map((ch, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-slate-400 font-bold">•</span>
                                <span>{ch}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                          <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Wdrożone Rozwiązania</span>
                          </h5>
                          <ul className="space-y-1.5 text-xs text-emerald-950">
                            {activeCity.keySolutions.map((sol, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span>{sol}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* SLIDE 4: WYZWANIA I UHI TEMPERATURE GRADIENT */}
            {/* ============================================================ */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Slajd 4 z 7 • Problemy Strukturalne</div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900">
                    Główne Wyzwania Współczesnych Megamiast
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Analiza problemów społeczno-gospodarczych, przestrzennych i mikroklimatycznych.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CHALLENGES.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChallengeId(ch.id)}
                      className={`p-4 rounded-xl text-left transition-all border ${
                        activeChallengeId === ch.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider ${activeChallengeId === ch.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                          {ch.category}
                        </span>
                        <span className="text-xs font-mono font-bold">{ch.severity}%</span>
                      </div>
                      <div className="text-sm font-bold font-heading">{ch.title}</div>
                    </button>
                  ))}
                </div>

                {activeChallengeId === 'heat' && (
                  <div className="minimal-card p-6 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span>Symulator Gradientu Temperatury (Miejska Wyspa Ciepła UHI)</span>
                      </h4>
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        +{(2.0 + (uhiDistance / 100) * 5.5).toFixed(1)}°C w centrum
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-600 font-medium">
                        <span>Obszary Wiejskie / Parki (21.5°C)</span>
                        <span>Strefa Podmiejska</span>
                        <span>Centrum Betonalne (29.0°C)</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={uhiDistance}
                        onChange={(e) => setUhiDistance(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                <div className="minimal-card p-6 rounded-2xl border border-slate-200 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">{activeChallenge.category}</span>
                      <h3 className="text-2xl font-bold font-heading text-slate-900 mt-0.5">{activeChallenge.title}</h3>
                      <p className="text-xs text-slate-500">{activeChallenge.subtitle}</p>
                    </div>

                    <div className="w-full md:w-48 space-y-1">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Skala problemu</span>
                        <span className="font-bold text-slate-900">{activeChallenge.severity}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 transition-all duration-300"
                          style={{ width: `${activeChallenge.severity}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span>Przyczyny Powstawania</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {activeChallenge.causes.map((cause, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-white text-slate-700 font-mono text-[10px] font-bold border border-slate-200">
                              {idx + 1}
                            </span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Skutki Przestrzenne i Środowiskowe</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {activeChallenge.effects.map((effect, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-white text-slate-700 font-mono text-[10px] font-bold border border-slate-200">
                              !
                            </span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* SLIDE 5: SYMULATOR ZRÓWNOWAŻONEGO ROZWOJU */}
            {/* ============================================================ */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Slajd 5 z 7 • Modelowanie Infrastruktury</div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900">
                    Wskaźnik Zrównoważonego Rozwoju Miejskiego
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Symulator wprowadzania inwestycji publicznych i ich wpływu na wskaźnik zrównoważenia metropolii.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 minimal-card p-6 rounded-2xl border border-slate-200 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-emerald-600" />
                        <span>Alokacja Budżetu Miejskiego</span>
                      </h3>
                      <button
                        onClick={() => {
                          setSimGreen(45);
                          setSimTransit(55);
                          setSimHousing(40);
                          setSimSmart(50);
                        }}
                        className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-emerald-700 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Resetuj</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          <Leaf className="w-4 h-4 text-emerald-600" /> Ochrona Powietrza & Retencja Wód
                        </span>
                        <span className="font-mono font-bold text-emerald-700">{simGreen}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={simGreen}
                        onChange={(e) => setSimGreen(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          <Train className="w-4 h-4 text-emerald-600" /> Transport Szynowy & Bezemisyjny
                        </span>
                        <span className="font-mono font-bold text-emerald-700">{simTransit}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={simTransit}
                        onChange={(e) => setSimTransit(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-emerald-600" /> Rewitalizacja & Mieszkalnictwo Socjalne
                        </span>
                        <span className="font-mono font-bold text-emerald-700">{simHousing}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={simHousing}
                        onChange={(e) => setSimHousing(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-emerald-600" /> Infrastruktura Smart City & IoT
                        </span>
                        <span className="font-mono font-bold text-emerald-700">{simSmart}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={simSmart}
                        onChange={(e) => setSimSmart(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <div className="minimal-card p-6 rounded-2xl border border-slate-200 text-center space-y-4">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Wyliczony Wskaźnik Zrównoważenia</span>

                      <div className="relative inline-flex items-center justify-center w-36 h-36 rounded-full border-4 border-slate-100 bg-slate-50">
                        <div className="text-center">
                          <span className="text-4xl font-extrabold font-heading text-slate-900">{currentIndex}</span>
                          <span className="text-xs text-slate-500 block font-mono">/ 100 pkt</span>
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl border text-left space-y-1 ${currentStatus.badgeClass}`}>
                        <div className="text-sm font-bold font-heading">{currentStatus.label}</div>
                        <p className="text-xs leading-relaxed opacity-90">{currentStatus.desc}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                          <div className="text-slate-500 text-[10px]">Ślad Węglowy</div>
                          <div className="font-bold text-slate-900 mt-0.5">
                            {Math.max(2.1, 12 - simGreen * 0.08).toFixed(1)} t/os.
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                          <div className="text-slate-500 text-[10px]">Natężenie Korków</div>
                          <div className="font-bold text-slate-900 mt-0.5">
                            {Math.max(15, Math.round(95 - simTransit * 0.7))}%
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                          <div className="text-slate-500 text-[10px]">Oczekiwana Długość Życia</div>
                          <div className="font-bold text-emerald-700 mt-0.5">
                            {Math.round(68 + currentIndex * 0.18)} lat
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* SLIDE 6: KREATOR WŁASNEGO MEGAMIASTA OD 0 (DEDYKOWANY SLAJD) */}
            {/* ============================================================ */}
            {currentSlide === 5 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Slajd 6 z 7 • Interaktywny Moduł Projektowy</div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900">
                    Kreator Własnego Megamiasta od 0
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Zaprojektuj metropolie: dostosuj populację, powierzchnię, zamożność państwa oraz profil gospodarczy.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column Controls */}
                  <div className="lg:col-span-6 minimal-card p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-900 uppercase tracking-wider">Parametry Wejściowe Metropolii</span>
                    </div>

                    {/* City Name & Country Tier */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Nazwa Miasta</label>
                        <input
                          type="text"
                          value={builderName}
                          onChange={(e) => setBuilderName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Kraj / Poziom PKB</label>
                        <select
                          value={builderCountryTier}
                          onChange={(e) => setBuilderCountryTier(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 font-semibold text-slate-900 bg-white"
                        >
                          {COUNTRY_TIERS.map((tier) => (
                            <option key={tier.id} value={tier.id}>
                              {tier.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Population & Area Sliders */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1">
                          <span>Populacja (mln)</span>
                          <span className="text-emerald-700 font-mono">{builderPop.toFixed(1)}M</span>
                        </div>
                        <input
                          type="range"
                          min="2.0"
                          max="40.0"
                          step="0.5"
                          value={builderPop}
                          onChange={(e) => setBuilderPop(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1">
                          <span>Powierzchnia (km²)</span>
                          <span className="text-emerald-700 font-mono">{builderArea} km²</span>
                        </div>
                        <input
                          type="range"
                          min="200"
                          max="6000"
                          step="100"
                          value={builderArea}
                          onChange={(e) => setBuilderArea(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Economic Profile & Zoning */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Profil Gospodarczy</label>
                        <select
                          value={builderProfile}
                          onChange={(e) => setBuilderProfile(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 font-semibold text-slate-900 bg-white"
                        >
                          <option value="global">Global Hub (Usługi/Giełda)</option>
                          <option value="industry">Przemysłowo-Portowy</option>
                          <option value="admin">Stolica Administracyjna</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Typ Zabudowy</label>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { id: 'low', name: 'Niska' },
                            { id: 'med', name: 'Średnia' },
                            { id: 'high', name: 'Wieżowce' }
                          ].map((z) => (
                            <button
                              key={z.id}
                              onClick={() => setBuilderZoning(z.id as any)}
                              className={`py-2 rounded-lg text-[10px] font-semibold border transition-all text-center ${
                                builderZoning === z.id
                                  ? 'bg-slate-900 text-white border-slate-900'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {z.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Transit & Housing Investment */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Sieć Transportowa</label>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { id: 'road', name: 'Auta' },
                            { id: 'bus', name: 'Bus CNG' },
                            { id: 'rail', name: 'Metro/Kolej' }
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setBuilderTransit(t.id as any)}
                              className={`py-1.5 rounded-lg text-[10px] font-semibold border transition-all text-center ${
                                builderTransit === t.id
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1">
                          <span>Mieszkalnictwo Socjalne</span>
                          <span className="text-emerald-700 font-mono">{builderHousingInvest}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={builderHousingInvest}
                          onChange={(e) => setBuilderHousingInvest(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Eco & Parks Sliders */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1">
                          <span>OZE & Czysta Energia</span>
                          <span className="text-emerald-700 font-mono">{builderEco}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={builderEco}
                          onChange={(e) => setBuilderEco(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1">
                          <span>Zielone Parki & Dachowe Ogrody</span>
                          <span className="text-emerald-700 font-mono">{builderParks}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={builderParks}
                          onChange={(e) => setBuilderParks(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column Visual Simulation Canvas & Expert Diagnosis */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Visual Render Map of Created City */}
                    <div className="h-44 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden text-white shadow-md">
                      {/* Smog Layer Overlay Tinting */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                        style={{
                          backgroundColor: advStats.aqi > 180 ? 'rgba(180, 83, 9, 0.35)' : advStats.aqi > 90 ? 'rgba(217, 119, 6, 0.18)' : 'rgba(16, 185, 129, 0.05)'
                        }}
                      />

                      {/* Skyline Render */}
                      <div className="absolute bottom-0 inset-x-0 h-28 flex items-end justify-center gap-1.5 px-4 z-10">
                        {Array.from({ length: 11 }).map((_, i) => {
                          const h = builderZoning === 'high' ? (45 + (i % 6) * 16) : (25 + (i % 4) * 10);
                          const isSlum = advStats.slumPercent > 25 && (i === 1 || i === 9);
                          const isGreenBuilding = builderEco > 60 && i % 3 === 0;

                          return (
                            <div
                              key={i}
                              className={`w-6 rounded-t transition-all duration-300 ${
                                isSlum
                                  ? 'bg-amber-800 border-t-2 border-amber-600'
                                  : isGreenBuilding
                                  ? 'bg-emerald-500 border-t-2 border-emerald-300'
                                  : 'bg-slate-700'
                              }`}
                              style={{ height: `${h}px` }}
                            />
                          );
                        })}
                      </div>

                      <div className="relative z-20 flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Wizualizacja Zespołu Miejskiego</span>
                          <div className="text-xl font-bold font-heading">{builderName || 'Twoje Miasto'}</div>
                          <span className="text-[11px] text-slate-300">{advStats.countryName}</span>
                        </div>

                        <div className="text-right flex flex-col items-end gap-1">
                          <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-500 text-slate-950 font-heading">
                            Score: {advStats.score} / 100
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                            Przypomina: {resembledCity.name.split(' / ')[0]}
                          </span>
                        </div>
                      </div>

                      <div className="relative z-20 grid grid-cols-4 gap-1 text-center text-xs pt-2 border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-xs rounded-lg px-2 py-1.5">
                        <div>
                          <span className="text-slate-400 text-[9px] block">Gęstość</span>
                          <span className="font-bold font-mono text-emerald-300 text-[11px]">{advStats.densityNum.toLocaleString()} os/km²</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[9px] block">PKB Miasta</span>
                          <span className="font-bold font-mono text-white text-[11px]">${advStats.totalGdpBillion} mld</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[9px] block">% Slumsów</span>
                          <span className={`font-bold font-mono text-[11px] ${advStats.slumPercent > 30 ? 'text-rose-400' : 'text-emerald-300'}`}>
                            {advStats.slumPercent}%
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[9px] block">Smog AQI</span>
                          <span className={`font-bold font-mono text-[11px] ${advStats.aqi > 150 ? 'text-rose-400' : 'text-emerald-300'}`}>
                            {advStats.aqi} AQI
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Diagnostic Report Card */}
                    <div className="minimal-card p-4 rounded-xl border border-slate-200 text-xs space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <strong className="text-slate-900 font-bold flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-emerald-600" />
                          <span>Raport Diagnozy i Wnioski Eksperckie</span>
                        </strong>
                        <span className="text-[10px] font-mono text-slate-500">Emisja: {advStats.co2} t CO₂/os.</span>
                      </div>

                      <div className="space-y-1.5 text-slate-700 leading-relaxed">
                        <p>
                          <strong>1. Bilans Przestrzenny:</strong> Gęstość zaludnienia wynosi <strong>{advStats.densityNum.toLocaleString()} os./km²</strong> przy powierzchni {builderArea} km².
                        </p>
                        <p>
                          <strong>2. Ocena Środowiskowa:</strong> Szacowana jakość powietrza wynosi <strong>{advStats.aqi} AQI</strong> ({advStats.aqi > 150 ? 'Wysokie zagrożenie smogowe' : 'Dobra czystość powietrza'}).
                        </p>
                        <p>
                          <strong>3. Ryzyko Wykluczenia:</strong> Prognozowany odsetek ludności w slumsach wynosi <strong>{advStats.slumPercent}%</strong> (Poziom zamożności kraju oraz budownictwo socjalne {builderHousingInvest}%).
                        </p>
                      </div>

                      {/* Resembled Real-World City Box */}
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 mt-2">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                          <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Odpowiednik w Świecie Rzeczywistym: <u className="decoration-emerald-500">{resembledCity.name}</u></span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-[11px]">
                          <strong>Dlaczego te miasta?</strong> {resembledCity.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* SLIDE 7: PODSUMOWANIE, PHOTO & MATURA SUMMARY */}
            {/* ============================================================ */}
            {currentSlide === 6 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Slajd 7 z 7 • Podsumowanie i Wnioski Końcowe</div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900">
                    Podsumowanie & Strategie Rozwoju Miast
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Główne kierunki transformacji metropolitalnej ukierunkowane na zrównoważony rozwój.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm min-h-[240px]">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                      alt="Smart City Stock Photo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end p-5 text-white">
                      <div>
                        <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Eko-Smart City (Stock Photo)</span>
                        <div className="text-lg font-bold font-heading">Wizja Metropolii Przyszłości</div>
                        <p className="text-xs text-slate-300 mt-1">Połączenie pionowych ogrodów, bezemisyjnej kolei szynowej oraz cyfrowego zarządzania ruchem.</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="minimal-card p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="p-2 w-fit rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Zap className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">Smart Cities & IoT</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Zarządzanie oparte na danych: inteligentna sygnalizacja świetlna, monitoring czystości powietrza i automatyzacja.
                      </p>
                    </div>

                    <div className="minimal-card p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="p-2 w-fit rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Train className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">Zielona Mobilność</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Priorytet dla kolei miejskiej, metra i kolei dużych prędkości. Tworzenie stref czystego transportu.
                      </p>
                    </div>

                    <div className="minimal-card p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="p-2 w-fit rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">Architektura Biofilna</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Wprowadzanie zielonych dachów, pionowych ogrodów oraz parków kieszonkowych łagodzących efekty UHI.
                      </p>
                    </div>

                    <div className="minimal-card p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="p-2 w-fit rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <RotateCcw className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">Obieg Zamknięty</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Odzysk wody szarej, recykling odpadów budowlanych oraz kompostowanie miejskie zmierzające do Zero Waste.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="minimal-card p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                    <h3 className="text-sm font-bold text-emerald-900 font-heading flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Wnioski Końcowe do Prezentacji</span>
                    </h3>
                    <span className="text-xs font-bold text-slate-900 font-heading">Autor: Filip Piechowski</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                    <li className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                      <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Urbanizacja w XXI wieku koncentruje się głównie w krajach rozwijających się Azji i Afryki.</span>
                    </li>
                    <li className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                      <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Szybki wzrost bez odpowiedniej infrastruktury prowadzi do pogłębiania się osiedli nieformalnych (slumsów).</span>
                    </li>
                    <li className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                      <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Zrównoważone megamiasto wymaga integracji transportu szynowego z terenami zielonymi i retencją wód.</span>
                    </li>
                    <li className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                      <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Technologia Smart City stanowi kluczowy element sprawnego zarządzania energią i ruchem kołowym.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER & NAVIGATION BAR WITH AUTHOR CREDIT */}
      <footer className="z-30 flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx
                  ? 'w-7 bg-emerald-600'
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Slajd ${idx + 1}`}
            />
          ))}
          <span className="text-xs font-mono text-slate-500 ml-2">
            Slajd {currentSlide + 1} z {totalSlides}
          </span>
        </div>

        <div className="hidden sm:block text-xs font-semibold text-slate-500">
          Prezentację wykonał: <span className="text-slate-900 font-bold">Filip Piechowski</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              currentSlide === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Poprzedni</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all border ${
              currentSlide === totalSlides - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-xs'
            }`}
          >
            <span>Następny</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* DRAWER: SLIDE INDEX */}
      <AnimatePresence>
        {showDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDrawer(false)}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-2xl border border-slate-200 max-w-lg w-full space-y-4 shadow-xl"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-600" />
                  <span>Spis Slajdów Prezentacji</span>
                </h3>
                <button onClick={() => setShowDrawer(false)} className="text-xs text-slate-400 hover:text-slate-700 font-bold">
                  ✕ Zamknij
                </button>
              </div>

              <div className="space-y-2">
                {[
                  '1. Strona Tytułowa & Wykres Wzrostu (Filip Piechowski)',
                  '2. Definicja Megamiasta & Formy Urbanizacji',
                  '3. Interaktywny Analizator & Fotografie Stockowe Unsplash',
                  '4. Główne Wyzwania & Symulator UHI',
                  '5. Symulator Zrównoważonego Rozwoju',
                  '6. Kreator Własnego Megamiasta od 0 (Dedykowany Slajd)',
                  '7. Podsumowanie & Strategie Eko-Smart City'
                ].map((title, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentSlide ? 1 : -1);
                      setCurrentSlide(idx);
                      setShowDrawer(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                      currentSlide === idx
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{title}</span>
                    <ChevronRight className="w-4 h-4 text-emerald-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DRAWER: PRESENTER NOTES WITH AUTHOR */}
      <AnimatePresence>
        {showSummaryNotes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSummaryNotes(false)}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[80vh] overflow-y-auto space-y-4 shadow-xl"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span>Notatki Prezentanta – Przygotowanie do Oceny</span>
                  </h3>
                  <span className="text-xs text-emerald-700 font-semibold">Autor: Filip Piechowski</span>
                </div>
                <button onClick={() => setShowSummaryNotes(false)} className="text-xs text-slate-400 hover:text-slate-700 font-bold">
                  ✕ Zamknij
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-semibold mb-1">1. Fazy Urbanizacji (Pojęcia Kluczowe):</strong>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Wstępna:</strong> Szybki wzrost liczby ludności w centrach (kraje rozwijające się).</li>
                    <li><strong>Suburbanizacja:</strong> Odpływ mieszkańców z centrum na przedmieścia (rozwój osiedli jednorodzinnych).</li>
                    <li><strong>Dezurbanizacja:</strong> Wymieranie aglomeracji (odpływ ludności poza cały obszar miejski).</li>
                    <li><strong>Reurbanizacja:</strong> Odnowa centrów miast i powrót mieszkańców w wyniku rewitalizacji.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-semibold mb-1">2. Płaszczyzny procesów urbanizacyjnych:</strong>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Demograficzna:</strong> Wzrost odsetka ludności miejskiej w ogólnej populacji.</li>
                    <li><strong>Przestrzenna:</strong> Powiększanie terytorium miast i powstawanie obszarów metropolitalnych.</li>
                    <li><strong>Ekonomiczna:</strong> Zmiana struktury zatrudnienia z rolnictwa na przemysł i usługi.</li>
                    <li><strong>Społeczna:</strong> Przyswajanie miejskiego stylu życia przez mieszkańców.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
