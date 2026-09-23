import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import * as Sillar from '../../src/index';
import '../../src/styles.css';
import './site.css';

type Language = 'en' | 'es';
const copy = {
  en: {
    nav: ['Overview', 'Components', 'Playground', 'Accessibility', 'Migration', 'Compare'],
    eyebrow: 'Open source · React 18+ · TypeScript',
    title: 'Accessible React components, beautifully ready.',
    lead: 'Build professional interfaces with accessible behavior, semantic design tokens, light and dark themes, and no primitive runtime dependency.',
    install: 'npm install sillar-ui', explore: 'Explore components', github: 'View on GitHub',
    principles: ['Accessible behavior', 'Beautiful defaults', 'Independent architecture', 'Semantic tokens'],
    catalog: 'A practical component foundation', catalogLead: 'Interactive building blocks for product interfaces, backed by shared focus, layer, positioning, and keyboard foundations.',
    playground: 'Edit the code. See the result.', playgroundLead: 'The preview executes against the current Sillar UI source.',
    accessibility: 'Keyboard and accessibility contract', migration: 'Migrate from Radix', compare: 'Choose with context', tokens: 'Semantic tokens',
  },
  es: {
    nav: ['Resumen', 'Componentes', 'Playground', 'Accesibilidad', 'Migración', 'Comparar'],
    eyebrow: 'Código abierto · React 18+ · TypeScript',
    title: 'Componentes React accesibles, listos y hermosos.',
    lead: 'Construye interfaces profesionales con comportamiento accesible, tokens semánticos, temas claro y oscuro y sin dependencias de primitivas.',
    install: 'npm install sillar-ui', explore: 'Explorar componentes', github: 'Ver en GitHub',
    principles: ['Comportamiento accesible', 'Diseño profesional', 'Arquitectura independiente', 'Tokens semánticos'],
    catalog: 'Una base práctica de componentes', catalogLead: 'Bloques interactivos respaldados por fundamentos compartidos de foco, capas, posicionamiento y teclado.',
    playground: 'Edita el código. Mira el resultado.', playgroundLead: 'La vista ejecuta el código contra la versión actual de Sillar UI.',
    accessibility: 'Contrato de teclado y accesibilidad', migration: 'Migrar desde Radix', compare: 'Elige con contexto', tokens: 'Tokens semánticos',
  },
} as const;

