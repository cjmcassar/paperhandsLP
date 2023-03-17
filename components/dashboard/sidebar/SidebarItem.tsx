import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

function SidebarItem({
  href,
  children,
  icon,
}: {
  href: string;
  children: string;
  icon: IconDefinition;
}) {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link href={href}>
      <a
        href="#"
        className={`transition duration-300 py-3 block ${
          isActive ? "bg-purple" : "opacity-50 hover:opacity-100"
        } px-5 rounded-xl`}
      >
        <FontAwesomeIcon className="pr-4" icon={icon as IconProp} />
        {children}
      </a>
    </Link>
  );
}

export default SidebarItem;
