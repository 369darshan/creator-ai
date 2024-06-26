'use client'
import ButtonLink from "@/components/ButtonLink";
import WordMark from "@/components/WordMark";
import { Content, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";



type NavBarProps = {
    settings: Content.SettingsDocument
}

const NavBar = ({ settings }: NavBarProps) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()
    return (

        <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="Main">
            <div className="mx-auto  max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center flex">

                <div className="flex items-center justify-between">
                    <Link href="/">
                        <WordMark />
                        <span className="sr-only">Creator.ai HomePage</span>
                    </Link>
                    <button type="button" className="block p-2 text-3xl text-white md:hidden"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <MdMenu />
                        <span className="sr-only">Open Menu</span>
                    </button>
                </div>
                {/* Mobile Nav */}
                <div className={clsx("fixed bottom-0 right-0 left-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
                    open ? "translate-x-0" : "translate-x-[100%]")}
                >
                    <button
                        type="button"
                        className="block p-2 text-3xl text-white md:hidden fixed ring-4 top-4 mb-4"
                        aria-expanded={open}
                        onClick={() => setOpen(false)}
                    >
                        <MdClose />
                        <span className="sr-only">Close Menu</span>
                    </button>
                    <div className="grid justify-end gap-8">
                        {settings.data.navigation.map((item) => {
                            if (item.cta_button) {
                                return (
                                    <ButtonLink key={item.label} field={item.link}
                                        onClick={() => setOpen(false)}
                                        aria-current={
                                            pathname.includes(asLink(item.link) as string) ? 'page' : undefined
                                        }
                                    >
                                        {item.label}
                                    </ButtonLink>
                                )
                            }
                            return (
                                <PrismicNextLink
                                    key={item.label}
                                    className="block px-3 text-3xl first:mt-8"
                                    field={item.link}
                                    onClick={() => setOpen(false)}
                                    aria-current={
                                        pathname.includes(asLink(item.link) as string) ? 'page' : undefined
                                    }
                                >
                                    {item.label}
                                </PrismicNextLink>
                            )
                        })}
                    </div>
                </div>

                {/* Desktop Nav */}
                <ul className="gap-6 hidden md:flex">
                    {settings.data.navigation.map((item) => {
                        if (item.cta_button) {
                            return (
                                <ButtonLink key={item.label} field={item.link}
                                    aria-current={
                                        pathname.includes(asLink(item.link) as string) ? 'page' : undefined
                                    }
                                >
                                    {item.label}
                                </ButtonLink>
                            )
                        }
                        return (
                            <li key={item.label}>
                                <PrismicNextLink field={item.link}
                                    className="inline-flex min-h-11 items-center"
                                    aria-current={
                                        pathname.includes(asLink(item.link) as string) ? 'page' : undefined
                                    }
                                >
                                    {item?.label}
                                </PrismicNextLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
