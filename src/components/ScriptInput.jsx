import React, { useState } from 'react';
import { useVideoStore } from '../store/videoStore';
import { templates } from '../data/constants';
import templateGenerator from '../utils/templateGenerator';

const ScriptInput = () => {
  const { script, setScript, duration } = useVideoStore();
  const [showTemplates, setShowTemplates] = useState(false);
  const [charCount, setCharCount] = useState(0);
  
  const maxChars = duration === 15 ? 75 : duration === 30 ? 150 : 300;

  const handleScriptChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setScript(value);
      setCharCount(value.length);
    }
  };

  const loadTemplate = (template) => {
    setScript(template.script);
    setShowTemplates(false);
    setCharCount(template.script.length);
  };

  const optimizeScript = async () => {
    const result = templateGenerator.optimizeScript(script, duration);
    if (result.isOptimized) {
      setScript(result.script);
      setCharCount(result.script.length);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-birra-gold">Script / Dialogue</label>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${charCount > maxChars ? 'text-red-400' : 'text-gray-400'}`}>
            {charCount}/{maxChars} chars recommended
          </span>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="text-xs text-birra-gold hover:text-birra-accent transition-colors"
          >
            Use Template
          </button>
        </div>
      </div>

      {/* Templates Dropdown */}
      {showTemplates && (
        <div className="card p-4 space-y-3 animate-fadeIn">
          <h4 className="text-sm font-medium text-birra-light">Choose a Template</h4>
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => loadTemplate(template)}
                className="text-left p-3 rounded-lg bg-birra-dark/50 hover:bg-birra-gold/10 border border-birra-gold/20 hover:border-birra-gold/40 transition-all"
              >
                <h5 className="font-medium text-birra-light text-sm">{template.name}</h5>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{template.script}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Text Area */}
      <div className="relative">
        <textarea
          value={script}
          onChange={handleScriptChange}
          placeholder="Enter your script here... (max 500 characters)"
          className="input-field min-h-[200px] resize-y"
          maxLength={500}
        />
        
        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={optimizeScript}
            disabled={!script}
            className="text-xs px-3 py-1.5 bg-birra-gold/20 hover:bg-birra-gold/30 text-birra-gold rounded-md transition-colors disabled:opacity-50"
            title="Optimize script for selected duration"
          >
            Optimize
          </button>
          <button
            onClick={() => {
              setScript('');
              setCharCount(0);
            }}
            disabled={!script}
            className="text-xs px-3 py-1.5 bg-birra-gold/20 hover:bg-birra-gold/30 text-birra-gold rounded-md transition-colors disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Character Count Progress */}
      <div className="w-full bg-birra-gray rounded-full h-1.5">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${
            charCount > maxChars 
              ? 'bg-red-500' 
              : charCount > maxChars * 0.9 
                ? 'bg-yellow-500' 
                : 'bg-birra-gold'
          }`}
          style={{ width: `${Math.min((charCount / maxChars) * 100, 100)}%` }}
        />
      </div>

      {/* Tips */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>💡 Tips for better results:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Keep sentences short and clear</li>
          <li>Use natural language and pauses</li>
          <li>Avoid complex technical terms</li>
          <li>Include emotion cues in brackets [smile]</li>
        </ul>
      </div>
    </div>
  );
};

export default ScriptInput;
