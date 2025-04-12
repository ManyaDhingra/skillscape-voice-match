
import React, { useState, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface VoiceSearchProps {
  onSearchResult: (query: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onSearchResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }

    try {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure recognition
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Try to detect language automatically
      recognitionRef.current.lang = ''; // Empty for auto-detection

      // Handle results
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        setIsProcessing(true);
        
        // Simulate processing of different languages (in a real app, you'd use a translation API)
        setTimeout(() => {
          onSearchResult(transcript);
          setIsProcessing(false);
          toast.success("Voice input processed successfully");
        }, 1000);
      };

      // Handle errors
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error("Error capturing voice. Please try again.");
      };

      // Handle end of speech
      recognitionRef.current.onend = () => {
        if (isListening) {
          setIsListening(false);
        }
      };

      // Start recognition
      recognitionRef.current.start();
      setIsListening(true);
      toast.info("Listening... Speak now");
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast.error("Failed to start voice recognition");
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={isListening ? stopListening : startListening}
        className={`rounded-full w-10 h-10 ${isListening ? 'bg-red-100 text-red-500 border-red-300' : 'border-[#1EAEDB] text-[#1EAEDB]'}`}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isListening ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>
      
      {isListening && (
        <span className="ml-2 text-sm text-gray-600 animate-pulse">
          Listening...
        </span>
      )}
      
      {isProcessing && (
        <span className="ml-2 text-sm text-gray-600">
          Processing voice...
        </span>
      )}
    </div>
  );
};

export default VoiceSearch;
