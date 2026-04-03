#!/bin/bash
# ============================================================
# 🚀 Crea una nuova landing page per Eco Solutions
# 
# Uso:
#   ./create-landing.sh pannelli-fotovoltaici "Pannelli Fotovoltaici"
#
# Parametri:
#   $1 = slug (es: pannelli-fotovoltaici) → diventa il percorso URL
#   $2 = nome visualizzato (es: "Pannelli Fotovoltaici")
# ============================================================

set -e

SLUG="$1"
DISPLAY_NAME="$2"

if [ -z "$SLUG" ] || [ -z "$DISPLAY_NAME" ]; then
  echo ""
  echo "❌ Uso: ./create-landing.sh <slug> \"<nome visualizzato>\""
  echo ""
  echo "   Esempio:"
  echo "   ./create-landing.sh pannelli-fotovoltaici \"Pannelli Fotovoltaici\""
  echo "   ./create-landing.sh riscaldamento-pavimento \"Riscaldamento a Pavimento\""
  echo ""
  exit 1
fi

# Percorso di questo progetto (impermeabilizzazioni) come template
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEMPLATE_DIR="$SCRIPT_DIR"
PARENT_DIR="$(dirname "$SCRIPT_DIR")"
NEW_DIR="$PARENT_DIR/landing-$SLUG"

if [ -d "$NEW_DIR" ]; then
  echo "❌ La cartella $NEW_DIR esiste già!"
  exit 1
fi

echo ""
echo "📦 Creo nuova landing: $DISPLAY_NAME"
echo "   Slug:     $SLUG"
echo "   URL:      https://www.ecosolutionsas.com/$SLUG/"
echo "   Cartella: $NEW_DIR"
echo ""

# 1. Copia il progetto template
echo "📋 Copio il template..."
rsync -a \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.git' \
  --exclude='.DS_Store' \
  --exclude='root-redirect' \
  "$TEMPLATE_DIR/" "$NEW_DIR/"

# 2. Aggiorna vite.config.js
echo "⚙️  Aggiorno vite.config.js..."
sed -i '' "s|/impermeabilizzazioni/|/$SLUG/|g" "$NEW_DIR/vite.config.js"

# 3. Aggiorna package.json
echo "📦 Aggiorno package.json..."
sed -i '' "s|landing-impermeabilizzazioni|landing-$SLUG|g" "$NEW_DIR/package.json"
sed -i '' "s|/impermeabilizzazioni|/$SLUG|g" "$NEW_DIR/package.json"

# 4. Aggiorna index.html
echo "🌐 Aggiorno index.html..."
sed -i '' "s|/impermeabilizzazioni|/$SLUG|g" "$NEW_DIR/index.html"

# 5. Aggiorna constants.js
echo "📝 Aggiorno constants.js..."
sed -i '' "s|/impermeabilizzazioni|/$SLUG|g" "$NEW_DIR/src/utils/constants.js"

# 6. Aggiorna sitemap.xml
echo "🗺️  Aggiorno sitemap.xml..."
sed -i '' "s|/impermeabilizzazioni|/$SLUG|g" "$NEW_DIR/public/sitemap.xml"

# 7. Aggiorna robots.txt
echo "🤖 Aggiorno robots.txt..."
sed -i '' "s|/impermeabilizzazioni|/$SLUG|g" "$NEW_DIR/public/robots.txt"

# 8. Aggiorna generate-sitemap.js
echo "🔧 Aggiorno generate-sitemap.js..."
sed -i '' "s|/impermeabilizzazioni/|/$SLUG/|g" "$NEW_DIR/scripts/generate-sitemap.js"

# 9. Aggiorna web.config (entrambi)
echo "🪟 Aggiorno web.config..."
# Nessuna modifica necessaria: il web.config punta al dominio ecosolutionsas.com

# 10. Installa dipendenze
echo "📥 Installo dipendenze..."
cd "$NEW_DIR"
npm install

echo ""
echo "✅ Landing '$DISPLAY_NAME' creata con successo!"
echo ""
echo "📁 Cartella: $NEW_DIR"
echo "🌐 URL:      https://www.ecosolutionsas.com/$SLUG/"
echo ""
echo "👉 Prossimi passi:"
echo "   1. cd \"$NEW_DIR\""
echo "   2. Modifica i contenuti (Hero, Quiz, immagini, testi...)"
echo "   3. Aggiorna index.html → title, description, schema"
echo "   4. Aggiorna src/utils/constants.js → COMPANY_NAME, MAIN_CATEGORY, PHONE, ecc."
echo "   5. Se hai un conversion ID Google Ads diverso, aggiornalo in index.html"
echo "   6. npm run dev    → per testare in locale"
echo "   7. npm run build  → per creare la dist/"
echo "   8. Carica dist/ su Aruba dentro /$SLUG/"
echo ""
