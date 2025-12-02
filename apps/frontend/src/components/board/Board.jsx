// components/Board/Board.jsx
const Board = ({ board, onUpdateBoard, onAddList, onAddCard, onUpdateCard, onLabelToggle, onBack }) => {
  // ... your existing Board component code ...

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-6 flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Go back"
          >
            ←
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{board.name || board.title}</h1>
          {board.description && (
            <p className="text-gray-600">{board.description}</p>
          )}
        </div>
      </header>

      {/* ... rest of your board content ... */}
    </div>
  );
};