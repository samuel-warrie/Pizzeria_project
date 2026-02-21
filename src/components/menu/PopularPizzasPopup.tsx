import React from "react";

interface PopularPizzasPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
  items: string[];
}

const PopularPizzasPopup: React.FC<PopularPizzasPopupProps> = ({
  isOpen,
  onClose,
  isLoading,
  error,
  items,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-md rounded-xl p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            className="text-neutral-500 hover:text-neutral-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {isLoading && <p className="text-sm text-neutral-600">Loading...</p>}

        {!isLoading && error && (
          <p className="text-sm text-red-600">Error: {error}</p>
        )}

        {!isLoading && !error && items.length === 0 && (
          <p className="text-sm text-neutral-600">No items found.</p>
        )}

        {!isLoading && !error && items.length > 0 && (
          <ul className="space-y-2 max-h-72 overflow-auto">
            {items.map((item, idx) => (
              <li key={`${item}-${idx}`} className="border rounded-lg p-3">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PopularPizzasPopup;
