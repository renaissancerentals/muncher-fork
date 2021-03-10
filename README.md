![Test release and publish](https://github.com/renaissancerentals/renaissance-component/workflows/Test%20release%20and%20publish/badge.svg) 
# Renaissance-component  
Front-end [component library](https://renaissancerentals.github.io/renaissance-component/) for renaissancerentals, forked from [muncher-ui](https://github.com/contentmunch/muncher-ui)

## Using the component
To use this component library:

* add the npm package to your project
    ```
    $ npm i @renaissance-rentals/renaissance-component
    ```
  
## Installation guide
In the project directory, you can run:

### `npm start`
Launches the component explorer on port 6007

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the package library.

## Coding rules
We use [GitHub Flow](https://guides.github.com/introduction/flow/) for our project workflow.
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* Create pull request against develop to merge your code.
* All features or bug fixes **must be tested** by one or more [specs][unit-testing].

### Pull request format

```
<subject>

* changes 1
* changes 2

fixes/closes #<github issue number>

```

### Git commit format

```
<type>: <subject>
<BLANK LINE> 
<body> optional
```
* Any line of the commit message cannot be longer 100 characters. This allows the message to be easier to read on GitHub as well as in various git tools.
* The subject contains succinct description of the change:
    * use the imperative, present tense: "change" not "changed" nor "changes"
    * no dot (.) at the end
* Commit type:
    * feat: a new feature
    * fix: a bug fix
    * refactor: a code change that neither fixes a bug nor adds a feature
    * test: adding missing tests
    * chore: changes to the build process or auxiliary tools and libraries such as documentation generation



