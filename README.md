# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [GitHub](https://github.com/MarcoJHB/rest-countries-colour-switcher)
- Live Site URL: [GitHub URL](https://marcojhb.github.io/rest-countries-colour-switcher/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- JS
- [REST Countries API](https://restcountries.com/)

### What I learned

This has been my biggest project yet! Took me just over 2 weeks (coding for at least 1-2 hours in the morning before work). There were tons of things I learned here, especially when it came to various array methods. Because the updated REST countries API had some unique objects per country, I had to get creative with my functions. For example:

```js
function getBorderCountries() {
  return Object.values(data.borders).map(function (code) {
    return `<p class="btn country-border">${countryCodes.find((o) => o.code === code).country}</p>`;
  });
}
```

### Continued development

- Make border countries clickable
- Make some more styling adjustments


## Author

- Website - [Marco Agas](https://github.com/MarcoJHB/)
- Frontend Mentor - [@MarcoJHB](https://www.frontendmentor.io/profile/MarcoJHB)
- Twitter - [@MarcoJHB](https://twitter.com/MarcoJHB)