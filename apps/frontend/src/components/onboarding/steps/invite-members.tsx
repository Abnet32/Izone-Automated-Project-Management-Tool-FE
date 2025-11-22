'use client';

import { OnboardingData } from '@/lib/types/kanban';

interface InviteMembersProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function InviteMembers({ data, updateData, nextStep }: InviteMembersProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Invite Members</h2>
      <p>This is the invite members step.</p>
      <button onClick={nextStep} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Continue
      </button>
    </div>
  );
}
