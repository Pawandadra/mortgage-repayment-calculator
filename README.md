# Frontend Mentor - Mortgage repayment calculator solution

This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [https://github.com/Pawandadra/mortgage-repayment-calculator]
- Live Site URL: [https://pawandadra.github.io/mortgage-repayment-calculator/]

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid

### What I learned

While developing this project I learned how to implement custom radio buttons.

To implement custom radio buttons, see below:

```html
<form>
  <label>Radio Buttons</label>
    <div id="firstRadioButton">
        <input type="radio" id="first" name="radioButton" value="first">
        <label for="first">First</label>
    </div>
    <div id="secondRadioButton" tabindex="0">
      <input type="radio" id="second" name="radioButton" value="second">
      <label for="second">Second</label>
    </div>
</form>
```
```css
input[type = 'radio']{
    appearance: none;
    background-color: #fff;
    margin-left: 1rem;
    color: currentColor;
    width: 15px;
    height: 15px;
    border: 1px solid gray;
    border-radius: 50%;
    display: grid;
    place-content: center;
    cursor: pointer;
}

input[type="radio"]::before {
    content: "";
    width: 9px;
    height: 9px;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em red;
}

input[type="radio"]:checked{
    border: 1px solid red;
}

input[type="radio"]:checked::before {
    transform: scale(1);
}
```


### Useful resources

- [chatGPT](https://chatgpt.com/) - This helped me in JS logic for implementing svg graphics while clicking on radio buttons and checkbox. I really liked this and will use it going forward.
- [moderncss.dev](https://moderncss.dev/pure-css-custom-styled-radio-buttons/) - This is an amazing article which helped me to implement custm radio buttons. I'd recommend it to anyone still learning this concept.

## Author

- Frontend Mentor - [@Pawandadra](https://www.frontendmentor.io/profile/Pawandadra)
