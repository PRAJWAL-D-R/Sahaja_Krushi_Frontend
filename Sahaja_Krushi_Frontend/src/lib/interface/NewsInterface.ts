export interface NewsItem {
  id: number;
  title: string;
  content: string;
  documentUrl: string;
  documentName: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsResponse {
  success: boolean;
  message: string;
  data: NewsItem[];
}

export interface SingleNewsResponse {
  success: boolean;
  message: string;
  data: NewsItem;
}