
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET the latest audio
export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT id, audio_url as audioUrl FROM audio ORDER BY created_at DESC LIMIT 1');
    connection.release();
    const audio = (rows as any)[0] || null;
    return NextResponse.json(audio);
  } catch (error) {
    console.error('GET /api/audio error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new audio
export async function POST(request: Request) {
  try {
    const { audioUrl } = await request.json();

    if (!audioUrl) {
      return NextResponse.json({ message: 'audioUrl is required' }, { status: 400 });
    }
    
    const connection = await pool.getConnection();
    // We only want one audio file, so we clear the table first.
    await connection.query('DELETE FROM audio');
    const [result] = await connection.query(
      'INSERT INTO audio (audio_url) VALUES (?)',
      [audioUrl]
    );
    connection.release();

    const insertId = (result as any).insertId;

    return NextResponse.json({ id: insertId, audioUrl }, { status: 201 });
  } catch (error) {
    console.error('POST /api/audio error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
