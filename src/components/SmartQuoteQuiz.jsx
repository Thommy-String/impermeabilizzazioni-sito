import React, { useState, useRef } from 'react';
import { Camera, CheckCircle2, ChevronRight, MessageCircle, ArrowLeft, Droplets, MapPin, AlertTriangle, ArrowDownToLine, ShieldCheck } from 'lucide-react';
import { PHONE_NUMBER } from '../utils/constants';

function SmartQuoteQuiz() {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        situation: '',
        size: '',
        sizeLabel: '',
        demolition: '', // sì/no demolizione pavimento
        flooring: '', // sì/no fornitura + posa
        priceRange: ''
    });
    
    // Riferimento al container del quiz per lo scroll
    const quizRef = useRef(null);

    const situations = [
        { id: 'piove', title: "Piove già dentro", desc: "Ho macchie d'acqua o infiltrazioni al piano di sotto.", icon: Droplets, color: "bg-blue-100 text-blue-600 border-blue-200", hoverColor: "group-hover:bg-blue-600 group-hover:text-white" },
        { id: 'rovinato', title: "Pavimento rovinato", desc: "Piastrelle saltate, fughe vuote o crepe evidenti.", icon: AlertTriangle, color: "bg-orange-100 text-orange-600 border-orange-200", hoverColor: "group-hover:bg-orange-600 group-hover:text-white" },
        { id: 'guaina', title: "Guaina da coprire", desc: "La vecchia guaina è secca, rotta o scollata.", icon: ArrowDownToLine, color: "bg-slate-200 text-slate-700 border-slate-300", hoverColor: "group-hover:bg-slate-800 group-hover:text-white" },
        { id: 'prevenzione', title: "Solo prevenzione", desc: "Voglio isolare prima che inizino i problemi.", icon: ShieldCheck, color: "bg-green-100 text-green-600 border-green-200", hoverColor: "group-hover:bg-green-600 group-hover:text-white" }
    ];

    const sizes = [
        { 
            id: 'small', 
            title: "Fino a 20 mq", 
            desc: "(Es. balcone lungo o piccolo terrazzino)",
            priceRange: "Da € 800 a € 1.200 *"
        },
        { 
            id: 'medium', 
            title: "Da 20 a 50 mq", 
            desc: "(Es. terrazzo standard abitabile)",
            priceRange: "Da € 1.200 a € 2.500 *"
        },
        { 
            id: 'large', 
            title: "Oltre 50 mq", 
            desc: "(Es. grande terrazzo o lastrico solare)",
            priceRange: "Da € 2.500 a € 4.500+ *"
        }
    ];

    const scrollToTop = () => {
        if (quizRef.current) {
            // Scrolliamo leggermente sopra per dare rimosso header se sticky o padding
            const yOffset = -100;
            const element = quizRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    const handleSituationSelect = (sit) => {
        setSelections(prev => ({ ...prev, situation: sit.title }));
        setStep(2);
        scrollToTop();
    };

    const handleSizeSelect = (size) => {
        setSelections(prev => ({ 
            ...prev, 
            size: size.id,
            sizeLabel: size.title,
            priceRange: size.priceRange
        }));
        setStep(3);
        scrollToTop();
    };

    const handleDemolitionSelect = (answer) => {
        setSelections(prev => ({ ...prev, demolition: answer }));
        setStep(4);
        scrollToTop();
    };

    const handleFlooringSelect = (answer) => {
        setSelections(prev => ({ ...prev, flooring: answer }));
        setStep(5);
        scrollToTop();
    };

    const resetQuiz = () => {
        setStep(1);
        setSelections({ situation: '', size: '', sizeLabel: '', demolition: '', flooring: '', priceRange: '' });
        scrollToTop();
    };

    // Rimuove simboli e spazi dal numero per WhatsApp
    const cleanPhone = PHONE_NUMBER ? PHONE_NUMBER.replace(/\D/g, '') : "393342221212";

    // Calcola il prezzo finale in base alle selezioni
    const calculateFinalPrice = () => {
        // Estrae i numeri dal priceRange (es. "Da € 800 a € 1.200 *" → 800-1200)
        const priceMatch = selections.priceRange.match(/€\s*([\d.]+)\s*a\s*€\s*([\d.]+)/);
        if (!priceMatch) return { min: 0, max: 0 };
        
        const minBase = parseInt(priceMatch[1].replace(/\D/g, ''));
        const maxBase = parseInt(priceMatch[2].replace(/\D/g, ''));
        
        let addedCost = 0;
        let addedCostDesc = '';
        
        // Stima della superficie in mq (medio)
        const sizeMqMap = {
            'small': 15,
            'medium': 35,
            'large': 75
        };
        const estimatedMq = sizeMqMap[selections.size] || 30;
        
        // Se vuole pavimento
        if (selections.flooring === 'sì') {
            // Fornitura: €25/mq minimo, €50/mq massimo (qui usiamo medi €30-40)
            // Posa: €50/mq fisso
            const floringPerMq = 30 + 50; // €80/mq medio
            addedCost = Math.round(floringPerMq * estimatedMq);
            addedCostDesc = `Fornitura + Posa pavimento: ≈€${addedCost}`;
        }
        
        return {
            min: minBase + addedCost,
            max: maxBase + addedCost,
            added: addedCost,
            addedDesc: addedCostDesc
        };
    };

    const finalPrice = calculateFinalPrice();

    const generateWhatsAppMessage = () => {
        const text = `Ciao! Ho fatto il calcolatore sul vostro sito.\n\n*Il mio caso:*\nSuperficie: ${selections.sizeLabel}\nSituazione: ${selections.situation}\n\nVorrei ricevere un preventivo formale.`;
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    };

    const generateWhatsAppMediaMessage = () => {
        const text = `Ciao! Ho fatto il calcolatore sul vostro sito e vorrei un preventivo più preciso.\n\n*Il mio caso:*\nSuperficie: ${selections.sizeLabel}\nSituazione: ${selections.situation}\n\nVi invio alcune foto/video del mio terrazzo!`;
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    };

    return (
        <section ref={quizRef} className="bg-white py-20 border-b border-slate-100 scroll-mt-24">
            <div className="container mx-auto px-4 max-w-4xl">
                
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <div className="inline-flex items-center px-3 py-1 bg-black text-white font-bold uppercase tracking-widest text-[10px] mb-4">
                        Preventivo Rapido
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
                        <span className="relative inline-block">
                            <span className="relative z-10 px-2">Calcola il tuo</span>
                            <span className="absolute inset-0 bg-yellow-300 -rotate-1 z-0"></span>
                        </span>
                        <br/>
                        <span className="text-red-600">preventivo</span>
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl mx-auto border-l-4 border-red-600 pl-6 py-2 text-left">
                        Rispondi a 4 veloci domande per avere un'anteprima di spesa immediata.
                    </p>
                </div>

                {/* Card Contenitore */}
                <div className="bg-slate-50 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative group">
                    
                    {/* Barra di progresso */}
                    <div className="flex h-2 w-full bg-slate-200 absolute top-0 left-0">
                        <div className={`h-full bg-yellow-400 transition-all duration-500 ease-out`} style={{ width: step === 1 ? '20%' : step === 2 ? '40%' : step === 3 ? '60%' : step === 4 ? '80%' : '100%' }}></div>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* STEP 1 */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-8">
                                    <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Step 1 di 2</span>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tighter">Qual è la situazione attuale <br className="hidden md:block" /> del tuo terrazzo o tetto?</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {situations.map((sit, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleSituationSelect(sit)}
                                            className="group flex flex-col items-start p-6 rounded-[1.5rem] border-2 border-slate-200 hover:border-black hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all text-left bg-white"
                                        >
                                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 border ${sit.color} ${sit.hoverColor} transition-colors`}>
                                                <sit.icon className="w-6 h-6" />
                                            </div>
                                            <span className="font-black text-xl mb-2 text-slate-900 uppercase tracking-tight">{sit.title}</span>
                                            <span className="text-sm text-slate-500 font-medium leading-relaxed">{sit.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <button onClick={() => setStep(1)} className="flex items-center text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors mb-6 uppercase tracking-wider">
                                    <ArrowLeft className="w-4 h-4 mr-1" /> Indietro
                                </button>
                                <div className="mb-8">
                                    <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Step 2 di 4</span>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tighter">Quanto è grande la superficie <br className="hidden md:block"/> da impermeabilizzare?</h3>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {sizes.map((size, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleSizeSelect(size)}
                                            className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[1.5rem] border-2 border-slate-200 hover:border-black hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all text-left bg-white"
                                        >
                                            <div className="flex flex-col mb-2 md:mb-0">
                                                <span className="font-black text-2xl text-slate-900 uppercase tracking-tight group-hover:text-red-600 transition-colors">{size.title}</span>
                                                <span className="text-sm text-slate-500 font-medium">{size.desc}</span>
                                            </div>
                                            <div className="hidden md:flex w-12 h-12 bg-slate-100 rounded-full items-center justify-center group-hover:bg-yellow-400 transition-colors border border-slate-200 group-hover:border-yellow-400">
                                                <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-black transition-colors" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 3 - Demolizione Pavimento */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <button onClick={() => setStep(2)} className="flex items-center text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors mb-6 uppercase tracking-wider">
                                    <ArrowLeft className="w-4 h-4 mr-1" /> Indietro
                                </button>
                                <div className="mb-8">
                                    <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Step 3 di 4</span>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tighter">Vuoi rimuovere il vecchio pavimento <br className="hidden md:block"/> prima dell'impermeabilizzazione?</h3>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={() => handleDemolitionSelect('sì')}
                                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[1.5rem] border-2 border-slate-200 hover:border-black hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all text-left bg-white"
                                    >
                                        <div className="flex flex-col mb-2 md:mb-0">
                                            <span className="font-black text-2xl text-slate-900 uppercase tracking-tight group-hover:text-red-600 transition-colors">Sì, rimuovi tutto</span>
                                            <span className="text-sm text-slate-500 font-medium">Vuoi partire da zero con massetto nuovo</span>
                                        </div>
                                        <div className="hidden md:flex w-12 h-12 bg-slate-100 rounded-full items-center justify-center group-hover:bg-yellow-400 transition-colors border border-slate-200 group-hover:border-yellow-400">
                                            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-black transition-colors" />
                                        </div>
                                    </button>
                                    <button 
                                        onClick={() => handleDemolitionSelect('no')}
                                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[1.5rem] border-2 border-slate-200 hover:border-black hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all text-left bg-white"
                                    >
                                        <div className="flex flex-col mb-2 md:mb-0">
                                            <span className="font-black text-2xl text-slate-900 uppercase tracking-tight group-hover:text-green-600 transition-colors">No, solo impermeabilizzazione</span>
                                            <span className="text-sm text-slate-500 font-medium">Impermeabilizza direttamente sulle piastrelle esistenti</span>
                                        </div>
                                        <div className="hidden md:flex w-12 h-12 bg-slate-100 rounded-full items-center justify-center group-hover:bg-yellow-400 transition-colors border border-slate-200 group-hover:border-yellow-400">
                                            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-black transition-colors" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 4 - Fornitura e Posa Pavimento */}
                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <button onClick={() => setStep(3)} className="flex items-center text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors mb-6 uppercase tracking-wider">
                                    <ArrowLeft className="w-4 h-4 mr-1" /> Indietro
                                </button>
                                <div className="mb-8">
                                    <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Step 4 di 4</span>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tighter">Vuoi che forniamo e posiamo <br className="hidden md:block"/> il nuovo pavimento?</h3>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={() => handleFlooringSelect('sì')}
                                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[1.5rem] border-2 border-slate-200 hover:border-black hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all text-left bg-white"
                                    >
                                        <div className="flex flex-col mb-2 md:mb-0">
                                            <span className="font-black text-2xl text-slate-900 uppercase tracking-tight group-hover:text-green-600 transition-colors">Sì, fornitura + posa</span>
                                            <span className="text-sm text-slate-500 font-medium">Fornitura dal €25/mq in su + Posa €50/mq</span>
                                        </div>
                                        <div className="hidden md:flex w-12 h-12 bg-slate-100 rounded-full items-center justify-center group-hover:bg-yellow-400 transition-colors border border-slate-200 group-hover:border-yellow-400">
                                            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-black transition-colors" />
                                        </div>
                                    </button>
                                    <button 
                                        onClick={() => handleFlooringSelect('no')}
                                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[1.5rem] border-2 border-slate-200 hover:border-black hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 transition-all text-left bg-white"
                                    >
                                        <div className="flex flex-col mb-2 md:mb-0">
                                            <span className="font-black text-2xl text-slate-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors">No, solo impermeabilizzazione</span>
                                            <span className="text-sm text-slate-500 font-medium">Penserò al nuovo pavimento in seguito</span>
                                        </div>
                                        <div className="hidden md:flex w-12 h-12 bg-slate-100 rounded-full items-center justify-center group-hover:bg-yellow-400 transition-colors border border-slate-200 group-hover:border-yellow-400">
                                            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-black transition-colors" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 5 - RISULTATO */}
                        {step === 5 && (
                            <div className="animate-in fade-in zoom-in-95 duration-500">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                                        <CheckCircle2 className="w-8 h-8 text-black" />
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Calcolo <br/> <span className="text-red-600">Completato</span></h3>
                                </div>

                                <div className="bg-white p-6 rounded-[1.5rem] mb-8 border border-slate-200">
                                    <p className="text-slate-700 text-lg md:text-xl font-medium mb-2">
                                        Il tuo caso: Superficie <span className="font-bold text-black border-b-2 border-yellow-400">{selections.sizeLabel}</span> con <span className="font-bold text-black border-b-2 border-yellow-400">{selections.situation.toLowerCase()}</span>.
                                    </p>
                                    <p className="text-slate-700 text-lg md:text-xl font-medium mb-2">
                                        Demolizione: <span className="font-bold text-black border-b-2 border-yellow-400">{selections.demolition === 'sì' ? 'Sì, rimuovi tutto' : 'No, solo impermeabilizzazione'}</span>
                                    </p>
                                    <p className="text-slate-700 text-lg md:text-xl font-medium">
                                        Pavimento: <span className="font-bold text-black border-b-2 border-yellow-400">{selections.flooring === 'sì' ? 'Sì, fornitura + posa' : 'No, solo impermeabilizzazione'}</span>
                                    </p>
                                </div>

                                <div className="mb-10 text-center md:text-left bg-yellow-400 p-8 rounded-[1.5rem] shadow-[0_8px_30px_rgba(250,204,21,0.3)]">
                                    <p className="text-sm font-black uppercase text-slate-900 tracking-widest mb-2">Stima di Investimento</p>
                                    <p className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                                        €{finalPrice.min.toLocaleString()} - €{finalPrice.max.toLocaleString()}
                                    </p>
                                    {finalPrice.addedDesc && (
                                        <p className="text-sm text-slate-900 mt-3 font-bold border-t border-slate-900 pt-3">
                                            <span className="block">Incluso:</span>
                                            {finalPrice.addedDesc}
                                        </p>
                                    )}
                                    <p className="text-xs text-slate-800 mt-3 font-bold">*Il prezzo definitivo sarà confermato dopo inquadramento o sopralluogo tecnico.</p>
                                </div>

                                <div className={`grid ${selections.demolition === 'no' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-10 mb-12`}>
                                    {/* Cosa è incluso */}
                                    <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 h-fit">
                                        <h4 className="font-black text-xl text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                            </div>
                                            Cosa è incluso:
                                        </h4>
                                        <ul className="space-y-4">
                                            {(selections.demolition === 'sì' 
                                                ? [
                                                    { t: "Demolizione pavimento:", d: "Rimozione completa del vecchio pavimento." },
                                                    { t: "Smaltimento macerie:", d: "Trasporto e smaltimento in discarica autorizzata." },
                                                    { t: "Preparazione fondo:", d: "Pulizia e livellamento della superficie." },
                                                    { t: "Ricostruzione massetto:", d: "Nuovo massetto cementizio per base stabile." },
                                                    { t: "Guaina liquida:", d: "Applicazione doppia mano armata con fibra di vetro." },
                                                    { t: "Finitura:", d: "Base pronta per la posa del nuovo pavimento." }
                                                ]
                                                : [
                                                    { t: "Preparazione fondo:", d: "Pulizia tecnica della superficie esistente." },
                                                    { t: "Primer aggrappante:", d: "Stesura promotore di adesione per massima tenuta." },
                                                    { t: "Punti critici:", d: "Sigillatura speciale di angoli, zoccolini e bocchettoni." },
                                                    { t: "Doppia mano armata:", d: "Posa di guaina liquida in due strati incrociati." },
                                                    { t: "Armatura strutturale:", d: "Inserimento rete in fibra anti-crepa." },
                                                    { t: "Materiali e Manodopera:", d: "Lavoro 'chiavi in mano', senza sorprese." }
                                                ]
                                            ).map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                    <p className="text-sm md:text-base text-slate-600">
                                                        <strong className="text-slate-900">{item.t}</strong> {item.d}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Cosa hai azzerato - Mostra solo se NON c'è demolizione */}
                                    {selections.demolition === 'no' && (
                                        <div className="bg-red-50 p-6 rounded-[1.5rem] border border-red-100 h-fit">
                                            <h4 className="font-black text-xl text-red-600 mb-6 uppercase tracking-tight flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                                </div>
                                                I costi azzerati:
                                            </h4>
                                            <ul className="space-y-4">
                                                {[
                                                    "Demolizione vecchio pavimento",
                                                    "Smaltimento macerie in discarica",
                                                    "Ricostruzione massetto",
                                                    "Disagi e polvere 15gg"
                                                ].map((item, i) => (
                                                    <li key={i} className="flex justify-between items-center border-b border-red-200/50 pb-3 last:border-0 last:pb-0">
                                                        <span className="text-sm md:text-base text-slate-700 font-bold line-through decoration-red-400">{item}</span>
                                                        <span className="font-black text-green-600 bg-white px-3 py-1 rounded-lg text-sm shadow-sm">€ 0,00</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Call to action */}
                                <div className="flex flex-col md:flex-row gap-4 border-t-2 border-slate-100 pt-8 mb-4">
                                    <a 
                                        href={generateWhatsAppMessage()}
                                        onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
                                        className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-4 rounded-2xl font-black text-center uppercase tracking-tight shadow-md hover:shadow-xl transition-all flex justify-center items-center gap-2 text-[15px] md:text-lg hover:-translate-y-1"
                                    >
                                        <MessageCircle className="w-6 h-6 flex-shrink-0" /> <span className="leading-tight">Parliamo su WhatsApp</span>
                                    </a>
                                    <a 
                                        href={generateWhatsAppMediaMessage()}
                                        onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); }}
                                        className="flex-1 border-4 border-[#facc15] hover:bg-[#facc15] text-slate-900 py-3 px-4 rounded-2xl font-black text-center uppercase tracking-tight shadow-sm hover:shadow-xl transition-all flex flex-col justify-center items-center gap-0.5 hover:-translate-y-1"
                                    >
                                        <div className="flex items-center gap-2 text-[15px] md:text-lg">
                                            <Camera className="w-5 h-5 flex-shrink-0" /> <span className="leading-tight">Inviaci Foto/Video</span>
                                        </div>
                                        <span className="text-[10px] md:text-[11px] font-bold opacity-70 tracking-normal capitalize mt-0.5">(Per un preventivo preciso)</span>
                                    </a>
                                </div>
                                
                                {/* Frasi rassicuranti sotto la CTA del Quiz e pulsante Rifai Test */}
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 text-slate-500 text-sm font-medium">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                        <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Zero Impegno</span>
                                        <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Nessun Costo Nascosto</span>
                                        <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Risposta Veloce</span>
                                    </div>
                                    <button 
                                        onClick={resetQuiz}
                                        className="text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-wider font-bold text-xs underline underline-offset-4 decoration-slate-300 hover:decoration-slate-800"
                                    >
                                        Rifai il test
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SmartQuoteQuiz;
