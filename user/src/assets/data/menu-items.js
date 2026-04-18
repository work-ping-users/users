// roles: which roles can see this item. Omit or [] means all authenticated users.
export const MENU_ITEMS = [
  {
    key: 'dashboard',
    icon: 'iconamoon:home-duotone',
    label: 'Dashboard',
    url: '/dashboard',
    roles: ['employee', 'manager'],
  },

  // ── Employee-only ───────────────────────────────────────────────────────────
  {
    key: 'attendance',
    icon: 'iconamoon:profile-circle-duotone',
    label: 'Attendance',
    url: '/attendance',
    roles: ['employee'],
  },
  {
    key: 'permissions',
    icon: 'iconamoon:shield-yes-duotone',
    label: 'Permissions',
    url: '/permissions',
    roles: ['employee'],
  },
  {
    key: 'leave',
    icon: 'iconamoon:clock-duotone',
    label: 'Leave',
    url: '/leave',
    roles: ['employee'],
  },

  // ── Manager-only ────────────────────────────────────────────────────────────
  {
    key: 'team-attendance',
    icon: 'iconamoon:profile-circle-duotone',
    label: 'Team Attendance',
    url: '/team-attendance',
    roles: ['manager'],
  },
  {
    key: 'team-leaves',
    icon: 'iconamoon:clock-duotone',
    label: 'Team Leaves',
    url: '/team-leaves',
    roles: ['manager'],
  },
  {
    key: 'team-permissions',
    icon: 'iconamoon:shield-yes-duotone',
    label: 'Team Permissions',
    url: '/team-permissions',
    roles: ['manager'],
  },

  // ── Shared ──────────────────────────────────────────────────────────────────
  {
    key: 'holidays',
    icon: 'iconamoon:calendar-1-duotone',
    label: 'Holidays',
    url: '/holidays',
    roles: ['employee', 'manager'],
  },
];
