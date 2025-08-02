// Book categories and their specific requirements
export interface BookCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: string[];
  description?: string;
}

export interface BookGeneration {
  id: string;
  userId: string;
  category: string;
  title: string;
  prompts: Record<string, any>;
  content?: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface GeneratedBook {
  id: string;
  userId: string;
  title: string;
  author: string;
  category: string;
  content: string;
  coverUrl?: string;
  pdfUrl?: string;
  epubUrl?: string;
  createdAt: Date;
}