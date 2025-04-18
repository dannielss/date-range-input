# react-date-range-input

> A lightweight, customizable React **Date Range Input** component with popup calendar(s). Built with TypeScript and Pure CSS.

![NPM Version](https://img.shields.io/npm/v/%40cameratajs%2Freact-date-range-input)
![NPM License](https://img.shields.io/npm/l/%40cameratajs%2Freact-date-range-input)
![NPM Downloads](https://img.shields.io/npm/dm/%40cameratajs%2Freact-date-range-input)
![Coverage Status](https://coveralls.io/repos/github/dannielss/react-date-range-input/badge.svg?branch=main)

---

## Features

- Fully controlled input (you own the state)
- Popup with 1, 2 or more calendars
- Customizable highlight colors and rendering
- Headless & styled — easy to extend or override styles

---

## Demo

![React Date Range Input Demo](https://github.com/user-attachments/assets/0e0f9afe-7684-4f28-8fba-414c7d4e3cc6)

---

## Installation

```bash
npm i @cameratajs/react-date-range-input
# or
yarn add @cameratajs/react-date-range-input
```

---

## Usage

```js
import { useState } from 'react';
import { DateRangeInput } from 'date-range-input';

function App() {
  const [range, setRange] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <DateRangeInput
      startDate={range.startDate}
      endDate={range.endDate}
      onChange={setRange}
      calendars={2}
      anchor="bottom"
      color="#e11d48"
      highlightColor="#333"
      highlightRangeColor="#ddd"
      startDatePlaceholder="Start date"
      endDatePlaceholder="End date"
    />
  );
}
```

---

## API

### Props

| Prop                         | Type                                                                  | Description                             |
| ---------------------------- | --------------------------------------------------------------------- | --------------------------------------- |
| `startDate`                  | `Date \| null`                                                        | Selected start date                     |
| `endDate`                    | `Date \| null`                                                        | Selected end date                       |
| `onChange`                   | `(range: { startDate: Date \| null; endDate: Date \| null }) => void` | Callback when date range changes        |
| `initialMonth`               | `Date`                                                                | Initial visible month (default: today)  |
| `isOpen`                     | `boolean`                                                             | Controlled visibility of the popup      |
| `onToggle`                   | `(open: boolean) => void`                                             | Callback when popup is toggled          |
| `anchor`                     | `'top' \| 'bottom' \| 'left' \| 'right'`                              | Position of the popup (default: bottom) |
| `calendars`                  | `number`                                                              | Number of calendars (default: 2)        |
| `highlightColor`             | `string`                                                              | Color for selected dates                |
| `highlightRangeColor`        | `string`                                                              | Color for the date range                |
| `renderDay`                  | `(date, isSelected, isInRange) => React.ReactNode`                    | Custom day rendering                    |
| `className`                  | `string`                                                              | Class name for the input wrapper        |
| `popupClassName`             | `string`                                                              | Class name for the popup                |
| `calendarContainerClassName` | `string`                                                              | Class name for calendar container       |
| `navigationButtonClassName`  | `string`                                                              | Class name for navigation buttons       |
| `color`                      | `string`                                                              | Text color for selected days            |
| `startDatePlaceholder`       | `string`                                                              | Placeholder for the start date input    |
| `endDatePlaceholder`         | `string`                                                              | Placeholder for the end date input      |

---

## License

**react-date-range-input** is released under the **MIT** license.
