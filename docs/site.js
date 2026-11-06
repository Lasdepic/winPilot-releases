// The installer's name changes with each version: only the API knows the latest one.
// Without it, the links keep pointing at the releases page.
const API = 'https://api.github.com/repos/Lasdepic/winPilot-releases/releases/latest'

fetch(API)
  .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
  .then((release) => {
    const installer = release.assets.find((asset) => asset.name.endsWith('.exe'))
    if (!installer) return

    const size = Math.round(installer.size / 1048576)
    const label = `Version ${release.tag_name.replace(/^v/, '')} · ${size} Mo · Windows 10 et 11`

    document.querySelectorAll('[data-download]').forEach((link) => {
      link.href = installer.browser_download_url
    })
    document.querySelectorAll('[data-version]').forEach((node) => {
      node.textContent = label
    })
  })
  .catch(console.warn)
