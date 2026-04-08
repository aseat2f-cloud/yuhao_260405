
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
  hideHeader?: boolean;
  headerClassName?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'max-w-2xl',
  hideHeader = false,
  headerClassName = 'bg-white'
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className={`relative bg-white rounded-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden my-auto mx-auto`}>
        
        {!hideHeader && (
          <div className={`flex items-center justify-between p-4 border-b border-gray-100 shrink-0 relative ${headerClassName}`}>
            <div className="flex-1 text-center">
              <h3 className={`text-xl font-bold ${headerClassName.includes('bg-white') ? 'text-slate-900' : 'text-white'}`}>{title}</h3>
            </div>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full transition-colors absolute right-4 ${headerClassName.includes('bg-white') ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-white/20 text-white'}`}
            >
              <X size={24} />
            </button>
          </div>
        )}

        {hideHeader && (
           <button 
             onClick={onClose}
             className="absolute top-4 left-4 z-50 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
             aria-label="Close"
           >
             <X size={20} />
           </button>
        )}

        <div className={`overflow-y-auto ${hideHeader ? '' : 'p-6'}`}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
