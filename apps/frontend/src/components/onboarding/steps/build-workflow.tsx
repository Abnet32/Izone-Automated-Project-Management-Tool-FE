'use client';

import { OnboardingData } from '@/lib/types/kanban';

interface BuildWorkflowProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function BuildWorkflow({ data, updateData, nextStep }: BuildWorkflowProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Build Workflow</h2>
      <p>This is the build workflow step.</p>
      <button onClick={nextStep} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Continue
      </button>
    </div>
  );
}