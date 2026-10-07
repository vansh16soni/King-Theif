import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from './Icons';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs font-medium">
      <ol className="flex items-center flex-wrap gap-1.5 text-slate-400">
        <li>
          <Link
            to="/lobby"
            className="flex items-center gap-1 hover:text-amber-300 transition focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-1"
          >
            <HomeIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Lobby</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRightIcon className="w-3 h-3 text-slate-500" aria-hidden="true" />
              {isLast || !item.path ? (
                <span className="font-bold text-slate-200 px-1" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-amber-300 transition focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-1"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
