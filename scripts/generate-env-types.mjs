import { existsSync, readFileSync, watch, writeFileSync } from 'node:fs';

const envFile = '.env';
const declarationFile = 'env.d.ts';

function generate() {
    const keys = new Set(
        readFileSync(envFile, 'utf8')
            .split(/\r?\n/)
            .flatMap((line) => {
                const match = line.match(
                    /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=/,
                );
                return match ? [match[1]] : [];
            }),
    );

    const declarations = [...keys]
        .map((key) => `    ${key}?: string;`)
        .join('\n');

    const output = `declare namespace NodeJS {
  interface ProcessEnv {
${declarations}
  }
}
`;

    if (
        !existsSync(declarationFile) ||
        readFileSync(declarationFile, 'utf8') !== output
    ) {
        writeFileSync(declarationFile, output);
        console.log(`Updated ${declarationFile}`);
    }
}

generate();

if (process.argv.includes('--watch')) {
    console.log('Watching .env for changes');
    watch('.', (_, filename) => {
        if (filename?.toString() === envFile) generate();
    });
}
