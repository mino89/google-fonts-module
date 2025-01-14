import { setupTest, get } from '@nuxt/test-utils'

describe('use stylesheet', () => {
  setupTest({
    server: true,
    fixture: 'fixture/use-stylesheet'
  })

  test('has prefetch link', async () => {
    const { body } = await get('/')
    expect(body).toContain('<link data-n-head="ssr" data-hid="gf-prefetch" rel="dns-prefetch" href="https://fonts.gstatic.com/">')
  })

  test('has preconnect link', async () => {
    const { body } = await get('/')
    expect(body).toContain('<link data-n-head="ssr" data-hid="gf-preconnect" rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">')
  })

  test('has preload link (enabled in config)', async () => {
    const { body } = await get('/')
    expect(body).toContain('<link data-n-head="ssr" data-hid="gf-preload" rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Roboto&amp;family=Lato">')
  })

  test('has stylesheet link', async () => {
    const { body } = await get('/')
    expect(body).toContain('<link data-n-head="ssr" data-hid="gf-style" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&amp;family=Lato">')
  })

  test('has stylesheet that does not contain display swap', async () => {
    const { body } = await get('/')
    expect(body).not.toContain('display=swap')
  })

  test('no has script', async () => {
    const { body } = await get('/')
    expect(body).not.toContain('data-hid="gf-script"')
  })

  test('not has noscript fallback', async () => {
    const { body } = await get('/')
    expect(body).not.toContain('data-hid="gf-noscript"')
  })
})
