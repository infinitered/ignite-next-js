// Ignite CLI plugin for NextJs
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-MODULENAME'
const NPM_MODULE_VERSION = '0.0.1'

// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()


const add = async function (toolbox) {
  // Learn more about toolbox: https://infinitered.github.io/gluegun/#/toolbox-api.md
  const { ignite } = toolbox

  // install an NPM module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: true, version: NPM_MODULE_VERSION })

  // Example of copying templates/NextJs to app/ignite-next-js
  // if (!toolbox.filesystem.exists(`${APP_PATH}/app/ignite-next-js`)) {
  //   toolbox.filesystem.copy(`${PLUGIN_PATH}/templates/ignite-next-js`, `${APP_PATH}/app/ignite-next-js`)
  // }

  // Example of patching a file
  // ignite.patchInFile(`${APP_PATH}/app/config/app-config.js`, {
  //   insert: `import '../ignite-next-js/ignite-next-js'\n`,
  //   before: `export default {`
  // })
}

/**
 * Remove yourself from the project.
 */
const remove = async function (toolbox) {
  // Learn more about toolbox: https://infinitered.github.io/gluegun/#/toolbox-api.md
  const { ignite } = toolbox

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })

  // Example of removing app/NextJs folder
  // const removeignite-next-js = await toolbox.prompt.confirm(
  //   'Do you want to remove app/ignite-next-js?'
  // )
  // if (removeignite-next-js) { toolbox.filesystem.remove(`${APP_PATH}/app/ignite-next-js`) }

  // Example of unpatching a file
  // ignite.patchInFile(`${APP_PATH}/app/config/app-config.js`, {
  //   delete: `import '../ignite-next-js/ignite-next-js'\n`
  // )
}

// Required in all Ignite CLI plugins
module.exports = { add, remove }

