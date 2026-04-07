import React from 'react';

const LiquidShieldSection = () => {
    return (
        <section className="relative z-10 py-24 bg-slate-50 overflow-hidden w-screen -ml-[calc((100vw-100%)/2)]">
            <div className="w-full">
                <div className="w-full text-left">
                    {/* Header Principale */}
                    <div className="mb-16 px-8 md:px-12 lg:px-20">
                        <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-[0.9]">
                            Non serve <span className="text-yellow-500">distruggere il tuo terrazzo</span>
                            <br/>
                            <span className="relative inline-block">
                                <span className="relative z-10">per fermare le perdite</span>
                                <span className="absolute bottom-2 left-0 w-full h-4 bg-yellow-400/30 -rotate-1 -z-0"></span>
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 space-y-8">
                        {/* Approfondimento Testuale a tutta larghezza */}
                        <div className="space-y-8 text-xl text-slate-600 leading-relaxed max-w-5xl text-left px-8 md:px-12 lg:px-20">
                            <p className="text-2xl font-bold text-slate-900">
                                <span className="text-yellow-500">Blocca l'acqua e posa il nuovo pavimento</span> senza l'incubo della demolizione.
                                <br/><br/>
                                Quando piove in casa, il primo pensiero è il terrore del martello pneumatico: <span className="bg-red-100 px-1 text-red-700 font-bold">settimane di rumore assordante, polvere, costi folli</span> per smaltire le macerie in discarica e lo stress di dover coordinare un muratore, un impermeabilizzatore e un piastrellista.
                                <br/><br/>
                                Noi abbiamo <span className="italic font-bold">cambiato le regole.</span> Con il nostro sistema a <span className="text-yellow-500 font-bold">membrana liquida</span>, sigilliamo le perdite direttamente sulle tue vecchie piastrelle in soli <span className="font-bold">2-3 millimetri di spessore.</span> E siccome siamo un'impresa completa, se hai bisogno, possiamo fornire e incollare subito il tuo nuovo pavimento.
                                <br/><br/>
                                <span className="bg-green-100 px-1 text-green-700 font-bold">Un unico referente, zero calcinacci e un lavoro finito alla metà del tempo e costi.</span>
                            </p>
                            
                            {/* CTA - WhatsApp con foto */}
                            <div className="mt-12 flex justify-center relative max-w-3xl w-full">
                                <a
                                    href={`https://wa.me/393342221212?text=${encodeURIComponent('Ciao! Vi invio una foto del mio tetto/terrazzo per un preventivo.')}`}
                                    onClick={() => {
                                        if (typeof window.gtag_report_conversion === 'function') {
                                            window.gtag_report_conversion();
                                        }
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group relative inline-flex flex-col items-center justify-center gap-1 w-full
                                        bg-[#facc15] hover:bg-[#eab308]
                                        px-10 py-4 rounded-xl
                                        text-slate-900 font-black uppercase tracking-tighter
                                        transition-all duration-200
                                        shadow-[0_12px_0_0_rgba(0,0,0,0.3),0_20px_25px_-5px_rgba(250,204,21,0.4)]
                                        hover:shadow-[0_6px_0_0_rgba(0,0,0,0.3),0_15px_20px_-5px_rgba(250,204,21,0.5)]
                                        hover:-translate-y-1
                                        active:translate-y-1
                                        active:shadow-[0_2px_0_0_rgba(0,0,0,0.3)]
                                        border-none
                                        relative
                                    "
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                        </svg>
                                        <span className="text-xl md:text-2xl tracking-[-0.07em]">Inviaci una foto del tuo tetto o terrazzo</span>
                                    </div>
                                    <p className="text-[10px] md:text-xs font-medium text-slate-800 italic">
                                        Tutti i giorni: 7:00-20:00
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiquidShieldSection;
