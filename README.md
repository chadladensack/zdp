# zDP (Zend Debug and Profiler)

Zend Debug and Profiler toolbar for Google Chrome.  Allows Debugging and Profiling capabilities with auto detection for the Zend Debug client.

> This is a fork of the [zDebug Google Chrome extension](https://chrome.google.com/webstore/detail/zdebug/gknbnafalimbhgkmichoadhmkaoingil?hl=en "zDebug Google Chrome extension") created by Dylan Holmes.  Dylan, thank you for your hard work in putting the base together.  Dylan, please contact me so we can collaborate on knocking this thing out of the park for future use!

## How To Use
1. Get the source from GitHub
2. Load the extension in Chrome following the commands at http://developer.chrome.com/extensions/getstarted.html#unpacked
3. Start (if not already running) Zend Studio or IDE using Zend Debugger.
4. Start using the debugger/profiler.  Zend Debug client auto detection is enabled by default.

## Todo
* [IN PROGRESS] Fix issue with values not persisting correctly between options and cookie set.  It's a problem merging the localStorage (array) with the object that holds the default values.
* [COMPLETED] Hide/Show auto detect or manual input fields in the options page.
* [COMPLETED] Show client connection info on the toolbar display.  Helpful to determine what IP and port the debug session will use.
* Add wiki page(s) to show how the Zend Debug session and data tunnel are established and used.
* Add wiki page to provide a "quick and dirty" how-to guide.
* (maybe) add helpful links into the toolbar display just like the Zend Debug Toolbar for Firefox and Internet Explorer.
