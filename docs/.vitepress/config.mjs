import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto_sidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/ggxxding/',
  head: [['link', { rel: 'icon', href: '/ggxxding/img/阿响_宝可装置_HGSS.png' }]],
  // 似乎没生效，匹配不到正则
  transformHead({ assets }) {
    const myFontFile = assets.find((file) =>
      /fusion-pixel-12px-proportional-zh_hans.ttf\.[\w-]+\.woff2/.test(file),
    )
    if (myFontFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: myFontFile,
            as: 'font',
            type: 'font/woff2',
            crossorigin: '',
          },
        ],
      ]
    }
  },
  title: "ggxxding's PC",
  description: 'Built with VitePress',
  lastUpdated: true,
  themeConfig: {
    logo: '/img/阿响_OD_HGSS.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Articles',
        items: [
          {
            // text: 'Section A Title',
            items: [
              { text: 'git常用指令', link: '/articles/杂物间/git常用指令' },
              { text: '洛托姆的时空之旅', link: '/articles/Game/洛托姆的时空之旅' },
            ],
          },
        ],
      },
      { text: 'Tools', link: '/tools/tools' },
      { text: 'Archive', link: '/archive' },
      { text: 'TODO', link: '/todo' },
      {
        text: 'About',
        items: [
          {
            items: [{ text: '本站历史', link: '/about/histroy' }],
          },
        ],
      },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/articles/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/articles/api-examples' }
    //     ]
    //   }
    // ],

    sidebar: {
      '/articles': [{ text: 'Articles', items: set_sidebar('docs/articles') }],
      '/tools/tools': [{ text: 'Tools', items: set_sidebar('docs/tools') }],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

    footer: {
      copyright: 'Copyright@ 2025 ggxxding',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search',
          },
          modal: {
            noResultsText: "Can't find",
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: 'Select',
              navigateText: 'Navigate',
            },
          },
        },
      },
    },
  },
  markdown: {
    image: { lazyLoading: true },
    math: true,
  },
})
