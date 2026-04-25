import {
  getPurchaseChannelsForPlatform,
  type PurchaseChannel,
} from "@/lib/portfolioStrategy";

export const stripePaymentLinkEnvByPlatformKey = {
  "tolani-labs": "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TOLANI_LABS",
  "tccg-work": "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TCCG_WORK",
  bettorsace: "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_BETTORSACE",
  "hook-travel": "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_HOOK_TRAVEL",
  "listo-marketplace": "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_LISTO_MARKETPLACE",
  tsg: "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TSG",
  "tut-dao": "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TUT_DAO",
} as const;

export const brandIdToPlatformKey = {
  "tolani-labs": "tolani-labs",
  "tccg-work": "tccg-work",
  hooktravel: "hook-travel",
  bettorsace: "bettorsace",
  "listo-marketplace": "listo-marketplace",
  "tolani-supply-group": "tsg",
  "tut-token": "tut-dao",
} as const;

export type StripePlatformKey = keyof typeof stripePaymentLinkEnvByPlatformKey;
export type BrandCheckoutKey = keyof typeof brandIdToPlatformKey;

export function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function getStripePaymentLink(platformKey: string): string | null {
  const envKey = stripePaymentLinkEnvByPlatformKey[platformKey as StripePlatformKey];
  if (!envKey) {
    return null;
  }

  const link = process.env[envKey]?.trim();
  return link ? link : null;
}

export function resolveCommerceLink(
  platformKey: string,
  fallbackHref: string,
  fallbackCtaLabel: string,
) {
  const stripeHref = getStripePaymentLink(platformKey);

  if (stripeHref) {
    return {
      href: stripeHref,
      ctaLabel: "Pay with Stripe",
      isStripeCheckout: true,
    };
  }

  return {
    href: fallbackHref,
    ctaLabel: fallbackCtaLabel,
    isStripeCheckout: false,
  };
}

export function getPlatformKeyForBrandId(brandId: string): string | null {
  return brandIdToPlatformKey[brandId as BrandCheckoutKey] ?? null;
}

export function getPrimaryPurchaseChannelForBrandId(
  brandId: string,
): PurchaseChannel | null {
  const platformKey = getPlatformKeyForBrandId(brandId);
  if (!platformKey) {
    return null;
  }

  return getPurchaseChannelsForPlatform(platformKey)[0] ?? null;
}

export function getBrandCommerceAction(
  brandId: string,
  fallbackHref: string,
  fallbackCtaLabel: string,
) {
  const primaryChannel = getPrimaryPurchaseChannelForBrandId(brandId);

  if (!primaryChannel) {
    return {
      href: fallbackHref,
      ctaLabel: fallbackCtaLabel,
      isStripeCheckout: false,
      channel: null,
    };
  }

  return {
    ...resolveCommerceLink(
      primaryChannel.platformKey,
      primaryChannel.href,
      primaryChannel.ctaLabel,
    ),
    channel: primaryChannel,
  };
}
