
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const teste = "teste"


    return NextResponse.json({teste}, {status: 200})
}

export async function POST(req: NextRequest) {
    const teste = "teste"


    return NextResponse.json({teste}, {status: 200})
}