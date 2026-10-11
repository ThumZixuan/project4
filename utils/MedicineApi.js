const RXNAV_URL = 'https://rxnav.nlm.nih.gov/REST/drugs.json?name=';

export async function findMedicine(query) {
  const response = await fetch(`${RXNAV_URL}${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Medicine search failed');
  const data = await response.json();
  const concept = data?.drugGroup?.conceptGroup?.find(group => group.conceptProperties?.length)?.conceptProperties?.[0];
  if (!concept) throw new Error('Medicine not found');
  return {
    name: concept.name,
    type: concept.synonym || 'Medicine',
    usage: `Identified from the public RxNorm database as ${concept.name}. Check your medicine label for the prescribed use and dosage.`,
  };
}
