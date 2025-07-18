import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/ggxxding/",
  head: [["link", { rel: "icon", href: "/assets/Incineroar.jpg" }]],
  title: "ggxxding's dungeon",
  description: "Built with VitePress",
  themeConfig: {
    logo: "/assets/Incineroar.jpg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      copyright: "Copyright@ 2025 ggxxding"
    },

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Search",
            buttonAriaLabel: "Search",
          },
          modal: {
            noResultsText: "Can't find",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "Select",
              navigateText: "Navigate",
            },
          },
        },
      },
    }
  }
})
