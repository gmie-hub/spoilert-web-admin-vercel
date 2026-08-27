/**
 * The `role` value the API stores against an admin account. The Sub-Admins
 * list is just `GET /users?role=admin`, so whatever the form sends here has to
 * match, otherwise a newly created sub-admin never shows up in the list.
 */
export const SUB_ADMIN_ROLE = "sub-admin";

/**
 * Options for the Role select on the Sub-Admin form.
 *
 * The design shows finer-grained tiers ("Content Manager", "Finance Manager"),
 * but the API exposes a single `admin` role — sending a made-up slug would
 * create an account that the list query can no longer see. Add the extra tiers
 * here once the backend confirms their slugs.
 */
export const subAdminRoleOptions = [
  { label: "Sub-Admin Manager", value: SUB_ADMIN_ROLE },
];

/** Joins a stored name pair for display in the table and details screens. */
export const buildFullName = (firstName?: string, lastName?: string) =>
  [firstName, lastName].filter(Boolean).join(" ");