const examples = [
  { name: 'Accordion', node: <Sillar.Accordion defaultValue="one" collapsible><Sillar.AccordionItem value="one"><Sillar.AccordionTrigger>Why Sillar?</Sillar.AccordionTrigger><Sillar.AccordionContent>Accessible behavior and polished visual defaults.</Sillar.AccordionContent></Sillar.AccordionItem><Sillar.AccordionItem value="two"><Sillar.AccordionTrigger>Can I theme it?</Sillar.AccordionTrigger><Sillar.AccordionContent>Every visual role is exposed as a semantic CSS token.</Sillar.AccordionContent></Sillar.AccordionItem></Sillar.Accordion> },
  { name: 'Popover + Tooltip', node: <div className="demo-row"><Sillar.Popover><Sillar.PopoverTrigger asChild><Sillar.Button variant="outline">Open popover</Sillar.Button></Sillar.PopoverTrigger><Sillar.PopoverContent><strong>Independent foundations</strong><p>Positioning, dismissal, portals, and focus are owned by Sillar.</p></Sillar.PopoverContent></Sillar.Popover><Sillar.Tooltip delayDuration={0}><Sillar.TooltipTrigger asChild><Sillar.Button size="icon" variant="secondary" aria-label="Information">?</Sillar.Button></Sillar.TooltipTrigger><Sillar.TooltipContent>Helpful context</Sillar.TooltipContent></Sillar.Tooltip></div> },
  { name: 'Choice controls', node: <div className="demo-stack"><label className="demo-label"><Sillar.Checkbox defaultChecked /> Receive product updates</label><Sillar.RadioGroup defaultValue="stable" aria-label="Release channel"><label className="demo-label"><Sillar.RadioGroupItem value="stable" /> Stable</label><label className="demo-label"><Sillar.RadioGroupItem value="next" /> Next</label></Sillar.RadioGroup></div> },
  { name: 'Select + Combobox', node: <div className="demo-stack"><Sillar.SelectRoot defaultValue="do"><Sillar.SelectTrigger><Sillar.SelectValue /></Sillar.SelectTrigger><Sillar.SelectContent><Sillar.SelectItem value="do">Dominican Republic</Sillar.SelectItem><Sillar.SelectItem value="us">United States</Sillar.SelectItem></Sillar.SelectContent></Sillar.SelectRoot><Sillar.Combobox placeholder="Search a city" options={[{ value: 'sdq', label: 'Santo Domingo' }, { value: 'sti', label: 'Santiago' }, { value: 'nyc', label: 'New York' }]} /></div> },
  { name: 'Progress + Skeleton', node: <div className="demo-stack"><Sillar.Progress value={72} aria-label="Documentation progress" /><Sillar.Skeleton style={{ height: 72 }} /></div> },
  { name: 'DatePicker', node: <Sillar.DatePicker defaultValue={new Date()} /> },
  { name: 'Collapsible + NavigationMenu', node: <div className="demo-stack"><Sillar.Collapsible><Sillar.CollapsibleTrigger asChild><Sillar.Button variant="outline">Show release notes</Sillar.Button></Sillar.CollapsibleTrigger><Sillar.CollapsibleContent><p>Focused entry points, typed APIs, and owned interaction foundations.</p></Sillar.CollapsibleContent></Sillar.Collapsible><Sillar.NavigationMenu defaultValue="learn"><Sillar.NavigationMenuList><Sillar.NavigationMenuItem><Sillar.NavigationMenuTrigger value="learn">Learn</Sillar.NavigationMenuTrigger><Sillar.NavigationMenuContent value="learn"><Sillar.NavigationMenuLink href="#playground">Playground</Sillar.NavigationMenuLink><Sillar.NavigationMenuLink href="#accessibility">Accessibility</Sillar.NavigationMenuLink></Sillar.NavigationMenuContent></Sillar.NavigationMenuItem></Sillar.NavigationMenuList></Sillar.NavigationMenu></div> },
  { name: 'Toast', node: <ToastDemo /> },
  { name: 'Form + validation', node: <FormDemo /> },
];

const keyboardRows = [
  ['Dialog / Popover', 'Escape', 'Close and restore focus'], ['Accordion', 'Arrow keys · Home · End', 'Move between headers'], ['Select / Menu', 'Arrows · Home · End · Escape', 'Navigate, select, dismiss'], ['Combobox', 'Arrows · Enter · Escape', 'Filter and choose an option'], ['DatePicker', 'Arrows · Home · End · PageUp/Down', 'Navigate days, weeks, and months'], ['Tabs / RadioGroup', 'Arrow keys', 'Move and activate choices'],
];
const tokenRows = [['--slr-color-bg', 'Page canvas'], ['--slr-color-surface-raised', 'Elevated surfaces'], ['--slr-color-text', 'Primary content'], ['--slr-color-muted', 'Secondary content'], ['--slr-color-brand', 'Interactive accent'], ['--slr-shadow-focus', 'Visible keyboard focus'], ['--slr-radius-md', 'Standard component radius']];
const comparison = [
  ['Sillar UI', 'Polished + tokens', 'Included', 'Independent', 'Product teams wanting a ready foundation'], ['Radix UI', 'Unstyled', 'Behavior focused', 'Radix packages', 'Teams building their own visual system'], ['Base UI', 'Unstyled', 'Behavior focused', 'Base UI package', 'Advanced headless composition'], ['React Aria', 'Unstyled', 'Deep coverage', 'Adobe packages', 'Complex accessible applications'], ['MUI', 'Material opinion', 'Included', 'MUI runtime', 'Material Design products'], ['shadcn/ui', 'Copy into app', 'Depends on recipe', 'Registry source', 'Teams owning generated component code'],
];
const apiRows = [
  ['Tooltip / Popover', 'open, defaultOpen, onOpenChange, side, align', 'closed · open', 'tooltip · popover'],
  ['Accordion / Collapsible', 'value, defaultValue, onValueChange, disabled', 'closed · open · disabled', 'accordion · collapsible'],
  ['Toast', 'title, description, variant, duration, action', 'default · success · warning · danger', 'toast'],
  ['Checkbox / RadioGroup', 'checked/value, defaultChecked/defaultValue, required', 'checked · unchecked · disabled', 'choice'],
  ['Select / Combobox', 'value, options, placeholder, emptyMessage', 'open · selected · highlighted · disabled', 'select-root · combobox'],
  ['NavigationMenu', 'value, defaultValue, onValueChange, label', 'closed · open', 'navigation-menu'],
  ['Progress / Skeleton', 'value, max, label, style', 'determinate · indeterminate · loading', 'progress'],
  ['Form', 'initialValues, validate, onSubmit, invalid, required', 'valid · invalid · submitting', 'form'],
  ['DatePicker', 'value, defaultValue, min, max, locale', 'open · selected · today · disabled', 'date-picker'],
];
const playgroundCode = `<Card variant="elevated">
  <CardHeader>
    <Badge variant="success">Production ready</Badge>
    <CardTitle>Built with Sillar UI</CardTitle>
    <CardDescription>Accessible behavior and semantic tokens.</CardDescription>
  </CardHeader>
  <CardContent>
    <Button>Start building</Button>
  </CardContent>
</Card>`;

