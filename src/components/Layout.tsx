import React from "react";

export default function Layout({ header, main, footer }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen md:grid md:grid-cols-[150px_1fr] md:grid-rows-[1fr_auto]">
      <div className="flex flex-col min-h-screen md:grid md:grid-cols-[150px_1fr] md:grid-rows-[1fr_auto]">
        {/* Header */}
        <div className="bg-blue-200 md:row-span-1 md:row-end-auto">
          {header}
        </div>

        {/* Main */}
        <main className="bg-green-100 md:row-span-1 md:row-end-auto">
          {main}
        </main>

        {/* Footer */}
        <footer className="bg-gray-300 md:col-span-2">{footer}</footer>
      </div>
    </div>
  );
}

type LayoutProps = {
  header: React.ReactElement;
  main: React.ReactElement;
  footer: React.ReactElement;
};
