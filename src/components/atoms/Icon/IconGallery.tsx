import React from 'react';
import { Icon } from './Icon';
import { useIconGallery } from './useIconGallery';
import './IconGallery.css';

export function IconGallery() {
  const { filtered, query, setQuery, total } = useIconGallery();

  return (
    <div className="c-icon-gallery">
      <div className="c-icon-gallery__toolbar">
        <input
          type="search"
          className="c-icon-gallery__search"
          placeholder="Buscar icono..."
          aria-label="Buscar iconos locales"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="c-icon-gallery__count" aria-live="polite">
          {filtered.length} / {total}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="c-icon-gallery__empty">
          No se encontró ningún icono con &ldquo;{query}&rdquo;
        </p>
      ) : (
        <ul className="c-icon-gallery__grid" role="list">
          {filtered.map(icon => (
            <li key={icon.name} className="c-icon-gallery__item">
              <Icon
                source="svg"
                icon={icon.name}
                type={icon.primaryVariant}
                size={40}
                ariaLabel={icon.name}
              />
              <span className="c-icon-gallery__name">{icon.name}</span>
              <div className="c-icon-gallery__variants">
                {icon.variants.map(v => (
                  <span key={v} className="c-icon-gallery__badge">{v}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
