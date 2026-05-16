import React, { useEffect, useState } from 'react'

const getInitials = (name = '') => {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return initials || 'U';
};

const UserAvatar = ({ src, name = 'User', alt, className = '' }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const safeSrc = typeof src === 'string' ? src.trim() : '';

  useEffect(() => {
    setImageFailed(false);
  }, [safeSrc]);

  if (safeSrc && !imageFailed) {
    return (
      <img
        src={safeSrc}
        alt={alt || `${name || 'User'} avatar`}
        className={className}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 ${className}`}
      title={name || 'User'}
      aria-label={alt || `${name || 'User'} avatar`}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar
