'use client';

import { OnboardingData } from '@/lib/types/kanban';

interface WorkspaceSetupProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function WorkspaceSetup({ data, updateData, nextStep }: WorkspaceSetupProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Workspace Setup</h2>
      <p>This is the workspace setup step.</p>
      <button onClick={nextStep} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Continue
      </button>
    </div>
  );
}