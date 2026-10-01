# Referencia de componentes de Sillar UI

Sillar UI ofrece componentes React accesibles y tipados con tokens CSS semánticos. Importa la hoja de estilos una sola vez:

```tsx
import 'sillar-ui/styles.css';
```

## Overlays

- `Dialog`: contiene el foco, aísla el contenido exterior, cierra con Escape y restaura el foco.
- `Popover`: contenido no modal con posicionamiento, colisiones y cierre exterior.
- `Tooltip`: descripción accesible mediante foco y puntero.
- `DropdownMenu`: navegación por teclado, búsqueda incremental y restauración del foco.
- `Toast`: notificaciones temporales anunciadas mediante regiones vivas.

## Colecciones

- `Accordion` y `Collapsible`: contenido expandible con estado controlado o no controlado.
- `Tabs`: activación automática o manual.
- `NavigationMenu`: navegación con controles desplegables.
- `RadioGroup`: selección única con foco itinerante.
- `SelectRoot`, `SelectGroup`, `SelectLabel` y `SelectSeparator`: selector compuesto con búsqueda incremental, grupos accesibles y compatibilidad con formularios.
- `Combobox`: autocompletado controlado o no controlado con grupos, filtros personalizados, carga asíncrona, creación de opciones y conteo accesible de resultados.

## Formularios y estado

- `Form`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` y `useForm`: valores tipados, validación y mensajes asociados.
- `Checkbox`, `Switch`, `Input`, `Textarea`, `TextField`, `Label`, `Field` y `Select` nativo.
- `TextField`: composición premium de input con etiqueta, ayuda, mensajes de error/éxito, contador, adornos inicial/final, acción y variantes default, filled, glass o elevated.
- `MoneyInput`, `PercentageInput` y `parseNumericInput`: entrada numérica localizada para comercio, finanzas, facturación, analítica e indicadores.
- `FormGrid` y `FieldGroup`: layout responsivo para formularios y secciones agrupadas.
- `DatePicker`: calendario localizado con navegación por días, semanas y meses.
- `Progress` y `Skeleton`: estados determinados, indeterminados y carga visual.
- `EmptyState`, `ErrorState` y `LoadingState`: superficies de producto para datos vacíos, errores y vistas pendientes.

## Patrones de producto

- `CalculatorShell` y `CalculatorPanel`: layouts para calculadoras, estimadores y flujos guiados con resultados laterales, acciones, footer, badge y ancho responsivo.
- `ResultSummary` y `BreakdownList`: paneles de KPI/resultados para totales, descuentos, balances y cálculos.
- `ExportActions`: barra estándar para imprimir, exportar PDF, copiar, compartir y descargar.
- `ConfirmDialog`: diálogo de confirmación construido sobre las primitivas Dialog y Button.

## Navegación de teclado

| Componente | Teclas |
| --- | --- |
| Dialog / Popover | Escape cierra y restaura el foco |
| Accordion | Flechas, Inicio y Fin |
| DropdownMenu / Select | Flechas, Inicio, Fin, Escape y caracteres imprimibles |
| Combobox | Flechas, Enter y Escape |
| DatePicker | Flechas, Inicio, Fin, PageUp y PageDown |
| Tabs / RadioGroup | Flechas, Inicio y Fin |

## Temas

Activa el modo oscuro con `.dark` o `data-theme="dark"`. Personaliza las variables documentadas `--slr-*` para adaptar la identidad visual sin modificar el comportamiento.
