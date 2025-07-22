import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs";	

// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  // vite:{
  //   plugins: [
  //     AutoImport({
  //       resolvers: [ElementPlusResolver()],
  //     }),
  //     Components({
  //       resolvers: [ElementPlusResolver()],
  //     })
  //   ]

  // },
  base: "/ggxxding/",
  head: [["link", { rel: "icon", href: "/ggxxding/assets/red.png" }]],
  title: "ggxxding's dungeon",
  description: "Built with VitePress",
  lastUpdated: true,
  themeConfig: {
    logo: "/assets/red.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Articles',
        items: [
          {
            // text: 'Section A Title',
            items: [
              { text: 'API examples', link: '/articles/api-examples' },
              { text: 'markdown examples', link: '/articles/markdown-examples' }
            ]
          }
        ]
      },
      { text: 'Tools', link: '/tools/tools'},
      { text: 'Archive', link: '/archive'},
      { text: 'TODO', link: '/todo'},
      {
        text: 'About',
        items: [
          {
            items: [
              { text: '本站历史', link: '/about/histroy' },
            ]
          }
        ]
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
      "/articles": [{ text: 'Articles', items: set_sidebar("docs/articles")}],
      "/tools/tools": [{ text: 'Tools', items: set_sidebar("docs/tools") }],
    },

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
