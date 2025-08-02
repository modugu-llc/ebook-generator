const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at?: string;
}

export interface Book {
  id: number;
  user_id: number;
  title: string;
  category: string;
  prompt: string;
  content: string;
  status: string;
  file_path?: string;
  file_type?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, first_name, last_name }),
    });
  }

  async validateToken(): Promise<ApiResponse<{ valid: boolean; user: User }>> {
    return this.request<{ valid: boolean; user: User }>('/auth/validate');
  }

  // Book endpoints
  async getBookCategories(): Promise<ApiResponse<{ categories: string[] }>> {
    return this.request<{ categories: string[] }>('/books/categories');
  }

  async createBook(title: string, category: string, prompt: string): Promise<ApiResponse<{ book: Book }>> {
    return this.request<{ book: Book }>('/books', {
      method: 'POST',
      body: JSON.stringify({ title, category, prompt }),
    });
  }

  async getMyBooks(): Promise<ApiResponse<{ books: Book[] }>> {
    return this.request<{ books: Book[] }>('/books/my-books');
  }

  async getBook(id: number): Promise<ApiResponse<{ book: Book }>> {
    return this.request<{ book: Book }>(`/books/${id}`);
  }

  async updateBook(id: number, updates: Partial<Book>): Promise<ApiResponse<{ book: Book }>> {
    return this.request<{ book: Book }>(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteBook(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/books/${id}`, {
      method: 'DELETE',
    });
  }

  async exportToPDF(id: number): Promise<ApiResponse<{ downloadUrl: string; note: string }>> {
    return this.request<{ downloadUrl: string; note: string }>(`/books/${id}/export/pdf`, {
      method: 'POST',
    });
  }

  async exportToEPUB(id: number): Promise<ApiResponse<{ downloadUrl: string; note: string }>> {
    return this.request<{ downloadUrl: string; note: string }>(`/books/${id}/export/epub`, {
      method: 'POST',
    });
  }

  // User endpoints
  async getUserProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/users/profile');
  }

  async updateUserProfile(first_name: string, last_name: string): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ first_name, last_name }),
    });
  }
}

export const apiClient = new ApiClient();