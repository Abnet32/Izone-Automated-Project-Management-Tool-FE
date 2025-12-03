export const debugStorage = () => {
  if (typeof window === 'undefined') return;
  
  console.log('=== STORAGE DEBUG INFO ===');
  console.log('LocalStorage boards:', localStorage.getItem('boards'));
  console.log('LocalStorage projects:', localStorage.getItem('projects'));
  console.log('==========================');
};

// Call this in your browser console to debug
if (typeof window !== 'undefined') {
  (window as any).debugStorage = debugStorage;
}