# Sillar UI component reference

Sillar UI provides accessible, typed React components with semantic CSS tokens. Import the stylesheet once:

```tsx
import 'sillar-ui/styles.css';
```

## Overlay components

- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogClose`: modal focus containment, outside isolation, Escape dismissal, nested layers, and focus restoration.
- `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverClose`: collision-aware non-modal content with outside and Escape dismissal.
- `Tooltip`, `TooltipTrigger`, `TooltipContent`: delayed pointer and focus descriptions using `role="tooltip"`.
- `DropdownMenu` family: menu keyboard navigation, typeahead, collision handling, disabled items, and focus restoration.
- `ToastProvider`, `ToastViewport`, `useToast`: timed live-region notifications with default, success, warning, and danger variants.

## Collection components

- `Accordion` family: single or multiple values, optional collapsing, horizontal or vertical arrow navigation.
- `Tabs` family: automatic or manual activation and horizontal or vertical navigation.
- `NavigationMenu` family: disclosure navigation with arrow-key movement.
- `RadioGroup`, `RadioGroupItem`: single choice with roving focus.
- `SelectRoot`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`: custom listbox behavior and native form value submission.
- `Combobox`: searchable options with list autocomplete.

## Forms and feedback

- `Form`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useForm`: validation state, accessible error relationships, and typed values.
- `Checkbox`, `Switch`, native `Select`, `Input`, `Textarea`, `Label`, and `Field` composition.
- `DatePicker`: localized calendar grid with day, week, and month keyboard navigation.
- `Progress`: determinate and indeterminate progress.
- `Skeleton`: motion-aware loading placeholder.

## Layout and presentation

Button, IconButton, Badge, Card, Callout, Section, Separator, Slot, SkipLink, and VisuallyHidden.

## Keyboard summary

| Component | Keys |
| --- | --- |
| Dialog / Popover | Escape closes and restores focus |
| Accordion | Arrow keys, Home, End |
| DropdownMenu / Select | Arrow keys, Home, End, Escape |
| Combobox | Arrow keys, Enter, Escape |
| DatePicker | Arrow keys, Home, End, PageUp, PageDown |
| Tabs / RadioGroup | Arrow keys, Home, End |

## Theme activation

Use `.dark` or `data-theme="dark"` on the document root or any containing element. Override documented `--slr-*` custom properties to create a brand theme.
