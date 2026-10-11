const OPEN_FOOD_FACTS_URL = 'https://world.openfoodfacts.org/api/v2/product/';

export async function findProduct(barcode) {
  const code = String(barcode || '').trim();
  if (!code) throw new Error('Enter a barcode first.');
  const response = await fetch(`${OPEN_FOOD_FACTS_URL}${encodeURIComponent(code)}.json`);
  if (!response.ok) throw new Error('Could not reach Open Food Facts. Check your internet connection.');
  const data = await response.json();
  if (data.status !== 1 || !data.product) throw new Error('Product not found. Try another barcode or add it manually.');
  const p = data.product;
  const n = p.nutriments || {};
  const per100 = (key, unit = 'g') => {
    const value = n[`${key}_100g`];
    return value === undefined || value === null ? '—' : `${value} ${unit}`;
  };
  return {
    barcode: code,
    name: p.product_name || p.product_name_en || 'Unknown product',
    brand: p.brands || 'Brand not listed',
    image: p.image_front_small_url || p.image_url || null,
    quantity: p.quantity || 'Quantity not listed',
    ingredients: p.ingredients_text_en || p.ingredients_text || 'Ingredients not available',
    nutrition: [
      { label: 'Energy', value: n['energy-kcal_100g'] != null ? `${n['energy-kcal_100g']} kcal` : '—' },
      { label: 'Fat', value: per100('fat') },
      { label: 'Carbs', value: per100('carbohydrates') },
      { label: 'Protein', value: per100('proteins') },
      { label: 'Sugars', value: per100('sugars') },
      { label: 'Salt', value: per100('salt') },
    ],
    source: 'Open Food Facts',
  };
}
