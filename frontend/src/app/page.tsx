import Head from "next/head";
import Image from "next/image";
import styles from "./page.module.scss";

import logoImg from "/public/logo.svg";

import { api } from "@/services/api";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      console.log("Preencha todos os campos");
    }

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      if (!response.data.token) {
        return;
      }

      const { token } = response.data;
      const expressTime = 60 * 60 * 24 * 30;
      cookies().set("session", token, {
        maxAge: expressTime,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: false,
      });
    } catch (error) {
      console.log(error);
    }

    redirect("/dashboard");
  }

  return (
    <>
      <Head>
        <title>GasaPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email..."
              className={styles.input}
            />

            <input
              type="password"
              required
              name="password"
              placeholder="Digite seu senha..."
              className={styles.input}
            />

            <button type="submit" className={styles.button}>
              Acessar
            </button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  );
}
