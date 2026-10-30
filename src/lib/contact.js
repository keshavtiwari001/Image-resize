const configuredEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export const contactEmail = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(configuredEmail)
  ? configuredEmail
  : "";
