import { useState } from 'react';

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    // 1. Defensive Check
    if (!input.trim()) {
      console.warn("Input is empty");
      return;
    }
    if (isLoading) {
      console.warn("Request already in progress");
      return;
    }
    
    const userPrompt = input;
    setInput("");
    setIsLoading(true);
    console.log("Sending prompt to backend:", userPrompt);

    // 2. Placeholder for UI
    setMessages(prev => [...prev, { user: userPrompt, gpt: null, gemini: null, judgment: null }]);

    try {
      // 3. Fetch Request
      const res = await fetch('http://localhost:3002/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      console.log("Received data from backend:", data);

      // 4. Update UI state
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { 
          user: userPrompt, 
          gpt: data.gpt, 
          gemini: data.gemini, 
          judgment: data.judgment 
        };
        return newMsgs;
      });

    } catch (err) {
      console.error("Fetch error detail:", err);
      alert("Failed to reach server. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
        <h1 className="mb-8 text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-red-500">
          CONSISTENCY ENGINE
        </h1>

        <div className="mb-6 h-125 overflow-y-auto space-y-8 pr-2">
          {messages.map((m, i) => (
            <div key={i} className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl text-gray-300 italic">{m.user}</div>
              {isLoading && !m.gpt ? (
                <p className="text-purple-400 animate-pulse">Analyzing consistency...</p>
              ) : m.gpt ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-purple-900/10 border border-purple-500/20">
                      <p className="text-[10px] font-bold text-purple-500 mb-2">GPT-4O-MINI</p>
                      <p className="text-sm">{m.gpt.answer.join(" ")}</p>
                      <p className="text-[10px] mt-2 opacity-50">Confidence: {m.gpt.confidence}/5</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-red-900/10 border border-red-500/20">
                      <p className="text-[10px] font-bold text-red-400 mb-2">GEMINI 1.5 FLASH</p>
                      <p className="text-sm">{m.gemini.answer.join(" ")}</p>
                      <p className="text-[10px] mt-2 opacity-50">Confidence: {m.gemini.confidence}/5</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-bold text-yellow-400 mb-2 uppercase">Engine Judgment</p>
                    <p className="text-sm whitespace-pre-line">{m.judgment}</p>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>

        <div className="relative flex items-center">
          <input 
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-6 outline-none focus:border-purple-500"
            placeholder="Type here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 bg-linear-to-r from-purple-600 to-red-600 p-3 rounded-xl hover:scale-105 transition-transform"
          >
            {isLoading ? "..." : "➜"}
          </button>
        </div>
      </div>
    </div>
  );
}