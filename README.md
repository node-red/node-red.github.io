node-red.github.io
==================

[Node-RED Site](http://nodered.org)

### Contributing / Fixes

For simple typos and single line fixes please just raise an issue pointing out
our mistakes. For larger changes, please discuss them on the [forum](https://discourse.nodered.org) or [Slack team](http://nodered.org/slack/) #docs channel.

If you need to raise a pull request please read our
[contribution guidelines](https://github.com/node-red/node-red/blob/master/CONTRIBUTING.md)
before doing so.

### Previewing the Site
This site is a Github Pages site that uses [Jekyll](https://github.com/jekyll/jekyll) for static site generation.  To preview and test the site, first, make sure [Jekyll is installed](https://jekyllrb.com/docs/installation/).

Fork the repository so you can make changes, commit them to your own repository and make pull requests for review.  Then clone the repository if you haven't already:

    git clone https://github.com/{your-github}/node-red.github.io

First time you run jeykll you need to do bundle install 1st for the dependencies,

    cd node-red.github.io
    bundle install
    jekyll serve -w

Once the site is built and running you can preview it at [`http://127.0.0.1:4000/`](http://127.0.0.1:4000/).
