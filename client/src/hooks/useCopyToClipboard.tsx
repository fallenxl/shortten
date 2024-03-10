import { toast, useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  const {toast} = useToast();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        title: "📋 Copied to clipboard",
        
      })
    });
  };

  return { copied, copyToClipboard };
};

export default useCopyToClipboard;
