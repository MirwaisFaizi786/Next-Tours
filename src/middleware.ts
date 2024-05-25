import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    
    const session = cookies().get('jwt')?.value;
    
    if(session) {
        return NextResponse.next();
    }
    

    return NextResponse.redirect(new URL('/login', req.url));
}
export const config = {
    matcher: ['/'],
}


