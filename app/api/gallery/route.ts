import { readdirSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  try {
    const dir = join(process.cwd(), 'public', 'images', 'before-after')
    const folders = readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()
    return NextResponse.json({ folders })
  } catch {
    return NextResponse.json({ folders: [] })
  }
}
