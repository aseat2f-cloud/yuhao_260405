
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Teacher } from '../types';
import Modal from './Modal';

interface TeacherGridProps {
  teachers: Teacher[];
}

const TeacherGrid: React.FC<TeacherGridProps> = ({ teachers }) => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="group relative">
            <div 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedTeacher(teacher)}
            >
              <img 
                src={teacher.image} 
                alt={teacher.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                 <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Play size={20} fill="currentColor" />
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h4 className="text-lg font-bold">{teacher.name}</h4>
                <p className="text-sm text-slate-300">{teacher.subject}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
        title={`${selectedTeacher?.name} 老師 - 教學演示`}
      >
        {selectedTeacher && (
          <div className="space-y-6">
            <div className="aspect-video w-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center relative">
              {/* Fake Video Player */}
              <img src={selectedTeacher.image} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
              <div className="relative z-10 text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                    <Play size={32} fill="currentColor" />
                </div>
                <p>教學影片播放中...</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedTeacher.subject} - {selectedTeacher.name}</h3>
              <p className="text-slate-600 leading-relaxed">{selectedTeacher.intro}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TeacherGrid;
