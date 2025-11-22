'use client';

import { useState } from 'react';
import { WorkspaceSetup } from './steps/workspace-setup';
import { BoardCreation } from './steps/board-creation';
import { BoardCustomization } from './steps/board-customization';
import { InviteMembers } from './steps/invite-members';
import { BuildWorkflow } from './steps/build-workflow';
import { AddTasks } from './steps/add-tasks';
import { Completion } from './steps/Completion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { OnboardingData } from '@/lib/types/kanban';
import { useWorkspace } from '@/hooks/kanban/use-workspace';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function OnboardingWizard({ isOpen, onClose, onComplete }: OnboardingWizardProps) {
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

  const { initializeWorkspace } = useWorkspace();

  const steps = [
    {
      title: 'Create your workspace',
      component: WorkspaceSetup,
      description: 'Start by setting up your workspace'
    },
    {
      title: 'Create a board',
      component: BoardCreation,
      description: 'Set up your first project board'
    },
    {
      title: 'Customize your board',
      component: BoardCustomization,
      description: 'Make it yours with colors and background'
    },
    {
      title: 'Start collaborating',
      component: InviteMembers,
      description: 'Invite team members to your board'
    },
    {
      title: 'Build your workflow',
      component: BuildWorkflow,
      description: 'Set up your lists and columns'
    },
    {
      title: 'Add tasks and to-dos',
      component: AddTasks,
      description: 'Create your first tasks'
    },
    {
      title: "You're all set!",
      component: Completion,
      description: 'Start using your new board'
    }
  ];

  const updateData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // On completion, initialize the workspace
      initializeWorkspace(onboardingData.workspace, onboardingData.board);
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Build your first project in Trello
              </h1>
              <p className="text-gray-600 text-sm">
                {steps[currentStep].description}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-600">
              {steps[currentStep].title}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <CurrentStepComponent
            data={onboardingData}
            updateData={updateData}
            nextStep={nextStep}
            prevStep={prevStep}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip tutorial
            </button>
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}