import React from 'react'
import { Button } from '../ui/button';

type SuggestionButtonProps = {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}
const SuggestionButton = ({ label, icon: Icon, onClick}: SuggestionButtonProps) => {
  return (
    <Button variant="outline" size="sm" className='flex items-center gap-1 rounded-full text-xs py-2' onClick={onClick}>
      <Icon className="h-2 w-2" /> {label} 
    </Button>
  )
}

export default SuggestionButton