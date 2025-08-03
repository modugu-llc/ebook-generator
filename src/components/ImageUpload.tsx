'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  onImagesChange: (images: { file: File; preview: string; caption: string; description: string }[]) => void
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
  const [images, setImages] = useState<{ file: File; preview: string; caption: string; description: string }[]>([])
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
      caption: '',
      description: ''
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

  const handleDescriptionChange = (index: number, description: string) => {
    const updatedImages = images.map((img, i) => 
      i === index ? { ...img, description } : img
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
        <div className="space-y-6">
          {images.map((image, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image */}
                <div className="lg:w-1/3">
                  <div className="relative">
                    <Image
                      src={image.preview}
                      alt={`Upload ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      Photo {index + 1}
                    </div>
                  </div>
                </div>
                
                {/* Description Form */}
                <div className="lg:w-2/3 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Caption (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Brief caption for the photo..."
                      value={image.caption}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share the story behind this photo! Include details like:
• Where and when was this taken?
• Who is in the photo and what were they doing?
• What was happening at this moment?
• Why is this photo special to you?
• Any funny, touching, or memorable stories about this moment?
• Background context that makes this photo meaningful..."
                      value={image.description}
                      onChange={(e) => handleDescriptionChange(index, e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      {image.description.length > 0 ? (
                        <span className="text-green-600">
                          ✓ {image.description.length} characters - Great! The more details, the more personalized your book will be.
                        </span>
                      ) : (
                        <span className="text-orange-600">
                          Add a detailed description to make your photo book more personal and engaging.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">📸 Creating Your Photo Book</h4>
        <div className="text-xs text-blue-800 space-y-1">
          <p>• <strong>Supported formats:</strong> PNG, JPEG (maximum {maxImages} images)</p>
          <p>• <strong>Detailed descriptions make better books:</strong> The more context you provide, the more personalized and engaging your photo book will be</p>
          <p>• <strong>What to include:</strong> Location, people, events, emotions, memories, and stories that make each photo special</p>
          <p>• <strong>AI enhancement:</strong> Your descriptions help our AI create a beautiful narrative that weaves your photos into a compelling story</p>
        </div>
      </div>
    </div>
  )
}