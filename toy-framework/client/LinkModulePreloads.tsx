import type { Pathname } from "../server/types"

export function LinkModulePreloads({ pathnames }: { pathnames: Pathname[] }) {
  return (
    <>
      {pathnames.map(pathname => (
        <link rel="modulepreload" key={pathname} href={pathname} />
      ))}
    </>
  )
}
