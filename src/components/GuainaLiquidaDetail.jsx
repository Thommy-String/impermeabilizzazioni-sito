import React from 'react';

const GuainaLiquidaDetail = () => {
    return (
        <section className="relative z-10 py-24 bg-slate-50 overflow-hidden w-screen -ml-[calc((100vw-100%)/2)]">
            <div className="w-full">
                <div className="w-full text-left">
                    {/* Header Principale */}
                    <div className="mb-16 px-8 md:px-12 lg:px-20">
                       
                        <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-[0.9]">
                            Perché la <span className="text-yellow-500">guaina liquida</span> è la scelta <br/>
                            <span className="relative inline-block">
                                <span className="relative z-10">N.1 in Italia</span>
                                <span className="absolute bottom-2 left-0 w-full h-4 bg-yellow-400/30 -rotate-1 -z-0"></span>
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 space-y-8">
                        {/* Approfondimento Testuale a tutta larghezza */}
                        <div className="space-y-8 text-xl text-slate-600 leading-relaxed max-w-5xl text-left px-8 md:px-12 lg:px-20">
                            <p className="text-2xl font-bold text-slate-900">
                                Perché siamo passati alla guaina liquida? Per un motivo molto logico: <span className="text-yellow-500">non ha punti deboli.</span>
                                <br/><br/>
                                I vecchi rotoli di catrame andavano affiancati l'uno all'altro. E l'acqua, prima o poi, trovava sempre il modo di infilarsi. 
                                <br/><br/>
                                La guaina liquida, invece, si versa sul tuo pavimento creando un "pezzo" unico. Essendo liquida all'inizio, penetra e sigilla anche i pori più invisibili. Poi si indurisce, creando un'armatura elastica impenetrabile. 
                                <br/><br/>
                            </p>
                            
                            <div className="space-y-12 text-left">
                                {/* Punto 1 */}
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-3">
                                        <span className="bg-red-600 text-white px-2 py-0.5 rounded rotate-1 inline-block text-sm md:text-base">Zero fughe, zero rischi</span>
                                        Manto Continuo: L'Acqua Non Ha Più Vie di Fuga.
                                    </h3>
                                    <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                                        Il 95% delle infiltrazioni avviene nei punti di saldatura. La guaina tradizionale è come un insieme di fogli incollati: col tempo, il calore e il gelo creano micro-fratture. La <span className="bg-yellow-200 px-1">guaina liquida</span> viene stesa come un <span className="italic font-bold">monoblocco continuo</span> senza interruzioni.
                                    </p>
                                </div>

                                {/* Punto 2 */}
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-3">
                                        <span className="bg-yellow-500 text-slate-900 px-2 py-0.5 rounded -rotate-2 inline-block text-sm md:text-base">ADDIO CREPE E FESSURE</span>
                                        Elasticità oltre il 300%
                                    </h3>
                                    <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                                        I palazzi si muovono. Una struttura rigida finisce per crepare. La nostra mescola segue i movimenti strutturali del terrazzo <span className="text-red-600 font-bold">senza mai lacerarsi</span>, mantenendo la sigillatura attiva per decenni.
                                    </p>
                                </div>

                                {/* Punto 3 */}
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-3">
                                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded rotate-1 inline-block text-sm md:text-base">riflette i raggi uv</span>
                                        Non scalda casa
                                    </h3>
                                    <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                                        Grazie ai pigmenti tecnologici, la membrana riflette il sole. Il massetto non si scalda, riducendo la temperatura interna <span className="text-blue-600 font-bold">fino a 4-5 gradi</span> in estate, con risparmio immediato sui consumi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuainaLiquidaDetail;
