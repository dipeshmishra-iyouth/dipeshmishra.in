// shortcut: year is fixed at build time; any deploy after 1 Jan refreshes it.
export async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
