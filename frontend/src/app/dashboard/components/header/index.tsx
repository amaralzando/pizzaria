"use client";

import { deleteCookie } from "cookies-next";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import logoImg from "/public/logo.svg";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie("session", { path: "/" });
    router.replace("/");
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            src={logoImg}
            alt="Logo Sujeito Pizzaria"
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>

        <nav>
          <Link href="/dashboard/category">Categoria</Link>
          <Link href="/dashboard/product">Produto</Link>
          <form action={handleLogout}>
            <button type="submit">
              <LogOutIcon size={24} color="white" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
