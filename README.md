# yol

My project auxiliary tool.

Templates:

- gulpfile
- files.js(files for gulp task)
- .gitignore
- .jshitrc
- LICENSE(MIT)
- package.json(only devDependencies)
- README.md(empty)

If above files can't be found in `cwd`, this tool will copy templates to `cwd`. 

If there has a file with the same name in `cwd`, the template will not be copied.

The common way to init project, just type:

```
npm init && bower init && yol init
```

And the project will be initiated. :)
