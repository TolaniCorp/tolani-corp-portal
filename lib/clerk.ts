export function isValidClerkPublishableKey(key: string | undefined) {
  if (!key) {
    return false;
  }

  const normalized = key.trim();
  if (!(normalized.startsWith("pk_test_") || normalized.startsWith("pk_live_"))) {
    return false;
  }

  return !normalized.includes("your_publishable_key");
}

export function hasClerkClientEnv() {
  return isValidClerkPublishableKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

export function hasClerkServerEnv() {
  return Boolean(
    hasClerkClientEnv() &&
      process.env.CLERK_SECRET_KEY &&
      !process.env.CLERK_SECRET_KEY.includes("your_secret_key")
  );
}
