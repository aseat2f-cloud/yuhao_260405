
import React from 'react';
import { MessageCircle } from 'lucide-react';
import Modal from './Modal';

interface LineConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// LINE Official Account IDs
const LINE_ACCOUNTS = [
  {
    label: '國小部 LINE 諮詢',
    id: '@420gcibw',
    href: 'https://line.me/R/ti/p/@420gcibw',
  },
  {
    label: '國中部 LINE 諮詢',
    id: '@yuhaoschool',
    href: 'https://line.me/R/ti/p/@yuhaoschool',
  },
  {
    label: '高中部 LINE 諮詢',
    id: '@yhelite',
    href: 'https://line.me/R/ti/p/@yhelite',
  }
];

const LineConsultationModal: React.FC<LineConsultationModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="線上諮詢"
      maxWidth="max-w-md"
    >
      <div className="text-center mb-6">
        <p className="text-slate-500 text-sm">請選擇您想諮詢的學段</p>
      </div>

      <div className="space-y-3">
        {LINE_ACCOUNTS.map((account, index) => (
          <a
            key={index}
            href={account.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] transition-all shadow-md group"
          >
            <div className="flex flex-col items-start">
              <span className="text-white font-bold text-lg">{account.label}</span>
              <span className="text-white/80 text-xs font-medium">{account.id}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-colors">
              <MessageCircle size={22} className="fill-white" />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-400">點擊按鈕將開啟 LINE 應用程式</p>
      </div>
    </Modal>
  );
};

export default LineConsultationModal;
