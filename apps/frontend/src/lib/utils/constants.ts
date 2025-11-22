export const DEFAULT_BACKGROUNDS = [
  '#0079BF', '#D29034', '#519839', '#B04632', '#89609E',
  '#CD5A91', '#4BBF6B', '#00AECC', '#838C91'
];

export const PRIVACY_OPTIONS = [
  { 
    value: 'workspace', 
    label: 'Workspace Visible', 
    description: 'All workspace members can view and edit' 
  },
  { 
    value: 'private', 
    label: 'Private', 
    description: 'Only board members can view and edit' 
  },
  { 
    value: 'public', 
    label: 'Public', 
    description: 'Anyone with the link can view' 
  }
];

export const ROLE_DESCRIPTIONS = {
  admin: 'Can edit everything and manage settings',
  normal: 'Can view and edit cards',
  observer: 'Can view only (commenting can be enabled)'
};

export const SAMPLE_USERS = [
  { id: '1', name: 'John Doe', email: 'john@company.com', role: 'admin' as const },
  { id: '2', name: 'Jane Smith', email: 'jane@company.com', role: 'normal' as const },
  { id: '3', name: 'Mike Johnson', email: 'mike@company.com', role: 'observer' as const },
];

export const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=400',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400'
];