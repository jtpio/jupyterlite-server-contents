import { PageConfig } from '@jupyterlab/coreutils';
import {
  Contents,
  Drive,
  IDefaultDrive,
  ServerConnection,
  ServiceManagerPlugin
} from '@jupyterlab/services';

/**
 * The plugin ID for the server contents extension.
 */
const PLUGIN_ID = 'jupyterlite-server-contents:plugin';

/**
 * The default drive plugin that connects to a remote Jupyter server.
 *
 * This plugin replaces the JupyterLite default drive with one that
 * connects to a remote Jupyter server specified via PageConfig options.
 */
const plugin: ServiceManagerPlugin<Contents.IDrive> = {
  id: PLUGIN_ID,
  description:
    'Provides a default drive that connects to a remote Jupyter server',
  provides: IDefaultDrive,
  activate: (): Contents.IDrive => {
    // Read configuration from PageConfig
    const baseUrl = PageConfig.getOption('serverContentsBaseUrl');
    const token = PageConfig.getOption('serverContentsToken');

    // Create custom server settings for the remote server
    const serverSettings = ServerConnection.makeSettings({
      baseUrl,
      token
    });

    // Create and return the drive pointing to the remote server
    return new Drive({ serverSettings });
  }
};

export default plugin;
