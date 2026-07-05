import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Terminal, AlertTriangle, MessageSquare, Trash2 } from 'lucide-react';

interface LocalMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([]);

  // Load sent messages on component mount
  useEffect(() => {
    const saved = localStorage.getItem('e1s4-contact-logs');
    if (saved) {
      try {
        setLocalMessages(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse contact logs", err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('All fields are required. Please check your inputs.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please supply a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server POST delay
    setTimeout(() => {
      const newMsg: LocalMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      const updated = [newMsg, ...localMessages];
      setLocalMessages(updated);
      localStorage.setItem('e1s4-contact-logs', JSON.stringify(updated));

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset inputs
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Auto-dismiss success status in 4 seconds
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1500);
  };

  const clearLogs = () => {
    setLocalMessages([]);
    localStorage.removeItem('e1s4-contact-logs');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Actual Form box */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-white dark:bg-slate-900 shadow-sm relative">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-4 h-4 text-cyan-500" />
          <h4 className="font-display font-medium text-slate-800 dark:text-slate-100 text-sm">Send a direct message</h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                disabled={isSubmitting}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none transition duration-150"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                disabled={isSubmitting}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none transition duration-150"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Inquiry about baitbox or web systems..."
              disabled={isSubmitting}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none transition duration-150"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Message content
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi E1S4, I checked out your honeypot repo..."
              disabled={isSubmitting}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none transition duration-150 resize-none"
            />
          </div>

          {/* Error notifications */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success notifications */}
          {isSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
              <CheckCircle className="w-4 h-4 shrink-0 animate-pulse" />
              <span>Message dispatched to the local homelab terminal successfully!</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 dark:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-mono text-xs uppercase font-bold tracking-wider py-3 rounded-xl transition duration-150 cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                Processing request...
              </span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Transmit Message
              </>
            )}
          </button>
        </form>
      </div>

      {/* Terminal Logging Interface showing saved local messages */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-900 text-slate-100 font-mono shadow-md flex flex-col h-full min-h-[320px]">
        <div className="flex items-center justify-between mb-3 border-b border-slate-850 pb-2 shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs uppercase tracking-wider font-bold">homelab-inbox-log.txt</span>
          </div>
          {localMessages.length > 0 && (
            <button
              onClick={clearLogs}
              className="text-[9px] hover:text-rose-400 text-slate-400 flex items-center gap-1 bg-slate-850 px-2.5 py-1 rounded border border-slate-800 transition"
              title="Clear Local Outbox"
            >
              <Trash2 className="w-2.5 h-2.5" /> Clear Logs
            </button>
          )}
        </div>

        {/* Console scrollbox */}
        <div className="flex-1 overflow-y-auto text-xs space-y-3 pr-2 scrollbar-none">
          <p className="text-slate-500 text-[10px]"># Tail of logged local submits inside localStorage outbox:</p>
          
          {localMessages.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              <p className="italic">&lt;Console is silent. Send a message to seed the log&gt;</p>
              <p className="text-[10px] mt-2">Active listener bound to :3000/api/outbox</p>
            </div>
          ) : (
            localMessages.map((msg, i) => (
              <div key={msg.id} className="bg-slate-950/40 p-3 rounded-lg border border-slate-850 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] border-b border-slate-850/50 pb-1">
                  <span className="text-cyan-400">MSG_{msg.id} received</span>
                  <span className="text-slate-500">{msg.timestamp}</span>
                </div>
                <p className="text-[11px]"><b className="text-slate-400">From:</b> {msg.name} &lt;{msg.email}&gt;</p>
                <p className="text-[11px]"><b className="text-slate-400">Subject:</b> {msg.subject}</p>
                <div className="bg-slate-950/80 p-2 rounded text-[10px] text-slate-300 whitespace-pre-wrap font-mono mt-1">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="shrink-0 pt-2 border-t border-slate-850 text-[10px] text-slate-500 flex justify-between">
          <span>Active listeners: 1 (baitbox_agent_1)</span>
          <span>Status: ONLINE</span>
        </div>
      </div>
    </div>
  );
};
