// Maps symptoms/conditions to doctor specialties
export const symptomToSpecialty = {
  'skin rash': 'Dermatologist',
  'acne': 'Dermatologist',
  'headache': 'Neurologist',
  'migraine': 'Neurologist',
  'stomach pain': 'Gastroenterologist',
  'diarrhea': 'Gastroenterologist',
  'child fever': 'Pediatrician',
  'vaccination': 'Pediatrician',
  'period pain': 'Gynecologist',
  'pregnancy': 'Gynecologist',
  'fever': 'General Physician',
  'cold': 'General Physician'
};

export const getSpecialtyForSymptom = (symptom) => {
  const lowerSymptom = symptom.toLowerCase();
  return symptomToSpecialty[lowerSymptom] || 'General Physician';
};
