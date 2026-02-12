
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

  const INITIAL_MEMORIES: Memory[] = [
    {
      id: '1',
      title: 'Our Beautiful Moments',
      date: 'Forever & Always',
      images: [
        '/memories/WhatsApp%20Image%202026-02-09%20at%2022.39.43.jpeg',
        '/memories/WhatsApp%20Image%202026-02-09%20at%2022.39.43%20(1).jpeg',
        '/memories/WhatsApp%20Image%202026-02-09%20at%2022.39.43%20(3).jpeg',
        '/memories/WhatsApp%20Image%202026-02-09%20at%2022.39.43%20(8).jpeg',
        '/memories/WhatsApp%20Image%202026-02-09%20at%2022.39.43%20(9).jpeg',
        '/memories/WhatsApp%20Image%202026-02-09%20at%2022.39.43%20(10).jpeg',
        '/memories/WhatsApp%20Image%202026-02-09%20at%2022.39.43%20(11).jpeg',
        '/memories/WhatsApp%20Image%202026-02-09%20at%2022.39.43%20(12).jpeg',
      ]
    }
  ];

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
          // Initialize with static memories if DB is empty
          setMemories(INITIAL_MEMORIES);
          // Optional: Persist initial memories to DB immediately
          // saveMemoriesToDB(INITIAL_MEMORIES); 
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
    document.body.style.overflow = 'auto';
  };

  const updateMemory = () => {
    if (!editingMemory || !editingMemory.title) return;
    saveMemoriesToDB(memories.map(m => m.id === editingMemory.id ? editingMemory : m));
    setEditingMemory(null);
    document.body.style.overflow = 'auto';
  };

  const openAddModal = () => {
    setIsAdding(true);
    document.body.style.overflow = 'hidden';
  };

  const openEditModal = (memory: Memory) => {
    setEditingMemory({ ...memory });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingMemory(null);
    document.body.style.overflow = 'auto';
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
          onClick={openAddModal}
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

              <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(memory.id); }}
                  className="p-3 bg-white text-red-500 rounded-full hover:bg-red-50 shadow-xl border border-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); openEditModal(memory); }}
                  className="p-3 bg-white text-pink-500 rounded-full hover:bg-pink-50 shadow-xl border border-pink-50 transition-colors"
                >
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD/EDIT MODAL - PORTALED TO ROOT */}
      {(isAdding || editingMemory) && createPortal(
        <div className="fixed inset-0 z-[2000] bg-pink-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] animate-pop-in overflow-hidden flex flex-col max-h-[85vh] border-4 border-white">

            <div className="flex justify-between items-center px-6 py-5 border-b border-pink-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-50 rounded-xl text-pink-500">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-2xl font-romantic font-bold text-gray-800">
                  {isAdding ? 'New Memory' : 'Edit Moment'}
                </h3>
              </div>
              <button onClick={closeModal} className="text-gray-300 hover:text-pink-500 p-2 hover:bg-pink-50 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <Type size={12} className="text-pink-400" />
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Memory Title</label>
                </div>
                <input
                  type="text"
                  value={isAdding ? newMemory.title : editingMemory?.title}
                  onChange={e => isAdding ? setNewMemory({ ...newMemory, title: e.target.value }) : setEditingMemory({ ...editingMemory!, title: e.target.value })}
                  placeholder="e.g., That rainy Tuesday dinner..."
                  className="w-full px-5 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-pink-100 focus:bg-white outline-none transition-all text-gray-700"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <Calendar size={12} className="text-pink-400" />
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date / Season</label>
                </div>
                <input
                  type="text"
                  value={isAdding ? newMemory.date : editingMemory?.date}
                  onChange={e => isAdding ? setNewMemory({ ...newMemory, date: e.target.value }) : setEditingMemory({ ...editingMemory!, date: e.target.value })}
                  placeholder="e.g., Dec 2023"
                  className="w-full px-5 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-pink-100 focus:bg-white outline-none transition-all text-gray-700"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-1">
                  <Camera size={12} className="text-pink-400" />
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Photos</label>
                </div>

                <div
                  onClick={() => (isAdding ? fileInputRef : editFileInputRef).current?.click()}
                  className="w-full py-8 border-2 border-dashed border-pink-100 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-pink-50 hover:border-pink-200 transition-all bg-pink-50/20"
                >
                  <Camera size={24} className="text-pink-400" />
                  <span className="text-xs text-pink-500 font-bold uppercase tracking-wider">Choose Photos</span>
                </div>

                <input type="file" multiple accept="image/*" ref={isAdding ? fileInputRef : editFileInputRef} onChange={(e) => handleFileUpload(e, !!editingMemory)} className="hidden" />

                <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
                  {(isAdding ? newMemory.images : editingMemory?.images || []).map((img, i) => (
                    <div key={i} className="relative shrink-0 w-24 h-24 transform transition-transform hover:scale-105" style={{ rotate: `${(i % 2 === 0 ? 3 : -3)}deg` }}>
                      <div className="bg-white p-1 pb-4 shadow-lg rounded border border-gray-100 h-full w-full">
                        <img src={img} className="h-full w-full object-cover rounded-sm" />
                      </div>
                      <button
                        onClick={() => isAdding ? setNewMemory(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) })) : setEditingMemory(prev => ({ ...prev!, images: prev!.images.filter((_, idx) => idx !== i) }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors z-20"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="h-10" />
              </div>
            </div>

            <div className="p-6 bg-gray-50/50 border-t border-gray-100">
              <button
                onClick={isAdding ? addMemory : updateMemory}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-pink-200 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
              >
                <Heart size={20} className="fill-white" />
                {isAdding ? 'Store Moment' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* LIGHTBOX VIEWER - REFINED FOR BIGGER PHOTOS */}
      {activeMemory && createPortal(
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 animate-fade-in" onClick={() => { setActiveMemory(null); document.body.style.overflow = 'auto'; }}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

          <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { setActiveMemory(null); document.body.style.overflow = 'auto'; }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-all p-4 z-[3010]"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex((prev) => (prev - 1 + activeMemory.images.length) % activeMemory.images.length); }}
              className="absolute left-2 md:left-10 z-[3010] p-4 text-white/30 hover:text-pink-400 transition-all active:scale-90"
            >
              <ChevronLeft size={48} />
            </button>

            {/* Main Polaroid-Style Viewer */}
            <div className="relative bg-white p-3 pb-8 md:pb-10 shadow-2xl rounded-sm max-w-[95vw] md:max-w-xl max-h-[90vh] flex flex-col items-center animate-pop-in overflow-hidden">
              {/* Image Container: Expanded to fill most of the view */}
              <div className="relative w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                  src={activeMemory.images[currentPhotoIndex]}
                  alt="Memory"
                  className="w-full max-h-[65vh] md:max-h-[70vh] object-contain shadow-inner"
                  key={currentPhotoIndex}
                />
              </div>

              {/* Compact Caption Area: Reduced heights and margins */}
              <div className="mt-4 text-center w-full px-6 flex flex-col items-center">
                <h3 className="text-2xl md:text-4xl font-romantic font-bold text-gray-800 truncate w-full">{activeMemory.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[1px] w-8 bg-pink-100" />
                  <p className="text-[10px] md:text-xs text-pink-400 font-bold uppercase tracking-[0.2em]">{activeMemory.date}</p>
                  <div className="h-[1px] w-8 bg-pink-100" />
                </div>
                <div className="mt-4 px-3 py-1 bg-gray-50 rounded-full">
                  <p className="text-gray-300 text-[9px] uppercase font-bold tracking-widest">
                    {currentPhotoIndex + 1} / {activeMemory.images.length}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex((prev) => (prev + 1) % activeMemory.images.length); }}
              className="absolute right-2 md:right-10 z-[3010] p-4 text-white/30 hover:text-pink-400 transition-all active:scale-90"
            >
              <ChevronRight size={48} />
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && createPortal(
        <div className="fixed inset-0 z-[4000] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 shadow-2xl text-center animate-pop-in">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-2xl font-romantic font-bold mb-2 text-gray-800">Unmake Memory?</h3>
            <p className="text-gray-400 text-xs mb-8">This moment will be gone forever.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { saveMemoriesToDB(memories.filter(m => m.id !== deleteConfirmId)); setDeleteConfirmId(null); }}
                className="py-4 bg-red-500 text-white rounded-xl font-bold shadow-lg"
              >
                Yes, Delete
              </button>
              <button onClick={() => setDeleteConfirmId(null)} className="py-4 bg-gray-100 text-gray-500 rounded-xl font-bold">
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default PhotoGallery;
