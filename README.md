# react-date-range-input

> A lightweight, customizable React **Date Range Input** component with popup calendar(s). Built with TypeScript and Pure CSS.

![npm](https://img.shields.io/npm/v/@cameratajs/react-date-range-input)
![license](https://img.shields.io/npm/l/date-range-input)
[![npm downloads](https://img.shields.io/npm/dm/@cameratajs/react-date-range-input.svg?style=flat-square)](https://www.npmjs.com/package/@cameratajs/react-date-range-input)

---

## Features

- Fully controlled input (you own the state)
- Popup with 1, 2 or more calendars
- Customizable highlight colors and rendering
- Headless & styled — easy to extend or override styles

---

## Installation

```bash
npm install date-range-input
# or
yarn add date-range-input
```

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

## API

## Props

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

## License

**react-date-range-input** is released under the **MIT** license.
