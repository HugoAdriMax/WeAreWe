// app/api/articles/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { Article } from '@/app/models/Article';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Récupère les paramètres de la requête
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    // Si un slug est fourni, recherche l'article spécifique
    if (slug) {
      const articles = await Article.find({ slug }).sort({ date: -1 });
      return NextResponse.json(articles);
    }

    // Sinon, retourne tous les articles
    const articles = await Article.find().sort({ date: -1 });
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, url, metaDescription, imageUrl, content } = await request.json();
    
    if (!title || !metaDescription || !content || !imageUrl) {
      return NextResponse.json(
        { error: 'Champs manquants' },
        { status: 400 }
      );
    }

    await dbConnect();

    const slug = url || title.trim().toLowerCase()
      .replace(/[àáâäæãåā]/g, 'a')
      .replace(/[çćč]/g, 'c')
      .replace(/[èéêëēėę]/g, 'e')
      .replace(/[îïíīįì]/g, 'i')
      .replace(/[ôöòóœøōõ]/g, 'o')
      .replace(/[ùûüūú]/g, 'u')
      .replace(/[ÿ]/g, 'y')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const article = await Article.create({
      title,
      slug,
      metaDescription,
      imageUrl,
      content
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    );
  }
}
