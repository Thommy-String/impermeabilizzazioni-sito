import { PHONE_NUMBER } from '../utils/constants';
import { CheckCircle, Shield, Clock, Phone } from 'lucide-react';
import ServiceAreasBadge from './ServiceAreasBadge';

import heroMainImg from '../assets/images/heroimage.jpg';
import lavoro1 from '../assets/images/primadopo/lavoro1.jpg';
import lavoro2 from '../assets/images/primadopo/lavoro2.jpg';
import lavoro3 from '../assets/images/primadopo/lavoro3.jpg';
import lavoro4 from '../assets/images/primadopo/lavoro4.jpg';
import lavoro5 from '../assets/images/primadopo/lavoro5.jpg';
import lavoro6 from '../assets/images/primadopo/lavoro6.jpg';
import lavoro7 from '../assets/images/primadopo/lavoro7.webp';
import lavoro8 from '../assets/images/primadopo/lavoro8.jpg';
import lavoro10 from '../assets/images/primadopo/lavoro10.jpg';
import lavoro11 from '../assets/images/primadopo/lavoro11.webp';
import lavoro12 from '../assets/images/primadopo/lavoro12.jpg';

const works = [
  { img: lavoro1, alt: 'Terrazzo privato', mq: '65 MQ', days: '3 gg' },
  { img: lavoro2, alt: 'Tetto industriale', mq: '130 MQ', days: '6 gg' },
  { img: lavoro3, alt: 'Tetto Condominiale', mq: '88 MQ', days: '4 gg' },
  { img: lavoro4, alt: 'Tetto condominiale', mq: '28 MQ', days: '2 gg' },
  { img: lavoro5, alt: 'Tetto privato', mq: '85 MQ', days: '6 gg' },
  { img: lavoro6, alt: 'Terrazzo', mq: '120 MQ', days: '5 gg' },
  { img: lavoro7, alt: 'Balcone privato', mq: '6 MQ', days: '2 gg' },
  { img: lavoro8, alt: 'Balcone privato', mq: '7 MQ', days: '2 gg' },
  { img: lavoro10, alt: 'Impermeab. balcone', mq: '12 MQ', days: '3 gg' },
  { img: lavoro11, alt: 'Tetto Condominiale', mq: '135 MQ', days: '6 gg' },
  { img: lavoro12, alt: 'Balcone Residenziale', mq: '25 MQ', days: '4 gg' },
];

const tripleWorks = [...works, ...works, ...works];

