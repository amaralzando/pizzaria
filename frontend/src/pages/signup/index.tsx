import Head from "next/head";
import Image from "next/image"
import Link from "next/link";

import logoImg from "../../../public/logo.svg"
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import styles from "@/styles/home.module.scss"

export default function SingUp() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizza" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
            <Input 
              placeholder="Digite seu nome"
              type="email"
            />
            <Input 
              placeholder="Digite seu email"
              type="email"
            />
            <Input 
              placeholder="Digite sua senha"
              type="password"
            />

            <Button 
              type="submit"
              loading={false}
            > 
              Cadastrar 
            </Button>
          </form>
          <Link href="/" className={styles.text}>
            <span>Já possui uma conta? Faça login!</span>
          </Link>
        </div>
      </div>
    </>
  );
}
