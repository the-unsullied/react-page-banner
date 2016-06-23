# react-page-banner

*A full width page banner that acts as a notification to the user. When shown banner will absolutely slide below the parent element, and disappear after a certain duration.*

![React Page Banner](https://github.com/the-unsullied/react-page-banner/blob/demo/page-banner-demo.gif)


## Params

**message** {String} Message that the banner will display.

**type** {String} Type of banner, which determines the color and theme of the banner (success, error, etc...).

**duration** {Number} The length of time (in ms) the message is seen by user.

**afterClose** {Method} callback method that is executed after close.

**topOffset** {String} pixel top offset (default `0px`).

**topPalmOffset** {String} pixel top offset for palm media query (default `0px`).



## SCSS Options
To optionally change any of these colors, place the scss variable above the import line of the PageBanner.scss file.

**$page-banner-success-bg** - background color for *success* type page banner

**$page-banner-warning-bg** - background color for *warning* type page banner

**$page-banner-error-bg** - background color for *error* type page banner

**$page-banner-warning-color** - message color for *warning* type page banner

**$page-banner-error-color** - message color for *error* type page banner

**$page-banner-message-success-color** - message color for *success* type page banner

NOTE: For close button you must copy svg image in `dist/page-banner-close.svg` into your own images directory, and implement the class:
```
.page-banner__icon-close {
  background-image: url('/path/to/page-banner-icons.svg');
}

```
