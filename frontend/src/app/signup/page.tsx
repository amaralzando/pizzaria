import { api } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "../page.module.scss";
import logoImg from "/public/logo.svg";

export default function SignUp() {
  async function handleSignUp(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (name === "" || email === "" || password === "") {
      console.log("PREENCHA TODOS OS CAMPOS");
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }

    redirect("/dashboard");
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action={handleSignUp}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome..."
              className={styles.input}
            />

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
              Cadastrar
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
