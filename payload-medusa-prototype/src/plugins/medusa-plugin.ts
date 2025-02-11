/**
 * The MedusaPlugin allows you to:
 *
 * - Add custom fields to the Payload CMS collections to store Medusa API configuration (e.g., API endpoint, API key).
 * - Set up hooks to interact with the Medusa API when certain actions occur in Payload CMS (e.g., after a document is saved).
 * - Provide a seamless integration between Payload CMS and Medusa, enabling you to manage Medusa data without leaving the Payload CMS admin interface.
 */

import { Config } from 'payload'

export const MedusaPlugin = (incomingConfig: Config): Config => {
  const config = { ...incomingConfig }

  // do something cool with the config here

  return config
}

export default MedusaPlugin
