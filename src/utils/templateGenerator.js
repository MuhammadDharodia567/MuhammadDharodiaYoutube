/**
 * Template generation and script optimization utilities
 */

import { templates } from '../data/constants';

export class TemplateGenerator {
  /**
   * Get all available templates
   */
  getTemplates() {
    return templates;
  }

  /**
   * Get template by ID
   */
  getTemplateById(id) {
    return templates.find(t => t.id === id);
  }

  /**
   * Apply template with custom values
   */
  applyTemplate(templateId, replacements = {}) {
    const template = this.getTemplateById(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    let script = template.script;
    
    // Replace placeholders with actual values
    Object.entries(replacements).forEach(([key, value]) => {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      script = script.replace(regex, value);
    });

    return {
      ...template,
      script,
    };
  }

  /**
   * Optimize script for video duration
   */
  optimizeScript(script, targetDuration = 30, wordsPerMinute = 150) {
    const targetWords = (targetDuration / 60) * wordsPerMinute;
    const words = script.trim().split(/\s+/);
    
    if (words.length <= targetWords) {
      return {
        script,
        isOptimized: false,
        originalLength: words.length,
        optimizedLength: words.length,
      };
    }

    // Truncate to fit duration
    const optimizedWords = words.slice(0, Math.floor(targetWords * 0.9));
    const optimizedScript = optimizedWords.join(' ');
    
    // Try to end at a sentence boundary
    const lastPeriod = optimizedScript.lastIndexOf('.');
    const finalScript = lastPeriod > optimizedScript.length * 0.7
      ? optimizedScript.substring(0, lastPeriod + 1)
      : optimizedScript + '...';

    return {
      script: finalScript,
      isOptimized: true,
      originalLength: words.length,
      optimizedLength: finalScript.split(/\s+/).length,
    };
  }

  /**
   * Generate script variations using Claude API
   */
  async generateVariations(baseScript, count = 3, options = {}) {
    const { emotion, tone, style } = options;

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'variations',
          baseScript,
          count,
          options: { emotion, tone, style },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate variations');
      }

      const data = await response.json();
      return data.variations || [];
    } catch (error) {
      console.error('Error generating variations:', error);
      // Fallback: simple modifications
      return this.generateSimpleVariations(baseScript, count);
    }
  }

  /**
   * Simple fallback variation generator (no API)
   */
  generateSimpleVariations(script, count = 3) {
    const variations = [];
    const sentences = script.match(/[^\.!\?]+[\.!\?]+/g) || [script];
    
    for (let i = 0; i < count; i++) {
      let variation = [...sentences];
      
      // Shuffle some sentences
      if (variation.length > 2) {
        const idx1 = Math.floor(Math.random() * variation.length);
        const idx2 = (idx1 + 1) % variation.length;
        [variation[idx1], variation[idx2]] = [variation[idx2], variation[idx1]];
      }
      
      variations.push({
        id: `var-${i + 1}`,
        script: variation.join(' ').trim(),
      });
    }
    
    return variations;
  }

  /**
   * Enhance script with emotional tone
   */
  enhanceWithEmotion(script, emotion) {
    const emotionModifiers = {
      professional: {
        prefixes: ['Let me explain.', 'Here are the facts.', 'Consider this:'],
        suffixes: ['Thank you for your attention.', 'I appreciate your time.'],
      },
      friendly: {
        prefixes: ['Hey there!', 'Great to see you!', 'Welcome!'],
        suffixes: ['Hope this helps!', 'Have a wonderful day!'],
      },
      energetic: {
        prefixes: ['Exciting news!', "Let's dive in!", 'Get ready!'],
        suffixes: ['Let\'s go!', 'Amazing, right?', 'Don\'t wait!'],
      },
      calm: {
        prefixes: ['Take a moment.', 'Let\'s explore this together.', 'Breathe and listen.'],
        suffixes: ['Peace be with you.', 'Take care.'],
      },
      enthusiastic: {
        prefixes: ['This is incredible!', 'You won\'t believe this!', 'Amazing opportunity!'],
        suffixes: ['This changes everything!', 'Get started now!'],
      },
      serious: {
        prefixes: ['This is important.', 'Pay close attention.', 'Critical information:'],
        suffixes: ['This requires your immediate attention.', 'Please take this seriously.'],
      },
    };

    const modifiers = emotionModifiers[emotion] || emotionModifiers.professional;
    const prefix = modifiers.prefixes[Math.floor(Math.random() * modifiers.prefixes.length)];
    const suffix = modifiers.suffixes[Math.floor(Math.random() * modifiers.suffixes.length)];

    return `${prefix} ${script} ${suffix}`;
  }

  /**
   * Estimate reading time for script
   */
  estimateReadingTime(script, wordsPerMinute = 150) {
    const wordCount = script.trim().split(/\s+/).length;
    const seconds = (wordCount / wordsPerMinute) * 60;
    
    return {
      wordCount,
      estimatedSeconds: Math.round(seconds),
      recommendedDuration: this.recommendDuration(seconds),
    };
  }

  /**
   * Recommend video duration based on script length
   */
  recommendDuration(estimatedSeconds) {
    if (estimatedSeconds <= 15) return 15;
    if (estimatedSeconds <= 30) return 30;
    if (estimatedSeconds <= 60) return 60;
    return 60; // Max supported
  }

  /**
   * Validate script for video generation
   */
  validateScript(script, maxDuration = 60) {
    const errors = [];
    const warnings = [];

    if (!script || script.trim().length === 0) {
      errors.push('Script cannot be empty');
    }

    const wordCount = script.trim().split(/\s+/).length;
    const maxWords = (maxDuration / 60) * 150;

    if (wordCount > maxWords) {
      errors.push(`Script is too long for ${maxDuration}s video (${wordCount} words, max ${Math.floor(maxWords)})`);
    } else if (wordCount > maxWords * 0.9) {
      warnings.push('Script is near the maximum length');
    }

    if (wordCount < 10) {
      warnings.push('Script may be too short for engaging video');
    }

    // Check for inappropriate content (basic)
    const inappropriateWords = ['spam', 'scam', 'fake'];
    const foundInappropriate = inappropriateWords.filter(word => 
      script.toLowerCase().includes(word)
    );
    
    if (foundInappropriate.length > 0) {
      warnings.push(`Consider revising: contains potentially flagged terms`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      wordCount,
    };
  }
}

export const templateGenerator = new TemplateGenerator();
export default templateGenerator;
