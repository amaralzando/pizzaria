import { getCookiesServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { Button } from "../components/button";
import styles from "./styles.module.scss";

export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    "use server";

    const name = formData.get("name");

    if (!name) return;

    const data = {
      name: name,
    };
    const token = getCookiesServer();
    await api
      .post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    redirect("/dashboard");
  }

  return (
    <main className={styles.container}>
      <h1>Nova Category</h1>

      <form action={handleRegisterCategory} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas"
          required
          className={styles.input}
        />
        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
