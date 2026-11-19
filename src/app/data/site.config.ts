/**
 * Site-wide settings. Fill in the empty values before going live.
 */
export const SITE = {
  /** Public address without a trailing slash, e.g. 'https://michalbugaj.pl'.
   *  Used for canonical / hreflang / Open Graph URLs. Empty = those tags are skipped. */
  url: '',

  /** Year shown in the footer. */
  year: 2026,

  photo: '/images/michal-bugaj.jpg',
  ogImage: '/og-image.png',

  cvPdf: {
    en: '/cv/michal-bugaj-cv-en.pdf',
    pl: '/cv/michal-bugaj-cv-pl.pdf',
  },

  /** Split on purpose: e-mail and phone are assembled only in the browser (less bot spam). */
  email: { user: 'mbugaj.business', domain: 'gmail.com' },
  phone: ['+48', '733', '435', '202'],

  links: {
    linkedin: 'https://www.linkedin.com/in/michalbugaj/',
    github: 'https://github.com/m-bugaj',
    beatsy: 'https://github.com/m-bugaj/beatsy-preview',
    /** TODO: YouTube channel URL */
    youtube: '',
    /** TODO: online music business URL */
    musicBusiness: '',
  },
} as const;

export type SiteLinkKey = keyof typeof SITE.links;

export function siteEmail(): string {
  return `${SITE.email.user}@${SITE.email.domain}`;
}

export function sitePhoneDisplay(): string {
  const [cc, ...rest] = SITE.phone;
  return `${cc} ${rest.join('-')}`;
}

export function sitePhoneHref(): string {
  return `tel:${SITE.phone.join('')}`;
}
