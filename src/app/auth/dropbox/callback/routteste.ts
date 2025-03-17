import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        return NextResponse.redirect(`${origin}${next}`)
    }

    return NextResponse.json(searchParams.get('access_token'))
    // return the user to an error page with instructions
    //return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}