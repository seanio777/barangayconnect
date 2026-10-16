export default function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    back: (
      <>
        <path d="M19 12H5m6 6-6-6 6-6" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    plusSquare: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M12 8v8m-4-4h8" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8m-8 4h6" />
      </>
    ),
    megaphone: (
      <>
        <path d="m3 11 16-6v14L3 13v-2Zm0 2 2 7h4l-2-6m12-6a3 3 0 0 1 0 8" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2H3Zm14-15a3 3 0 0 1 0 6m4 9v-2a6 6 0 0 0-4-5.65" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 9 4v6c0 5-3.4 8.7-9 10-5.6-1.3-9-5-9-10V6l9-4Z" />
        <path d="M9 12h6m-3-3v6" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18M7 16l4-5 3 2 5-7" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19.4 15a1.8 1.8 0 0 0 .4 2l-1.6 1.6a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.2 1.7V21h-2.3v-1.1a1.8 1.8 0 0 0-1.2-1.7 1.8 1.8 0 0 0-2 .4L7.9 17a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.7-1.2H5.5v-2.3h1.1a1.8 1.8 0 0 0 1.7-1.2 1.8 1.8 0 0 0-.4-2L9.5 6.7a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 12.7 5V4h2.3v1.1a1.8 1.8 0 0 0 1.2 1.7 1.8 1.8 0 0 0 2-.4L19.8 8a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.7 1.2h1.1v2.3h-1.1a1.8 1.8 0 0 0-1.7 1.5Z"
          transform="translate(-1 -1) scale(.95)"
        />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V3m-5 5 5-5 5 5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18" />
      </>
    ),
    filter: (
      <>
        <path d="M4 7h16M7 12h10m-7 5h4" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M5 5l14 14M19 5 5 19" />,
    edit: (
      <>
        <path d="m4 20 4.5-1 11-11a2 2 0 0 0-3-3l-11 11L4 20Zm10-13 3 3" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />
      </>
    ),
    heart: (
      <path d="M20.8 8.5c0 5-8.8 11-8.8 11s-8.8-6-8.8-11a4.8 4.8 0 0 1 8.8-2.5 4.8 4.8 0 0 1 8.8 2.5Z" />
    ),
    spark: (
      <>
        <path d="m12 2 1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8L12 2Z" />
        <path d="m19 19 .5 1.5L21 21l-1.5.5L19 23l-.5-1.5L17 21l1.5-.5L19 19Z" />
      </>
    ),
    external: (
      <>
        <path d="M13 5h6v6m0-6-9 9" />
        <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    moon: (
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z" />
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    photo: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 16-5-5L5 21" />
      </>
    ),
    dots: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.file}
    </svg>
  )
}
