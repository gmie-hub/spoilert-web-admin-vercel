/**
 * Pulls the first field error out of a Laravel 422 body, e.g.
 * `{ errors: { email: ["The email has already been taken."] } }`.
 *
 * Worth reaching for on any form that posts unique fields — the top-level
 * `message` for a validation failure is only ever "The given data was
 * invalid.", which tells the admin nothing about which field to fix.
 */
export const getValidationMessage = (error: any): string | undefined => {
  const errors = error?.response?.data?.errors;
  if (!errors) return undefined;

  const firstField = Object.values(errors)[0];
  return Array.isArray(firstField) ? firstField[0] : (firstField as string);
};

/** Best available message for a failed request, in decreasing specificity. */
export const getApiErrorMessage = (error: any, fallback: string): string =>
  getValidationMessage(error) ||
  error?.response?.data?.message ||
  error?.message ||
  fallback;
