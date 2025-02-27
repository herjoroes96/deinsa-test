import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'utils', 'response.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    // Check if the data is an array
    if (!Array.isArray(data.data.responsables)) {
      throw new Error('El archivo JSON no contiene un array válido.');
    }

    // Return the data
    return NextResponse.json(data.data.responsables, { status: 200 });
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
