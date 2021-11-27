export default {
  repository: 'https://github.com/shuding/nextra',
  titleSuffix: ' – Scenify',
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">Scenify</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Build design editors
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Scenify: Build design editors" />
      <meta name="og:description" content="Scenify: Build design editors" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://i.ibb.co/c208YNs/drawing-7.png" />
      <meta name="twitter:site:domain" content="scenify.io" />
      <meta name="twitter:url" content="https://scenify.io" />
      <meta name="og:title" content="Scenify: Build design editors" />
      <meta name="og:image" content="https://i.ibb.co/c208YNs/drawing-7.png" />
      <meta name="apple-mobile-web-app-title" content="Scenify" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditOnGitHubLink: true,
  footerText: <>MIT {new Date().getFullYear()} © Scenify.</>,
}
