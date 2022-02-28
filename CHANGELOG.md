## 2.0.0

### Breaking 💥

- Drop support for Node <12
- Use ember-auto-import 2.x
- Update ember-cli to 4.1.1
- Mass-upgrade dependencies (except eslint, which was kept at 7 to avoid a potential incompatibility with babel-parser)

### Under the hood 🚗

- Use GitHub actions instead of Travis for CI
- Reformat code style to please prettier ✨
- Templates in tests now conform to "strict" mode (e.g. `{{foo}}` --> `{{this.foo}}`)
- Dropped use of david-dm.org (dependency watcher) as it appears to be defunct now

## 1.1.0

* Update ember-cli to 3.17 (might change minimum supported version -- if so, I'm sorry for not considering this breaking)
* Mass-updated dependencies (address upstream security warnings)


## 1.0.0

* Initial release
