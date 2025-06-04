import '../css/Design.css'

function Design() {
  return (
    <div className="container">
      <h2>Design System</h2>

      <section className="design-section">
        <h3>Color Palette</h3>
        <div className="palette-box">
          <div className="palette-color" style={{ backgroundColor: '#3b82f6' }}></div>
          <div className="palette-color" style={{ backgroundColor: '#10b981' }}></div>
          <div className="palette-color" style={{ backgroundColor: '#f59e0b' }}></div>
          <div className="palette-color" style={{ backgroundColor: '#ef4444' }}></div>
        </div>
      </section>

      <section className="design-section typography-sample">
        <h3>Typography</h3>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <p>Paragraph example text using your global font styles.</p>
      </section>

      <section className="design-section component-preview">
        <h3>Component Preview</h3>
        <button className="preview-button" style={{ background: '#3b82f6', color: 'white' }}>Primary</button>
        <button className="preview-button" style={{ background: '#10b981', color: 'white' }}>Success</button>
        <button className="preview-button" style={{ background: '#ef4444', color: 'white' }}>Danger</button>
      </section>
    </div>
  )
}

export default Design;