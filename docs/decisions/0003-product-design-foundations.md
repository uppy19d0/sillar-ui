# Product design foundations

Sillar uses a neutral editorial direction: content provides the hierarchy, green identifies primary actions, and semantic status colors communicate outcomes. Default controls and surfaces have solid backgrounds. Gradients, floating hover effects and decorative glow are not default behavior.

`src/tokens.css` is the single source for public foundations. `src/styles.css` imports it; the build exports both the complete `sillar-ui/styles.css` and the optional standalone `sillar-ui/tokens.css`. Import the complete stylesheet for components; use tokens alone for custom interfaces. Existing token names and component props remain supported.

| Foundation | Rule |
| --- | --- |
| Spacing | 4, 8, 12, 16, 24, 32 and 48 px equivalents, using rem |
| Type | System/Inter sans; 12, 14, 16, 20 and 24 px equivalents; 400, 500, 600 weights |
| Shape | 6 px controls, 8 px cards, 12 px larger containers |
| Elevation | Borders for ordinary surfaces; reserved shadows for elevated panels and overlays |
| Interaction | Color and border state changes; ordinary controls retain their position |
| Focus | Visible outline, semantic focus color, forced-colors support |
| Motion | Short functional transitions; respect reduced motion |
| Theme | Equivalent semantic roles in light and dark, without requiring product-specific overrides |

The contrast regression test checks default text on four surfaces, primary button labels in default/hover states, and focus colors in both themes. It does not certify arbitrary consumer overrides or complete WCAG conformance. Public markup snapshots cover component structure separately from visual tokens.

Consumers can override semantic CSS custom properties on a root container. Preserve contrast and state distinctions when overriding them. In this workspace the portfolio consumes a generated stylesheet snapshot through `npm run sync:sillar-styles`; npm publication is a separate release action.
