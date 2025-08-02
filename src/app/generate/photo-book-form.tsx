'use client'

import { useState, useRef } from 'react'

interface PhotoData {
  id: string
  file: File
  caption: string
  order: number
  preview: string
}

interface PhotoBookFormProps {
  onPhotosChange: (photos: PhotoData[]) => void
  maxPhotos?: number
}

export default function PhotoBookForm({ onPhotosChange, maxPhotos = 30 }: PhotoBookFormProps) {
  const [photos, setPhotos] = useState<PhotoData[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList) => {
    const newPhotos: PhotoData[] = []
    const remainingSlots = maxPhotos - photos.length

    Array.from(files).slice(0, remainingSlots).forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const photoData: PhotoData = {
            id: `photo-${Date.now()}-${index}`,
            file,
            caption: '',
            order: photos.length + index,
            preview: e.target?.result as string
          }
          newPhotos.push(photoData)
          
          if (newPhotos.length === Math.min(files.length, remainingSlots)) {
            const updatedPhotos = [...photos, ...newPhotos]
            setPhotos(updatedPhotos)
            onPhotosChange(updatedPhotos)
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleCaptionChange = (photoId: string, caption: string) => {
    const updatedPhotos = photos.map(photo => 
      photo.id === photoId ? { ...photo, caption } : photo
    )
    setPhotos(updatedPhotos)
    onPhotosChange(updatedPhotos)
  }

  const removePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId)
    setPhotos(updatedPhotos)
    onPhotosChange(updatedPhotos)
  }

  const movePhoto = (photoId: string, direction: 'up' | 'down') => {
    const photoIndex = photos.findIndex(photo => photo.id === photoId)
    if ((direction === 'up' && photoIndex === 0) || 
        (direction === 'down' && photoIndex === photos.length - 1)) {
      return
    }

    const newPhotos = [...photos]
    const targetIndex = direction === 'up' ? photoIndex - 1 : photoIndex + 1
    
    // Swap elements
    const temp = newPhotos[photoIndex]
    newPhotos[photoIndex] = newPhotos[targetIndex]
    newPhotos[targetIndex] = temp
    
    // Update order
    newPhotos.forEach((photo, index) => {
      photo.order = index
    })
    
    setPhotos(newPhotos)
    onPhotosChange(newPhotos)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Photo Upload</h3>
        <p className="text-blue-700 text-sm">
          Upload up to {maxPhotos} photos (PNG, JPEG formats). You can add captions and reorder them as needed.
        </p>
      </div>

      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault()
          handleFileSelect(e.dataTransfer.files)
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        />
        <div className="text-4xl mb-4">📸</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Upload Photos
        </h3>
        <p className="text-gray-600 mb-4">
          Click to browse or drag and drop photos here
        </p>
        <p className="text-sm text-gray-500">
          {photos.length} / {maxPhotos} photos uploaded
        </p>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div key={photo.id} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="relative mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    type="button"
                    onClick={() => movePhoto(photo.id, 'up')}
                    disabled={index === 0}
                    className="bg-white bg-opacity-80 text-gray-600 p-1 rounded-full hover:bg-opacity-100 disabled:opacity-50"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => movePhoto(photo.id, 'down')}
                    disabled={index === photos.length - 1}
                    className="bg-white bg-opacity-80 text-gray-600 p-1 rounded-full hover:bg-opacity-100 disabled:opacity-50"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="bg-red-500 bg-opacity-80 text-white p-1 rounded-full hover:bg-opacity-100"
                  >
                    ×
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Add a caption for this photo..."
                  value={photo.caption}
                  onChange={(e) => handleCaptionChange(photo.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}