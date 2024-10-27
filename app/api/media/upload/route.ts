import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { Media } from '@/app/models/Media';
import { writeFile } from 'fs/promises';
import path from 'path';

// POST /api/media/upload - Uploader un nouveau média
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Créer un nom de fichier unique
    const filename = `${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), 'public/uploads', filename);

    // Sauvegarder le fichier
    await writeFile(filePath, buffer);

    // Sauvegarder les informations dans la base de données
    await dbConnect();
    const media = await Media.create({
      filename,
      url: `/uploads/${filename}`,
      createdAt: new Date()
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    );
  }
}