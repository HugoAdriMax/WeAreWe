export function PageStructure({ children }: { children: React.ReactNode }) {
    return (
      <>
        <header role="banner">
          {/* Votre Header */}
        </header>
  
        <main role="main" id="main-content">
          {children}
        </main>
  
        <footer role="contentinfo">
          {/* Votre Footer */}
        </footer>
      </>
    );
  }