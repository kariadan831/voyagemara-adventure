import { Link } from "react-router-dom";
import "./SubPageNav.css";

export default function SubPageNav({ pages = [], currentSlug, label = "Explore Kenya Safari Categories" }) {
  return (
    <nav className="vm-subpage-nav-bar" aria-label={label}>
      <span className="vm-subnav-title">{label}:</span>
      <div className="vm-subnav-links">
        {pages.map((p) => {
          const isActive = p.slug === currentSlug;
          return (
            <Link
              key={p.slug}
              to={p.route}
              className={`vm-subnav-link ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {p.breadcrumbName || p.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
