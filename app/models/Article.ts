import mongoose, { Schema } from 'mongoose';

export interface IArticle {
  title: string;
  slug: string;
  metaDescription: string;
  imageUrl: string;
  content: string;
  date: Date;
  author: string;
}

const articleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  metaDescription: { type: String, required: true },
  imageUrl: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String, default: 'WeAreWe Team' }
});

// Assurez-vous que le nom de la collection est bien spécifié ici
export const Article = mongoose.models.Article || mongoose.model<IArticle>('Article', articleSchema, 'articles');
