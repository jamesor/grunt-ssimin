# grunt-ssimin

## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-ssimin --save-dev
```

## Why the ssimin task?

If you use a server-side technology to dynamically assemble pages but need to only hand off the final rendered output you might be using a workflow that involves viewing the page in a browser and saving the source code.  One problem with this method is that any server-side includes you want to maintain are rendered out to the response.  The ssimin task scans the rendered output for where the include blocks should be, cuts them out, replaces them with a proper include tag and finally saves the cut content to include file at the specified path.

The ssimin task works really well when it directly follows the [grunt-curl][] task which curls the pages you want and stores them to your dist folder.  Then the ssimin task would then operate on those fetched files already in your dist folder.


## The ssimin task

Inspired by [grunt-usemin][], the following task looks for custom HTML "block" comments, removes them from the content and replaces them with include tags.

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

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[grunt-usemin]: https://github.com/yeoman/grunt-usemin
[grunt-curl]: https://github.com/twolfson/grunt-curl