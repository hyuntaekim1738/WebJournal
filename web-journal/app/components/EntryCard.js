'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';
import { moodColors } from '../lib/moodSetter';

export default function EntryCard({ entry }) {
  const [expanded, setExpanded] = useState(false);
  const [imageLoading, setImageLoading] = useState({});
  const [spotifyLoading, setSpotifyLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleEdit = (e) => {
    e.stopPropagation();
    confirm('Edit clicked');
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    confirm('Delete clicked');
  }

  const toggleExpand = () => setExpanded(!expanded);

  const createdAt = new Date(entry.createdAt).toLocaleDateString();
  const updatedAt = new Date(entry.updatedAt).toLocaleDateString();

  const handleImageLoad = (photoUrl) => {
    setImageLoading(prev => ({ ...prev, [photoUrl]: false }));
  };

  const handleImageLoadStart = (photoUrl) => {
    setImageLoading(prev => ({ ...prev, [photoUrl]: true }));
  };

  const handleSpotifyLoad = () => {
    setSpotifyLoading(false);
  };

  const LoadingSpinner = () => (
    <div className="text-center py-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
    </div>
  );

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
        <div className="w-6 flex-shrink-0 text-[var(--background)]">
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-semibold text-[var(--background)] flex justify-center items-center gap-2">
            {entry.title}
            {!expanded && entry.mood && (
              <span
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  backgroundColor: moodColors[String(entry.mood).toLowerCase().trim()] || '#e0e0e0',
                  color: '#fff',
                }}
              >
                {String(entry.mood)}
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {entry.updatedAt !== entry.createdAt
              ? `Created: ${createdAt} · Updated: ${updatedAt}`
              : `Created: ${createdAt}`}
          </p>
        </div>
        <div className="relative w-6 flex-shrink-0 flex justify-end" ref={menuRef}>
          <MoreVertical onClick={toggleMenu} className="cursor-pointer text-[var(--background)]" />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
              <button className="w-full px-4 py-2 text-left text-sm text-[var(--background)] hover:bg-gray-100" onClick={(e) => handleEdit(e)}>
                Edit Entry
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-[var(--background)] hover:bg-gray-100" onClick={(e) => handleDelete(e)}>
                Delete Entry
              </button>
            </div>
          )}
        </div>
      </div>



      {expanded && (
        <div className="mt-4 space-y-4">
          <p className="text-gray-800 whitespace-pre-line">{entry.content}</p>

          {entry.photos?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {entry.photos.map(photo => (
                <div key={photo.url} className="relative">
                  {imageLoading[photo.url] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                      <LoadingSpinner />
                    </div>
                  )}
                  <img
                    src={photo.signedUrl}
                    alt={photo.filename}
                    className="w-full h-auto rounded-lg"
                    onLoadStart={() => handleImageLoadStart(photo.url)}
                    onLoad={() => handleImageLoad(photo.signedUrl)}
                    onError={() => handleImageLoad(photo.signedUrl)}
                    style={{ display: imageLoading[photo.signedUrl] ? 'none' : 'block' }}
                  />
                </div>
              ))}
            </div>
          )}

          {entry.spotifyUrl && (
            <div className="pt-4">
              {spotifyLoading && <LoadingSpinner />}
              <iframe
                src={`https://open.spotify.com/embed/track/${entry.spotifyUrl.split('/track/')[1]?.split('?')[0]}`}
                width="100%"
                height="80"
                allow="encrypted-media"
                className="rounded-md"
                onLoad={handleSpotifyLoad}
                style={{ display: spotifyLoading ? 'none' : 'block' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
