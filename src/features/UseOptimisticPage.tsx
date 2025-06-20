// src/features/UseOptimisticPage.tsx
import { useOptimistic, useState } from 'react';

export default function UseOptimisticPage() {
  const [items, setItems] = useState<string[]>([]);
  const [optimisticItems, addItem] = useOptimistic(
    items,
    (state, newItem: string) => [...state, newItem]
  );

  const [input, setInput] = useState('');

  function handleSubmit() {
    if (!input.trim()) return;
    addItem(input);
    setTimeout(() => setItems((prev) => [...prev, input]), 500); // simulate server delay
    setInput('');
  }

  return (
    <div>
      <h2>useOptimistic Demo</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='New item'
      />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {optimisticItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
