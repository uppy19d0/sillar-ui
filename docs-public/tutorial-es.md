# Construye tu primera interfaz con Sillar UI

Este tutorial lleva un proyecto React desde la instalación hasta una tarjeta de producto con tema y navegación por teclado.

## 1. Instala y diagnostica

```bash
npm install sillar-ui
npx sillar-cli init
npx sillar-cli doctor
```

## 2. Carga el design system

Importa la hoja de estilos una sola vez en la entrada de tu aplicación:

```tsx
import 'sillar-ui/styles.css';
```

## 3. Compón una superficie de producto

```tsx
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'sillar-ui';

export function ResumenCuenta() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <Badge variant="success">Activa</Badge>
        <CardTitle>Cuenta Caribe</CardTitle>
        <CardDescription>Tu balance disponible y actividad reciente.</CardDescription>
      </CardHeader>
      <CardContent>
        <strong>RD$ 84,250.00</strong>
        <Button>Ver actividad</Button>
      </CardContent>
    </Card>
  );
}
```

## 4. Agrega temas

Define `data-theme="dark"` en un contenedor o en el documento. Personaliza los tokens semánticos `--slr-*` para tu marca sin depender de detalles internos.

## 5. Verifica antes de publicar

- Recorre todas las acciones con el teclado.
- Confirma el foco visible y las etiquetas accesibles.
- Comprueba los temas claro y oscuro.
- Ejecuta `npx sillar-cli doctor` y el build de producción.

Continúa con la [documentación interactiva](https://uppy19d0.github.io/sillar-ui/) o consulta la [referencia de componentes](./componentes.md).