function WorkCard({ work }) {
  return (
    <div className="relative w-40 h-30 md:w-64  flex-shrink-0 overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl group">
      <img
        alt={work.alt}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        src={work.img}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/100 transition-all duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-left translate-y-2 group-hover:translate-y-0 transition-transform">
        <p className="text-white font-black text-xs md:text-sm uppercase mb-2 tracking-tight line-clamp-1">{work.alt}</p>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-yellow-400 text-black text-[10px] md:text-xs font-black px-2 py-0.5 rounded-full">{work.mq}</span>
          <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-black px-2 py-0.5 rounded-full border border-white/30">{work.days}</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[80vh] md:min-h-[85vh] lg:min-h-[110vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          alt="Hero Background"
          className="w-full h-full object-cover"
          loading="eager"
          src={heroMainImg}
        />
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="w-full py-8 md:py-12 lg:py-32 relative z-10">
        <div className="w-full mx-auto flex flex-col items-center text-center">
          <div className="flex flex-col items-center w-full">

            {/* Top Badge */}
            <div className="inline-flex flex-col items-center justify-center gap-2 mb-4 px-4">
              <ServiceAreasBadge />
            </div>

            {/* H1 */}
            <h1 className="font-bold tracking-tighter leading-[0.95] md:leading-[0.85] flex flex-col items-center mb-4 w-full px-4">
              <span className="relative inline-block w-full">
                <span className="relative z-10 text-2xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase break-words">
                  <span className="text-white-300"> <span className="text-yellow-400">Impermeabilizzazioni</span></span> <br />
                </span>
                <span className="absolute inset-x-0 bottom-2 h-4 bg-yellow-400/30 -rotate-1 z-0"></span>
              </span>
              <span className="text-md sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mt-4 px-2 font-bold">
                <span className="relative inline-block">
                  <span className="relative z-10">Terrazzi, Balconi, Tetti</span>
                </span>
                <br />
                <span className="text-yellow-300 mt-2 block">IN 2-3 GIORNI ANCHE SENZA DEMOLIZIONI</span>
              </span>
            </h1>

            {/* Infinite Scroll Carousel */}
            <div className="w-full mb-12 overflow-hidden px-0">
              <div className="w-full overflow-hidden py-4 select-none relative">
                <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] gap-4 w-max">
                  {tripleWorks.map((work, idx) => (
                    <WorkCard key={idx} work={work} />
                  ))}
                </div>
              </div>
            </div>

            {/* White Pricing Card - CLEAN & PROFESSIONAL */}
            <div className="px-4 w-full max-w-5xl mx-auto mb-12">
              <div className="relative bg-white border-2 border-yellow-400 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-full overflow-hidden">
                
                {/* Badge */}
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs md:text-sm font-black px-6 py-2 uppercase tracking-tighter rounded-bl-2xl">
                  Miglior prezzo garantito
                </div>

                {/* Main Content - Flex Row */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-10">
                  
                  {/* LEFT: PRICE */}
                  <div className="flex flex-col items-center">
                    
                    {/* Old Price with strikethrough */}
                    <div className="relative mt-8 mb-4 w-32 md:w-40">
                      <span className="text-4xl md:text-4xl text-red-600 font-medium italic relative">
                        €65
                        <span className="absolute -inset-x-6 top-1/2 h-0.5 bg-red-600 -rotate-6 opacity-60"></span>
                      </span>
                    </div>

                    {/* New Price */}
                    <div className="flex flex-col items-center mb-6">
                      <span className="text-slate-400 font-medium text-md md:text-2xl uppercase leading-none">da</span>
                      <div className="flex items-start">
                        <span className="text-7xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter">€30</span>
                        <span className="text-3xl md:text-4xl font-black text-slate-900 mt-2">/MQ</span>
                      </div>
                    </div>

                    <p className="text-slate-600 font-bold uppercase tracking-widest text-sm text-center">Lavoro Completo</p>

                    {/* Google Social Proof */}
                    <div className="flex flex-col items-center gap-2 mt-6 pt-6 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <img
                          alt="Google"
                          className="w-4 h-4 object-contain"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
                        />
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 text-[#facc15]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs md:text-sm font-medium text-slate-600 leading-tight">
                        Oltre 327 interventi certificati
                      </p>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="h-px md:h-24 w-full md:w-px bg-slate-200"></div>

                  {/* RIGHT: BENEFITS */}
                  <div className="flex flex-col gap-6 w-full md:w-auto text-left">
                    
                    {/* Benefit 1 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                          <span className="text-green-600 font-black text-lg">✓</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-900 font-black text-sm md:text-base leading-tight mb-1 uppercase tracking-tight">Sigillatura 100% impermeabile</p>
                        <p className="text-slate-500 text-xs md:text-sm font-bold uppercase">48-72 ore massimo</p>
                      </div>
                    </div>

                    {/* Benefit 2 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                          <span className="text-blue-600 font-black text-lg">✓</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-900 font-black text-sm md:text-base leading-tight mb-1 uppercase tracking-tight">Anche Senza demolizioni</p>
                        <p className="text-slate-500 text-xs md:text-sm font-bold uppercase">Sul fondo esistente</p>
                      </div>
                    </div>

                    {/* Benefit 3 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100">
                          <span className="text-orange-500 font-black text-lg">✓</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-900 font-black text-sm md:text-base leading-tight mb-1 uppercase tracking-tight">Pronto in 1-2 giorni</p>
                        <p className="text-slate-500 text-xs md:text-sm font-bold uppercase">Certificato e testato</p>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center justify-center gap-5 w-full px-4 mb-10 relative z-20">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                className="group w-full max-w-xl bg-green-500 hover:bg-green-600 text-white px-8 md:px-12 py-6 rounded-2xl font-black text-xl md:text-3xl flex items-center justify-center gap-4 transition-all duration-300 shadow-[0_15px_40px_rgba(34,197,94,0.5)] hover:-translate-y-2 border-b-8 border-green-700 active:border-b-0 active:translate-y-1"
              >
                <Phone className="w-8 h-8 md:w-10 md:h-10 fill-white animate-bounce-subtle" aria-hidden="true" />
                <span className="uppercase tracking-tight">CHIAMA per Preventivo Gratuito</span>
              </a>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                  <span className="text-white/90 text-xs md:text-sm font-black uppercase tracking-wider">Nessun obbligo di acquisto</span>
                </div>
              </div>
            </div>

            {/* Google Review Testimonial */}
            <div className="px-4 w-full max-w-4xl mx-auto mb-10">
              <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl w-full flex flex-col md:flex-row items-center gap-6 text-left relative overflow-hidden group">
                {/* Google Verified Badge */}
                <div className="absolute top-4 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <img
                    alt="Google"
                    className="w-4 h-4 object-contain"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
                  />
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-400 fill-green-400/20" aria-hidden="true" />
                    <span className="text-[10px] text-white font-black uppercase tracking-tighter">Verificato</span>
                  </div>
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    alt="Marco B."
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full ring-2 ring-yellow-400 object-cover shadow-xl"
                    src="https://i.pinimg.com/736x/a5/6b/51/a56b51f210e6b886018bb67d3e1b60f7.jpg"
                  />
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest ml-2">Marco B.</span>
                  </div>
                  <p className="text-white text-sm md:text-base italic leading-relaxed font-medium">
                    "Ero terrorizzato all'idea di dover spaccare il terrazzo e avere operai in casa per settimane. Loro mi hanno proposto la soluzione con guaina liquida e posa del nuovo pavimento. Hanno fatto tutto loro, dall'isolamento alle piastrelle nuove. Veloci, puliti... Sono stato fortunato consiglio."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
