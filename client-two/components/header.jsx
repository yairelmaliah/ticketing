import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => (
      <li className="nav-item" key={href}>
        <Link href={href}>
          <a className="navbar-link mx-2">{label}</a>
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
