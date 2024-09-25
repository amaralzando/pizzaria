"use client";
import { Button } from "@/app/dashboard/components/button";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "./style.module.scss";

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        console.log("Formato Proibido!!!!");
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
      console.log(image);
    }
  }

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const category_id = categories[Number(categoryIndex)].id;
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!category_id || !name || !price || !description) {
      return;
    }

    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", category_id);
    if (image) {
      data.append("file", image);
    }

    const token = getCookieClient();

    await api.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Cadastrado com sucesso !!!");
  }

  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form className={styles.form} action={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={38} color="#fff" />
          </span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              alt="Imagem Preview"
              src={previewImage}
              className={styles.preview}
              fill
              quality={100}
              priority
            />
          )}
        </label>

        <select name="category">
          <option key={0} value={0}>
            Selecione ....
          </option>
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto..."
          required
          className={styles.input}
        />

        <input
          type="text"
          name="price"
          placeholder="Digite o preço do produto..."
          required
          className={styles.input}
        />

        <textarea
          name="description"
          placeholder="Digite a descrição do produto..."
          required
          className={styles.input}
        ></textarea>

        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
