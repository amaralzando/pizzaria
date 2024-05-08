import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image"
import Link from "next/link";
import styles from "@/styles/home.module.scss"

import logoImg from "../../public/logo.svg"
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { AuthContext } from "@/context/AuthContext";
import { emitWarning } from "process";


export default function Home() {

  const { signIn } = useContext(AuthContext);
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    await signIn({ email, password })
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizza" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input 
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input 
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button 
              type="submit"
              loading={false}
            > 
              Acessar 
            </Button>
          </form>
          <Link href="/signup" className={styles.text}>
            <span>Não possui uma conta? Cadastre-se</span>
          </Link>
        </div>
      </div>
    </>
  );
}
