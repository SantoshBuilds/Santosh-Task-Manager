import React from 'react'
import UserAvatar from './UserAvatar'

const normalizeAvatar = (avatar) => {
  if (typeof avatar === 'string') {
    return { src: avatar, name: 'User' };
  }

  return {
    src: avatar?.profileImageUrl || avatar?.src || avatar?.imageUrl || '',
    name: avatar?.name || avatar?.email || 'User',
  };
};

const AvatarGroup = ({avatars = [], maxVisible = 3}) => {
  const visibleAvatars = React.useMemo(
    () => avatars.slice(0, maxVisible).map(normalizeAvatar),
    [avatars, maxVisible]
  )

  return (
    <div className="flex items-center">
      {visibleAvatars.map((avatar, index) => (
        <UserAvatar
          key={`${avatar.src}_${avatar.name}_${index}`}
          src={avatar.src}
          name={avatar.name}
          className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm first:ml-0 -ml-3"
        />
      ))}
      {avatars.length > maxVisible && (
        <div className="-ml-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-bold text-slate-700 shadow-sm">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  )
}

export default AvatarGroup
