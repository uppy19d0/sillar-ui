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
- `SelectRoot`: selector compuesto compatible con formularios.
- `Combobox`: búsqueda y autocompletado accesible.

## Formularios y estado

- `Form`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` y `useForm`: valores tipados, validación y mensajes asociados.
- `Checkbox`, `Switch`, `Input`, `Textarea`, `Label`, `Field` y `Select` nativo.
- `DatePicker`: calendario localizado con navegación por días, semanas y meses.
- `Progress` y `Skeleton`: estados determinados, indeterminados y carga visual.

## Navegación de teclado

| Componente | Teclas |
| --- | --- |
| Dialog / Popover | Escape cierra y restaura el foco |
| Accordion | Flechas, Inicio y Fin |
| DropdownMenu / Select | Flechas, Inicio, Fin y Escape |
| Combobox | Flechas, Enter y Escape |
| DatePicker | Flechas, Inicio, Fin, PageUp y PageDown |
| Tabs / RadioGroup | Flechas, Inicio y Fin |

## Temas

Activa el modo oscuro con `.dark` o `data-theme="dark"`. Personaliza las variables documentadas `--slr-*` para adaptar la identidad visual sin modificar el comportamiento.
