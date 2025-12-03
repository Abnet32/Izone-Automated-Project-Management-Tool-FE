export const BOARD_BACKGROUNDS = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  pink: 'bg-pink-500',
  'gradient-blue': 'bg-gradient-to-br from-blue-400 to-blue-600',
  'gradient-green': 'bg-gradient-to-br from-green-400 to-green-600',
} as const;

export const CARD_LABELS = {
  'high-priority': { name: 'High Priority', color: 'bg-red-500 text-white' },
  'medium-priority': { name: 'Medium Priority', color: 'bg-yellow-500 text-white' },
  'low-priority': { name: 'Low Priority', color: 'bg-green-500 text-white' },
  design: { name: 'Design', color: 'bg-purple-500 text-white' },
  development: { name: 'Development', color: 'bg-blue-500 text-white' },
  bug: { name: 'Bug', color: 'bg-red-600 text-white' },
  feature: { name: 'Feature', color: 'bg-green-600 text-white' },
} as const;

export const DEFAULT_LISTS = [
  { title: 'To Do', position: 0 },
  { title: 'In Progress', position: 1 },
  { title: 'Done', position: 2 },
];

export const DRAG_ITEM_TYPES = {
  CARD: 'card',
  LIST: 'list',
} as const;