'use client';

import { useState } from 'react';
import { OnboardingData } from '@/lib/types/kanban';

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    workspace: {
      name: '',
      description: ''
    },
    board: {
      name: 'My First Project',
      description: 'This is my first project board',
      privacy: 'workspace',
      background: '#0079BF'
    },
    members: [],
    columns: [
      { id: '1', name: 'To Do', type: 'todo' },
      { id: '2', name: 'In Progress', type: 'inProgress' },
      { id: '3', name: 'Done', type: 'done' }
    ],
    tasks: []
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const resetOnboarding = () => {
    setCurrentStep(0);
    setOnboardingData({
      workspace: {
        name: '',
        description: ''
      },
      board: {
        name: 'My First Project',
        description: 'This is my first project board',
        privacy: 'workspace',
        background: '#0079BF'
      },
      members: [],
      columns: [
        { id: '1', name: 'To Do', type: 'todo' },
        { id: '2', name: 'In Progress', type: 'inProgress' },
        { id: '3', name: 'Done', type: 'done' }
      ],
      tasks: []
    });
  };

  return {
    currentStep,
    onboardingData,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    resetOnboarding,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === 6, // 7 steps total (0-6)
  };
}