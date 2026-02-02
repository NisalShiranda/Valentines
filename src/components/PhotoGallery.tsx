
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, ChevronLeft, ChevronRight, Plus, Trash2, Camera, AlertCircle, Pencil } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  date: string;
  images: string[]; // Array of base64 strings or URLs
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

  // Initialize and load from IndexedDB
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
          const sample: Memory[] = [
            {
              id: '1',
              title: 'Our First Date',
              date: 'August 26, 2022',
              images: [
                'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=800&auto=format&fit=crop'
              ]
            }
          ];
          setMemories(sample);
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
          setEditingMemory({
            ...editingMemory,
            images: [...editingMemory.images, reader.result as string]
          });
        } else {
          setNewMemory(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string]
          }));
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
    const updated = [...memories, memoryToAdd];
    saveMemoriesToDB(updated);
    setNewMemory({ title: '', date: '', images: [] });
    setIsAdding(false);
  };

  const updateMemory = () => {
    if (!editingMemory || !editingMemory.title) return;
    const updated = memories.map(m => m.id === editingMemory.id ? editingMemory : m);
    saveMemoriesToDB(updated);
    setEditingMemory(null);
  };

  const initiateDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const initiateEdit = (memory: Memory, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingMemory({ ...memory });
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      const updated = memories.filter(m => m.id !== deleteConfirmId);
      saveMemoriesToDB(updated);
      setDeleteConfirmId(null);
    }
  };

  const openCarousel = (memory: Memory) => {
    setActiveMemory(memory);
    setCurrentPhotoIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeCarousel = () => {
    setActiveMemory(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeMemory) return;
    setCurrentPhotoIndex((prev) => (prev + 1) % activeMemory.images.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeMemory) return;
    setCurrentPhotoIndex((prev) => (prev - 1 + activeMemory.images.length) % activeMemory.images.length);
  };

  return (
    <div className="space-y-12 animate-fade-in px-4">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-pacifico text-pink-600">Our Memories</h2>
        <p className="text-gray-500 italic text-lg max-w-lg mx-auto">
          Every photo is a page in our beautiful story.
        </p>
        <button 
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full font-bold hover:bg-pink-600 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          <Plus size={18} /> Add New Memory
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {memories.map((memory) => (
          <div 
            key={memory.id}
            onClick={() => openCarousel(memory)}
            className="group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-white shadow-md rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-500" />
            <div className="absolute inset-0 bg-white shadow-md rounded-lg -rotate-2 group-hover:-rotate-4 transition-transform duration-500" />
            
            <div className="relative bg-white p-3 pb-12 shadow-xl rounded-sm border border-gray-100 transition-all group-hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-gray-50 relative">
                <img 
                  src={memory.images[0]} 
                  alt={memory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest">
                  {memory.images.length} Photos
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-romantic text-3xl text-gray-800 leading-none mb-1">{memory.title}</h4>
                <p className="text-xs text-pink-400 font-bold uppercase tracking-tighter">{memory.date}</p>
              </div>

              <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => initiateDelete(memory.id, e)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                >
                  <Trash2 size={14} />
                </button>
                <button 
                  onClick={(e) => initiateEdit(memory, e)}
                  className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 shadow-lg"
                >
                  <Pencil size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[1000] bg-pink-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-8 shadow-2xl animate-pop-in text-center border-4 border-pink-50">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-red-500 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-romantic font-bold text-gray-800 mb-2">Delete Memory?</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Are you sure you want to remove this precious memory? This action cannot be undone.
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={confirmDelete} className="w-full py-3 bg-red-500 text-white rounded-xl font-bold shadow-lg hover:bg-red-600 transition-all active:scale-95">Yes, Delete it</button>
              <button onClick={() => setDeleteConfirmId(null)} className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-all">No, Keep it</button>
            </div>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl animate-pop-in overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-8 pb-4">
              <h3 className="text-3xl font-romantic font-bold text-pink-600">New Memory</h3>
              <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-pink-500"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-6 scrollbar-hide">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-2">Title</label>
                <input type="text" value={newMemory.title} onChange={e => setNewMemory({...newMemory, title: e.target.value})} placeholder="e.g., That night in the park..." className="w-full px-6 py-4 bg-pink-50 rounded-2xl border-none outline-none focus:ring-2 ring-pink-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-2">Date</label>
                <input type="text" value={newMemory.date} onChange={e => setNewMemory({...newMemory, date: e.target.value})} placeholder="e.g., Summer 2023" className="w-full px-6 py-4 bg-pink-50 rounded-2xl border-none outline-none focus:ring-2 ring-pink-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-2">Photos</label>
                <div onClick={() => fileInputRef.current?.click()} className="w-full h-32 border-2 border-dashed border-pink-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-pink-50 transition-colors">
                  <Camera className="text-pink-300" />
                  <span className="text-sm text-pink-400 font-bold">Click to upload photos</span>
                </div>
                <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={(e) => handleFileUpload(e, false)} className="hidden" />
                {newMemory.images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {newMemory.images.map((img, i) => (
                      <div key={i} className="relative shrink-0">
                        <img src={img} className="h-16 w-16 object-cover rounded-lg border-2 border-pink-100" />
                        <button onClick={() => setNewMemory(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))} className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm text-pink-500"><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Extra spacing for potential nav overlap if scrolled */}
              <div className="h-8" />
            </div>

            <div className="p-8 pt-0">
               <button onClick={addMemory} className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg hover:bg-pink-600 transition-all active:scale-95">Save This Memory</button>
            </div>
          </div>
        </div>
      )}

      {editingMemory && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl animate-pop-in overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-8 pb-4">
              <h3 className="text-3xl font-romantic font-bold text-pink-600">Edit Memory</h3>
              <button onClick={() => setEditingMemory(null)} className="text-gray-400 hover:text-pink-500"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-6 scrollbar-hide">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-2">Title</label>
                <input type="text" value={editingMemory.title} onChange={e => setEditingMemory({...editingMemory, title: e.target.value})} className="w-full px-6 py-4 bg-pink-50 rounded-2xl border-none outline-none focus:ring-2 ring-pink-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-2">Date</label>
                <input type="text" value={editingMemory.date} onChange={e => setEditingMemory({...editingMemory, date: e.target.value})} className="w-full px-6 py-4 bg-pink-50 rounded-2xl border-none outline-none focus:ring-2 ring-pink-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-2">Manage Photos</label>
                <div onClick={() => editFileInputRef.current?.click()} className="w-full h-24 border-2 border-dashed border-pink-100 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-pink-50 transition-colors">
                  <Camera size={18} className="text-pink-300" />
                  <span className="text-xs text-pink-400 font-bold uppercase">Add More Photos</span>
                </div>
                <input type="file" multiple accept="image/*" ref={editFileInputRef} onChange={(e) => handleFileUpload(e, true)} className="hidden" />
                <div className="flex gap-2 overflow-x-auto py-2">
                  {editingMemory.images.map((img, i) => (
                    <div key={i} className="relative shrink-0 group/img">
                      <img src={img} className="h-20 w-20 object-cover rounded-lg border-2 border-pink-100" />
                      <button onClick={() => setEditingMemory({ ...editingMemory, images: editingMemory.images.filter((_, idx) => idx !== i) })} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md"><X size={10} /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-8" />
            </div>

            <div className="p-8 pt-0">
               <button onClick={updateMemory} className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg hover:bg-pink-600 transition-all active:scale-95">Update Memory</button>
            </div>
          </div>
        </div>
      )}

      {/* RE-STYLED SCRAPBOOK Lightbox */}
      {activeMemory && createPortal(
        <div 
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 select-none animate-fade-in"
          onClick={closeCarousel}
        >
          {/* Dynamic Blurred Background */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
            style={{ 
              backgroundImage: `url(${activeMemory.images[currentPhotoIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.2
            }}
          />

          <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            
            {/* Nav: Prev */}
            <button 
              onClick={prevPhoto} 
              className="absolute left-0 md:-left-20 z-[1020] p-4 text-white/50 hover:text-pink-400 transition-all hover:scale-125"
            >
              <ChevronLeft size={60} strokeWidth={1} />
            </button>

            {/* The Polaroid Frame */}
            <div className="relative bg-white p-4 md:p-6 pb-12 md:pb-20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-sm max-w-[95vw] max-h-[85vh] flex flex-col items-center animate-pop-in border border-gray-100">
              
              {/* Heart "Pin" Decoration */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-[1015] border border-pink-50">
                <Heart size={20} className="text-pink-500 fill-pink-500" />
              </div>

              {/* Close Button Inside/Top-Right of Frame */}
              <button 
                onClick={closeCarousel}
                className="absolute -top-4 -right-4 bg-pink-500 text-white p-2 rounded-full shadow-xl hover:bg-pink-600 transition-all active:scale-90 z-[1030]"
              >
                <X size={24} />
              </button>

              <div className="relative overflow-hidden rounded-sm w-full h-full flex items-center justify-center bg-gray-50 min-h-[200px] min-w-[200px]">
                <img 
                  src={activeMemory.images[currentPhotoIndex]} 
                  alt="Memory"
                  className="max-w-full max-h-[60vh] md:max-h-[65vh] object-contain transition-all duration-500"
                  key={`${activeMemory.id}-${currentPhotoIndex}`}
                />
              </div>

              {/* Caption Area */}
              <div className="mt-6 md:mt-10 text-center w-full px-4">
                <h3 className="text-3xl md:text-5xl font-romantic font-bold text-gray-800 leading-none">{activeMemory.title}</h3>
                <div className="flex items-center justify-center gap-4 mt-3">
                   <div className="h-px w-8 bg-pink-100" />
                   <p className="text-[10px] md:text-xs text-pink-400 font-bold uppercase tracking-[0.3em]">{activeMemory.date}</p>
                   <div className="h-px w-8 bg-pink-100" />
                </div>
                
                {/* Image Counter */}
                <p className="mt-4 text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                  Photo {currentPhotoIndex + 1} of {activeMemory.images.length}
                </p>
              </div>
            </div>

            {/* Nav: Next */}
            <button 
              onClick={nextPhoto} 
              className="absolute right-0 md:-right-20 z-[1020] p-4 text-white/50 hover:text-pink-400 transition-all hover:scale-125"
            >
              <ChevronRight size={60} strokeWidth={1} />
            </button>

            {/* Thumbnail Navigation Strip (Floating below Polaroid) */}
            <div className="absolute -bottom-10 md:-bottom-20 left-0 right-0 flex justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {activeMemory.images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className={`relative shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 ${idx === currentPhotoIndex ? 'border-pink-500 scale-110 shadow-lg' : 'border-white/20 opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      <div className="text-center py-10">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-pink-50 rounded-full">
           <Heart className="text-pink-400 fill-pink-400 animate-pulse" />
           <p className="text-pink-600 font-romantic text-2xl font-bold">To be continued... our journey is my favorite story.</p>
           <Heart className="text-pink-400 fill-pink-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
