import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { useTranslation } from 'react-i18next';

interface VoiceInputProps {
  onResult?: (transcript: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onResult, 
  className = '',
  size = 'md'
}) => {
  const { t } = useTranslation();
  const { isListening, isSupported, toggleListening, error } = useVoiceInput({
    onResult,
    continuous: false,
    interimResults: true
  });

  if (!isSupported) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={toggleListening}
      className={`
        ${sizeClasses[size]}
        ${isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600'
        }
        rounded-full transition-all duration-200 flex items-center justify-center
        ${className}
      `}
      title={isListening ? t('voice.listening') : t('voice.clickToSpeak')}
      disabled={!!error}
    >
      {isListening ? (
        <MicOff className={iconSizes[size]} />
      ) : (
        <Mic className={iconSizes[size]} />
      )}
    </button>
  );
};