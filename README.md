# MDX TypeScript CLI checker POC

Check MDX files for TypeScript errors on the command line, thanks to `@volar/typescript` and `@mdx-js/language-service` (credit to @remcohaszing and @johnsoncodehk)

```bash
$ pnpm check

> poc-mdx-type-checker-cli@1.0.0 check /home/runner/work/poc-mdx-type-checker-cli/poc-mdx-type-checker-cli
> node mdx-tsc/index.ts

Error: in-root.mdx(3,16): error TS2339: Property 'bbbb' does not exist on type '{ readonly a: 1; readonly components?: {} | undefined; }'.
Error: mdx/a/b/c.mdx(4,13): error TS2339: Property 'invalidProp' does not exist on type '{ readonly name: string; readonly components?: {} | undefined; }'.
 ELIFECYCLE  Command failed with exit code 2.
Error: Process completed with exit code 2.
```

<img width="2482" height="1138" alt="Screenshot 2025-08-25 at 18 12 56" src="https://github.com/user-attachments/assets/8b9e639a-2774-43d3-b71f-c20e70025fa8" />

Also running in GitHub Actions CI:

<img width="2872" height="1718" alt="Screenshot 2025-08-25 at 18 14 25" src="https://github.com/user-attachments/assets/c38439c4-0c94-4327-873d-50e8e161756a" />
