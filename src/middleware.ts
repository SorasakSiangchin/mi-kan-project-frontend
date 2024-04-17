import { NextRequest, NextResponse } from "next/server"

const middleware = (request : NextRequest) : NextResponse => {

    return NextResponse.next({
        request
    });
    
};

export default middleware;