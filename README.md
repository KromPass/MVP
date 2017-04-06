# MVP

## Goal
Portable and quick-development oriented starter kit powered by ES6/ES7 + Webpack@2 + React@15 + Node@7 + Koa@2 + Sqlite@3.

## Attitude
- no micro optimizations
- no premature optimizations
- no crazy security concerns

## Requirements
- MacBook
- Node 7.8+
- Sqlite3

## What's left to do? A lot.

### PIPELINE
- babel 7: upgrade, remove decorator transform
- string-replace-loader: hide pwd lines in config
- phonegap bundle

### REDUX
- unique names for reducers: item/list reducing same data
- normalize names: attribute, property, item, entity, model, list, collection, etc etc
- use child context for form/input
- side effects for inter component communication/events

### UI/UX
- tab bar: scrollable, conditional
- nested <a> when wrapping with <Link />
- password width
- view transition:
1. bottom bar (1st level) trigger refresh
2. 2nd level and tabbed convent trigger sliding back-forward
- boot splash screen

### COMPONENTS
- signin, signup, connects, recover pwd, jwt
- table: dynamic columns width, filters
- s3 upload: direct and parallel chunked/multiparts with webworkers, multiple resizes, frame from video
- charts, stripe
- chat, websockets
- import/export xls with google spreadsheet
- 404, 503, deprecated

### BACKEND
- jwt: changing secret results in valid decoding
- multilanguage: ts with success/warning/error constants
- recover pwd only when email valid
- permissions as groups/roles
- logging email/file
- websockets router
- jest + code coverage (mocks/spies, i.e sms for bot)

- travis and github hook for deploy: i.e pr/commit/merge refused if <90% code coverage
- node-inspector, debugger, cpu/memory profiler

- ec2 config: netcap port 80, 443
- koa/websockets cluster/scaling
- artillery.io: load testing

### SYS
- vim scp://user@myserver[:port]//path/to/file.txt
- sshfs http://unix.stackexchange.com/questions/202918/how-do-i-remotely-edit-files-via-ssh

### GIT
- git config --global branch.autosetuprebase always
- git rebase
- git stash pop/apply+drop
- git diff --cached
- git log --graph --oneline --first-parent develop
- gitflow: github webhooks push to deploy
- tags
- pull request
- permission: protected branch with ssh keys, protected pwd files
- travis: post-update npm update if changed, webpack to build, testing coverage, status check
- deploy multiple branch on stg => multiple host on server per each branch
- authorized_keys => ssh-dss rsakey no-pty,no-port-forwarding,no-X11-forwarding,no-agent-forwarding,command="git-shell -c '$SSH_ORIGINAL_COMMAND'"

### ATTRIBUTE DEFINITION
- array: true|false,
- type: text|integer|float|datetime|date|password,
- required: true|false,
- values: [array of possible values]
- predefined: 'predefined value',
- pattern: /^[a-z\s'\u00C0-\u017F]+$/i,
- min: number,
- max: number,
- minLength: not-negative number,
- maxLength: not-negative number,
- readonly: true|false

### NOMENCLATURE
- entity/attribute - relationship - collection => astratta, forma
- item/property - association - list => dato, istanza