function ToastDemo() {
  const { toast } = Sillar.useToast();
  return <Sillar.Button onClick={() => toast({ title: 'Published successfully', description: 'Your release is available to everyone.', variant: 'success' })}>Create notification</Sillar.Button>;
}

function FormDemo() {
  const form = Sillar.useForm({ initialValues: { email: '' }, validate: (values) => ({ email: /\S+@\S+/.test(values.email) ? undefined : 'Enter a valid email.' }), onSubmit: () => undefined });
  return <Sillar.Form onSubmit={form.handleSubmit}><Sillar.FormItem invalid={Boolean(form.errors.email)} required><Sillar.FormLabel>Email</Sillar.FormLabel><Sillar.FormControl><Sillar.Input type="email" placeholder="you@example.com" {...form.field('email')} /></Sillar.FormControl><Sillar.FormMessage>{form.errors.email}</Sillar.FormMessage></Sillar.FormItem><Sillar.Button type="submit">Validate</Sillar.Button></Sillar.Form>;
}

function App() {
  const [language, setLanguage] = React.useState<Language>('en'); const [dark, setDark] = React.useState(true); const t = copy[language];
  const localized = language === 'es' ? {
    accessibilityLead: 'Los componentes siguen patrones WAI-ARIA, conservan el foco visible, admiten estado controlado y respetan la reducción de movimiento.',
    component: 'Componente', keys: 'Teclas', behavior: 'Comportamiento', role: 'Función', library: 'Librería', visual: 'Capa visual', runtime: 'Runtime', fit: 'Ideal para',
    tokensLead: 'Personaliza funciones semánticas en lugar de detalles internos. El mismo contrato controla las interfaces claras y oscuras.',
    migrationLead: 'Migra componente por componente y mantén estable tu producto mientras reemplazas la biblioteca de primitivas.',
    migrationTitles: ['Instala e importa los estilos', 'Reemplaza imports compuestos', 'Adapta selectores de estado'],
    compareLead: 'Ninguna librería resuelve todos los casos. Esta tabla presenta las diferencias con transparencia.',
    api: 'API pública, propiedades y estados', apiLead: 'Cada módulo tiene tipos TypeScript y un punto de entrada enfocado para mantener predecible el paquete de producción.', props: 'Propiedades clave', states: 'Estados', entry: 'Importación', themes: 'Claro y oscuro, lado a lado', themesLead: 'Los mismos componentes y tokens conservan jerarquía, contraste y foco en ambos temas.',
  } : {
    accessibilityLead: 'Public behavior follows WAI-ARIA patterns, preserves visible focus, supports controlled state, and respects reduced motion.',
    component: 'Component', keys: 'Keys', behavior: 'Behavior', role: 'Role', library: 'Library', visual: 'Visual layer', runtime: 'Runtime', fit: 'Best fit',
    tokensLead: 'Override semantic roles instead of component internals. The same contract drives light and dark interfaces.',
    migrationLead: 'Move component by component. Keep your product stable while replacing the primitive runtime.',
    migrationTitles: ['Install and import styles', 'Replace compound imports', 'Map state selectors'],
    compareLead: 'No library wins every use case. This table makes the tradeoff explicit.',
    api: 'Public API, properties, and states', apiLead: 'Every module ships TypeScript types and a focused entry point so production bundles stay predictable.', props: 'Key properties', states: 'States', entry: 'Import', themes: 'Light and dark, side by side', themesLead: 'The same components and tokens preserve hierarchy, contrast, and focus across both themes.',
  };
  React.useEffect(() => { document.documentElement.lang = language; document.documentElement.classList.toggle('dark', dark); document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark, language]);
  return <Sillar.ToastProvider><div className="docs-shell">
    <header className="docs-header"><a className="brand" href="#overview"><img src={`${import.meta.env.BASE_URL}sillar-mark.svg`} alt="" /><span>Sillar UI</span><small>v1</small></a><nav aria-label="Documentation">{t.nav.map((item, index) => <a key={item} href={`#${['overview','components','playground','accessibility','migration','compare'][index]}`}>{item}</a>)}</nav><div className="header-actions"><button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} aria-label="Change language">{language.toUpperCase()}</button><button onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? '☀' : '☾'}</button><a href="https://github.com/uppy19d0/sillar-ui">GitHub ↗</a></div></header>
    <main>
      <section id="overview" className="hero"><div className="hero-copy"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.lead}</p><div className="hero-actions"><code>{t.install}</code><a className="primary-action" href="#components">{t.explore}</a><a href="https://github.com/uppy19d0/sillar-ui">{t.github}</a></div></div><div className="hero-panel"><span>DESIGN SYSTEM / 01</span><div className="hero-card"><Sillar.Badge variant="success">Accessible by default</Sillar.Badge><h2>Craft product interfaces with confidence.</h2><p>Typed APIs, resilient interaction behavior, and a visual language that works in light and dark.</p><div className="demo-row"><Sillar.Button>Build now</Sillar.Button><Sillar.Button variant="outline">Read docs</Sillar.Button></div></div><footer>Made with love in the Dominican Republic by <a href="https://github.com/uppy19d0">@uppy19d0</a>.</footer></div></section>
      <section className="principles">{t.principles.map((item, index) => <article key={item}><span>0{index + 1}</span><strong>{item}</strong></article>)}</section>
      <section id="components" className="section"><header className="section-heading"><span>COMPONENTS</span><h2>{t.catalog}</h2><p>{t.catalogLead}</p></header><div className="component-grid">{examples.map((example) => <article key={example.name} className="component-card"><header><strong>{example.name}</strong><code>import from 'sillar-ui'</code></header><div className="component-preview">{example.node}</div></article>)}</div></section>
      <section id="playground" className="section playground-section"><header className="section-heading"><span>PLAYGROUND</span><h2>{t.playground}</h2><p>{t.playgroundLead}</p></header><LiveProvider code={playgroundCode} scope={Sillar}><div className="playground"><div><div className="panel-label">CODE / TSX</div><LiveEditor className="live-editor" /></div><div><div className="panel-label">PREVIEW</div><LivePreview className="live-preview" /><LiveError className="live-error" /></div></div></LiveProvider></section>
      <section className="section"><header className="section-heading"><span>THEMES</span><h2>{localized.themes}</h2><p>{localized.themesLead}</p></header><div className="theme-comparison"><div className="theme-frame theme-light"><span>LIGHT</span><Sillar.Card variant="elevated"><Sillar.CardHeader><Sillar.Badge variant="success">Ready</Sillar.Badge><Sillar.CardTitle>Semantic by design</Sillar.CardTitle><Sillar.CardDescription>One component contract, adapted to its environment.</Sillar.CardDescription></Sillar.CardHeader><Sillar.CardContent><Sillar.Button>Continue</Sillar.Button></Sillar.CardContent></Sillar.Card></div><div className="theme-frame theme-dark" data-theme="dark"><span>DARK</span><Sillar.Card variant="elevated"><Sillar.CardHeader><Sillar.Badge variant="success">Ready</Sillar.Badge><Sillar.CardTitle>Semantic by design</Sillar.CardTitle><Sillar.CardDescription>One component contract, adapted to its environment.</Sillar.CardDescription></Sillar.CardHeader><Sillar.CardContent><Sillar.Button>Continue</Sillar.Button></Sillar.CardContent></Sillar.Card></div></div></section>
      <section className="section"><header className="section-heading"><span>API REFERENCE</span><h2>{localized.api}</h2><p>{localized.apiLead}</p></header><div className="table-wrap"><table><thead><tr><th>{localized.component}</th><th>{localized.props}</th><th>{localized.states}</th><th>{localized.entry}</th></tr></thead><tbody>{apiRows.map((row) => <tr key={row[0]}><td><strong>{row[0]}</strong></td><td><code>{row[1]}</code></td><td>{row[2]}</td><td><code>sillar-ui/{row[3]}</code></td></tr>)}</tbody></table></div></section>
      <section id="accessibility" className="section split-section"><div><header className="section-heading"><span>ACCESSIBILITY</span><h2>{t.accessibility}</h2></header><p>{localized.accessibilityLead}</p></div><div className="table-wrap"><table><thead><tr><th>{localized.component}</th><th>{localized.keys}</th><th>{localized.behavior}</th></tr></thead><tbody>{keyboardRows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section>
      <section className="section split-section"><div><header className="section-heading"><span>THEMING</span><h2>{t.tokens}</h2></header><p>{localized.tokensLead}</p></div><div className="table-wrap"><table><thead><tr><th>Token</th><th>{localized.role}</th></tr></thead><tbody>{tokenRows.map((row) => <tr key={row[0]}><td><code>{row[0]}</code></td><td>{row[1]}</td></tr>)}</tbody></table></div></section>
      <section id="migration" className="section migration"><header className="section-heading"><span>MIGRATION</span><h2>{t.migration}</h2><p>{localized.migrationLead}</p></header><div className="migration-grid"><article><span>01</span><h3>{localized.migrationTitles[0]}</h3><pre>npm install sillar-ui{`\n`}import 'sillar-ui/styles.css'</pre></article><article><span>02</span><h3>{localized.migrationTitles[1]}</h3><pre>{`import { Dialog, DialogTrigger,\n  DialogContent } from 'sillar-ui/dialog'`}</pre></article><article><span>03</span><h3>{localized.migrationTitles[2]}</h3><pre>{`[data-state="open"] { ... }\n--slr-color-brand: #0f766e;`}</pre></article></div></section>
      <section id="compare" className="section"><header className="section-heading"><span>LANDSCAPE</span><h2>{t.compare}</h2><p>{localized.compareLead}</p></header><div className="table-wrap compare-table"><table><thead><tr><th>{localized.library}</th><th>{localized.visual}</th><th>Accessibility</th><th>{localized.runtime}</th><th>{localized.fit}</th></tr></thead><tbody>{comparison.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody></table></div></section>
    </main><footer className="docs-footer"><div><img src={`${import.meta.env.BASE_URL}sillar-mark.svg`} alt="" /><strong>Sillar UI</strong></div><p>Made with love in the Dominican Republic by <a href="https://github.com/uppy19d0">@uppy19d0</a>.</p><div><a href={`${import.meta.env.BASE_URL}llms.txt`}>llms.txt</a><a href={`${import.meta.env.BASE_URL}components.md`}>Markdown docs</a><a href="https://www.npmjs.com/package/sillar-ui">npm</a></div></footer><Sillar.ToastViewport /></div></Sillar.ToastProvider>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
