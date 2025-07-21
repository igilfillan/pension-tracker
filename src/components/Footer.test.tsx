import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./Footer";

describe("Footer Component", () => {
  test("renders footer with correct text", () => {
    render(<Footer />);
    expect(screen.getByText("footer stuff")).toBeInTheDocument();
  });

  test("has correct styling classes", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-gray-300", "md:col-span-2");
  });

  test("renders as a footer element", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
