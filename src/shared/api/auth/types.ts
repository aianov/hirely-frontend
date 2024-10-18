// ========================== BODY'S ==============================

export interface SendCodeBody {
   number: string
}

export interface SignUpBody extends SendCodeBody {
   name: string
   password: string
   gender: string
   code: string
}

export interface SignInBody extends SendCodeBody {
   password: string
}


// ========================== RESPONSES ==============================