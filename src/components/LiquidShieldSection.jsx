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
                                    href={`https://wa.me/39334222121212?text=${encodeURIComponent('Ciao! Vi invio una foto del mio tetto/terrazzo per un preventivo. Potete aiutarmi a risolvere le infiltrazioni senza demolire?')}`}
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
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.289-5.323 5.652-5.323 9.388 0 1.202.259 2.349.718 3.384L2.665 23.328l3.582-.94c1.09.595 2.326.928 3.627.928 5.718 0 10.423-4.702 10.423-10.423 0-2.748-1.102-5.331-3.104-7.29-1.999-1.957-4.597-3.03-7.356-3.03m8.814 18.595c-.137-.233-.637-.373-1.332-.649-.695-.276-4.13-2.04-4.771-2.271-.641-.231-1.108-.347-1.576.347-.467.694-1.809 2.271-2.221 2.738-.412.467-.824.52-1.519.244-.695-.276-2.935-.94-5.59-3.437-2.068-1.843-3.466-4.12-3.878-4.814-.412-.694-.044-1.069.31-1.413.317-.317.695-.824.928-1.236.233-.412.311-.694.467-1.161.156-.467.078-.875-.039-1.236-.117-.361-.943-2.271-1.292-3.108-.337-.811-.681-.702-.941-.715-.258-.013-.556-.016-.854-.016-.299 0-.78.112-1.188.535-.408.423-1.56 1.522-1.56 3.708 0 2.186 1.595 4.297 1.816 4.596.22.299 3.1 4.731 7.512 6.642 1.05.463 1.87.742 2.509.952.996.318 1.904.273 2.619.165.798-.122 2.456-1.003 2.8-1.972.344-.969.344-1.8.242-1.972Z"></path>
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
