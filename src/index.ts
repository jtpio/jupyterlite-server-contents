import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the jupyterlite-server-contents extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlite-server-contents:plugin',
  description: 'Access server contents from JupyterLite',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension jupyterlite-server-contents is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('jupyterlite-server-contents settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for jupyterlite-server-contents.', reason);
        });
    }
  }
};

export default plugin;
