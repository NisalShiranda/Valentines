
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, ChevronLeft, ChevronRight, Plus, Trash2, Camera, AlertCircle, Pencil, Sparkles, Calendar, Type } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  date: string;
  images: string[];
}

const PhotoGallery: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [newMemory, setNewMemory] = useState({ title: '', date: '', images: [] as string[] });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const request = indexedDB.open('ValentineGallery', 1);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('memories')) {
        db.createObjectStore('memories', { keyPath: 'id' });
      }
    };
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(['memories'], 'readonly');
      const store = transaction.objectStore('memories');
      const getAll = store.getAll();
      getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
          setMemories(getAll.result);
        } else {
          setMemories([{
            id: '1',
            title: 'Our Special Day',
            date: 'August 26, 2022',
            images: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop']
          }]);
        }
      };
    };
  }, []);

  const saveMemoriesToDB = (updatedMemories: Memory[]) => {
    const request = indexedDB.open('ValentineGallery', 1);
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(['memories'], 'readwrite');
      const store = transaction.objectStore('memories');
      store.clear();
      updatedMemories.forEach(m => store.add(m));
      setMemories(updatedMemories);
    };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing && editingMemory) {
          setEditingMemory({ ...editingMemory, images: [...editingMemory.images, reader.result as string] });
        } else {
          setNewMemory(prev => ({ ...prev, images: [...prev.images, reader.result as string] }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addMemory = () => {
    if (!newMemory.title || newMemory.images.length === 0) return;
    const memoryToAdd: Memory = {
      id: Date.now().toString(),
      title: newMemory.title,
      date: newMemory.date || new Date().toLocaleDateString(),
      images: newMemory.images
    };
    saveMemoriesToDB([...memories, memoryToAdd]);
    setNewMemory({ title: '', date: '', images: [] });
    setIsAdding(false);
  };

  const updateMemory = () => {
    if (!editingMemory || !editingMemory.title) return;
    saveMemoriesToDB(memories.map(m => m.id === editingMemory.id ? editingMemory : m));
    setEditingMemory(null);
  };

  return (
    <div className="space-y-16 animate-fade-in px-4">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <div className="inline-block p-4 bg-pink-50 rounded-full mb-2">
          <Camera size={32} className="text-pink-500" />
        </div>
        <h2 className="text-5xl md:text-6xl font-pacifico text-pink-600 drop-shadow-sm">Our Memories</h2>
        <p className="text-gray-500 italic text-xl max-w-lg mx-auto leading-relaxed">
          "A collection of every heartbeat and shared smile we've captured since the beginning."
        </p>
        <button 
          onClick={() => setIsAdding(true)}
          className="mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-full font-bold hover:shadow-[0_15px_35px_rgba(236,72,153,0.4)] transition-all transform hover:scale-105 active:scale-95 shadow-lg group"
        >
          <Plus size={22} className="group-hover:rotate-90 transition-transform" /> 
          Add a New Memory
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {memories.map((memory) => (
          <div 
            key={memory.id}
            onClick={() => { setActiveMemory(memory); setCurrentPhotoIndex(0); document.body.style.overflow = 'hidden'; }}
            className="group relative cursor-pointer"
          >
            {/* Scrapbook Stack Effect */}
            <div className="absolute inset-0 bg-white shadow-lg rounded-2xl rotate-1 group-hover:rotate-3 transition-transform duration-500" />
            <div className="absolute inset-0 bg-pink-50 shadow-md rounded-2xl -rotate-1 group-hover:-rotate-3 transition-transform duration-500" />
            
            <div className="relative bg-white p-5 pb-14 shadow-2xl rounded-xl border border-pink-50 transition-all group-hover:-translate-y-4">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-50 relative">
                <img src={memory.images[0]} alt={memory.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-pink-600 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-widest shadow-sm">
                  {memory.images.length} {memory.images.length === 1 ? 'Photo' : 'Photos'}
                </div>
              </div>
              <div className="mt-6 text-center">
                <h4 className="font-romantic text-3xl text-gray-800 leading-none mb-2 px-2 truncate">{memory.title}</h4>
                <p className="text-[10px] text-pink-400 font-bold uppercase tracking-[0.2em]">{memory.date}</p>
              </div>
              
              {/* Management Buttons */}
              <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(memory.id); }} 
                  className="p-3 bg-white text-red-500 rounded-full hover:bg-red-50 shadow-xl border border-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setEditingMemory({...memory}); }} 
                  className="p-3 bg-white text-pink-500 rounded-full hover:bg-pink-50 shadow-xl border border-pink-50 transition-colors"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD/EDIT MODAL */}
      {(isAdding || editingMemory) && (
        <div className="fixed inset-0 z-[2000] bg-pink-900/60 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] animate-pop-in overflow-hidden flex flex-col max-h-[90vh] border-8 border-white">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex justify-between items-center p-8 bg-white border-b border-pink-50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-50 rounded-2xl text-pink-500">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-romantic font-bold text-gray-800">
                    {isAdding ? 'New Memory' : 'Edit Moment'}
                  </h3>
                  <p className="text-xs text-pink-400 font-bold uppercase tracking-widest">Store it forever</p>
                </div>
              </div>
              <button 
                onClick={() => { setIsAdding(false); setEditingMemory(null); }} 
                className="text-gray-300 hover:text-pink-500 transition-colors p-3 hover:bg-pink-50 rounded-full"
              >
                <X size={28} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
              {/* Title Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-2">
                  <Type size={14} className="text-pink-400" />
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Memory Title</label>
                </div>
                <input 
                  type="text" 
                  value={isAdding ? newMemory.title : editingMemory?.title} 
                  onChange={e => isAdding ? setNewMemory({...newMemory, title: e.target.value}) : setEditingMemory({...editingMemory!, title: e.target.value})} 
                  placeholder="e.g., That rainy Tuesday dinner..." 
                  className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-pink-200 focus:bg-white outline-none transition-all font-medium text-lg placeholder:text-gray-300" 
                />
              </div>

              {/* Date Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-2">
                  <Calendar size={14} className="text-pink-400" />
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">When was this?</label>
                </div>
                <input 
                  type="text" 
                  value={isAdding ? newMemory.date : editingMemory?.date} 
                  onChange={e => isAdding ? setNewMemory({...newMemory, date: e.target.value}) : setEditingMemory({...editingMemory!, date: e.target.value})} 
                  placeholder="e.g., December 2023" 
                  className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-pink-200 focus:bg-white outline-none transition-all font-medium text-lg placeholder:text-gray-300" 
                />
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 ml-2">
                  <Camera size={14} className="text-pink-400" />
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">The Evidence</label>
                </div>
                
                <div 
                  onClick={() => (isAdding ? fileInputRef : editFileInputRef).current?.click()} 
                  className="w-full h-44 border-4 border-dashed border-pink-100 rounded-[2rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-pink-50 hover:border-pink-300 transition-all group/upload bg-pink-50/30"
                >
                  <div className="p-4 bg-white rounded-full text-pink-500 shadow-md group-hover/upload:scale-110 transition-transform">
                    <Camera size={32} />
                  </div>
                  <div className="text-center">
                    <span className="block text-sm text-pink-500 font-bold uppercase tracking-widest">Upload Beautiful Photos</span>
                    <span className="text-[10px] text-gray-400">Select one or multiple images</span>
                  </div>
                </div>
                
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  ref={isAdding ? fileInputRef : editFileInputRef} 
                  onChange={(e) => handleFileUpload(e, !!editingMemory)} 
                  className="hidden" 
                />

                {/* Polaroid Thumbnails */}
                <div className="flex gap-6 overflow-x-auto py-4 px-2 scrollbar-hide">
                  {(isAdding ? newMemory.images : editingMemory?.images || []).map((img, i) => (
                    <div key={i} className="relative shrink-0 group/thumb transform transition-transform hover:scale-105" style={{ rotate: `${(i % 2 === 0 ? 2 : -2)}deg` }}>
                      <div className="bg-white p-2 pb-6 shadow-xl rounded-sm border border-gray-100">
                        <img src={img} className="h-32 w-32 object-cover rounded-sm" />
                      </div>
                      <button 
                        onClick={() => isAdding ? setNewMemory(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) })) : setEditingMemory(prev => ({ ...prev!, images: prev!.images.filter((_, idx) => idx !== i) }))} 
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors z-20"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-gray-50 border-t border-gray-100 pb-12">
               <button 
                 onClick={isAdding ? addMemory : updateMemory} 
                 className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-[1.5rem] font-bold shadow-[0_15px_30px_rgba(236,72,153,0.3)] hover:shadow-[0_20px_40px_rgba(236,72,153,0.4)] transition-all active:scale-95 flex items-center justify-center gap-3 text-xl group"
               >
                 <Heart size={24} className="group-hover:fill-white transition-all" />
                 {isAdding ? 'Store in My Heart' : 'Save Changes'}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* SCRAPBOOK Lightbox Viewer */}
      {activeMemory && createPortal(
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 select-none animate-fade-in" onClick={() => {setActiveMemory(null); document.body.style.overflow = 'auto';}}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
          
          <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={() => {setActiveMemory(null); document.body.style.overflow = 'auto';}} 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-all p-4 z-[3010]"
            >
              <X size={40} strokeWidth={1} />
            </button>

            {/* Navigation Arrows */}
            <button 
              onClick={(e) => {e.stopPropagation(); setCurrentPhotoIndex((prev) => (prev - 1 + activeMemory.images.length) % activeMemory.images.length);}} 
              className="absolute left-4 md:left-10 z-[3010] p-4 text-white/30 hover:text-pink-400 transition-all hover:scale-125"
            >
              <ChevronLeft size={60} strokeWidth={1} />
            </button>
            
            {/* Main Image View */}
            <div className="relative bg-white p-6 pb-20 md:pb-32 shadow-[0_50px_150px_rgba(0,0,0,0.8)] rounded-sm max-w-[95vw] max-h-[85vh] flex flex-col items-center animate-pop-in">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center z-[3015]">
                <Heart size={36} className="text-pink-500 fill-pink-500 animate-pulse" />
              </div>
              
              <div className="relative overflow-hidden rounded-sm w-full h-full flex items-center justify-center bg-gray-100">
                <img 
                  src={activeMemory.images[currentPhotoIndex]} 
                  alt="Memory" 
                  className="max-w-full max-h-[55vh] md:max-h-[60vh] object-contain transition-all duration-700" 
                  key={currentPhotoIndex} 
                />
              </div>
              
              <div className="mt-10 text-center w-full px-8">
                <h3 className="text-4xl md:text-6xl font-romantic font-bold text-gray-800 tracking-tight leading-tight">{activeMemory.title}</h3>
                <div className="flex items-center justify-center gap-6 mt-6 opacity-40">
                   <div className="h-px w-20 bg-gray-400" />
                   <p className="text-xs md:text-sm text-gray-600 font-bold uppercase tracking-[0.5em]">{activeMemory.date}</p>
                   <div className="h-px w-20 bg-gray-400" />
                </div>
                <p className="mt-4 text-pink-400 font-bold text-[10px] uppercase tracking-widest">
                  Memory {currentPhotoIndex + 1} of {activeMemory.images.length}
                </p>
              </div>
            </div>
            
            <button 
              onClick={(e) => {e.stopPropagation(); setCurrentPhotoIndex((prev) => (prev + 1) % activeMemory.images.length);}} 
              className="absolute right-4 md:right-10 z-[3010] p-4 text-white/30 hover:text-pink-400 transition-all hover:scale-125"
            >
              <ChevronRight size={60} strokeWidth={1} />
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[4000] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center border-4 border-white animate-pop-in">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
               <AlertCircle size={48} />
            </div>
            <h3 className="text-4xl font-romantic font-bold mb-4 text-gray-800">Unmake Memory?</h3>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed">Are you absolutely sure you want to remove this piece of our history? It cannot be restored.</p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => { saveMemoriesToDB(memories.filter(m => m.id !== deleteConfirmId)); setDeleteConfirmId(null); }} 
                className="py-5 bg-red-500 text-white rounded-2xl font-bold shadow-xl hover:bg-red-600 transition-all active:scale-95 text-lg"
              >
                Yes, Delete it
              </button>
              <button 
                onClick={() => setDeleteConfirmId(null)} 
                className="py-5 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
