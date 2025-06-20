// src/components/Breadcrumbs.tsx
import { Link, useLocation } from "react-router-dom";

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <nav style={{ marginBottom: "1rem" }}>
      <Link to="/">Home</Link>
      {crumbs.map((crumb, i) => (
        <span key={i}> / {crumb}</span>
      ))}
    </nav>
  );
}
