'use client';

import { useState, useEffect } from 'react';
import { searchSpotifyTracks } from '../lib/spotify';

export default function NewEntryModal({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photos, setPhotos] = useState([]);
    const [spotifyUrl, setSpotifyUrl] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        setPhotos(prev => [...prev, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, content, photos, spotifyUrl });
        onClose();
    };

    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearching(true);
                try {
                    const results = await searchSpotifyTracks(searchQuery);
                    setSearchResults(results);
                } catch (error) {
                    console.error('Error searching Spotify:', error);
                }
                setIsSearching(false);
            } else {
                setSearchResults([]);
            }
        }, 500);
        return () => clearTimeout(searchTimeout);
    }, [searchQuery]);

    const handleTrackSelect = (track) => {
        setSelectedTrack(track);
        setSpotifyUrl(track.url);
        setSearchQuery('');
        setSearchResults([]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm overflow-hidden">
            <div className="bg-[var(--background)] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Write New Entry</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded-lg bg-[var(--foreground)] text-[var(--background)]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium mb-1">
                            Entry
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                e.target.style.height = 'auto'; 
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            className="w-full p-2 border rounded-lg bg-[var(--foreground)] text-[var(--background)] resize-none overflow-hidden"
                            rows={4}
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">Photos</label>

                        <div>
                            <button
                                type="button"
                                onClick={() => document.getElementById('photo-upload-input').click()}
                                className="w-full p-2 border rounded-lg bg-blue-50 hover:bg-blue-100 text-[var(--background)] font-medium text-sm"
                            >
                                Click to upload photos
                            </button>

                            <input
                                id="photo-upload-input"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                        </div>

                        {photos.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {photos.map((photo, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt={`Upload ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Spotify Song
                        </label>
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for a song..."
                                className="w-full p-2 border rounded-lg bg-[var(--foreground)] text-[var(--background)]"
                            />
                            
                            {isSearching && (
                                <div className="text-center py-2">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                                </div>
                            )}

                            {searchResults.length > 0 && (
                                <div className="border rounded-lg bg-[var(--foreground)] max-h-60 overflow-y-auto">
                                    {searchResults.map((track) => (
                                        <button
                                            key={track.id}
                                            onClick={() => handleTrackSelect(track)}
                                            className="w-full p-2 hover:bg-gray-100 flex items-center gap-3 text-left"
                                        >
                                            {track.image && (
                                                <img
                                                    src={track.image}
                                                    alt={track.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            )}
                                            <div>
                                                <div className="font-medium text-[var(--background)]">{track.name}</div>
                                                <div className="text-sm text-gray-600">
                                                    {track.artist} • {track.album}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {selectedTrack && (
                                <div className="border rounded-lg p-3 bg-[var(--foreground)] flex items-center gap-3">
                                    {selectedTrack.image && (
                                        <img
                                            src={selectedTrack.image}
                                            alt={selectedTrack.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="font-medium text-[var(--background)]">{selectedTrack.name}</div>
                                        <div className="text-sm text-gray-600">
                                            {selectedTrack.artist} • {selectedTrack.album}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedTrack(null);
                                            setSpotifyUrl('');
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Save Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
