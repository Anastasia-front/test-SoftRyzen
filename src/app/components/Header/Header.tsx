"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { Navigation } from "@/app/components/Header/Navigation";

import { useScreenQuery } from "@/app/hooks/useScreenQuery";

import { Container } from "../Container/Container";

import { BurgerMenu } from "./BurgerMenu";

export function Header(props: { className: string }) {
  const { isScreenTabletSm } = useScreenQuery();

  const [_, setOpen] = useState(false);

  const onCloseMenu = () => {
    setOpen(false);
  };

  return (
    <header
      className={`w-[100vw] z-30  px-[20px] pt-[36px] md:px-[32px] md:pt-[25px] xl:px-[24px] xl:pt-[48px] ${props.className}`}
    >
      <Container className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={61} height={33} priority />
        </Link>

        {isScreenTabletSm ? (
          <Navigation onCloseMenu={onCloseMenu} />
        ) : (
          <BurgerMenu />
        )}
      </Container>
    </header>
  );
}
