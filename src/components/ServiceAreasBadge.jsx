import React from 'react';
import { MapPin } from 'lucide-react';

function ServiceAreasBadge() {
    return (
        <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/30 shadow-lg">
                
                {/* Immagine Lombardia */}
                <img 
                    src="https://www.isg.pv.it/sito/wp-content/uploads/2024/06/Logo-regione-lombardia-patrocinio-le-forme-del-gusto.png" 
                    alt="Lombardia" 
                    className="w-25 h-10 md:w-20 md:h-20 object-contain drop-shadow-md"
                />
                
                {/* Testo */}
                <div className="flex flex-col">
                    <span className="text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest leading-tight">
                        Lavoriamo in
                    </span>
                    <span className="text-sm md:text-base font-black text-white uppercase tracking-tight leading-tight">
                        Lombardia
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ServiceAreasBadge;
