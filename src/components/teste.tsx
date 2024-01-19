import React from 'react'

interface Users {
  accounts: {
    provider: string | null;
  }[];
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  hashedPassword: string | null;
  image: string | null;
  role: string | null;
}

export default function Teste(data: any) {

  console.log(data);
  return (
    <div>Teste</div>

  )
}
