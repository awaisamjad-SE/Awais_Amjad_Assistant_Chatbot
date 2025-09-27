import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const VoiceRecorder = ({
  onVoiceInput,
  isListening,
  setIsListening
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onVoiceInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onVoiceInput, setIsListening]);

  const toggleListening = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  if (!isSupported) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="bg-white/20 border-white/30 text-white/50 rounded-xl cursor-not-allowed"
        disabled
      >
        <MicOff className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={toggleListening}
      className={`rounded-xl px-4 py-3 transition-all duration-300 transform hover:scale-105 ${
        isListening
          ? 'bg-red-500 hover:bg-red-600 animate-pulse'
          : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
      }`}
    >
      {isListening ? (
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-white animate-bounce" />
          <span className="text-white text-sm hidden sm:inline">Listening...</span>
        </div>
      ) : (
        <Mic className="w-5 h-5 text-white" />
      )}
    </Button>
  );
};

export default VoiceRecorder;