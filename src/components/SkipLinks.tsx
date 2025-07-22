const SkipLinks = ({ links }: Props) => {
  return (
    <>
      {links.length > 0 && (
        <section>
          {links.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black p-2 rounded shadow z-50"
            >
              {link.text}
            </a>
          ))}
        </section>
      )}
    </>
  );
};

export default SkipLinks;

type Props = {
  links: { text: string; href: string }[];
};
