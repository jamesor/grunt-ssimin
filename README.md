# grunt-ssimin

## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-usemin --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md

## The ssimin task

This task looks for custom HTML "block" comments, removes them from the content and replaces them with include tags.

Custom HTML "block" comments are provided as an API for interacting with the build script. These comments adhere to the following pattern:

```html
<!-- include:<type> <path> -->
... HTML Markup, list of script / link tags.
<!-- endinclude -->
```

- **type**: either `file` or `virtual`
- **path**: the file path of the include file, the target output

An example of this in completed form can be seen below:

```html
<!-- include:virtual /includes/header.inc -->
<header>
  <h1>A Site About Nothing</h1>
  <nav>
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="/about/">About</a></li>
      <li><a href="/blog/">Blog</a></li>
      </ul>
  </nav>
</header>
<!-- endinclude -->
```

Internally, the task parses your HTML markup to find each of these blocks, and creates for you to corresponding server-side include file if it doesn't aleady exist.

This task is responsible for replacing in HTML, references to non-minified files with reference to their include files if they are found on the disk.

```js
ssimin: {
  dist: {
    files: {
      src: ['<%= yeoman.dist %>/**/*.html']
    }
  }
}
```

The files will be out put to the dist folder defined in Yeoman config.


## License

[BSD license](https://github.com/jamesor/grunt-ssimin/blob/master/LICENSE-BSD) and copyright James O'Reilly