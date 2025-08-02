'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  onImagesChange: (images: { file: File; preview: string; caption: string }[]) => void
  maxImages?: number
  accept?: string
  required?: boolean
}

export default function ImageUpload({ 
  onImagesChange, 
  maxImages = 30, 
  accept = 'image/png,image/jpeg,image/jpg',
  required = false 
}: ImageUploadProps) {
  const [images, setImages] = useState<{ file: File; preview: string; caption: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    
    if (images.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`)
      return
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      caption: ''
    }))

    const updatedImages = [...images, ...newImages]
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  const handleCaptionChange = (index: number, caption: string) => {
    const updatedImages = images.map((img, i) => 
      i === index ? { ...img, caption } : img
    )
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
    onImagesChange(updatedImages)
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(images[index].preview)
  }

  const handleAddMore = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex items-center space-x-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          required={required && images.length === 0}
        />
        <button
          type="button"
          onClick={handleAddMore}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          disabled={images.length >= maxImages}
        >
          {images.length === 0 ? 'Upload Images' : 'Add More Images'}
        </button>
        <span className="text-sm text-gray-600">
          {images.length}/{maxImages} images uploaded
        </span>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="relative">
                <Image
                  src={image.preview}
                  alt={`Upload ${index + 1}`}
                  width={300}
                  height={128}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
              <input
                type="text"
                placeholder="Add a caption..."
                value={image.caption}
                onChange={(e) => handleCaptionChange(index, e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Supported formats: PNG, JPEG</p>
        <p>• Maximum {maxImages} images</p>
        <p>• Each image can have an optional caption</p>
      </div>
    </div>
  )
}