// this lives in the same monorepo! most errors you see in
// vscode that aren't highlighting or bracket completion
// related are coming from our LSP server
import { startServer } from 'graphql-language-service-server';
import { CodeFileLoader } from '@graphql-tools/code-file-loader';

// The npm scripts are configured to only build this once before
// watching the extension, so please restart the extension debugger for changes!

async function start() {
  try {
    await startServer({
      method: 'node',
      loadConfigOptions: {
        extensions: [
          api => {
            api.loaders.schema.register(new CodeFileLoader());
            api.loaders.documents.register(new CodeFileLoader());
            return {
              name: 'vscode-graphql',
            };
          },
        ],
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

void start();
