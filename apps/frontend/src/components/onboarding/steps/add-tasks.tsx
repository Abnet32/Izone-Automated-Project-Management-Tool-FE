'use client';

import { OnboardingData } from '@/lib/types/kanban';
import { useState } from 'react';
import { Plus, Calendar, User, MessageSquare, Paperclip, CheckSquare, FileText } from 'lucide-react';

interface AddTasksProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function AddTasks({ data, updateData, nextStep }: AddTasksProps) {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    columnId: data.columns[0]?.id || ''
  });
  const [showCardBack, setShowCardBack] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const addTask = () => {
    if (newTask.title.trim() && newTask.columnId) {
      const task = {
        id: `task-${Date.now()}`,
        title: newTask.title.trim(),
        description: newTask.description,
        columnId: newTask.columnId
      };
      
      updateData({
        tasks: [...data.tasks, task]
      });
      
      setNewTask({
        title: '',
        description: '',
        columnId: data.columns[0]?.id || ''
      });
    }
  };

  const removeTask = (taskId: string) => {
    updateData({
      tasks: data.tasks.filter(t => t.id !== taskId)
    });
  };

  const openCardBack = (task: any) => {
    setSelectedTask(task);
    setShowCardBack(true);
  };

  const closeCardBack = () => {
    setShowCardBack(false);
    setSelectedTask(null);
  };

  const updateTaskDetails = (updates: any) => {
    if (!selectedTask) return;
    
    const updatedTasks = data.tasks.map(task =>
      task.id === selectedTask.id ? { ...task, ...updates } : task
    );
    
    updateData({ tasks: updatedTasks });
    setSelectedTask({ ...selectedTask, ...updates });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Add tasks and to-dos
        </h2>
        <p className="text-gray-600">
          Cards represent tasks and ideas. Add cards for each task that needs to be completed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Task Creation Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Create a new task</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task title *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What needs to be done?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add more details..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  List
                </label>
                <select
                  value={newTask.columnId}
                  onChange={(e) => setNewTask(prev => ({ ...prev, columnId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {data.columns.map(column => (
                    <option key={column.id} value={column.id}>
                      {column.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={addTask}
                disabled={!newTask.title.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Task Card
              </button>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">🎯 Card Features</h4>
            <div className="text-green-700 text-sm space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Descriptions with markdown support</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Due dates and reminders</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Assign team members</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                <span>Checklists for subtasks</span>
              </div>
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                <span>File attachments</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Comments and activity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Board Preview */}
        <div className="lg:col-span-3">
          <h3 className="font-medium text-gray-900 mb-4">Your board preview</h3>
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {data.columns.map((column) => (
                <div key={column.id} className="flex-shrink-0 w-64">
                  <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
                    {/* Column Header */}
                    <div className="p-3 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 text-sm">{column.name}</h4>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                          {data.tasks.filter(t => t.columnId === column.id).length}
                        </span>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="p-2 space-y-2 min-h-[200px] max-h-[400px] overflow-y-auto">
                      {data.tasks
                        .filter(task => task.columnId === column.id)
                        .map(task => (
                          <div 
                            key={task.id} 
                            className="bg-white border border-gray-200 rounded p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
                            onClick={() => openCardBack(task)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium text-gray-900 text-sm flex-1 leading-tight">
                                {task.title}
                              </h5>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeTask(task.id);
                                }}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors ml-2 flex-shrink-0"
                              >
                                ×
                              </button>
                            </div>
                            
                            {task.description && (
                              <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                                {task.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1 hover:text-gray-700 p-1">
                                  <Calendar className="w-3 h-3" />
                                </button>
                                <button className="flex items-center gap-1 hover:text-gray-700 p-1">
                                  <User className="w-3 h-3" />
                                </button>
                                <button className="flex items-center gap-1 hover:text-gray-700 p-1">
                                  <CheckSquare className="w-3 h-3" />
                                </button>
                              </div>
                              <button className="flex items-center gap-1 hover:text-gray-700 p-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>0</span>
                              </button>
                            </div>
                          </div>
                        ))
                      }

                      {data.tasks.filter(t => t.columnId === column.id).length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No tasks yet</p>
                          <p className="text-xs">Add a card to get started</p>
                        </div>
                      )}
                    </div>

                    {/* Add Card Button */}
                    <div className="p-2 border-t border-gray-200">
                      <button className="w-full flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded text-sm transition-colors">
                        <Plus className="w-4 h-4" />
                        Add a card
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>💡 <strong>Pro tip:</strong> Click on any card to add descriptions, due dates, assign members, and more!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Back Modal */}
      {showCardBack && selectedTask && (
        <CardBack
          task={selectedTask}
          onClose={closeCardBack}
          onUpdate={updateTaskDetails}
        />
      )}

      <div className="flex justify-end mt-8">
        <button
          onClick={nextStep}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
}

// Card Back Component
function CardBack({ task, onClose, onUpdate }: { task: any; onClose: () => void; onUpdate: (updates: any) => void }) {
  const [description, setDescription] = useState(task.description || '');
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const saveDescription = () => {
    onUpdate({ description });
    setIsEditingDescription(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h2>
            <p className="text-gray-500 text-sm">
              in list <span className="font-medium">{
                ['To Do', 'In Progress', 'Done'][Math.floor(Math.random() * 3)]
              }</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Description & Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Description</h3>
                </div>
                {isEditingDescription ? (
                  <div className="space-y-3">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add a more detailed description..."
                      className="w-full min-h-[120px] p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveDescription}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setDescription(task.description || '');
                          setIsEditingDescription(false);
                        }}
                        className="px-4 py-2 text-gray-600 text-sm rounded hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="min-h-[60px] p-3 border border-transparent hover:border-gray-300 rounded cursor-text"
                    onClick={() => setIsEditingDescription(true)}
                  >
                    {description ? (
                      <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
                    ) : (
                      <p className="text-gray-500 italic">Add a more detailed description...</p>
                    )}
                  </div>
                )}
              </div>

              {/* Activity */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Activity</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-medium text-white">
                      You
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <div className="mt-2 text-xs text-gray-500">
                        <strong>Pro tip:</strong> Use @ to mention teammates and add them to this card
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Add to Card */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm">Add to card</h3>
              
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Members</div>
                  <div className="text-gray-500 text-xs">Assign people to this card</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                <CheckSquare className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Checklist</div>
                  <div className="text-gray-500 text-xs">Add subtasks and to-dos</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                <Calendar className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Due Date</div>
                  <div className="text-gray-500 text-xs">Add deadlines and reminders</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                <Paperclip className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Attachment</div>
                  <div className="text-gray-500 text-xs">Add files and documents</div>
                </div>
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-blue-900 text-sm mb-2">💡 Get Specific</h4>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Add detailed descriptions with markdown</li>
                  <li>• Set due dates with custom reminders</li>
                  <li>• Create checklists for complex tasks</li>
                  <li>• Attach files and documents</li>
                  <li>• @mention team members in comments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}