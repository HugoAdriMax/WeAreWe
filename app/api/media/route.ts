import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { Media } from '@/app/models/Media';

// GET /api/media - Récupérer tous les médias
export async function GET() {
  try {
    await dbConnect();
    const medias = await Media.find().sort({ createdAt: -1 });
    return NextResponse.json(medias);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des médias' },
      { status: 500 }
    );
  }
}