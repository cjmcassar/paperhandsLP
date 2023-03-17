import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

function SidebarItem({
  href,
  children,
  iconSrc,
}: {
  href: string;
  children: string;
  iconSrc: string;
}) {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link href={href}>
      <a
        href="#"
        className={`text-2xl flex items-center gap-4 transition duration-300 py-2 ${
          isActive ? "bg-purple" : "opacity-50 hover:opacity-100"
        } px-5 rounded-xl`}
      >
        {/* <FontAwesomeIcon className="pr-4" icon={icon as IconProp} /> */}
        <img className="w-10" src={iconSrc} alt="" />
        {children}
      </a>
    </Link>
  );
}

export default SidebarItem;
