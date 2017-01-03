# Portal
__A higher-order component for the rendering of components outside the normal React tree.__

`Portal` is used in other components such as `Popover` to render content to places like the HTML `<body>` tag, avoiding style leakage and parent layout contexts. Only accepts a single top-level child; naked text, etc will be wrapped in a <div>.
