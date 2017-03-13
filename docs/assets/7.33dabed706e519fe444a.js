webpackJsonp([7,30],{505:function(n,t){n.exports="<!---\nTHIS IS AN AUTOGENERATED FILE. EDIT PACKAGES/BOUNDLESS-UTILS-WEB-NOTIFICATION/INDEX.JS INSTEAD.\n-->\n\nTrigger native toasts in supporting browsers.\n\n> Support for web notifications is [available in all major desktop browsers](http://caniuse.com/#feat=notifications),\n  except IE (February 2017).\n\nThis module is not a React component, but a utility. The \"close\" functionality of web notifications was removed in a platform\nspec update, so it's no longer possible to have a true lifecycle.\n\nThe utility works by providing an object with the following properties:\n\n- __body__ `String`\n  up to two lines are displayed in the notification (based on the current browser implementations)\n\n- __header__ `String`\n  the bolded title displayed at the top of the notification\n\n- __icon__ `HTMLString`\n  (optional) the URL of a picture or icon to be displayed with the notification (looks best if square)\n\n- __onClick__ `Function`\n  (optional) add arbitrary functionality when the notification is clicked\n\nThis will return a `Promise`. Resolution means the notification was created correctly (returns the `Notification`,\nand rejection will return a relevant error description string.\n\n## Installation\n\n```bash\nnpm i boundless-utils-web-notification --save\n```\n\nThen use it like:\n```jsx\n/** @jsx createElement */\n\nimport {createElement, PureComponent} from 'react';\nimport notify from 'boundless-utils-web-notification';\nimport Button from 'boundless-button';\n\nexport default class NotifyDemo extends PureComponent {\n    state = {\n        n: 0,\n    }\n\n    spawnNotification = () => {\n        notify(this.template(this.state.n + 1)).catch((error) => console.warn(error));\n\n        this.setState({n: this.state.n + 1});\n    }\n\n    template(index) {\n        return {\n            header: `Notification #${index}`,\n            body: 'I can support up to two lines of text.',\n            icon: 'http://icons.iconarchive.com/icons/icons8/ios7/128/Astrology-Winter-icon.png',\n            onClick: () => window.open('http://www.epa.gov/'),\n        };\n    }\n\n    render() {\n        return (\n            <div>\n                <Button ref='trigger' onClick={this.spawnNotification}>\n                    Spawn Notification\n                </Button>\n            </div>\n        );\n    }\n}\n```"}});