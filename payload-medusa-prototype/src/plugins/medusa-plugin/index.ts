import type { Config } from 'payload'

export const MedusaPlugin = (incomingConfig: Config): Config => {
  // create copy of incoming config
  let config = { ...incomingConfig }

  /**
   * This is where you could modify the
   * config based on the plugin options
   */

  // Add the custom admin UI component as a view
  config.admin = {
    ...config.admin,
    components: {
      ...config.admin?.components,
      views: {
        ...config.admin?.components?.views,
        myCustomView: {
          Component: '/plugins/medusa-plugin/admin/CustomAdminUI.tsx',
          path: '/medusa-plugin', // This is the path where the view will be accessible in the admin: admin/medusa-products
        },
      },
    },
  }

  // If you wanted to add to the onInit:
  config.onInit = async (payload) => {
    if (incomingConfig.onInit) await incomingConfig.onInit(payload)
    // Add additional onInit code here
  }

  // Finally, return the modified config
  return config
}

export default MedusaPlugin
