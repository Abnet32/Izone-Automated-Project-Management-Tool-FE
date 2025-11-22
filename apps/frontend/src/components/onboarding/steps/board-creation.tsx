'use client';

import { OnboardingData } from '@/lib/types/kanban';

interface BoardCreationProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function BoardCreation({ data, updateData, nextStep }: BoardCreationProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Board Creation</h2>
      <p>This is the board creation step.</p>
      <button onClick={nextStep} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Continue
      </button>
    </div>
  );
}