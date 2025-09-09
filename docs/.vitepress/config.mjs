import { defineConfig } from 'vitepress'
import { setSidebar } from './utils/autoSidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/ggxxding/',
  head: [['link', { rel: 'icon', href: '/ggxxding/img/阿响_宝可装置_HGSS.png' }]],
  // 预加载两种字体
  transformHead({ assets }) {
    const propFontFile = assets.find((file) =>
      /fusion-pixel-12px-proportional-zh_hans.ttf\.[\w-]+\.woff2/.test(file),
    )
    const monoFontFile = assets.find((file) =>
      /fusion-pixel-12px-monospaced-zh_hans.ttf\.[\w-]+\.woff2/.test(file),
    )

    const preloadLinks = []

    if (propFontFile) {
      preloadLinks.push([
        'link',
        {
          rel: 'preload',
          href: propFontFile,
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ])
    }

    if (monoFontFile) {
      preloadLinks.push([
        'link',
        {
          rel: 'preload',
          href: monoFontFile,
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ])
    }

    return preloadLinks
  },
  title: "ggxxding's PC",
  description: 'Built with VitePress',
  lastUpdated: true,
  themeConfig: {
    logo: '/img/阿响_OD_HGSS.png',
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      level: 'deep',
      label: '页面导航',
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Articles',
        items: [
          {
            // text: 'Section A Title',
            items: [
              {
                text: 'git使用和配置（多用户、代理）',
                link: '/articles/杂物间/git使用和配置（多用户、代理）',
              },
              { text: 'FFmpeg使用', link: '/articles/杂物间/FFmpeg使用' },
              { text: 'tmux常用指令', link: '/articles/杂物间/tmux常用指令' },
              {
                text: 'Minecraft服务器部署（Java版）',
                link: 'articles/Game/Minecraft服务器部署（Java版）',
              },
              { text: '洛托姆的时空之旅', link: '/articles/Game/洛托姆的时空之旅' },
            ],
          },
        ],
      },
      {
        text: 'Tools',
        items: [
          {
            items: [
              { text: '余数计算器', link: '/tools/余数计算器' },
              { text: 'Latex符号选择工具', link: '/tools/Latex符号选择工具' },
            ],
          },
        ],
      },
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
      '/articles': [{ text: 'Articles', items: setSidebar('docs/articles') }],
      '/tools': [{ text: 'Tools', items: setSidebar('docs/tools') }],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/ggxxding/ggxxding' }],

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
