
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all memories
export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT id, image_url as imageUrl, description, image_hint as imageHint FROM memories ORDER BY created_at DESC');
    connection.release();
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('GET /api/memories error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new memory
export async function POST(request: Request) {
  try {
    const { imageUrl, description, imageHint } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ message: 'imageUrl is required' }, { status: 400 });
    }
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO memories (image_url, description, image_hint) VALUES (?, ?, ?)',
      [imageUrl, description, imageHint]
    );
    connection.release();

    const insertId = (result as any).insertId;

    return NextResponse.json({ id: insertId, imageUrl, description, imageHint }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/memories error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
