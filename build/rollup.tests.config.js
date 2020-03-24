'use strict';

const resolve = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
const multi = require('@rollup/plugin-multi-entry');

const fs = require('fs');
const path = require('path');
const pkgJson = require('../package.json');
const pkgJsonLock = require('../package-lock.json');
const mocha_version = pkgJsonLock.dependencies.mocha.version;
const chai_version = pkgJsonLock.dependencies.chai.version;
const pkg_name = pkgJson.name;

const rootDir = path.join(__dirname, '..');

// Let's first create the appropriate html file loading mocha, chai and a bundle of the tests
const templatePath = path.join(rootDir, pkgJson.directories.src, 'browser', 'tests-template.html');
const dstDir = path.join(rootDir, pkgJson.directories.test, 'browser');
const dstFileName = path.join(dstDir, 'index.html');

const template = fs.readFileSync(templatePath, 'utf-8');
const bundleFile = path.join(rootDir, pkgJson.directories.lib, 'index.browser.bundle.mod.js');
const testsJs = `
    <script type="module">
        import * as _pkg from '${path.relative(templatePath, bundleFile)}'
        window._pkg = _pkg;
        import './tests.js';
        mocha.run();
    </script>`;

fs.writeFileSync(dstFileName,
    template.replace(/{{TESTS}}/g, testsJs).replace(/{{PKG_NAME}}/g, pkgJson.name).replace(/{{MOCHA_VERSION}}/g, mocha_version).replace(/{{CHAI_VERSION}}/g, chai_version)
);

const input = path.join(rootDir, pkgJson.directories.test, '*.js');
console.log(input);

module.exports = [
    { 
        input: input,
        plugins: [
            multi({ exports: false }),
            replace({
                'const _pkg = require(\'../lib/index.node\');': '',
                'const chai = require(\'chai\');': '',
                'delimiters': ['', ''],
                'process.browser': true
            }),
            resolve({
                browser: true,
            }),
            commonjs()
        ],
        output: {
            file: path.join(rootDir, pkgJson.directories.test, 'browser', 'tests.js'),
            format: 'esm'
        },
        external: [pkg_name]
    }
];