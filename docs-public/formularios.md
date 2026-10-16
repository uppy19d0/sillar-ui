# Validación y recuperación de formularios

Este ejemplo pertenece al código todavía sin publicar. Úsalo después de compilar esta rama; no indica que la versión actual de npm ya incluya la API nueva.

El resumen sirve para formularios largos de cuentas, solicitudes o pagos. Cada entrada enlaza a un control existente. `FormItem controlId` conecta su etiqueta, descripción y mensaje de validación. Los IDs deben ser únicos; usa React `useId` si renderizas varias copias.

```tsx
import * as React from 'react';
import { Button } from 'sillar-ui/button';
import { Form, FormControl, FormDescription, FormItem,
  FormLabel, FormMessage, useForm } from 'sillar-ui/form';
import { FormErrorSummary } from 'sillar-ui/form-error-summary';
import 'sillar-ui/styles.css';

export function ContactForm() {
  const summary = React.useRef<HTMLDivElement>(null);
  const focusErrors = React.useRef(false);
  const [requestError, setRequestError] = React.useState('');
  const form = useForm({
    initialValues: { email: '' },
    validate: values => ({
      email: /\S+@\S+\.\S+/.test(values.email)
        ? undefined : 'Escribe un correo válido.',
    }),
    onSubmit: async values => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('No se pudo guardar. Inténtalo de nuevo.');
    },
  });
  React.useEffect(() => {
    if (focusErrors.current && form.errors.email) {
      summary.current?.focus();
      focusErrors.current = false;
    }
  }, [form.errors]);

  return <Form onSubmit={async event => {
    setRequestError('');
    focusErrors.current = true;
    try {
      if (await form.handleSubmit(event)) focusErrors.current = false;
    } catch {
      focusErrors.current = false;
      setRequestError('No se pudo guardar. Inténtalo de nuevo.');
    }
  }}>
    <FormErrorSummary ref={summary} title="Revisa el formulario"
      errors={form.errors.email
        ? [{ id: 'contact-email', message: form.errors.email }] : []} />
    <FormItem controlId="contact-email"
      invalid={Boolean(form.errors.email)} required>
      <FormLabel>Correo electrónico</FormLabel>
      <FormControl><input type="email" {...form.field('email')} /></FormControl>
      <FormDescription>Usaremos este correo para responder.</FormDescription>
      <FormMessage>{form.errors.email}</FormMessage>
    </FormItem>
    {requestError && <p role="alert">{requestError}</p>}
    <Button type="submit" loading={form.submitting}>
      {form.submitting ? 'Guardando…' : 'Guardar'}
    </Button>
  </Form>;
}
```

`/api/contact` representa un endpoint de tu aplicación; Sillar no lo implementa. Valida y autoriza las peticiones en el servidor. La demostración de la documentación es local y no envía datos.

- Una lista vacía oculta el resumen. El título predeterminado está en inglés; pasa `title` para localizarlo.
- Cambiar los errores no mueve el foco. El ejemplo enfoca el resumen después de ese envío fallido, cuando React ya ha mostrado los errores.
- Los enlaces permiten navegar con teclado y localizar IDs exactos, incluso con puntuación. Un input personalizado debe reenviar IDs, atributos ARIA, eventos y refs.
- Renderiza un `FormMessage` cuando `FormItem` sea inválido. Su ID de error predeterminado conserva la asociación incluso dentro de otros componentes. Los IDs personalizados de ayuda/error se detectan en hijos directos y fragmentos; en composiciones opacas, usa `controlId` y valores explícitos de `aria-describedby` que coincidan con tus IDs.
- `handleSubmit` devuelve false si falla la validación o ya hay un envío en curso. Las excepciones de `validate` y `onSubmit` se propagan; captura los fallos de red y muestra una opción para reintentar.
- Reset recupera los valores iniciales del último render confirmado y limpia los errores. No cancela una petición ni permite otro envío hasta que termine. La aplicación gestiona cancelación, idempotencia y errores del servidor.
- Presenta los fallos de red separados de los errores de campos. Los reintentos automáticos de escrituras dependen del contrato del endpoint.

## Comprobación del rendimiento

`npm run check` compila y revisa librería, límites de tamaño y documentación. `npm run size:consumer` empaqueta ejemplos incluyendo las utilidades de clases, con React, CSS y código de la aplicación fuera de la medición. El límite de 18 kB gzip por ejemplo detecta regresiones; no promete ese peso para una página ni una latencia concreta.

Los overlays se posicionan al abrirse. Las ráfagas posteriores de scroll, resize y ResizeObserver se agrupan por frame; cerrar un overlay cancela su trabajo pendiente.
