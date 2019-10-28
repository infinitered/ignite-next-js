/**
 * This file provides an `install` function that should install Next.js
 * any copy over any folders and template files.
 */

/**
 * Let's install.
 *
 * @param {any} context - The gluegun context. Docs: https://infinitered.github.io/gluegun/#/context-api.md
 */
async function install(context) {
  const APP_PATH = process.cwd()
  const PLUGIN_PATH = __dirname

  const { filesystem, parameters, ignite, print, system, strings } = context

  const name = parameters.first
  const kebabName = strings.kebabCase(name)
  const spinner = print.spin(`using the ${print.colors.cyan("Ignite Next.js")} boilerplate`).succeed()

  // install Next boilerplate with TypeScript
  // spinner.text = "▸ generating next.js project with typescript"
  // spinner.start()
  // const commandString = `echo "${kebabName}" | npx create-next-app --example with-typescript`
  // const result = await system.run(commandString)
  // if (!result.includes("Success!")) {
  //   print.error("Error: didn't detect success. Exiting CLI.")
  //   print.debug(result)
  //   process.exit(1)
  // }
  // spinner.succeed()

  // copy our App & Tests directories
  spinner.text = "▸ copying files"
  spinner.start()
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/components`, `${APP_PATH}/components`)
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/lib`, `${APP_PATH}/lib`)
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/pages`, `${APP_PATH}/pages`)
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/public`, `${APP_PATH}/public`)
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/.env.sample`, `${APP_PATH}/.env.sample`)
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/now.json`, `${APP_PATH}/now.json`)
  filesystem.copy(`${PLUGIN_PATH}/boilerplate/README.md`, `${APP_PATH}/README.md`)
  spinner.stop()

  // generate some templates
  spinner.text = "▸ generating files"
  spinner.start()
  const templates = [
    { template: ".env.sample", target: "index.android.js" },
    { template: ".gitignore.ejs", target: ".gitignore" },
    { template: "package.json.ejs", target: "package.json" }
  ]
  await ignite.copyBatch(
    context,
    templates,
    { name: name },
    {
      quiet: true,
      directory: `${PLUGIN_PATH}/boilerplate`
    }
  )
  spinner.stop()

  // initialize git
  const gitExists = await filesystem.exists(".git")
  if (!gitExists && !parameters.options["skip-git"] && system.which("git")) {
    spinner.text = "setting up git"
    spinner.start()
    await system.run('git init && git add . && git commit -m"Initial commit"')
    spinner.succeed()
  }

  // Wrap it up with our success message.
  print.info("")
  print.info("🍽  Installed!")
  print.info("")
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow("  cp .env.sample .env"))
  print.info(print.colors.yellow("  (then edit .env to add your own secrets)"))
  print.info(print.colors.yellow("  source .env"))
  print.info(print.colors.yellow("  yarn dev"))
  print.info("")
}

module.exports = { install }
