# pension-tracker

## Project Setup

This project was created using **Vite** and **Vitest**.

### How to Run

1. Install dependencies:
   ```bash
   npm install
2. Start the development server:
   ```bash
   npm run dev
3. Run the tests:
   ```bash
   npm run test
   

## Unit Tests

I have provided a test for a component and one for a utility function:

- `components/PensionChart.test.tsx`
- `utils/calculatePot.test.ts`

---

## Accessibility Issues Addressed
As we talked about accessibility and how to achieve it in our conversation, I thought it might be interesting to show some ways to make the UI more accessible for both screen readers and keyboard users. The UI is **100% accessible**.


### Skip Links

These are shortcuts that can be used by keyboard users. When you load the page, hit the **Tab** button, and you will see them appear when focused on. When you are on a skiplink if you hit enter focus will be shifted to that part of the page. 

- **skip to main**: Allows users to jump directly to the main content.
- **skip to form**: Focus shifts to the first input field on the form when selected.

This is a standard way to allow keyboard users to skip navigation links in the header navigation and jump to the interesting content.

---

### Form Accessibility

- **Keyboard Accessible**: Users can tab through the input fields and submit the form by pressing **Enter** while inside the form or by tabbing to the submit button and pressing **Enter**.
- **Form Labels**: Correctly associated with their respective inputs.
- **Error Messages**: Each input includes an `aria-describedby` attribute linking to the corresponding error message, ensuring screen readers can associate errors with inputs.
- **Focus Management**: When validation fails, focus automatically moves to the first invalid input, helping users quickly identify and correct errors.
- **Submit Button**: The "Calculate" button includes an `aria-label` ("Calculate pension details") to provide additional context for screen readers. The screenreader will read out 'Calculate pension details' instead of 'Calculate', giving more context to the blind user.

---

### Chart Accessibility

- **Recharts**: Hidden from screen readers using `aria-hidden="true"` as they are not accessible by default.
- **Accessible Tables**:
    - I have created accessible tables containing pot information for screen reader users. These are not visible in the UI but are present in the markup.
    - Tables include a description and a suitable caption.
    - Descriptions are associated with the table using ARIA labels.
    - The section containing the tables is marked with `aria-live="polite"`, notifying screen readers when the content changes dynamically. After form submission, this triggers a notification via the screen reader, informing users that the chart region has been updated.


### Lighthouse Report
- the UI is 100 accessible
![Screenshot 2025-07-22 at 15.22.13.png](public/Screenshot%202025-07-22%20at%2015.22.13.png)