import { ArrowUp, MessageSquareText, Mic, Minimize2, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const quickPrompts = ['Summarize current risk', 'What needs attention?', 'Explain the live scenario'];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ from: 'aura' | 'user'; text: string }>>([
    { from: 'aura', text: 'Good evening. West operations is connected. One regional weather advisory needs review; no verified property incident is active.' },
  ]);

  function send(text = input) {
    const trimmed = text.trim(); if (!trimmed) return;
    setMessages((items) => [...items, { from: 'user', text: trimmed }, { from: 'aura', text: responseFor(trimmed) }]); setInput('');
  }

  return <div className={`assistant ${open ? 'assistant--open' : ''}`}>
    {open && <section className="assistant-panel" aria-label="AURA AI operations guide">
      <header><div className="assistant-avatar"><div className="assistant-avatar__face"><span /><i /></div><b /></div><span><small>PYREXAI OPERATIONS GUIDE</small><strong>AURA <i>ONLINE</i></strong></span><button className="icon-button" aria-label="Minimize assistant" onClick={() => setOpen(false)}><Minimize2 /></button><button className="icon-button" aria-label="Close assistant" onClick={() => setOpen(false)}><X /></button></header>
      <div className="assistant-context"><Sparkles size={14} /> Responses use the current simulated workspace</div>
      <div className="assistant-messages">{messages.map((message, index) => <div key={index} className={`assistant-message assistant-message--${message.from}`}>{message.text}</div>)}</div>
      <div className="assistant-prompts">{quickPrompts.map((prompt) => <button onClick={() => send(prompt)} key={prompt}>{prompt}</button>)}</div>
      <form className="assistant-input" onSubmit={(event) => { event.preventDefault(); send(); }}><button type="button" aria-label="Voice input"><Mic /></button><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask AURA about operations…" aria-label="Message AURA" /><button type="submit" aria-label="Send message"><ArrowUp /></button></form>
      <footer>AI output may be inaccurate · Verify safety-critical information</footer>
    </section>}
    {!open && <button className="assistant-launcher" onClick={() => setOpen(true)} aria-label="Open AURA AI guide"><span className="assistant-launcher__orb"><Sparkles /></span><span><small>ASK AURA</small><strong>Operations guide</strong></span><MessageSquareText /></button>}
  </div>;
}

function responseFor(prompt: string) {
  const value = prompt.toLowerCase();
  if (value.includes('risk')) return 'Current demonstration risk is elevated regionally because humidity is 16% and wind is 23 mph. No confirmed site fire is active. Open AI Command to run the labeled incident scenario.';
  if (value.includes('attention')) return 'Review the North Valley Red Flag advisory and the 218 sensor calibrations due within 30 days. Neither item represents a confirmed fire.';
  if (value.includes('scenario')) return 'The scenario advances through anomaly, multi-sensor verification, incident confirmation, defense staging, coordination, and modeled stabilization. It never controls real hardware.';
  return 'I can explain network risk, site readiness, incident evidence, device health, or the demonstration workflow. Safety-critical decisions still require authorized human review.';
}
