// app/models/Media.ts
import mongoose, { Schema } from 'mongoose';

// Définir l'interface pour le type Media
export interface IMedia {
  filename: string;
  url: string;
  createdAt: Date;
}

// Créer le schéma pour les médias
const mediaSchema = new Schema<IMedia>({
  filename: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Créer et exporter le modèle
// Vérifie si le modèle existe déjà pour éviter l'erreur "Cannot overwrite model once compiled"
export const Media = mongoose.models.Media || mongoose.model<IMedia>('Media', mediaSchema);